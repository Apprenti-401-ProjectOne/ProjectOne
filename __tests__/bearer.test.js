const bearer = require('../src/authmiddleware/bearer');


const reqMalFormed = {
  headers: {
    authorization: 'asdfasdfasdf',
  },
};

const reqFormed = {
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM2I0MDhjNjFhZjE2NTc1MTU5ZDQzMiIsInVzZXJuYW1lIjoicmFoIiwiZW1haWwiOiJkanZsb2VkbWFuQGdtYWlsLmNvbSIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sImlhdCI6MTU4MDk0MTQ1MiwiZXhwIjoxNTgwOTQyMzUyfQ.qQdEDDqFE0HHMsYf6zd5EWy6ufdLONHZd5MDiUxcQjI',
  },
};




describe('Testing bearer Auth', ()=>{
  
  const next = function(error){
    return error;
  };
  it('should reject a malformed token', ()=>{
    try {
      bearer(reqMalFormed, {}, next);
    }catch(error){
      expect(error.message).toBe('jwt malformed');
    }    
  });  
  it('should reject a correctly formed, but invalid token', ()=>{
    bearer(reqFormed, {}, next);
    function next(error){
      expect(error).toBe('');
    }

    
  });



});


