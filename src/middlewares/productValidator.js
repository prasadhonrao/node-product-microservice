import { body, param } from 'express-validator';

const validateProductId = param('id')
  .trim()
  .isInt({ min: 1 }) // Ensure the ID is an integer greater than 0
  .withMessage('Invalid product ID. Must be an integer greater than 0.');

const validateProductName = body('name')
  .trim()
  .notEmpty()
  .withMessage('Product name is required and cannot be empty')
  .isString()
  .withMessage('Product name must be a string')
  .isLength({ min: 3, max: 50 })
  .withMessage('Product name must be between 3 and 50 characters')
  .escape()
  .if(
    (value, { req }) =>
      req.method === 'POST' || req.method === 'PUT' || (req.method === 'PATCH' && req.body.name !== undefined)
  );

const validateProductDescription = body('description')
  .trim()
  .notEmpty()
  .withMessage('Product description is required and cannot be empty')
  .isString()
  .withMessage('Product description must be a string')
  .isLength({ min: 10, max: 250 })
  .withMessage('Product description must be between 10 and 250 characters')
  .escape()
  .if(
    (value, { req }) =>
      req.method === 'POST' || req.method === 'PUT' || (req.method === 'PATCH' && req.body.description !== undefined)
  );

const validateProductPrice = body('price')
  .trim()
  .notEmpty()
  .withMessage('Product price is required and cannot be empty')
  .isNumeric()
  .withMessage('Product price must be a number')
  .isFloat({ min: 0.01 })
  .withMessage('Product price must be a positive number')
  .escape()
  .if(
    (value, { req }) =>
      req.method === 'POST' || req.method === 'PUT' || (req.method === 'PATCH' && req.body.price !== undefined)
  );

export { validateProductId, validateProductName, validateProductDescription, validateProductPrice };
