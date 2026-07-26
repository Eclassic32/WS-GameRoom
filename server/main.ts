import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { activeRooms } from './rooms';
import { setupAuthSocket, setupAuthExpress } from './auth';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/rooms', (req, res) => {
    res.json(activeRooms.getRoomList());
});
    
app.post('/api/rooms', (req, res) => {
    // Here you would handle the creation of a new room
    // For now, we'll just return a success response
    res.json({ status: 'room created', id: 'new-room-id' });
});

app.get('/api/rooms/:id', (req, res) => {
    const room = activeRooms.getRoomById(req.params.id);
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

setupAuthExpress(app);

io.on('connection', (socket) => {
    const userId = socket.id;

    console.log('[🔌] Connected: ', userId);

    socket.on('disconnect', () => {
        console.log('[🔌] Disconnected: ', userId);
    });

    socket.on('chat_msg', (msg, roomId) => {
        if (roomId) {
            console.log(`[🔌] Room ${roomId} Message: `, msg);
            io.to(roomId).emit('chat_msg', msg);
        } else {
            console.log(`[🔌] Global Message: `, msg);
            io.emit('chat_msg', msg);
        }
    });

    socket.on('join_room', (roomId) => {
        console.log(`[🔌] User ${userId} joining room: ${roomId}`);
        socket.join(roomId);
    });

    socket.on('leave_room', (roomId) => {
        console.log(`[🔌] User ${userId} leaving room: ${roomId}`);
        socket.leave(roomId);
    });

    setupAuthSocket(socket, io);
});


httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});