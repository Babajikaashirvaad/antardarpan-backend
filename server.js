const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS Globally
app.use(cors());

// Middleware for JSON & URL Encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Antardarpan Backend is Running with CORS Enabled!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Antardarpan backend running on port ${PORT}`);
});
