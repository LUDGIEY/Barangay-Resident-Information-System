const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Barangay Resident Information System API" });
});

// Import and use routes
const residentRoutes = require('./routes/residents');
const householdRoutes = require('./routes/households');
const certificateRoutes = require('./routes/certificates');
const blotterRoutes = require('./routes/blotter');
const userRoutes = require('./routes/users');
app.use('/api/residents', residentRoutes);
app.use('/api/households', householdRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/blotter', blotterRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
