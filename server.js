const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Antardarpan backend running on port ${PORT}`);
});
