import { io } from "socket.io-client";
import { BASE_URL } from "../services/config";

const socket = io(BASE_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

const sendNotification = (notification) => {
  socket.emit("notification", notification);
};

export { socket, sendNotification };
