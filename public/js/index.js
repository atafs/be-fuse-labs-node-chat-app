// client (listen and send data to the server)
var socket = io();
socket.on('connect', () => {
    console.log('Connected to server on client')
});

socket.on('disconnect', () => {
    console.log('Disconnected from server on client')
});