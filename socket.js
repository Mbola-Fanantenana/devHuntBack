const express = require('express');
const http = require('http');
const Server = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

const io = Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Connected');

    socket.on('newMessage', (message) => {
        io.emit('update');
        console.log('update');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server sur le port ${PORT}`);
});

module.exports = io;