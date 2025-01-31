# Installation projet
Avoir mysql workbench version 8-0-41 d'installé et node v22.11.0 :

Executer ce script dans mysqlworbench :
```SQL
DROP USER IF EXISTS 'admin_user'@'localhost';
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_user';
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;
```

faire ces commandes dans le terminal 

- **npm i**
- **node initDB.js** pour créer la base de données 
- **node server** pour lancer le serveur

- Modifier les informations de connexion à la base de données dans le fichier db.js et initDB.js

lancement projet : - node server.js






# BDD 

La base de données est composée de 6 tables principales :
- `Produits` : Stocke les références des produits.
- `Catégories` : Classe les produits par type.
- `Fournisseurs` : Identifie l'origine des produits.
- `Clients` : Enregistre les informations clients.
- `Commandes` : Gère les commandes effectuées.
- `Lignes_Commande` : Liste les produits achetés dans chaque commande.



# API de Gestion de Stock - Documentation Postman

Cette documentation fournit des exemples d'appels API à tester avec **Postman**. Elle couvre **toutes les routes CRUD** de l'application.

---

## 1️⃣ **Catégories**
### 🔹 Récupérer toutes les catégories
**Méthode**: `GET`  
**URL**: `http://localhost:3000/categories`  


### 🔹 Récupérer une catégorie par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/categories/id?id=1`  

### 🔹 Ajouter une catégorie
**Méthode**: `POST`  
**URL**: `http://localhost:3000/categories`  
**Body** (JSON):
{
    "nom": "Nouveaux modèles"
}

### 🔹 Modifier une catégorie
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/categories/1`  
**Body** (JSON):
{
    "nom": "Modèles avancés"
}

### 🔹 Supprimer une catégorie
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/categories/1`

---

## 2️⃣ **Produits**
### 🔹 Récupérer tous les produits
**Méthode**: `GET`  
**URL**: `http://localhost:3000/produits`  

### 🔹 Récupérer un produit par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/produits/1`  

### 🔹 Ajouter un produit
**Méthode**: `POST`  
**URL**: `http://localhost:3000/produits`  
**Body** (JSON):
{
    "nom": "Boeing 747",
    "prix": 25.99,
    "quantite": 10,
    "categorie_id": 1
}

### 🔹 Modifier un produit
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/produits/1`  
**Body** (JSON):
{
    "nom": "Boeing 747 Deluxe",
    "prix": 29.99,
    "quantite": 8,
    "categorie_id": 1
}

### 🔹 Supprimer un produit
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/produits/1`

---

## 3️⃣ **Clients**
### 🔹 Récupérer tous les clients
**Méthode**: `GET`  
**URL**: `http://localhost:3000/clients`  

### 🔹 Récupérer un client par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/clients/1`  

### 🔹 Ajouter un client
**Méthode**: `POST`  
**URL**: `http://localhost:3000/clients`  
**Body** (JSON):
{
    "nom": "Jean Dupont",
    "adresse": "10 rue des avions, Paris",
    "telephone": "0601020304",
    "email": "jean.dupont@mail.com"
}

### 🔹 Modifier un client
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/clients/1`  
**Body** (JSON):
{
    "nom": "Jean Dupont",
    "adresse": "15 avenue des modèles",
    "telephone": "0605060708",
    "email": "jean.dupont@newmail.com"
}

### 🔹 Supprimer un client
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/clients/1`

---

## 4️⃣ **Fournisseurs**
### 🔹 Récupérer tous les fournisseurs
**Méthode**: `GET`  
**URL**: `http://localhost:3000/fournisseurs`  

### 🔹 Récupérer un fournisseur par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/fournisseurs/1`  

### 🔹 Ajouter un fournisseur
**Méthode**: `POST`  
**URL**: `http://localhost:3000/fournisseurs`  
**Body** (JSON):
{
    "nom": "AirPaper",
    "contact": "contact@airpaper.com"
}

### 🔹 Modifier un fournisseur
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/fournisseurs/1`  
**Body** (JSON):
{
    "nom": "AirPaper International",
    "contact": "support@airpaper.com"
}

### 🔹 Supprimer un fournisseur
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/fournisseurs/1`

---

## 5️⃣ **Commandes**
### 🔹 Récupérer toutes les commandes
**Méthode**: `GET`  
**URL**: `http://localhost:3000/commandes`  

### 🔹 Récupérer une commande par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/commandes/1`  

### 🔹 Ajouter une commande
**Méthode**: `POST`  
**URL**: `http://localhost:3000/commandes`  
**Body** (JSON):
{
    "client_id": 1
}

### 🔹 Modifier une commande
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/commandes/1`  
**Body** (JSON):
{
    "client_id": 2
}

### 🔹 Supprimer une commande
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/commandes/1`

---

## 6️⃣ **Lignes de Commande**
### 🔹 Récupérer toutes les lignes de commande
**Méthode**: `GET`  
**URL**: `http://localhost:3000/lignes-commande`  

### 🔹 Récupérer une ligne de commande par ID
**Méthode**: `GET`  
**URL**: `http://localhost:3000/lignes-commande/1`  

### 🔹 Ajouter une ligne de commande
**Méthode**: `POST`  
**URL**: `http://localhost:3000/lignes-commande`  
**Body** (JSON):
{
    "commande_id": 1,
    "produit_id": 1,
    "quantite": 3,
    "prix_unitaire": 10.50
}

### 🔹 Modifier une ligne de commande
**Méthode**: `PUT`  
**URL**: `http://localhost:3000/lignes-commande/1`  
**Body** (JSON):
{
    "commande_id": 1,
    "produit_id": 2,
    "quantite": 2,
    "prix_unitaire": 12.00
}

### 🔹 Supprimer une ligne de commande
**Méthode**: `DELETE`  
**URL**: `http://localhost:3000/lignes-commande/1`

---


## Injection SQL 

**Méthode**: `GET` 
**URL**: `http://localhost:3000/categories/id?id=0 UNION SELECT schema_name, 'x' FROM information_schema.schemata`

### Explication de l'attaque :

Nous avons une requête de base qui a besoin d'un id pour fonctionner :

```
SELECT * FROM Categories WHERE id = ...
```

Cette requête récupère un id placé dans la requête grâce à :

```
const { id } = req.query;
```

Pour réussir l'injection, nous plaçons du code SQL avec un UNION ce qui va nous permettre d'ajouter à la requête de base une seconde requête qui va chercher les informations que nous voulons, dans notre cas la liste des bases de données présentes sur l'appareil. 
Nous avons donc besoin d'ajouter cette requête à la suite de la requête de base :

```
UNION SELECT schema_name, 'x' FROM information_schema.schemata
```

Nous savons que id est ajouté à la fin de la requête SQL normale et est récupéré dans l'appel de l'API :

http://localhost:3000/categories/id?id=**l'id que nous voulons mettre**

Alors nous ajoutons un id au hasard suivi de notre requête d'attaque :

```
0 UNION SELECT schema_name, 'x' FROM information_schema.schemata
```

Le résultat est donc :

```
http://localhost:3000/categories/id?id=0 UNION SELECT schema_name, 'x' FROM information_schema.schemata
```

Cette injection est aussi due à la non création d'utilisateurs avec des droits distincts.

Pour protéger au mieux notre code, l'appel de Procédure et la création d'utilisateurs avec des droits spécifiques permetrait de sécuriser notre code.

## 🔍 Problèmes identifiés en V1
- ❌ **Injection SQL** possible sur les routes prenant des paramètres utilisateur.
- ❌ **Absence de validation des données** (ex. : prix négatif possible).
- ❌ **Aucune vérification du stock** lors de l'ajout d'une commande.
- ❌ **Manque de gestion des erreurs** (ex. : suppression d'un produit lié à une commande).



---

## 🚀 **Solutions adoptées en V2**  

La **Version 2 (V2)** de l'API de gestion de stock a été développée pour **corriger les failles identifiées en V1** et améliorer la **sécurité, la performance et la robustesse** du système.  

### 🔹 **1️⃣ Sécurité renforcée**  

- **Utilisation exclusive de procédures stockées (`CALL procedure()`)** pour toutes les interactions avec la base de données.  
- **Élimination des injections SQL** en empêchant toute requête dynamique manipulant directement les entrées utilisateur.  
- **Validation des données** avant leur enregistrement (ex. : impossibilité d'enregistrer un prix négatif ou un stock insuffisant).  
- **Blocage de la suppression des produits en commande** pour éviter les incohérences dans la base de données.  

### 🔹 **2️⃣ Séparation des rôles MySQL**  

Deux utilisateurs distincts ont été mis en place :  
- **`admin_user`** : A tous les droits pour créer et gérer la base de données (uniquement utilisé lors de l'initialisation).  
- **`app_user`** : Utilisé par l'API, il ne peut **que lire, insérer, modifier et supprimer des données**, sans modifier la structure de la base.  

📌 **Objectif :** Minimiser l'impact d'une faille potentielle en restreignant les accès à la base de données.  

### 🔹 **3️⃣ Gestion des erreurs et validation des entrées**  

- **Retour d'erreurs explicites** lorsque des valeurs invalides sont soumises.  
- **Mécanisme `SIGNAL SQLSTATE` en SQL** pour empêcher les actions illogiques (ex. : commande d'un produit hors stock).  
- **Erreurs renvoyées en JSON** dans l'API pour un meilleur traitement côté client.  

### 🔹 **4️⃣ Optimisation des performances**  

- **Connexion MySQL ouverte et fermée à chaque requête** pour éviter toute fuite de connexion.  
- **Utilisation de `GRANT EXECUTE` pour `app_user`**, garantissant un accès limité uniquement aux **procédures stockées**.  
- **Meilleure gestion des transactions SQL** pour assurer la cohérence des données.  

### 🔹 **5️⃣ Documentation et structuration améliorées**  

- **Séparation du code en plusieurs fichiers (`routes/`, `initDB.js`, `db.js`)** pour une maintenance plus facile.  
- **Documentation détaillée des routes de l'API** dans le README pour faciliter l'intégration avec d'autres systèmes.  

---

## 📌 **Documentation de l'API**  

L'API REST permet d'interagir avec la base de données via plusieurs **endpoints** organisés par entité.  

### **🔹 Endpoints disponibles**  

#### **Catégories**  
- `GET /categories` → Liste toutes les catégories.  
- `GET /categories/:id` → Récupère une catégorie par ID.  
- `POST /categories` → Ajoute une nouvelle catégorie.  
- `PUT /categories/:id` → Met à jour une catégorie existante.  
- `DELETE /categories/:id` → Supprime une catégorie.  

#### **Produits**  
- `GET /produits` → Liste tous les produits.  
- `GET /produits/:id` → Récupère un produit par ID.  
- `POST /produits` → Ajoute un nouveau produit (avec vérification du stock et des prix).  
- `PUT /produits/:id` → Met à jour un produit.  
- `DELETE /produits/:id` → Supprime un produit (impossible s'il est référencé dans une commande).  

#### **Clients**  
- `GET /clients` → Liste tous les clients.  
- `GET /clients/:id` → Récupère un client par ID.  
- `POST /clients` → Ajoute un nouveau client (email unique obligatoire).  
- `PUT /clients/:id` → Met à jour un client.  
- `DELETE /clients/:id` → Supprime un client.  

#### **Commandes**  
- `GET /commandes` → Liste toutes les commandes.  
- `GET /commandes/:id` → Récupère une commande par ID.  
- `POST /commandes` → Ajoute une commande pour un client.  
- `PUT /commandes/:id` → Met à jour une commande (changer le client lié).  
- `DELETE /commandes/:id` → Supprime une commande.  

#### **Lignes de commande**  
- `GET /lignes-commande` → Liste toutes les lignes de commande.  
- `GET /lignes-commande/:id` → Récupère une ligne de commande spécifique.  
- `POST /lignes-commande` → Ajoute une ligne de commande (vérifie le stock disponible).  
- `PUT /lignes-commande/:id` → Met à jour une ligne de commande.  
- `DELETE /lignes-commande/:id` → Supprime une ligne de commande.  

---

## **Pourquoi cette V2 est meilleure que la V1 ?**
✔ **Protection contre les injections SQL** (procédures stockées uniquement).  
✔ **Séparation des rôles MySQL (`admin_user`, `app_user`)** pour sécuriser l'accès aux données.  
✔ **Gestion stricte des erreurs et validation des entrées** (impossible d'entrer des valeurs incohérentes).  
✔ **Optimisation des performances** avec des transactions bien gérées.  
✔ **API bien documentée et structurée** pour une intégration fluide avec d'autres systèmes.  

📌 **Cette V2 répond aux problèmes de sécurité et de cohérence de la V1, tout en garantissant une API robuste et maintenable.** 