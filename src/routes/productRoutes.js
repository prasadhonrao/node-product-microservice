import express from 'express';
import products from '../data/products.js';
import { validationResult } from 'express-validator';

import {
  validateProductId,
  validateProductName,
  validateProductDescription,
  validateProductPrice,
} from '../middlewares/productValidator.js';

const productRouter = express.Router();

// desc   Get all products
// route  GET /api/products
// access Public
productRouter.get('/', (req, res) => {
  return res.status(200).send(products);
});

// desc   Search for products by name or by description using query parameters
// route  GET /api/products/search?keyword=product
// access Public
productRouter.get('/search', (req, res) => {
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
productRouter.get('/:id', validateProductId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
productRouter.post('/', validateProductName, validateProductDescription, validateProductPrice, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price } = req.body;

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
productRouter.put(
  '/:id',
  validateProductId,
  validateProductName,
  validateProductDescription,
  validateProductPrice,
  (req, res) => {
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
  }
);

// desc   Patch a product by ID
// route  PATCH /api/products/:id
// access Public
productRouter.patch('/:id', validateProductId, (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Bad Request. No product data provided.' });
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

// desc   Delete a product by ID
// route  DELETE /api/products/:id
// access Public
productRouter.delete('/:id', validateProductId, (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const index = products.indexOf(product);
  products.splice(index, 1);

  return res.status(200).send('Product deleted');
});

export default productRouter;
