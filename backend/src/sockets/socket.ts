import { Server } from "socket.io";
import http from "http";
import 'dotenv/config'
// import { AuthUtility } from "../utils/auth.utils";

export let io: Server;
// const authUtil = new AuthUtility();

const onlineUsers = new Map<string, string>();

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ['POST', 'PATCH'],
            credentials: true
        },
    });

    // io.use((socket,next)=>{
    //     try {
    //         const token =socket.handshake.auth.token
    //         if (!token) {
    //             return next(new Error("Authentication error: Token missing"));
    //         }
    //         const decoded =authUtil.verifyAccessToken(token)
    //         socket.data.user=decoded
    //         next()
    //     } catch (error) {
            
    //     }
    // })


    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("register", (userId: string) => {
            onlineUsers.set(userId, socket.id);
            console.log("User registered:", userId);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
            console.log("Socket disconnected:", socket.id);
        });
    });
};

export const emitToUser = (userId: string, event: string, data: any) => {
    const socketId = onlineUsers.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
    }
};
