import { Server } from 'socket.io';

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    emitClientCount();

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      emitClientCount();
    });
  });
};

const broadcastNotification = (data) => {
  if (io) io.emit('notification', data);
};

const emitClientCount = () => {
  const clientCount = io.engine.clientsCount;
  io.emit('clientCount', clientCount);
};

export { setupSocket, broadcastNotification };



