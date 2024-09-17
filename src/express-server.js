const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db'
});

app.use(express.json());

app.post('/getUser', (req, res) => {
    const userId = req.body.userId;

    // Vulnerable SQL query with unsanitized user input
    const query = `SELECT * FROM users WHERE id = '${userId}'`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        res.status(200).json(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
