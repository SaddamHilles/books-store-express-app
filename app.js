const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');
const authPath = require('./routes/auth');
const usersPath = require('./routes/users');
const logger = require('./middlewares/logger');
const { errorHandler, notFound } = require('./middlewares/errors');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongodb...'))
  .catch(error => console.log('Connection Field to mongodb!', error));

const app = express();

// Apply Middleware for response json
app.use(express.json());

app.use(logger);

// Routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);
app.use('/api/auth', authPath);
app.use('/api/users', usersPath);

// Error handle middleware
app.use(notFound);
app.use(errorHandler);

// Running the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
