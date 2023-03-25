const mongoose = require('mongoose');
const connectDB = (uri) => {
  try {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log('Connected to the database'));
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
