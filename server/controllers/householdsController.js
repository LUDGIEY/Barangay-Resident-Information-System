const db = require('../config/db');

exports.getAllHouseholds = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM HOUSEHOLDS');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHouseholdById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM HOUSEHOLDS WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Household not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createHousehold = async (req, res) => {
    const { household_number, street_address, purok_zone, latitude, longitude } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO HOUSEHOLDS (household_number, street_address, purok_zone, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
            [household_number, street_address, purok_zone, latitude, longitude]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateHousehold = async (req, res) => {
    const { household_number, street_address, purok_zone, latitude, longitude } = req.body;
    try {
        await db.query(
            'UPDATE HOUSEHOLDS SET household_number = ?, street_address = ?, purok_zone = ?, latitude = ?, longitude = ? WHERE id = ?',
            [household_number, street_address, purok_zone, latitude, longitude, req.params.id]
        );
        res.json({ message: 'Household updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteHousehold = async (req, res) => {
    try {
        await db.query('DELETE FROM HOUSEHOLDS WHERE id = ?', [req.params.id]);
        res.json({ message: 'Household deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
