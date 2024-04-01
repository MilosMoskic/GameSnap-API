require('dotenv').config();
require('express-async-errors'); //errori u postmanu
const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');
const autheticateUser = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json()); // koristi se za podatke koje sa salju bodyu

// routers
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', autheticateUser, postsRouter);
app.use('/api/v1/users', autheticateUser, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();