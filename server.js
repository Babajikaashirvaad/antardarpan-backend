const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Antardarpan API is running...');
});

app.listen(PORT, () => {
  console.log(`Antardarpan backend running on port ${PORT}`);
});
