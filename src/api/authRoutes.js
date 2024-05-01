const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Убедитесь, что путь указан правильно

// Здесь добавьте маршруты для аутентификации
router.post('/login', async (req, res) => {
    const { userAddress } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE address = $1', [userAddress]);
        if (rows.length) {
            res.json({ message: 'User authenticated successfully', user: rows[0] });
        } else {
            const newUser = await db.query('INSERT INTO users (address) VALUES ($1) RETURNING *', [userAddress]);
            res.json({ message: 'User registered and authenticated successfully', user: newUser.rows[0] });
        }
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {  // Unique violation
            res.status(409).json({ message: 'Address already exists' });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});


module.exports = router;
