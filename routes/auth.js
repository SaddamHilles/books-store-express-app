const express = require('express');
const dotenv = require('dotenv');
const { registerNewUser, login } = require('../controllers/authController');

dotenv.config();

const router = express.Router();

router.post('/register', registerNewUser);

router.post('/login', login);

module.exports = router;
