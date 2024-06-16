import express from "express";
import http from 'http'
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}
io.on('connection', (socket) => {
    console.log('New connection', socket.id)
    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    console.log('User connected with id', userId)
    io.on('disconnect', () => {
        console.log('User disconnected')
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { app, server, io };