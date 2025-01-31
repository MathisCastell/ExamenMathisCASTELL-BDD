DROP USER IF EXISTS 'app_user'@'localhost';

CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'app_user';

GRANT EXECUTE ON PROCEDURE stock_management.* TO 'app_user'@'localhost';

FLUSH PRIVILEGES;


DROP DATABASE IF EXISTS stock_management;

CREATE DATABASE stock_management;
USE stock_management;

-- ==============================
-- TABLES
-- ==============================

CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE Produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    quantite INT NOT NULL CHECK (quantite >= 0),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES Categories(id)
);

CREATE TABLE Fournisseurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255)
);

CREATE TABLE Produits_Fournisseurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT,
    fournisseur_id INT,
    FOREIGN KEY (produit_id) REFERENCES Produits(id),
    FOREIGN KEY (fournisseur_id) REFERENCES Fournisseurs(id)
);

CREATE TABLE Clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255),
    telephone VARCHAR(20),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE Commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

CREATE TABLE Lignes_Commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2) NOT NULL CHECK (prix_unitaire >= 0),
    FOREIGN KEY (commande_id) REFERENCES Commandes(id),
    FOREIGN KEY (produit_id) REFERENCES Produits(id)
);

-- ==============================
-- PROCEDURES STOCKÉES
-- ==============================



-- Récupérer toutes les catégories
CREATE PROCEDURE GetAllCategories()
BEGIN
    SELECT * FROM Categories;
END;

-- Récupérer une catégorie par ID
CREATE PROCEDURE GetCategoryById(IN categoryId INT)
BEGIN
    SELECT * FROM Categories WHERE id = categoryId;
END;

-- Ajouter une catégorie
CREATE PROCEDURE AddCategory(IN categoryName VARCHAR(255))
BEGIN
    INSERT INTO Categories (nom) VALUES (categoryName);
END;

-- Mettre à jour une catégorie
CREATE PROCEDURE UpdateCategory(IN categoryId INT, IN categoryName VARCHAR(255))
BEGIN
    UPDATE Categories SET nom = categoryName WHERE id = categoryId;
END;

-- Supprimer une catégorie
CREATE PROCEDURE DeleteCategory(IN categoryId INT)
BEGIN
    DELETE FROM Categories WHERE id = categoryId;
END;

-- Récupérer tous les produits
CREATE PROCEDURE GetAllProducts()
BEGIN
    SELECT * FROM Produits;
END;

-- Récupérer un produit par ID
CREATE PROCEDURE GetProductById(IN productId INT)
BEGIN
    SELECT * FROM Produits WHERE id = productId;
END;

-- Ajouter un produit avec validation des valeurs
CREATE PROCEDURE AddProduct(
    IN productName VARCHAR(255),
    IN productPrice DECIMAL(10,2),
    IN productQuantity INT,
    IN categoryId INT
)
BEGIN
    IF productPrice >= 0 AND productQuantity >= 0 THEN
        INSERT INTO Produits (nom, prix, quantite, categorie_id)
        VALUES (productName, productPrice, productQuantity, categoryId);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Valeurs invalides (prix ou quantité négative)';
    END IF;
END;

-- Mettre à jour un produit
CREATE PROCEDURE UpdateProduct(
    IN productId INT,
    IN productName VARCHAR(255),
    IN productPrice DECIMAL(10,2),
    IN productQuantity INT,
    IN categoryId INT
)
BEGIN
    IF productPrice >= 0 AND productQuantity >= 0 THEN
        UPDATE Produits 
        SET nom = productName, prix = productPrice, quantite = productQuantity, categorie_id = categoryId
        WHERE id = productId;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Valeurs invalides (prix ou quantité négative)';
    END IF;
END;

-- Supprimer un produit (Empêcher la suppression s'il est référencé)
CREATE PROCEDURE DeleteProduct(IN productId INT)
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

-- Récupérer tous les clients
CREATE PROCEDURE GetAllClients()
BEGIN
    SELECT * FROM Clients;
END;

-- Récupérer un client par ID
CREATE PROCEDURE GetClientById(IN clientId INT)
BEGIN
    SELECT * FROM Clients WHERE id = clientId;
END;

-- Ajouter un client
CREATE PROCEDURE AddClient(
    IN clientName VARCHAR(255),
    IN clientAddress TEXT,
    IN clientPhone VARCHAR(20),
    IN clientEmail VARCHAR(255)
)
BEGIN
    INSERT INTO Clients (nom, adresse, telephone, email)
    VALUES (clientName, clientAddress, clientPhone, clientEmail);
END;

-- Mettre à jour un client
CREATE PROCEDURE UpdateClient(
    IN clientId INT,
    IN clientName VARCHAR(255),
    IN clientAddress TEXT,
    IN clientPhone VARCHAR(20),
    IN clientEmail VARCHAR(255)
)
BEGIN
    UPDATE Clients 
    SET nom = clientName, adresse = clientAddress, telephone = clientPhone, email = clientEmail
    WHERE id = clientId;
END;

-- Supprimer un client
CREATE PROCEDURE DeleteClient(IN clientId INT)
BEGIN
    DELETE FROM Clients WHERE id = clientId;
END;

-- Récupérer toutes les commandes
CREATE PROCEDURE GetAllOrders()
BEGIN
    SELECT * FROM Commandes;
END;

-- Récupérer une commande par ID
CREATE PROCEDURE GetOrderById(IN orderId INT)
BEGIN
    SELECT * FROM Commandes WHERE id = orderId;
END;

-- Ajouter une commande
CREATE PROCEDURE AddOrder(IN clientId INT)
BEGIN
    INSERT INTO Commandes (client_id) VALUES (clientId);
END;

-- Mettre à jour une commande
CREATE PROCEDURE UpdateOrder(IN orderId INT, IN clientId INT)
BEGIN
    UPDATE Commandes SET client_id = clientId WHERE id = orderId;
END;

-- Supprimer une commande
CREATE PROCEDURE DeleteOrder(IN orderId INT)
BEGIN
    DELETE FROM Commandes WHERE id = orderId;
END;

-- Récupérer toutes les lignes de commande
CREATE PROCEDURE GetAllOrderLines()
BEGIN
    SELECT * FROM Lignes_Commande;
END;

-- Récupérer une ligne de commande par ID
CREATE PROCEDURE GetOrderLineById(IN orderLineId INT)
BEGIN
    SELECT * FROM Lignes_Commande WHERE id = orderLineId;
END;

-- Ajouter une ligne de commande avec contrôle du stock
CREATE PROCEDURE AddOrderLine(
    IN orderId INT, 
    IN productId INT, 
    IN quantity INT, 
    IN unitPrice DECIMAL(10,2)
)
BEGIN
    DECLARE currentStock INT;
    
    -- Vérification du stock
    SELECT quantite INTO currentStock FROM Produits WHERE id = productId;
    
    IF currentStock >= quantity THEN
        INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire)
        VALUES (orderId, productId, quantity, unitPrice);
        
        -- Mise à jour du stock après la commande
        UPDATE Produits SET quantite = quantite - quantity WHERE id = productId;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuffisant';
    END IF;
END;

-- Mettre à jour une ligne de commande
CREATE PROCEDURE UpdateOrderLine(
    IN orderLineId INT,
    IN orderId INT,
    IN productId INT,
    IN quantity INT,
    IN unitPrice DECIMAL(10,2)
)
BEGIN
    UPDATE Lignes_Commande 
    SET commande_id = orderId, produit_id = productId, quantite = quantity, prix_unitaire = unitPrice
    WHERE id = orderLineId;
END;

-- Supprimer une ligne de commande
CREATE PROCEDURE DeleteOrderLine(IN orderLineId INT)
BEGIN
    DELETE FROM Lignes_Commande WHERE id = orderLineId;
END;

-- Récupérer tous les fournisseurs
CREATE PROCEDURE GetAllFournisseurs()
BEGIN
    SELECT * FROM Fournisseurs;
END;

-- Récupérer un fournisseur par ID
CREATE PROCEDURE GetFournisseurById(IN FournisseurId INT)
BEGIN
    SELECT * FROM Fournisseurs WHERE id = FournisseurId;
END;

-- Ajouter un fournisseur
CREATE PROCEDURE AddFournisseur(
    IN FournisseurName VARCHAR(255),
    IN FournisseurContact TEXT
)
BEGIN
    INSERT INTO Fournisseurs (nom, contact) VALUES (FournisseurName, FournisseurContact);
END;

-- Mettre à jour un fournisseur
CREATE PROCEDURE UpdateFournisseur(
    IN FournisseurId INT,
    IN FournisseurName VARCHAR(255),
    IN FournisseurContact TEXT
)
BEGIN
    UPDATE Fournisseurs 
    SET nom = FournisseurName, contact = FournisseurContact 
    WHERE id = FournisseurId;
END;

-- Supprimer un fournisseur
CREATE PROCEDURE DeleteFournisseur(IN FournisseurId INT)
BEGIN
    DELETE FROM Fournisseurs WHERE id = FournisseurId;
END;


