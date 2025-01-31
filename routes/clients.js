const express = require('express');
const router = express.Router();
const initDB = require('../db');

// 📌 Récupérer tous les clients
router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllClients()");
        res.json(result[0]); // Les résultats des procédures stockées sont dans un tableau
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des clients." });
    } finally {
        connection.end();
    }
});

// 📌 Récupérer un client par ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetClientById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du client." });
    } finally {
        connection.end();
    }
});

// 📌 Ajouter un client avec validation des entrées
router.post('/', async (req, res) => {
    const { nom, adresse, telephone, email } = req.body;
    if (!nom || !adresse || !telephone || !email) {
        return res.status(400).json({ error: "Tous les champs sont requis (nom, adresse, téléphone, email)" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL AddClient(?, ?, ?, ?)", [nom, adresse, telephone, email]);
        res.status(201).json({ message: "Client ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du client. Vérifiez que l'email est unique." });
    } finally {
        connection.end();
    }
});

// 📌 Mettre à jour un client avec validation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, telephone, email } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });
    if (!nom || !adresse || !telephone || !email) {
        return res.status(400).json({ error: "Tous les champs sont requis (nom, adresse, téléphone, email)" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateClient(?, ?, ?, ?, ?)", [id, nom, adresse, telephone, email]);
        res.json({ message: "Client mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du client." });
    } finally {
        connection.end();
    }
});

// 📌 Supprimer un client
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL DeleteClient(?)", [id]);
        res.json({ message: "Client supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du client." });
    } finally {
        connection.end();
    }
});

module.exports = router;
