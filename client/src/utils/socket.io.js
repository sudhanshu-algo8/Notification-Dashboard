import { io } from "socket.io-client";
import { BASE_URL } from "../services/config";

const socket = io(BASE_URL);

socket.on("notification", (data) => {
  console.log("Received notification:", data);
});

const sendNotification = (notification) => {
  socket.emit("sendNotification", notification);
};

export { socket, sendNotification };
