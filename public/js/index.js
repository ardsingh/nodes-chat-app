var socket = io();

// this is client code
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('DisConnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});