import { Server } from 'socket.io';

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};

const broadcastNotification = (data) => {
  if (io) io.emit('notification', data);
};

export { setupSocket, broadcastNotification };
