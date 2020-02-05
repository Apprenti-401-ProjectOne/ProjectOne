'use strict';

const io = require('socket.io-client');

let chat = io.connect('http://localhost:3001/chat');

chat.on('welcome', (message) => {
  console.log('Recieved: ', message);
});