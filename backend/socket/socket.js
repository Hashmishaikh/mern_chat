import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://gade-chat.onrender.com/",
        methods:["GET","POST"]
    }
});

// check user is online of offline
const userSocketMap = {}; //{userId: socketId}

// message to be in real time 
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on('connection',(socket) => {
    console.log('A users connected', socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != undefined) userSocketMap[userId] = socket.id;

    // io.emit is used to send event to the all connected client
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    // socket.on() is used in listen to the event.can be used in both on client and server side
    socket.on("disconnect",() => {
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})



export {app,io,server};