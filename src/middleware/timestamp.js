'use strict';

module.exports = (request, response, next) => {
  console.log(new Date());
  next();
};