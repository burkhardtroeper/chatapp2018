var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (data) {
    console.log('Received new message from ' + data.user + ' at ' + data.createdAt);
    console.log('Text '  + data.text);
});

socket.on('loginSucess', function() {
    console.log('You have sucessfully logged in.');    
});

socket.on('newUser', function (data) {
    console.log(data);
});