'use strict';

//chat feature
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3001;

//chat rooms
const chatRooms = ['Job Chat Rm 1', 'Job Chat Rm 2'];

//chat namespace
io
  .of('/chat')
  .on('connection', (socket) => {

    socket.emit('Welcome', 'You are in the chat namespace');
    console.log('Chat Namespace');

    socket.on('joinRoom', (room) => {
      if (chatRooms.includes(room)) {
        socket.join(room);
        io
          .of('/chat')
          .in(room).emit('newUser', 'Someone new wants to chat about this job');
        return socket.emit('success', 'You have joined the chat for this job.');
      } else {
        return socket.emit('err', 'No chat has been started for this job yet.');
      }
    });
  });

http.listen(port, () => {
  console.log(`Chat is listening on ${port}`);
});