'use strict';

require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const app = new express();

const router = require('./routes/routes');
const authRouter = require('./routes/authroutes');

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');

app.use(express.json());

app.use(morgan('dev'));


app.use(express.static('public'));
app.use(router);
app.use(authRouter);
app.use(notFound);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('hello world, it is a beautiful day');
});

module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on ${port}`)),
};