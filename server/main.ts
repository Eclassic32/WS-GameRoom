import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { testRooms as CurrentRooms } from './rooms';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/rooms', (req, res) => {
    res.json(CurrentRooms);
});

app.post('/api/rooms', (req, res) => {
    // Here you would handle the creation of a new room
    // For now, we'll just return a success response
    res.json({ status: 'room created', id: 'new-room-id' });
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});