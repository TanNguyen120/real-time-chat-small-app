const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//lớp server của thư viện socket io
const { Server } = require("socket.io");
const io = new Server(server);

// trang chủ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id + ' user connected to be demolish');
    socket.emit('welcomeMessage', 'hello there');
    // listen to send message
    socket.on('chatMessage', (message) => {
        console.log(message);
    })
});

server.listen(43210, () => {
    console.log('listening on *:43210');
});

