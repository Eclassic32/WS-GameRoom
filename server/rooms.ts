const testUser = (id: number) => ({
    id: `user${id}`,
    name: `User ${id}`,
    image: `https://example.com/user${id}.png`
});

export const testRooms = roomListStore.rooms = [
    {
        id: '1',
        name: 'Room 1',
        owner: testUser(1),
        createdAt: new Date(),
        public: true,
        players: [{
            id: 'user1',
            name: 'User 1',
            image: 'https://example.com/user1.png'
        }],
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
        owner: testUser(2),
        createdAt: new Date('2026-01-01T12:00:00Z'),
        public: false,
        players: [testUser(2), testUser(3)],
        options: {
            maxPlayers: 8,
            timeLimit: 45,
            allowSpectators: false,
            rounds: 3
        }
    }
];