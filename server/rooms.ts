import { placeholderUser, type User } from './auth';
import type { GameOptions, GameState } from './game';


class ActiveRooms {
    private rooms: Map<string, Room> = new Map();

    constructor() {
        this.testInit();
    }

    testInit() {
        const options = [
            {
                maxPlayers: 10,
                timeLimit: 60,
                allowSpectators: true,
                rounds: 5
            },
            {
                maxPlayers: 8,
                timeLimit: 45,
                allowSpectators: false,
                rounds: 3
            }
        ];
        const r1 = new Room('Room 1', placeholderUser(1), true, options[0]);
        r1.join(placeholderUser(1));
        const r2 = new Room('Room 2', placeholderUser(2), false, options[1]);
        r2.join(placeholderUser(2));
        r2.join(placeholderUser(3));
        this.addRoom(r1);
        this.addRoom(r2);
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
    name: string;
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
        this.gameState = null; // Rewrite on game start
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
