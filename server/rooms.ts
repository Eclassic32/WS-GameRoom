import { placeholderUser, currentUser, type User } from './auth';
import { type GameOptions } from './game';


class ActiveRooms {
    private rooms: Map<string, Room> = new Map();

    constructor() {
        testInit();
    }

    testInit() {
        const testRooms = [
            {
                id: '1',
                name: 'Room 1',
                owner: placeholderUser(1),
                createdAt: new Date(),
                public: true,
                players: [placeholderUser(1)],
                state: 'waiting',
                gameState: null,
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
                state: 'in-game',
                gameState: null,
                options: {
                    maxPlayers: 8,
                    timeLimit: 45,
                    allowSpectators: false,
                    rounds: 3
                }
            }
        ];
        for (const room of testRooms) {
            this.rooms.set(room.id, room);
        }
    }

    addRoom(room: Room) {
        this.rooms.set(room.id, room);
    }

    closeRoom(roomId: string) {
        this.rooms.delete(roomId);
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
    createdAt: Date;
    public: boolean;
    players: User[];
    state: 'waiting' | 'in-game' | 'finished';
    gameState: GameState | null;
    options: GameOptions;

    constructor(name: string, owner: User, isPublic: boolean, options: GameOptions) {
        this.id = generateRoomId();
        this.name = name;
        this.owner = owner;
        this.createdAt = new Date();
        this.public = isPublic;
        this.players = [];
        this.state = 'waiting';
        this.gameState = null;
        this.options = options;
    }

    join(user: User) {
        if (!this.players.find(p => p.id === user.id)) {
            this.players.push(user);
        };
    }

    leave(user: User) {
        this.players = this.players.filter(p => p.id !== user.id);
    }

}

function generateRoomId(): string {
    return Math.random().toString(36).substring(2, 6);
}

export const activeRooms = new ActiveRooms();
