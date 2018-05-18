const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    // emit event
    socket.emit('newEmail', {
        from: 'americo@americo.com',
        text: 'What is going on?',
        createAt: 123
    });

    // create listener
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('New user disconnected from server');
    });
});

server.listen(port, () => {
    console.info(`Server is up on ${port}`);
});