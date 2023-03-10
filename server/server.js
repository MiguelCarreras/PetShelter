require('../server/config/mongoose.config');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const server = require('http').createServer(app);


const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`);

    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
    });

    socket.on('create-pet', (pet) => {
        socket.broadcast.emit('pet-created', pet);
    });

    socket.on('pet-update', (pet) => {
        socket.broadcast.emit('pet-updated', pet);
    });

    socket.on('pet-adopt', (pet) => {
        socket.broadcast.emit('pet-adopted', pet);
    });

    socket.on('pet-like', (pet) => {
        socket.broadcast.emit('pet-liked', pet);
    });

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    });
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('../server/routes/pet.routes')(app);
server.listen(8000, '192.168.0.7', () => {
    console.log("Listening at Port 8000")
})