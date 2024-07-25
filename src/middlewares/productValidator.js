import { body } from 'express-validator';

const validateProductName = body('name')
  .trim()
  .notEmpty()
  .withMessage('Product name is required and cannot be empty')
  .isString()
  .withMessage('Product name must be a string')
  .isLength({ min: 3, max: 50 })
  .withMessage('Product name must be between 3 and 50 characters')
  .escape();

const validateProductDescription = body('description')
  .trim()
  .notEmpty()
  .withMessage('Product description is required and cannot be empty')
  .isString()
  .withMessage('Product description must be a string')
  .isLength({ min: 10, max: 250 })
  .withMessage('Product description must be between 10 and 250 characters')
  .escape();

const validateProductPrice = body('price')
  .trim()
  .notEmpty()
  .withMessage('Product price is required and cannot be empty')
  .isNumeric()
  .withMessage('Product price must be a number')
  .isFloat({ min: 0.01 })
  .withMessage('Product price must be a positive number')
  .escape();

export { validateProductName, validateProductDescription, validateProductPrice };
