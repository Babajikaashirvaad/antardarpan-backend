const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');  // Import Routes First

dotenv.config();

const app = express();  // Initialize app first
const PORT = process.env.PORT || 8080;

// CORS Handling
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicit Preflight Handling
app.options('*', cors());

app.use(express.json());

// Routes (AFTER app is initialized)
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Antardarpan backend running on port ${PORT}`);
});
