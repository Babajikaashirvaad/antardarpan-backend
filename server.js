import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*', // Allow ALL origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Antardarpan backend running on port ${PORT}`);
});
