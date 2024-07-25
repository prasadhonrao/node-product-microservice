import mongoose from 'mongoose';

const validateMongoObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' });
  }
  next();
};

export { validateMongoObjectId };
