const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
// instead of implicity calling the http.server, we will call it explicity
var server = http.createServer(app);
// create a websocket to listen and emit
var io = socketIO(server);

// server the static public page using the middleware
app.use(express.static(publicPath));

// we are going to register for an event using io.on
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('create message', message);
        //// send to all connected clients
        // io.emit('newMessage', {
        //     from:message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        // to send to everyone except to the socket from which it is received, do
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

//app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
