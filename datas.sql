USE stock_management;

-- ==============================
-- Insertion des catégories
-- ==============================
INSERT INTO Categories (nom) VALUES 
('Avions en papier'),
('Accessoires'),
('Jets miniatures'),
('Maquettes de collection'),
('Aérospatial'),
('Vintage'),
('Modèles militaires'),
('Expérimentaux'),
('Supersoniques'),
('Concepts futurs');

-- ==============================
-- Insertion des produits
-- ==============================
INSERT INTO Produits (nom, prix, quantite, categorie_id) VALUES 
('Boeing 747', 10.50, 50, 1),
('Concorde', 15.75, 30, 1),
('Airbus A380', 20.00, 40, 1),
('Lockheed Martin F-22 Raptor', 35.99, 15, 7),
('Northrop B-2 Spirit', 45.50, 10, 7),
('Space Shuttle Discovery', 55.00, 8, 5),
('SR-71 Blackbird', 60.00, 5, 9),
('Wright Flyer', 12.99, 20, 6),
('Sukhoi Su-57', 32.75, 18, 7),
('Bell X-1', 25.50, 12, 8),
('F-35 Lightning II', 40.00, 20, 7),
('Antonov An-225', 50.00, 3, 1),
('MiG-29 Fulcrum', 28.50, 25, 7),
('F-14 Tomcat', 38.75, 10, 7),
('Douglas DC-3', 22.00, 15, 6),
('Boeing B-17 Flying Fortress', 42.50, 8, 6),
('Airbus Beluga', 26.00, 12, 1),
('Zeppelin NT', 18.99, 7, 4),
('Eurofighter Typhoon', 37.50, 14, 7),
('Concorde 2.0', 65.00, 4, 9),
('Dassault Rafale', 39.99, 16, 7);

-- ==============================
-- Insertion des fournisseurs
-- ==============================
INSERT INTO Fournisseurs (nom, contact) VALUES 
('AirPaper', 'contact@airpaper.com'),
('PlaneCraft', 'support@planecraft.com'),
('SkyModels', 'info@skymodels.com'),
('AeroDesign', 'contact@aerodesign.com'),
('VintageAir', 'sales@vintageair.com'),
('MilitaryWings', 'info@militarywings.com'),
('FutureFlights', 'future@flights.com'),
('OrbitalWorks', 'orbital@works.com');

-- ==============================
-- Insertion des relations Produits-Fournisseurs
-- ==============================
INSERT INTO Produits_Fournisseurs (produit_id, fournisseur_id) VALUES 
(1, 1), (2, 2), (3, 3), (4, 6), (5, 6), 
(6, 7), (7, 8), (8, 5), (9, 6), (10, 7), 
(11, 6), (12, 3), (13, 6), (14, 6), (15, 5), 
(16, 5), (17, 3), (18, 4), (19, 6), (20, 7), (21, 6);

-- ==============================
-- Insertion des clients
-- ==============================
INSERT INTO Clients (nom, adresse, telephone, email) VALUES 
('Jean Dupont', '10 rue des avions, Paris', '0601020304', 'jean.dupont@mail.com'),
('Marie Curie', '12 avenue des maquettes, Lyon', '0612345678', 'marie.curie@mail.com'),
('Albert Einstein', '14 boulevard des sciences, Marseille', '0623456789', 'albert.einstein@mail.com'),
('Isaac Newton', '7 square des découvertes, Toulouse', '0634567890', 'isaac.newton@mail.com'),
('Leonardo da Vinci', '9 rue de la Renaissance, Florence', '0645678901', 'leonardo.davinci@mail.com'),
('Nicolas Tesla', '8 impasse de l\'électricité, Nice', '0656789012', 'nicolas.tesla@mail.com'),
('Charles Lindbergh', '22 place de l\'aviation, Chicago', '0667890123', 'charles.lindbergh@mail.com'),
('Amelia Earhart', '18 avenue des explorateurs, Los Angeles', '0678901234', 'amelia.earhart@mail.com'),
('Neil Armstrong', '11 boulevard de la Lune, Houston', '0689012345', 'neil.armstrong@mail.com'),
('Buzz Aldrin', '13 rue de la conquête spatiale, New York', '0690123456', 'buzz.aldrin@mail.com');

-- ==============================
-- Insertion des commandes
-- ==============================
INSERT INTO Commandes (client_id) VALUES 
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- ==============================
-- Insertion des lignes de commande
-- ==============================
INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire) VALUES 
(1, 1, 2, 10.50), (1, 3, 1, 20.00), (2, 4, 1, 35.99), (3, 5, 2, 45.50),
(4, 6, 1, 55.00), (5, 7, 3, 60.00), (6, 8, 2, 12.99), (7, 9, 1, 32.75),
(8, 10, 1, 25.50), (9, 11, 2, 40.00), (10, 12, 1, 50.00), (11, 13, 2, 28.50),
(12, 14, 1, 38.75), (13, 15, 1, 22.00), (14, 16, 1, 42.50), (15, 17, 2, 26.00),
(16, 18, 1, 18.99), (17, 19, 2, 37.50), (18, 20, 1, 65.00), (19, 21, 1, 39.99);
