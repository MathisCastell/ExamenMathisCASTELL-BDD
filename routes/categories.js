const express = require('express');
const router = express.Router();
const initDB = require('../db');

router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllCategories()");
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des catégories." });
    } finally {
        connection.end();
    }
});

router.get('/id', async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetCategoryById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la catégorie." });
    } finally {
        connection.end();
    }
});

router.post('/', async (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: "Nom requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL AddCategory(?)", [nom]);
        res.status(201).json({ message: "Catégorie ajoutée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
    } finally {
        connection.end();
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: "Nom requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateCategory(?, ?)", [id, nom]);
        res.json({ message: "Catégorie mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la catégorie." });
    } finally {
        connection.end();
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await initDB();
    try {
        await connection.query("CALL DeleteCategory(?)", [id]);
        res.json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la catégorie." });
    } finally {
        connection.end();
    }
});

module.exports = router;
