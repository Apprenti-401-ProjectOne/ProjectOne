'use strict';

const express = require('express');
const app = new express();

const router = require('./routes/routes');
const authRouter = require('./routes/authroutes');
require('dotenv').config();

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');

app.use(express.json());

app.use(router);
app.use(notFound);
app.use(errorHandler);

// app.use(authRouter);

app.get('/', (req, res) => {
  res.send('hello world, it is a beautiful day');
});

module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on ${port}`)),
};