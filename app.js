require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const { auth, courses } = require('./routes/routes');

const app = express();
//Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/courses', courses);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
