import { validationResult } from 'express-validator';
import Product from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { PRODUCT_MESSAGES } from '../utils/constants.js';

// desc   Get all products
// route  GET /api/products
// access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
});

// desc   Get product by id
// route  GET /api/products/:id
// access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: PRODUCT_MESSAGES.PRODUCT_NOT_FOUND });
  return res.status(200).json(product);
});

// desc  Create a product
// route POST /api/products
// access Public
const createProduct = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ validationErrors: validationErrors.array() });
  }

  const product = new Product(req.body);
  await product.save();
  return res.status(201).json({ message: PRODUCT_MESSAGES.PRODUCT_CREATED, product });
});

// desc   Update a product
// route  PUT /api/products/:id
// access Private
const updateProduct = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ validationErrors: validationErrors.array() });
  }

  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: PRODUCT_MESSAGES.PRODUCT_NOT_FOUND });

  await Product.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: PRODUCT_MESSAGES.PRODUCT_UPDATED });
});

// desc   Patch a product
// route  PATCH /api/products/:id
// access Private
const patchProduct = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ validationErrors: validationErrors.array() });
  }

  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: PRODUCT_MESSAGES.PRODUCT_NOT_FOUND });

  Object.keys(req.body).forEach((key) => (product[key] = req.body[key]));
  await product.save();
  res.status(200).json(product);
});

// desc   Delete a product
// route  DELETE /api/products/:id
// access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Product.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: PRODUCT_MESSAGES.PRODUCT_NOT_FOUND });
  }
  res.status(200).json({ message: PRODUCT_MESSAGES.PRODUCT_DELETED });
});

// desc   Search for products by name or by description using query parameters
// route  GET /api/products/search?keyword=product
// access Public
const searchProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).send({ message: 'Bad Request. Missing keyword parameter' });
  }

  // Use MongoDB's $or operator to search in both name and description fields
  const query = {
    $or: [
      { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in name
      { description: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in description
    ],
  };

  const products = await Product.find(query);
  if (products.length === 0) {
    return res.status(200).send({ message: 'No products found' });
  }
  return res.status(200).send(products);
});

export { getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct, searchProducts };
