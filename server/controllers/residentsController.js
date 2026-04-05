const db = require('../config/db');

exports.getAllResidents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT r.*, h.household_number, h.street_address, h.purok_zone FROM RESIDENTS r LEFT JOIN HOUSEHOLDS h ON r.household_id = h.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResidentById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT r.*, h.household_number, h.street_address, h.purok_zone FROM RESIDENTS r LEFT JOIN HOUSEHOLDS h ON r.household_id = h.id WHERE r.id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Resident not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createResident = async (req, res) => {
    const { household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO RESIDENTS (household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateResident = async (req, res) => {
    const { household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation } = req.body;
    try {
        await db.query(
            'UPDATE RESIDENTS SET household_id = ?, first_name = ?, last_name = ?, birth_date = ?, gender = ?, civil_status = ?, is_voter = ?, is_pwd = ?, occupation = ? WHERE id = ?',
            [household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation, req.params.id]
        );
        res.json({ message: 'Resident updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteResident = async (req, res) => {
    try {
        await db.query('DELETE FROM RESIDENTS WHERE id = ?', [req.params.id]);
        res.json({ message: 'Resident deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
