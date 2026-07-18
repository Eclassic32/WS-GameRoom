import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { activeRooms } from './rooms';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cors());

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



io.on('connection', (socket) => {
    console.log('[Socket.io] Connected: ', socket.id);
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});