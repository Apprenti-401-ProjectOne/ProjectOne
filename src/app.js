'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/routes');
const authRouter = require('./routes/authroutes');
const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const {jobRouter} = require('./routes/jobRoutes.js');
const logger = require('./middleware/logger');
const timestamp = require('./middleware/timestamp');

//chat feature
// const http = require('http').createServer();
// const io = require('socket.io')(http);
// const port = 3001;

//chat rooms
// const chatRooms = ['Job Chat Rm 1', 'Job Chat Rm 2'];

//chat namespace
// io
//   .of('/chat')
//   .on('connection', (socket) => {

//     socket.emit('Welcome', 'You are in the chat namespace');
//     console.log('Chat Namespace');

//     socket.on('joinRoom', (room) => {
//       if (chatRooms.includes(room)) {
//         socket.join(room);
//         io
//           .of('/chat')
//           .in(room).emit('newUser', 'Someone new wants to chat about this job');
//         return socket.emit('success', 'You have joined the chat for this job.');
//       } else {
//         return socket.emit('err', 'No chat has been started for this job yet.');
//       }
//     });
//   });

// http.listen(port, () => {
//   console.log(`Chat is listening on ${port}`);
// });

//Middleware 
app.use(logger);
app.use(timestamp);
// app.use(sendEmail);
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));
app.use(jobRouter);
app.use(authRouter);
app.use(router);
app.use(authRouter);
app.use(notFound);
app.use(errorHandler);

/** 
 * exports server module with start method
 * @module server
*/
module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on ${port}`)),
};