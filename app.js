var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var app = express();

app.use(logger('dev'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  auto_reconnect: true,
  keepAlive: true,
});

mongoose.connection.on('error', () => {
  console.log('Could not connect to MongoDB.');
});

mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection.');
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongodb.');
});
  // parse json request body
  app.use(express.json({ limit: '50mb' }));

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));

app.use(cookieParser());
 
app.get('/', (req, res) => res.send("Todo API"))
app.use('/api/v1/auth', require('./routes/auth/authRouter'));
app.use('/api/v1/user', require('./routes/user/UserRouter'));
app.use('/api/v1/todo', require('./routes/todo/TodoRouter'));

// catch 404 and forward to error handler
app.use(function( req, res) {

//  console.log(err)
  res.status(404).send({
    code: 404,
    message: 'not found',
    errors:res.errors,
  });
});


module.exports = app;
