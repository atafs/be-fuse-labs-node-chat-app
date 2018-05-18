// client (listen and send data to the server)
var socket = io();

// events
socket.on('connect', function () {
    console.log('Connected to server on client')

    // event
    socket.emit('createEmail', {
       to: 'tomas@tomas.com',
       text: 'Hey there. How are you?'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server on client')
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
})