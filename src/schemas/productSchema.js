import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Product name must be between 3 and 50 characters'],
    maxlength: [50, 'Product name must be between 3 and 50 characters'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [10, 'Product description must be between 10 and 250 characters'],
    maxlength: [250, 'Product description must be between 10 and 250 characters'],
  },
  price: {
    type: Number,
    required: true,
    min: [1, 'Price must be greater than 0'],
  },
});

export default productSchema;
