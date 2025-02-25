const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    image: {
      type: String,
      default: 'default-avatar.png',
    },
  },
  {
    timestamps: true,
  },
);

const Author = mongoose.model('Author', AuthorSchema);

// Validation create author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).required(),
    lastName: Joi.string().trim().min(3).max(50).required(),
    nationality: Joi.string().trim().min(2).max(100).required(),
    image: Joi.string().trim().optional(),
  });

  return schema.validate(obj);
}

// Validation update author
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).optional(),
    lastName: Joi.string().trim().min(3).max(50).optional(),
    nationality: Joi.string().trim().min(2).max(100).optional(),
    image: Joi.string().trim().optional(),
  });

  return schema.validate(obj);
}

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
