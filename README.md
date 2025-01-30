# Installation projet

- npm init -y
- npm install express
- npm install dotenv
- npm install body-parser
- npm install mysql2

- Décommenter la ligne 28 la première fois qu'on lance le serveur pour avoir des données dans la BDD si nécessaire.

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
