const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car_wash_db' // Replace with your actual database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// POST route to save booking data
app.post('/save-booking', (req, res) => {
    const { serviceType, clientName, agentName, price, date } = req.body;

    const query = "INSERT INTO bookings (serviceType, clientName, agentName, price, date) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [serviceType, clientName, agentName, price, date], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Database error');
        } else {
            res.status(200).send('Booking saved successfully');
        }
    });
});

// GET route to fetch all bookings
app.get('/bookings', (req, res) => {
    const query = "SELECT * FROM bookings";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Database error');
        } else {
            res.status(200).json(results);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
