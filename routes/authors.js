const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  Author,
  validateUpdateAuthor,
  validateCreateAuthor,
} = require('../models/Author');
const { verifyTokenAndAdmin } = require('../middlewares/verify-token');

const router = express.Router();

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const authors = await Author.find()
      .sort({
        firstName: 1,
      })
      .select('firstName lastName nationality image createdAt');
    res.status(200).json(authors);
  }),
);

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @param author id
 * @access public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (author) {
      res.status(200).json(author);
    } else {
      res
        .status(404)
        .json({ message: `Author with id ${req.params.id} not found!` });
    }
  }),
);

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
router.post(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();
    res.status(201).json({
      message: 'Author has been created successfully',
      result,
    });
  }),
);

/**
 * @desc Update an author by Id
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    // Validate request body
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find and update the author
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update fields dynamically
      { new: true, runValidators: true }, // Return updated document and validate input
    );

    console.log('updatedAuthor: ', updatedAuthor);
    // Check if author exists
    if (!updatedAuthor) {
      return res
        .status(404)
        .json({ message: `Author with id ${req.params.id} not found!` });
    }

    res.status(200).json({
      message: 'Author has been updated successfully',
      author: updatedAuthor,
    });
  }),
);

/**
 * @desc Delete author by Id
 * @route /api/authors/:id
 * @method Delete
 * @access private (only admin)
 */
router.delete(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if the author exists before attempting deletion
    const author = await Author.findById(id);
    if (!author) {
      return res
        .status(404)
        .json({ message: `Author with id ${id} not found!` });
    }

    // Delete the author
    await author.deleteOne();

    res.status(200).json({
      message: 'Author has been deleted successfully',
      deletedAuthor: author, // Optionally return the deleted author
    });
  }),
);

module.exports = router;
