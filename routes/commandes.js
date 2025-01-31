const express = require('express');
const router = express.Router();
const initDB = require('../db');

// 📌 Récupérer toutes les commandes
router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllOrders()");
        res.json(result[0]); // Les résultats des procédures stockées sont dans un tableau
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes." });
    } finally {
        connection.end();
    }
});

// 📌 Récupérer une commande par ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetOrderById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la commande." });
    } finally {
        connection.end();
    }
});

// 📌 Ajouter une commande avec validation
router.post('/', async (req, res) => {
    const { client_id } = req.body;
    if (!client_id || isNaN(client_id)) {
        return res.status(400).json({ error: "ID client valide requis" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL AddOrder(?)", [client_id]);
        res.status(201).json({ message: "Commande ajoutée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la commande." });
    } finally {
        connection.end();
    }
});

// 📌 Mettre à jour une commande avec validation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { client_id } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });
    if (!client_id || isNaN(client_id)) {
        return res.status(400).json({ error: "ID client valide requis" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateOrder(?, ?)", [id, client_id]);
        res.json({ message: "Commande mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la commande." });
    } finally {
        connection.end();
    }
});

// 📌 Supprimer une commande
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL DeleteOrder(?)", [id]);
        res.json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la commande." });
    } finally {
        connection.end();
    }
});

module.exports = router;

