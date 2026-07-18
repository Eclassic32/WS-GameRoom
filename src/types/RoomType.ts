export type Room = {
    id: string;
    name: string;
    owner: User;
    createdAt: Date;
    public: boolean;
    players: User[];
    options: GameOptions;
}

// this should be changed based on the game itself
export type GameOptions = {
    maxPlayers: number;
    timeLimit: number;
    allowSpectators: boolean;
    rounds: number;
}

export type User = {
    id: string;
    name: string;
    image: string | null;
}