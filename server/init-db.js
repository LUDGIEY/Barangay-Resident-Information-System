const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        multipleStatements: true
    });

    try {
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await connection.query(schema);
        console.log('Database initialized successfully.');

        if (fs.existsSync(path.join(__dirname, 'seed.sql'))) {
            const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
            await connection.query(seed);
            console.log('Database seeded successfully.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await connection.end();
    }
}

initDB();
