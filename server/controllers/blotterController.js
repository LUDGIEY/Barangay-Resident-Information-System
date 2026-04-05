const db = require('../config/db');

exports.getAllBlotters = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT b.*, 
                   CONCAT(c.first_name, ' ', c.last_name) as complainant_name, 
                   CONCAT(r.first_name, ' ', r.last_name) as respondent_name
            FROM BLOTTER_RECORDS b
            LEFT JOIN RESIDENTS c ON b.complainant_id = c.id
            LEFT JOIN RESIDENTS r ON b.respondent_id = r.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlotterById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM BLOTTER_RECORDS WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Blotter record not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBlotter = async (req, res) => {
    const { complainant_id, respondent_id, incident_type, incident_date, status, narrative } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO BLOTTER_RECORDS (complainant_id, respondent_id, incident_type, incident_date, status, narrative) VALUES (?, ?, ?, ?, ?, ?)',
            [complainant_id, respondent_id, incident_type, incident_date, status, narrative]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBlotter = async (req, res) => {
    const { complainant_id, respondent_id, incident_type, incident_date, status, narrative } = req.body;
    try {
        await db.query(
            'UPDATE BLOTTER_RECORDS SET complainant_id = ?, respondent_id = ?, incident_type = ?, incident_date = ?, status = ?, narrative = ? WHERE id = ?',
            [complainant_id, respondent_id, incident_type, incident_date, status, narrative, req.params.id]
        );
        res.json({ message: 'Blotter record updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBlotter = async (req, res) => {
    try {
        await db.query('DELETE FROM BLOTTER_RECORDS WHERE id = ?', [req.params.id]);
        res.json({ message: 'Blotter record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
