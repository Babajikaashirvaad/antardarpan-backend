const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const welcomeRoutes = require('./routes/welcome');
app.use('/api/welcome', welcomeRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Antardarpan Backend is Live!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
