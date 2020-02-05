const Job = require('../src/model/job');


describe('Testing the job schema', ()=> {
  it('should create a new instance of a schema with properties', ()=>{
    const job = new Job();
    expect(job).toBeDefined();
  });
});