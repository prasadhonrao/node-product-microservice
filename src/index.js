import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to Node Product Microservice!');
});

app.get('/version', (req, res) => {
  return res.status(200).send('1.0.0');
});

app.get('/api/products', (req, res) => {
  return res.status(200).send(products);
});

app.get('/api/products/:id', (req, res) => {
  // Check if the id is a number
  if (isNaN(req.params.id)) {
    return res.status(400).send({ message: 'Bad Request. Invalid product ID' });
  }
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    return res.status(200).send(product);
  } else {
    return res.status(404).send({ message: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
