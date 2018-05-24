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

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi`'
}, (data) => {
    console.log('Got it', data);
});

// get info from message-from on the event when user press 'submit' button
// prevent default behavior of page refresh process
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});