const mailer = require('../src/middleware/email');


describe('Testing the notification mailer', ()=>{
  it('should craft a welcome email template ', ()=>{
    expect(mailer.welcomeTemplate('David')).toBe('Welcome to CañU, David!');
  });

  it('should craft a job created template ', () => {
    expect(mailer.newJobTemplate('David', 'David')).toBe(
      'Hello, David, this is confirmation of your job: David.');
  });

  it('should craft options for a welcome email', ()=>{
    const obj = {
      from: 'canuproject@gmail.com',
      to: 'david',
      subject: 'Welcome to CañU!',
      text: 'Welcome to CañU, David!',
    };
    const  result = mailer.welcomeOptions({username: 'David', email: 'david'});
    Object.keys(obj).forEach(key => {      
      expect(result[key]).toEqual(obj[key]);
    });
  });

  it('should craft options for a job creation email', () => {
    const obj = {
      from: 'canuproject@gmail.com',
      to: 'david',
      subject: 'Your CañU job has been posted.',
      text: 'Hello, David, this is confirmation of your job: [object Object].',
    };
    const result = mailer.jobOptions({
      username: 'David',
      email: 'david',
    },
    {
      name: 'david',
    });
    Object.keys(obj).forEach(key => {      
      expect(result[key]).toEqual(obj[key]);
    });
  });  
});