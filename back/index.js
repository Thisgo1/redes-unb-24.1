console.log('inciando o servidor...')

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

//get para os áudios
app.get('/audios', (req, res) =>{
  const audioDir = path.join(__dirname, 'audio');
  fs.readdir(audioDir, (err,files)=>{
    if(err){
      res.status(500).send('Erro ao listar áudios');
      return;
    }
    res.json(files);
  });
});

//transmissão dos áudios
app.get('/audio/:filename', (res, req) => {
  const filePath = path.join(__dirname, 'audio', req.params.filename);
  fs.stat(filePath, (err, stats) => {
    if(err)
      {
        if(err.code ==='ENOENT'){
          res.sendStatus(404);
        }else{
          res.sendStatus(500);
        }
    return;
  }
  const range = req.headers.range;
  if(!range){
    res.status(400).send('Requer header "Range"');
    return;
  }

  const positions = range.replace(/bytes=/, "").split("-");
  const start = parseInt(position[0], 10);
  const end = positions[1] ? parseInt(positions[1],10) : start + 30 * 1024 * 1024

  const chunkStart = start;
  const chunkEnd = Math.min(end, stats.size - 1);

  const stream = fs.createReadStream(filePath, {start: chunkStart, end: chunkEnd});
  stream.on('open', () =>{
    res.writeHead(206,{
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
app.listen(PORT,()=>{
  console.log(`O servidor esta roando na porta ${PORT}`)
})
})
