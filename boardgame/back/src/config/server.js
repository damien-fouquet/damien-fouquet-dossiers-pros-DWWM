const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('libsql');

const app = express();
const port = 5000;

const db = new Database('mydb.db');

app.use(cors());
app.use(bodyParser.json());

// Route pour gérer les soumissions de formulaires
app.post('/api/contact', (req, res) => {
    const { nom, email, téléphone, type, message } = req.body;

    db.exec(`
        INSERT INTO contact (nom, email, téléphone, type, message)
        VALUES ('${nom}', '${email}', '${téléphone}', '${type}', '${message}')
    `);

    res.status(201).send({ message: 'Données enregistrées avec succès' });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
