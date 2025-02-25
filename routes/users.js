const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../models/User');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verify-token');
const router = express.Router();

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put(
  '/:id',
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // 🚀 Prevent Duplicate Email Update
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
    }

    // 🚀 Hash Password Only If It’s Provided and Not Empty
    if (req.body.password && req.body.password.trim()) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } else {
      delete req.body.password; // Ensure the password field is not set to an empty string
    }

    // 🚀 Update User
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    ).select('-password'); // Exclude password from response

    res.status(200).json(updatedUser);
  }),
);

/**
 * @desc Get all Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
router.get(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  }),
);

/**
 * @desc Get User by id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin and user himself)
 */
router.get(
  '/:id',
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not Found!' });
    }
  }),
);

/**
 * @desc delete User by id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin and user himself)
 */
router.delete(
  '/:id',
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not exist!' });
    }
    await user.deleteOne();
    res.status(200).json({ message: 'User has been deleted successfully' });
  }),
);

module.exports = router;
