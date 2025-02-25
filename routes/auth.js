const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
  User,
  validateLoginUser,
  validateRegisterUser,
} = require('../models/User');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const router = express.Router();

/**
 * @desc Register new User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: 'This user already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, {
      expiresIn: '4d',
    });
    const result = await user.save();
    const { password, ...rest } = result._doc;
    res.status(201).json({ ...rest, token });
  }),
);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    console.log('user:', user);

    // Single check for both email and password
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, {
      expiresIn: '4d',
    });

    // Remove password from response before sending user data
    const { password, ...rest } = user._doc;
    return res.status(200).json({ ...rest, token });
  }),
);

module.exports = router;
