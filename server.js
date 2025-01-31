require('dotenv').config();
const express = require('express');
const initDB = require('./db');

const app = express();
app.use(express.json());

const categoriesRoutes = require('./routes/categories');
const produitsRoutes = require('./routes/produits');
const fournisseursRoutes = require('./routes/fournisseurs');
const clientsRoutes = require('./routes/clients');
const commandesRoutes = require('./routes/commandes');
const lignesCommandeRoutes = require('./routes/lignesCommande');

app.use('/categories', categoriesRoutes);
app.use('/produits', produitsRoutes);
app.use('/fournisseurs', fournisseursRoutes);
app.use('/clients', clientsRoutes);
app.use('/commandes', commandesRoutes);
app.use('/lignes-commande', lignesCommandeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
