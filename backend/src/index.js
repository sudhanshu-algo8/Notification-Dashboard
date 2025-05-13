import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { setupSocket } from './sockets/socketManager.js';
import connectDB from './config/db.js';

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
setupSocket(server);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
  });
});
