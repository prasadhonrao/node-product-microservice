import express from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  searchProducts,
} from '../controllers/productController.js';

import { validateMongoObjectId } from '../middlewares/mongoObjectIdValidator.js';
import {
  validateProductName,
  validateProductDescription,
  validateProductPrice,
} from '../middlewares/productValidator.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/search', searchProducts);
productRouter.get('/:id', validateMongoObjectId, getProductById);
productRouter.post('/', validateProductName, validateProductDescription, validateProductPrice, createProduct);
productRouter.put(
  '/:id',
  validateMongoObjectId,
  validateProductName,
  validateProductDescription,
  validateProductPrice,
  updateProduct
);
productRouter.patch('/:id', validateMongoObjectId, patchProduct);
productRouter.delete('/:id', validateMongoObjectId, deleteProduct);

export default productRouter;
