const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/users');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);

// Serve frontend files (if present)
app.use(express.static(path.join(__dirname, 'frontend')));

// Default route (for frontend)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Respond with 'No Content'
});

// Database Connection
connectDB();

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
