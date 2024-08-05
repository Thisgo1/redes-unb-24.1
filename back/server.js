console.log('inciando o servidor...')

const express = require('express');
const http = require('http')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server)
const PORT = 3001;

app.use(cors());

const connectedUsers = new Map();
const userAudioStatus = new Map();

// Servir lista de áudios
app.get('/audios', (req, res) => {
  const audioDir = path.join(__dirname, './audio');
  fs.readdir(audioDir, (err, files) => {
    if (err) {
      res.status(500).send('Erro ao listar áudios');
      return;
    }
    res.json(files);
  });
});

// Transmitir áudio em blocos de 30 segundos
app.get('/audios/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'audio', req.params.filename);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
      return;
    }

    const range = req.headers.range;
    if (!range) {
      res.status(400).send('Requer o cabeçalho "Range"');
      return;
    }

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : start + 30 * 1024 * 1024;

    const chunkStart = start;
    const chunkEnd = Math.min(end, stats.size - 1);

    const stream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd });
    stream.on('open', () => {
      res.writeHead(206, {
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkEnd - chunkStart + 1,
        'Content-Type': 'audio/mpeg',
      });
      stream.pipe(res);
    });

    stream.on('error', (streamErr) => {
      res.sendStatus(500);
    });
  });
});

io.on('connection', (socket) => {
  console.log("Novo cliente conectado");

  socket.on('set-username', (username) => {
    console.log(`Recebido nome de usuário: ${username}`)
    connectedUsers.set(username, socket.id);
    io.emit('update-user-list', Array.from(connectedUsers.keys()).map(user => ({
      username: user,
      currentAudio: userAudioStatus.get(user) || null
    })));
  })

  socket.on('play-audio', (data) => {
    userAudioStatus.forEach((audio, user) => {
      io.to(connectedUsers.get(user)).emit('play-audio', data);
    });
    io.emit('update-user-list', Array.from(connectedUsers.keys()).map(user => ({
      username: user,
      currentAudio: userAudioStatus.get(user) || null
    })));
  });


  socket.on('pause-audio', () => {
    io.emit('pause-audio');
  });

  socket.on('update-audio-status', (data) => {
    const { username, audio } = data;
    userAudioStatus.set(username, audio);
    io.emit('update-user-list', Array.from(connectedUsers.keys()).map(user => ({
      username: user,
      currentAudio: userAudioStatus.get(user) || null
    })));
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
    for (const [user, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(user);
        userAudioStatus.delete(user);
        io.emit('update-user-list', Array.from(connectedUsers.keys()).map(user => ({
          username: user,
          currentAudio: userAudioStatus.get(user) || null
        })));
        break;
      }
    }
  });
})


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
