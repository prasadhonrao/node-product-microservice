import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Node Product Microservice!');
});

app.get('/version', (req, res) => {
  res.status(200).send('1.0.0');
});

app.get('/api/products', (req, res) => {
  res.status(200).send(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
