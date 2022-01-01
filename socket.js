const CacheService = require('./service/CacheService');
const http = require("http");
const IOClient = require('socket.io');

class Socket {
  constructor(port) {
    this.port = port;
    this.roomCache = new CacheService();
    this.init();
  }
  init() {
    const httpServer = http.createServer();

    const io = IOClient(httpServer, {
      origins: '*:*',
      path: '/socket',
      cors: true,
    });

    io.on('connection', async (socket) => {
      socket.on("join", room => {
        if (this.roomCache.getData(socket.id)) {
          socket.leave(this.roomCache.getData(socket.id));
        }
        this.roomCache.setData(socket.id, room);
        socket.join(room);
      });

      socket.on("data", args => {
        console.log("接收到数据", args);
        if (this.roomCache.getData(socket.id)) {
          socket.broadcast.to(this.roomCache.getData(socket.id)).emit('data', args);
        }
      });

      socket.on('disconnect', async () => {
      });
    });
    httpServer.listen(this.port);
    this.io = io;
    console.log("> Socket Server Started On Port", this.port)

  }
}

module.exports = Socket