const express = require('express');
const asyncHandler = require('express-async-handler');
const { verifyTokenAndAdmin } = require('../middlewares/verify-token');
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthorById,
  deleteAuthorById,
} = require('../controllers/authorController');

const router = express.Router();

router.route('/').get(getAllAuthors).post(verifyTokenAndAdmin, createNewAuthor);

router
  .route('/:id')
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthorById)
  .delete(verifyTokenAndAdmin, deleteAuthorById);

// router.get('/', getAllAuthors);

// router.post('/', verifyTokenAndAdmin, createNewAuthor);

// router.get('/:id', getAuthorById);

// router.put('/:id', verifyTokenAndAdmin, updateAuthorById);

// router.delete('/:id', verifyTokenAndAdmin, deleteAuthorById);

module.exports = router;
