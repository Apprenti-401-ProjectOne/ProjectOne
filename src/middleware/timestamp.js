'use strict';

/** 
 * timestamp middleware function
 * @module timestamp
*/
module.exports = (request, response, next) => {
  console.log(new Date());
  next();
};