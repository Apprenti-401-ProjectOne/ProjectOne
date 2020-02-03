'use strict';

const express = require('express');
const app = new express();

const router = require('./routes/routes');
const authRouter = require('./routes/authroutes');



require('dotenv').config();
app.use(router);
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('hello world, I hate you');
    });

app.listen(process.env.PORT), () => {
    console.log(`Listening on ${process.env.PORT}...`);
};