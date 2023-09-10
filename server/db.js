const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

// MySQL Connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'replace with your password',
    database: 'replace with your database',
});

// API endpoint για να εισάγουμε δεδομένα στον πίνακα search history
app.post('/api/insert-data', function (req, res) {

    const userId = req.body.userId;
    const value = req.body.searchKey;
    const qry = `INSERT INTO search_history(user_id, value) VALUES(?,?)`;

    pool.getConnection( (err, conn) => {
        conn.query(qry, [userId, value], (err, result) => {
            conn.release();
            if (err) {
                console.error(err);
                res.status(500).send('Error inserting data');
            } else {
                console.log(result);
                res.status(200).send('Data inserted successfully');
            }
        });
    });
})

// API endpoint για να πάρουμε τα δεδομένα από το search history
app.get('/api/get-history', function (req, res) {
    const userId = req.query.userId;
    const distinct = req.query.isDistinct === 'true'; // Ελέγχουμε αν μας δίνεται η distinct parameter και την ορίζουμε true

    let qry;

    if (distinct) {
        qry = `SELECT DISTINCT value FROM users.search_history WHERE user_id = ?;`;
    } else {
        qry = `SELECT value FROM users.search_history WHERE user_id = ? ORDER BY id DESC ;`;
    }

    pool.getConnection( (err, conn) => {
        conn.query(qry, [userId], (err, result) => {
            conn.release();
            if (err) {
                console.error(err);
                res.status(500).send('Error getting data');
            } else {
                console.log(result);
                res.status(200).json(result); // Στέλνουμε τα αποτελέσματα του query σαν JSON
            }
        });
    });
});

// API endpoint για διαγραφή όλων των εγγραφών του χρήστη
app.delete('/api/delete-users-history', (req, res) => {
    const userId = req.query.userId;
    const qry = 'DELETE FROM users.search_history WHERE user_id = ?;';

    pool.getConnection( (err, conn) => {
        conn.query(qry, [userId], (err, result) => {
            conn.release();
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting records');
            } else {
                console.log(result);
                res.status(200).send('All records deleted successfully');
            }
        });
    });
});

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});