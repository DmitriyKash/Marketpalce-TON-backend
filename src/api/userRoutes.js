const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Убедитесь, что путь указан правильно

// Здесь добавьте маршруты для управления профилями пользователей
router.get('/profile', async (req, res) => {
    const { userId } = req.query; // Идентификатор пользователя получаем из запроса

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (rows.length) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/profile', async (req, res) => {
    const { userId, name, email } = req.body; // Предполагаем, что в теле запроса передаются новые данные пользователя

    try {
        const { rows } = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, userId]);
        res.json({ message: 'Profile updated successfully', user: rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/history', async (req, res) => {
    const { userId } = req.query; // Идентификатор пользователя

    try {
        const { rows } = await db.query('SELECT * FROM purchases WHERE user_id = $1', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
