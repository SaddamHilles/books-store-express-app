const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const { errorHandler, notFound } = require('./middlewares/errors');
const connectToDB = require('./config/db');

dotenv.config();

// Connection to DB
connectToDB();

const app = express();

// Apply Middleware for response json
app.use(express.json());

app.use(logger);

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

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
