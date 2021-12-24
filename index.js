const httpServer = require("http").createServer();

const io = require('socket.io')(httpServer, {
  origins: '*:*',
  path: '/socket',
  cors: true,
  // transports: ['polling'],
  // allowUpgrades: false
});
const CacheService = require('./service/CacheService');
const roomCache = new CacheService();

// const host = process.env.HOST || process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;

io.on('connection', async (socket) => {
  socket.on("join", room=>{
    if (roomCache.getData(socket.id)) {
      socket.leave(roomCache.getData(socket.id));
    }
    roomCache.setData(socket.id, room);
    socket.join(room);
  });

  socket.on("data", args=>{
    console.log("接收到数据", args);
    if (roomCache.getData(socket.id)) {
      socket.broadcast.to(roomCache.getData(socket.id)).emit('data', args);
    }
  });

  socket.on('disconnect', async () => {
  });
});


httpServer.listen(port);
