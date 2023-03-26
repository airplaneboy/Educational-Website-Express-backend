require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./database/db');
const { auth, courses } = require('./routes/routes');
const ErrorHandler = require('./middlewares/error-handler');

const app = express();
//Middlewares
app.use(express.json());
//Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/courses', courses);
//Error Handler
app.use(ErrorHandler);

//Start Function
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
