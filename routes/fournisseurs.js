const express = require('express');
const router = express.Router();
const initDB = require('../db');

// 📌 Récupérer tous les fournisseurs
router.get('/', async (req, res) => {
    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetAllFournisseurs()");
        res.json(result[0]); // Les résultats des procédures stockées sont dans un tableau
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des fournisseurs." });
    } finally {
        connection.end();
    }
});

// 📌 Récupérer un fournisseur par ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        const [result] = await connection.query("CALL GetFournisseurById(?)", [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du fournisseur." });
    } finally {
        connection.end();
    }
});

// 📌 Ajouter un fournisseur avec validation des entrées
router.post('/', async (req, res) => {
    const { nom, contact } = req.body;
    if (!nom || !contact) {
        return res.status(400).json({ error: "Nom et contact sont requis" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL AddFournisseur(?, ?)", [nom, contact]);
        res.status(201).json({ message: "Fournisseur ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du fournisseur." });
    } finally {
        connection.end();
    }
});

// 📌 Mettre à jour un fournisseur avec validation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, contact } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });
    if (!nom || !contact) {
        return res.status(400).json({ error: "Nom et contact sont requis" });
    }

    const connection = await initDB();
    try {
        await connection.query("CALL UpdateFournisseur(?, ?, ?)", [id, nom, contact]);
        res.json({ message: "Fournisseur mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du fournisseur." });
    } finally {
        connection.end();
    }
});

// 📌 Supprimer un fournisseur
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ error: "ID valide requis" });

    const connection = await initDB();
    try {
        await connection.query("CALL DeleteFournisseur(?)", [id]);
        res.json({ message: "Fournisseur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du fournisseur." });
    } finally {
        connection.end();
    }
});

module.exports = router;
