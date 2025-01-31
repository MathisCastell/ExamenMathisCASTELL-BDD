const express = require('express');
const router = express.Router();
const initDB = require('../db');

// 📌 Récupérer tous les produits
router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllProducts()");
        res.json(result[0]); // Les résultats des procédures stockées sont dans un tableau
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits." });
    } finally {
        connection.end();
    }
});

// 📌 Récupérer un produit par ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetProductById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du produit." });
    } finally {
        connection.end();
    }
});

// 📌 Ajouter un produit avec validation des entrées
router.post('/', async (req, res) => {
    const { nom, prix, quantite, categorie_id } = req.body;
    if (!nom || prix == null || quantite == null || !categorie_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    if (prix < 0 || quantite < 0) {
        return res.status(400).json({ error: "Prix et quantité doivent être positifs" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL AddProduct(?, ?, ?, ?)", [nom, prix, quantite, categorie_id]);
        res.status(201).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du produit." });
    } finally {
        connection.end();
    }
});

// 📌 Mettre à jour un produit avec validation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prix, quantite, categorie_id } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });
    if (!nom || prix == null || quantite == null || !categorie_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    if (prix < 0 || quantite < 0) {
        return res.status(400).json({ error: "Prix et quantité doivent être positifs" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateProduct(?, ?, ?, ?, ?)", [id, nom, prix, quantite, categorie_id]);
        res.json({ message: "Produit mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit." });
    } finally {
        connection.end();
    }
});

// 📌 Supprimer un produit (bloqué si référencé dans une commande)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL DeleteProduct(?)", [id]);
        res.json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit. Vérifiez s'il est référencé dans une commande." });
    } finally {
        connection.end();
    }
});

module.exports = router;
