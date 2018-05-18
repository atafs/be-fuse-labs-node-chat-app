// client (listen and send data to the server)
var socket = io();

// events
socket.on('connect', function () {
    console.log('Connected to server on client')

    // event
    socket.emit('createMessage', {
       from: 'Agrela',
       text: 'That works form me'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server on client')
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
})