'use strict';

const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'CanU Job Postings',
      description: 'Application to post and bid on user created jobs',
      version: '1.0.0',
      servers: ['https://https://can-u.herokuapp.com'],
    },
    host: 'https://https://can-u.herokuapp.com',
    basePath: '/',
  },
  apis: [__dirname + 'routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);