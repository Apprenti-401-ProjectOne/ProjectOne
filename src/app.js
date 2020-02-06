'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/routes');
const authRouter = require('./routes/authroutes');
const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const { jobRouter } = require('./routes/jobRoutes.js');
const logger = require('./middleware/logger');
const timestamp = require('./middleware/timestamp');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/config/swagger.json');

//Middleware 
app.use(logger);
app.use(timestamp);
app.use(express.json());
app.use(morgan('dev'));

app.use('/docs', express.static('docs'));
app.use(express.static('public'));
app.use(jobRouter);
app.use(authRouter);
app.use(router);
app.use(authRouter);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use(notFound);
app.use(errorHandler);

/** 
 * exports server module with start method
 * @module server
*/
module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on ${port}`)),
};