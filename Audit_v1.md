# Audit de la V1 - Système de Gestion de Stock

## Objectif de l’audit
Cet audit analyse la **Version 1 (V1)** de l’API développée pour la gestion de stock d’un commerce de maquettes d’avions en papier.  
L'objectif est d’identifier les **failles de sécurité**, **incohérences métier** et **améliorations possibles** afin d’optimiser la **Version 2 (V2)**.

---

## 🚨 1️⃣ Problèmes identifiés

### ❌ 1.1 Injection SQL possible
📍 **Problème :** Toutes les requêtes SQL sont construites en concaténant directement les entrées utilisateur.  
📍 **Exemple critique :** La route `/categories/id` est vulnérable :

```javascript
app.get('/categories/id', async (req, res) => {
    const { id } = req.query;
    const query = `SELECT * FROM Categories WHERE id = ${id}`;
    const [result] = await connection.query(query);
    res.json(result);
});
```

📍 **Exploitation possible :**
En envoyant cette requête malveillante :
http://localhost:3000/categories/id?id=0 UNION SELECT schema_name, 'x' FROM information_schema.schemata

Un attaquant peut obtenir la liste des bases de données du serveur.

📍 **Impact :**
- **Risque de fuite de données sensibles** (accès aux bases de données système).
- **Possibilité de modification ou suppression de données** en injectant d’autres commandes SQL.

---

### ❌ 1.2 Absence de validation des entrées utilisateur
📍 **Problème :** L’API ne vérifie pas si les valeurs envoyées dans le `body` ou les paramètres sont valides.  
📍 **Exemple :** Un utilisateur peut créer un produit avec un prix négatif ou un stock invalide :

```javascript
app.post('/produits', async (req, res) => {
    const { nom, prix, quantite, categorie_id } = req.body;
    const query = `INSERT INTO Produits (nom, prix, quantite, categorie_id) 
                   VALUES ('${nom}', ${prix}, ${quantite}, ${categorie_id})`;
    await connection.query(query);
    res.status(201).json({ message: 'Produit ajouté avec succès' });
});
```

📍 **Exploitation possible :**
Envoyer un `POST` avec un prix négatif :
{
    "nom": "Produit invalide",
    "prix": -10,
    "quantite": -5,
    "categorie_id": 1
}

📍 **Impact :**
- **Données incohérentes** dans la base.
- **Possibilité de commandes absurdes** avec des prix négatifs.

---

### ❌ 1.3 Suppression non sécurisée
📍 **Problème :** Un produit ou un client peut être supprimé **même s’il est référencé** dans une commande.

```javascript
app.delete('/produits/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Produits WHERE id = ${id}`;
    await connection.query(query);
    res.json({ message: 'Produit supprimé avec succès' });
});
```

📍 **Exploitation possible :**  
Si un produit est supprimé alors qu'il est référencé dans une commande, cela crée une incohérence dans la base.

📍 **Impact :**
- **Commandes contenant des produits inexistants.**
- **Erreurs lors de la récupération des données.**

---

### ❌ 1.4 Mauvaise gestion des stocks
📍 **Problème :** Il est possible de passer une commande **sans vérifier** la disponibilité du stock.

```javascript
app.post('/lignes-commande', async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    const query = `INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire) 
                   VALUES (${commande_id}, ${produit_id}, ${quantite}, ${prix_unitaire})`;
    await connection.query(query);
    res.status(201).json({ message: 'Ligne de commande ajoutée avec succès' });
});
```

📍 **Exploitation possible :**  
- Un client peut commander **un produit en rupture de stock**.
- Le stock **n’est jamais décrémenté** après une commande.

📍 **Impact :**
- **Risque de survente**, perturbant la gestion des commandes.
- **Problèmes logistiques** dus à des commandes non livrables.

---

## 🛠 2️⃣ Améliorations prévues en V2

### ✅ 2.1 Sécuriser les requêtes SQL avec des procédures stockées
➡ **Solution :** Utiliser des **procédures stockées** au lieu d’écrire des requêtes SQL en dur dans le code.

📍 **Exemple de procédure stockée pour récupérer une catégorie par ID :**

```SQL
CREATE PROCEDURE GetCategoryById (IN categoryId INT)
BEGIN
    SELECT * FROM Categories WHERE id = categoryId;
END;
```

📍 **Comment appeler la procédure dans l’API :**

```javascript
app.get('/categories/id', async (req, res) => {
    const { id } = req.query;
    const query = `CALL GetCategoryById(${id})`;
    const [result] = await connection.query(query);
    res.json(result);
});
```

📍 **Bénéfices :**
- **Élimine le risque d’injection SQL**.
- **Meilleure performance et sécurité**.

---

### ✅ 2.2 Ajouter des validations des entrées utilisateur
➡ **Solution :** Vérifier que les valeurs sont correctes avant d’insérer en base.

```javascript
if (prix < 0 || quantite < 0) {
    return res.status(400).json({ error: "Valeurs invalides." });
}
```

📍 **Bénéfices :**
- **Empêche les prix et stocks négatifs**.
- **Évite l’enregistrement de données incohérentes**.

---

### ✅ 2.3 Vérifier les stocks avant d’accepter une commande
➡ **Solution :** Ajouter une procédure stockée pour **vérifier le stock avant d’insérer une commande**.

📍 **Exemple de procédure stockée :**

```SQL
CREATE PROCEDURE CheckStockAndInsertOrder (
    IN commandeId INT, 
    IN produitId INT, 
    IN quantiteDemandee INT, 
    IN prixUnitaire DECIMAL(10,2)
)
BEGIN
    DECLARE stockActuel INT;
    SELECT quantite INTO stockActuel FROM Produits WHERE id = produitId;
    
    IF stockActuel >= quantiteDemandee THEN
        INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire) 
        VALUES (commandeId, produitId, quantiteDemandee, prixUnitaire);
        UPDATE Produits SET quantite = quantite - quantiteDemandee WHERE id = produitId;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuffisant';
    END IF;
END;
```

📍 **Bénéfices :**
- **Empêche les commandes de produits en rupture de stock**.
- **Automatise la mise à jour du stock**.

---

### ✅ 2.4 Empêcher la suppression de produits référencés dans des commandes
➡ **Solution :** Vérifier les références avant suppression avec une procédure stockée.

```SQL
CREATE PROCEDURE DeleteProduct (IN productId INT)
BEGIN
    DECLARE countCommande INT;
    SELECT COUNT(*) INTO countCommande FROM Lignes_Commande WHERE produit_id = productId;
    
    IF countCommande = 0 THEN
        DELETE FROM Produits WHERE id = productId;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Impossible de supprimer un produit en commande';
    END IF;
END;
```

📍 **Bénéfices :**
- **Évite les erreurs de commandes avec des produits supprimés**.
- **Préserve l’intégrité des données**.

---

## 🏆 3️⃣ Conclusion

📌 **Résumé des failles critiques en V1 :**
1. 🚨 **Injection SQL possible** via les requêtes non sécurisées.
2. 🚨 **Absence de validation des entrées utilisateur**.
3. 🚨 **Mauvaise gestion des stocks**.
4. 🚨 **Suppression dangereuse** de produits ou clients encore référencés.

📌 **Solutions majeures en V2 :**
✅ Remplacement des requêtes SQL par **des procédures stockées**.  
✅ Vérification **des entrées utilisateur**.  
✅ Implémentation **d’un contrôle de stock**.  
✅ **Blocage de la suppression** des produits référencés.  

**La V2 mettra en place ces correctifs pour rendre l’API robuste et sécurisée**  
