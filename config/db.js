const mongoose = require('mongoose');
require('dotenv').config();
function connectToDB() {
  try {
    console.log('process.env.MONGO_URI: ', process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb...');
  } catch (error) {
    console.log('Connection Field to mongodb!', error);
  }
}
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to mongodb...'))
//   .catch(error => console.log('Connection Field to mongodb!', error));

module.exports = connectToDB;
