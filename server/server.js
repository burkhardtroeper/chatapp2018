const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');

const socketIO = require('socket.io');

const express = require('express');
var {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the chat'));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('createMessage', (data) => {

        console.log('User created new message, spawning ...');
        
        // io.emit('newMessage', {
        //     user: data.user,
        //     text: data.text,
        //     createdAt: data.createdAt
        // });

        socket.broadcast.emit('newMessage', generateMessage(data.user, data.text));

    });

});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});