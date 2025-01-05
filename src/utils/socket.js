import { io } from "socket.io-client";

const socket = io("http://your-backend-url", { autoConnect: false });

export default socket;
