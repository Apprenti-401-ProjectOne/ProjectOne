'use strict';

/** 
 * @param capability
 * @module access-control
*/
module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if(req.user.userRoles.capabilities.includes(capability)){
        next();
      }
      else{
        next('Access Denied');
      }
    }
    catch(error){
      next('Invalid Login');
    }
  };
};