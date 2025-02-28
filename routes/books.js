const express = require('express');
const { verifyTokenAndAdmin } = require('../middlewares/verify-token');
const {
  getAllBooks,
  getBookById,
  createNewBook,
  deleteBookById,
  updateBook,
} = require('../controllers/bookController');

const router = express.Router();

// the first arg is the route name and the second arg is the route handler

// api/books
router.route('/').get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

// api/books/:id
router
  .route('/:id')
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBookById);

// Other approach
// router.get('/', getAllBooks);

// router.post('/', verifyTokenAndAdmin, createNewBook);

// router.get('/:id', getBookById);

// router.put('/:id', verifyTokenAndAdmin, updateBook);

// router.delete('/:id', verifyTokenAndAdmin, deleteBookById);

module.exports = router;
