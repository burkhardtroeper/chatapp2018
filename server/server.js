const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');

const socketIO = require('socket.io');

const express = require('express');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('createMessage', (data) => {

        console.log('User created new message, spawning ...');
        
        io.emit('newMessage', {
            user: data.user,
            text: data.text,
            createdAt: data.createdAt
        });

    });

});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});