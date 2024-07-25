import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use('/api/products', productRouter);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
