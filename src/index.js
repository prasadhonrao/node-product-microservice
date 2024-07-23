import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json()); // Used to parse JSON bodies

// desc   Get the root API
// route  GET /
// access Public
app.get('/', (req, res) => {
  return res.status(200).send('Welcome to Node Product Microservice!');
});

// desc   Get API version
// route  GET /api/version
// access Public
app.get('/version', (req, res) => {
  return res.status(200).send('1.0.0');
});

// desc   Get all products
// route  GET /api/products
// access Public
app.get('/api/products', (req, res) => {
  return res.status(200).send(products);
});

// desc   Search for products by name or by description using query parameters
// route  GET /api/products/search?keyword=product
// access Public
app.get('/api/products/search', (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).send({ message: 'Bad Request. Missing keyword parameter' });
  }
  const results = products.filter((p) => p.name.includes(keyword) || p.description.includes(keyword));
  if (results.length === 0) {
    return res.status(200).send({ message: 'No products found' });
  }
  return res.status(200).send(results);
});

// desc   Get a product by ID
// route  GET /api/products/:id
// access Public
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

// desc  Create a product
// route POST /api/products
// access Public
app.post('/api/products', (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Bad Request. No product data' });
  }

  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    return res.status(400).send({ message: 'Bad Request. Missing required fields' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
  };

  products.push(newProduct);
  console.log(products);
  return res.status(201).send('Product created');
});

// desc   Update a product by ID
// route  PUT /api/products/:id
// access Public
app.put('/api/products/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Bad Request. No product data provided.' });
  }

  if (isNaN(req.params.id)) {
    return res.status(400).send({ message: 'Bad Request. Invalid product ID' });
  }

  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const { name, description, price } = req.body;

  if (!name) return res.status(400).send({ message: 'Bad Request. Please provide product name' });
  if (!description) return res.status(400).send({ message: 'Bad Request. Please provide product description' });
  if (!price) return res.status(400).send({ message: 'Bad Request. Please provide product price' });

  product.name = name;
  product.description = description;
  product.price = price;

  return res.status(200).send('Product updated');
});

// desc   Patch a product by ID
// route  PATCH /api/products/:id
// access Public
app.patch('/api/products/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Bad Request. No product data provided.' });
  }

  if (isNaN(req.params.id)) {
    return res.status(400).send({ message: 'Bad Request. Invalid product ID' });
  }

  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const { name, description, price } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;

  return res.status(200).send('Product patched');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
