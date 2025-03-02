const expressAsyncHandler = require('express-async-handler');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/**
 * @desc Get Forgot Password Views
 * @route /password/forgot-password
 * @method GET
 * @access public
 */

exports.getForgotPasswordView = expressAsyncHandler((req, res) => {
  res.render('forgot-password');
});

/**
 * @desc Sned Forgot Password Link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */

exports.sendForgotPasswordLink = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: 'User not Found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: '10m',
  });

  const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;

  // res.json({ message: 'Click on the link', resetPasswordLink: link });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: 'Reset Password',
    html: `<div>
      <h4>Click on the link bellow to reset the password</h4>
      <p>${link}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log(`Email sent: ${success.response}`);
    }
  });

  res.render('link-send');
});

/**
 * @desc Get Reset Password View
 * @route /password/reset-password/:userId/:token
 * @method GET
 * @access public
 */
exports.getResetPasswordView = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not Found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);
    res.render('reset-password', { email: user.email });
  } catch (error) {
    console.log('error: ', error);
    res.json({ message: error });
  }
});

/**
 * @desc Get The Password
 * @route /password/reset-password/:userId/:token
 * @method POST
 * @access public
 */
exports.resetThePassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not Found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);
    // const salt = await bcrypt.getSalt(10);
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.render('success-password');
  } catch (error) {
    console.log('error: ', error);
    res.json({ message: error });
  }
});
