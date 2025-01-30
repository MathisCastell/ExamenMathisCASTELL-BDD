-- DROP DATABASE stock_management;

CREATE DATABASE IF NOT EXISTS stock_management;
USE stock_management;

CREATE TABLE IF NOT EXISTS Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    quantite INT NOT NULL,
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES Categories(id)
);

CREATE TABLE IF NOT EXISTS Fournisseurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Produits_Fournisseurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT,
    fournisseur_id INT,
    FOREIGN KEY (produit_id) REFERENCES Produits(id),
    FOREIGN KEY (fournisseur_id) REFERENCES Fournisseurs(id)
);

CREATE TABLE IF NOT EXISTS Clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255),
    telephone VARCHAR(20),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

CREATE TABLE IF NOT EXISTS Lignes_Commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES Commandes(id),
    FOREIGN KEY (produit_id) REFERENCES Produits(id)
);
