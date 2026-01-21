import { socket } from "./socket";

export const connectSocket = (userId: string) => {
    socket.connect();
    socket.emit("register", userId);
};

export const disconnectSocket = () => {
    socket.disconnect();
};
