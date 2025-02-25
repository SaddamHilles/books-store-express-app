const mongoose = require('mongoose');
const Joi = require('joi');

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ['soft cover', 'hard cover'],
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model('Book', BookSchema);

// Validation create book
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    description: Joi.string().trim().min(5).required(),
    author: Joi.string().required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid('soft cover', 'hard cover').required(),
  });

  return schema.validate(obj);
}

// Validation update book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    description: Joi.string().trim().min(5),
    author: Joi.string(),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', 'hard cover'),
  }); // Ensure at least one field is provided

  return schema.validate(obj);
}

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
