const expressAsyncHandler = require('express-async-handler');
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require('../models/Book');
const asyncHandler = require('express-async-handler');

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks = expressAsyncHandler(async (req, res) => {
  // Extract minPrice and maxPrice from query params
  let { minPrice, maxPrice } = req.query;

  // Convert to numbers and set default values if necessary
  minPrice = minPrice ? parseFloat(minPrice) : 0;
  maxPrice = maxPrice ? parseFloat(maxPrice) : Infinity;

  // Build the query filter
  const priceFilter = {
    price: { $gte: minPrice, $lte: maxPrice },
  };

  // Fetch books within the price range
  const books = await Book.find(priceFilter).populate('author', [
    '_id',
    'firstName',
    'lastName',
  ]);

  res.json(books);
});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @param book id
 * @access public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (book) {
    res.status(200).json({ book });
  } else
    res
      .status(404)
      .json({ message: `book with id ${req.params.id} not found!` });
});

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
const createNewBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc Delete book by Id
 * @route /api/books/:id
 * @method Delete
 * @access private (only admin)
 */
const deleteBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res
      .status(404)
      .json({ message: `Book with id ${req.params.id} not found!` });
  }
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Book has been deleted successfully' });
});

/**
 * @desc Update a book by Id
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
const updateBook = asyncHandler(async (req, res) => {
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
});

module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  deleteBookById,
  updateBook,
};
