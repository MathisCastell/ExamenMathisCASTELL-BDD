const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '00700700',
    database: 'stock_management', 
    multipleStatements: true
};

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
