const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  socket.emit('message', 'Olá do servidor!');
});

server.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
