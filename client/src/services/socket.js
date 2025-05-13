import { io } from "socket.io-client";
import { BASE_URL } from "../services/config";

const socket = io(BASE_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => console.log("Connected to Socket.IO server"));
socket.on("connect_error", (err) =>
  console.error("Socket.IO connection error:", err.message)
);

const sendNotification = (notification) => {
  socket.emit("sendNotification", notification);
};

export { socket, sendNotification };
