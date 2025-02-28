const { books, authors } = require('./data');
const { Book } = require('./models/Book');
const { Author } = require('./models/Author');
const connectToDB = require('./config/db');

// Connection to DB
connectToDB();

// Import Books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('Books have been imported successfully');
    process.exit(0);
  } catch (error) {
    console.log('error: ', error);
    process.exit(1);
  }
};

// Import Authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log('Authors have been imported successfully');
    process.exit(0);
  } catch (error) {
    console.log('error: ', error);
    process.exit(1);
  }
};

// Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('Books have been removed successfully');
  } catch (error) {
    console.log('error: ', error);
    process.exit(1);
  }
};

// Remove Books
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log('Authors have been removed successfully');
  } catch (error) {
    console.log('error: ', error);
    process.exit(1);
  }
};

(async () => {
  if (process.argv[2] === '-import-books') {
    await importBooks();
  } else if (process.argv[2] === '-import-authors') {
    await importAuthors();
  } else if (process.argv[2] === '-remove-books') {
    await removeBooks();
  } else if (process.argv[2] === '-remove-authors') {
    await removeAuthors();
  }
  process.exit(0);
})().catch(error => {
  console.error('error: ', error);
  process.exit(1);
});
