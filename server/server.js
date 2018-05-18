const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
console.info('publicPath', publicPath);

const port = process.env.PORT || 3000;
console.info('port', port);

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected in server');

    // emit event from admin to welcome new chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome Mate!! To the Chat!!'));

    // broadcast emit event from admin to new users joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined!!'));

    // create listener
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // emit event to multiple connections
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');

        // broadcast sends an event to everyone expect to this socket
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('New user disconnected from server');
    });
});

server.listen(port, () => {
    console.info(`Server is up on ${port}`);
});