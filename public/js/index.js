var socket = io();

// this is client code
socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, This is Ardhendu'
    });
});
socket.on('disconnect', () => {
    console.log('DisConnected from server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});