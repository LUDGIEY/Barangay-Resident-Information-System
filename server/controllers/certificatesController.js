const db = require('../config/db');

exports.getAllCertificates = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, r.first_name, r.last_name, u.full_name as issued_by 
            FROM CERTIFICATES c 
            JOIN RESIDENTS r ON c.resident_id = r.id 
            JOIN USERS u ON c.issued_by_user_id = u.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCertificateById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM CERTIFICATES WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Certificate not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCertificate = async (req, res) => {
    const { resident_id, issued_by_user_id, cert_type, purpose, control_number } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO CERTIFICATES (resident_id, issued_by_user_id, cert_type, purpose, control_number) VALUES (?, ?, ?, ?, ?)',
            [resident_id, issued_by_user_id, cert_type, purpose, control_number]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCertificate = async (req, res) => {
    const { resident_id, issued_by_user_id, cert_type, purpose, control_number } = req.body;
    try {
        await db.query(
            'UPDATE CERTIFICATES SET resident_id = ?, issued_by_user_id = ?, cert_type = ?, purpose = ?, control_number = ? WHERE id = ?',
            [resident_id, issued_by_user_id, cert_type, purpose, control_number, req.params.id]
        );
        res.json({ message: 'Certificate updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCertificate = async (req, res) => {
    try {
        await db.query('DELETE FROM CERTIFICATES WHERE id = ?', [req.params.id]);
        res.json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
