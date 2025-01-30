require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const initDB = require('./db');

const app = express();
app.use(bodyParser.json());

initDB().then(connection => {
    console.log('Connexion à la base de données établie');

    // CRUD POUR LES CATEGORIES

    // Récupérer toutes les catégories
    app.get('/categories', async (req, res) => {
        const query = `SELECT * FROM Categories`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer une catégorie par ID
    app.get('/categories/id', async (req, res) => {
        const { id } = req.query;
        const query = `SELECT * FROM Categories WHERE id = ${id}`;
        console.log(req.query)
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter une catégorie
    app.post('/categories', async (req, res) => {
        const { nom } = req.body;
        const query = `INSERT INTO Categories (nom) VALUES ('${nom}')`;
        await connection.query(query);
        res.status(201).json({ message: 'Catégorie ajoutée avec succès' });
    });

    // Mettre à jour une catégorie
    app.put('/categories/:id', async (req, res) => {
        const { id } = req.params;
        const { nom } = req.body;
        const query = `UPDATE Categories SET nom = '${nom}' WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Catégorie mise à jour avec succès' });
    });

    // Supprimer une catégorie
    app.delete('/categories/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Categories WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Catégorie supprimée avec succès' });
    });

    // CRUD POUR LES PRODUITS

    // Récupérer tous les produits
    app.get('/produits', async (req, res) => {
        const query = `SELECT * FROM Produits`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer un produit par ID
    app.get('/produits/:id', async (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM Produits WHERE id = ${id}`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter un produit
    app.post('/produits', async (req, res) => {
        const { nom, prix, quantite, categorie_id } = req.body;
        const query = `INSERT INTO Produits (nom, prix, quantite, categorie_id) VALUES ('${nom}', ${prix}, ${quantite}, ${categorie_id})`;
        await connection.query(query);
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });

    // Mettre à jour un produit
    app.put('/produits/:id', async (req, res) => {
        const { id } = req.params;
        const { nom, prix, quantite, categorie_id } = req.body;
        const query = `UPDATE Produits SET nom = '${nom}', prix = ${prix}, quantite = ${quantite}, categorie_id = ${categorie_id} WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Produit mis à jour avec succès' });
    });

    // Supprimer un produit
    app.delete('/produits/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Produits WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Produit supprimé avec succès' });
    });

    // CRUD POUR LES CLIENTS

    // Récupérer tous les clients
    app.get('/clients', async (req, res) => {
        const query = `SELECT * FROM Clients`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer un client par ID
    app.get('/clients/:id', async (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM Clients WHERE id = ${id}`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter un client
    app.post('/clients', async (req, res) => {
        const { nom, adresse, telephone, email } = req.body;
        const query = `INSERT INTO Clients (nom, adresse, telephone, email) VALUES ('${nom}', '${adresse}', '${telephone}', '${email}')`;
        await connection.query(query);
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });

    // Mettre à jour un client
    app.put('/clients/:id', async (req, res) => {
        const { id } = req.params;
        const { nom, adresse, telephone, email } = req.body;
        const query = `UPDATE Clients SET nom = '${nom}', adresse = '${adresse}', telephone = '${telephone}', email = '${email}' WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Client mis à jour avec succès' });
    });

    // Supprimer un client
    app.delete('/clients/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Clients WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Client supprimé avec succès' });
    });

    // CRUD POUR LES FOURNISSEURS

    // Récupérer tous les fournisseurs
    app.get('/fournisseurs', async (req, res) => {
        const query = `SELECT * FROM Fournisseurs`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer un fournisseur par ID
    app.get('/fournisseurs/:id', async (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM Fournisseurs WHERE id = ${id}`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter un fournisseur
    app.post('/fournisseurs', async (req, res) => {
        const { nom, contact } = req.body;
        const query = `INSERT INTO Fournisseurs (nom, contact) VALUES ('${nom}', '${contact}')`;
        await connection.query(query);
        res.status(201).json({ message: 'Fournisseur ajouté avec succès' });
    });

    // Mettre à jour un fournisseur
    app.put('/fournisseurs/:id', async (req, res) => {
        const { id } = req.params;
        const { nom, contact } = req.body;
        const query = `UPDATE Fournisseurs SET nom = '${nom}', contact = '${contact}' WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Fournisseur mis à jour avec succès' });
    });

    // Supprimer un fournisseur
    app.delete('/fournisseurs/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Fournisseurs WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Fournisseur supprimé avec succès' });
    });

    // CRUD POUR LES COMMANDES

    // Récupérer toutes les commandes
    app.get('/commandes', async (req, res) => {
        const query = `SELECT * FROM Commandes`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer une commande par ID
    app.get('/commandes/:id', async (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM Commandes WHERE id = ${id}`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter une commande
    app.post('/commandes', async (req, res) => {
        const { client_id } = req.body;
        const query = `INSERT INTO Commandes (client_id) VALUES (${client_id})`;
        await connection.query(query);
        res.status(201).json({ message: 'Commande ajoutée avec succès' });
    });

    // Mettre à jour une commande
    app.put('/commandes/:id', async (req, res) => {
        const { id } = req.params;
        const { client_id } = req.body;
        const query = `UPDATE Commandes SET client_id = ${client_id} WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Commande mise à jour avec succès' });
    });

    // Supprimer une commande
    app.delete('/commandes/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Commandes WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Commande supprimée avec succès' });
    });

    // CRUD POUR LES LIGNES DE COMMANDE

    // Récupérer toutes les lignes de commande
    app.get('/lignes-commande', async (req, res) => {
        const query = `SELECT * FROM Lignes_Commande`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Récupérer une ligne de commande par ID
    app.get('/lignes-commande/:id', async (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM Lignes_Commande WHERE id = ${id}`;
        const [result] = await connection.query(query);
        res.json(result);
    });

    // Ajouter une ligne de commande
    app.post('/lignes-commande', async (req, res) => {
        const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
        const query = `INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire) VALUES (${commande_id}, ${produit_id}, ${quantite}, ${prix_unitaire})`;
        await connection.query(query);
        res.status(201).json({ message: 'Ligne de commande ajoutée avec succès' });
    });

    // Mettre à jour une ligne de commande
    app.put('/lignes-commande/:id', async (req, res) => {
        const { id } = req.params;
        const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
        const query = `UPDATE Lignes_Commande SET commande_id = ${commande_id}, produit_id = ${produit_id}, quantite = ${quantite}, prix_unitaire = ${prix_unitaire} WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Ligne de commande mise à jour avec succès' });
    });

    // Supprimer une ligne de commande
    app.delete('/lignes-commande/:id', async (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM Lignes_Commande WHERE id = ${id}`;
        await connection.query(query);
        res.json({ message: 'Ligne de commande supprimée avec succès' });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
});