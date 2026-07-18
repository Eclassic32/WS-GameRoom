import { placeholderUser, currentUser } from './auth';
import { type GameOptions } from './game';


class ActiveRooms {
    private rooms: Map<string, Room> = new Map();

    constructor() {
        // Initialize with some test rooms
        for (const room of testRooms) {
            this.rooms.set(room.id, room);
        }
    }

    addRoom(room: Room) {
        this.rooms.set(room.id, room);
    }

    getRoomList() {
        return Array.from(this.rooms.values());
    }

    getRoomById(id: string) {
        return this.rooms.get(id) || null;
    }
};

export class Room {
    id: string;
    name: string
    owner: User;
    createdAt: Date
    public: boolean;
    players: User[];
    options: GameOptions;

    constructor(name: string, isPublic: boolean, options: GameOptions) {
        this.id = generateRoomId();
        this.name = name;
        this.owner = currentUser; 
        this.createdAt = new Date();
        this.public = isPublic;
        this.players = [];
        this.options = options;
    
    }
}

export const testRooms = [
    {
        id: '1',
        name: 'Room 1',
        owner: placeholderUser(1),
        createdAt: new Date(),
        public: true,
        players: [placeholderUser(1)],
        options: {
            maxPlayers: 10,
            timeLimit: 60,
            allowSpectators: true,
            rounds: 5
        }
    },
    {
        id: '2',
        name: 'Room 2',
        owner: placeholderUser(2),
        createdAt: new Date('2026-01-01T12:00:00Z'),
        public: false,
        players: [placeholderUser(2), placeholderUser(3)],
        options: {
            maxPlayers: 8,
            timeLimit: 45,
            allowSpectators: false,
            rounds: 3
        }
    }
];

function generateRoomId(): string {
    return Math.random().toString(36).substring(2, 6);
}

export const activeRooms = new ActiveRooms();
