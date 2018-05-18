// client (listen and send data to the server)
var socket = io();

// listeners
socket.on('connect', function () {
    console.log('Connected to server on client')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server on client')
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);

    // create an element and mark it as invisable
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
})

// jQuery
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {});
});

