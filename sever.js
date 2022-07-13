const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//lớp server của thư viện socket io
const { Server } = require("socket.io");
const io = new Server(server);

const userList = {}
// trang chủ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id + ' user connected to be demolish');
    socket.emit('welcomeMessage', 'hello there');
    // listen to send message
    socket.on('chatMessage', (message) => {
        const mes = userList[socket.id] + ' said: ' + message;
        console.log(mes);
        socket.broadcast.emit('severMessage', mes);
    });
    socket.on('userJoined', (user) => {
        console.log(user + ' joined');
        userList[socket.id] = user;
        socket.broadcast.emit('newUser', user);
    })
});

server.listen(43210, () => {
    console.log('listening on *:43210');
});

