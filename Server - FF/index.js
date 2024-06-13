const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

const port = 5000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro carregando index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Um jogador entrou');

  socket.on('send message', (chat) => {
    io.emit('send message', chat);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at the port: ${port}`);
});