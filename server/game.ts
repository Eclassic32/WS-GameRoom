export type GameOptions = {
    maxPlayers: number;
    timeLimit: number;
    allowSpectators: boolean;
    rounds: number;
}

export type GameState = {
    currentRound: number;
    scores: Record<string, number>;
    isGameOver: boolean;
}