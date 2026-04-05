const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, role, full_name FROM USERS');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, role, full_name FROM USERS WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
