const express = require('express');
const Joi = require('joi');
const { BOOKS, AUTHORS } = require('../DUMMY');
const asyncHandler = require('express-async-handler');
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require('../models/Book');

const router = express.Router();

// the first arg is the route name and the second arg is the route handler

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    res.json(books);
  }),
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @param book id
 * @access public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author');
    if (book) {
      res.status(200).json({ book });
    } else
      res
        .status(404)
        .json({ message: `book with id ${req.params.id} not found!` });
  }),
);

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    return res.status(201).json(result);
  }),
);

/**
 * @desc Delete book by Id
 * @route /api/books/:id
 * @method Delete
 * @access public
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ message: `Book with id ${req.params.id} not found!` });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book has been deleted successfully' });
  }),
);

/**
 * @desc Update a book by Id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    // Validate input
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Update the book
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true },
    );

    res.status(200).json(updatedBook);
  }),
);

module.exports = router;
