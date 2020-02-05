'use strict';

const io = require('socket.io-client');

//Connect to the chat server
let chat = io.connect('http://localhost:3001/chat');

chat.on('welcome', (message) => {
  console.log('Recieved: ', message);
});

chat.on('newUser', (res) => console.log(res));

chat.emit('joinRoom', 'Job Chat Rm 1');

chat.on('err', (err) => console.log(err));
chat.on('success', (res) => console.log(res));

