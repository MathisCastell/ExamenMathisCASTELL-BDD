const express = require('express');
const router = express.Router();
const initDB = require('../db');

// 📌 Récupérer toutes les lignes de commande
router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllOrderLines()");
        res.json(result[0]); // Les résultats des procédures stockées sont dans un tableau
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des lignes de commande." });
    } finally {
        connection.end();
    }
});

// 📌 Récupérer une ligne de commande par ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetOrderLineById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la ligne de commande." });
    } finally {
        connection.end();
    }
});

// 📌 Ajouter une ligne de commande avec vérification du stock
router.post('/', async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    if (!commande_id || !produit_id || quantite == null || prix_unitaire == null) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    if (quantite <= 0 || prix_unitaire < 0) {
        return res.status(400).json({ error: "Quantité et prix unitaire doivent être positifs" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL AddOrderLine(?, ?, ?, ?)", [commande_id, produit_id, quantite, prix_unitaire]);
        res.status(201).json({ message: "Ligne de commande ajoutée avec succès" });
    } catch (error) {
        if (error.sqlState === '45000') {
            res.status(400).json({ error: "Stock insuffisant pour ce produit." });
        } else {
            res.status(500).json({ error: "Erreur lors de l'ajout de la ligne de commande." });
        }
    } finally {
        connection.end();
    }
});

// 📌 Mettre à jour une ligne de commande avec validation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });
    if (!commande_id || !produit_id || quantite == null || prix_unitaire == null) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    if (quantite <= 0 || prix_unitaire < 0) {
        return res.status(400).json({ error: "Quantité et prix unitaire doivent être positifs" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateOrderLine(?, ?, ?, ?, ?)", [id, commande_id, produit_id, quantite, prix_unitaire]);
        res.json({ message: "Ligne de commande mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la ligne de commande." });
    } finally {
        connection.end();
    }
});

// 📌 Supprimer une ligne de commande
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL DeleteOrderLine(?)", [id]);
        res.json({ message: "Ligne de commande supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la ligne de commande." });
    } finally {
        connection.end();
    }
});

module.exports = router;
