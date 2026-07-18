import type { Room } from '@/types/RoomType';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomListStore = defineStore('roomList', {
    state: () => ({
        rooms: ref<Room[]>([]),
        current: ref<Room | null>(null),
    }),
    actions: {
        addRoom(room: Room) {
            this.rooms.push(room);
        }
    },
});

// @ts-expect-error
window.DEBUG_fillRoomListStore = DEBUG_fillRoomListStore;
export function DEBUG_fillRoomListStore() {
    const roomListStore = useRoomListStore();
    roomListStore.rooms = [
        {
            id: '1',
            name: 'Room 1',
            owner: {
                id: 'user1',
                name: 'User 1',
                image: 'https://example.com/user1.png'
            },
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
            owner: {
                id: 'user2',
                name: 'User 2',
                image: 'https://example.com/user2.png'
            },
            createdAt: new Date('2026-01-01T12:00:00Z'),
            public: false,
            players: [{
                    id: 'user2',
                    name: 'User 2',
                    image: 'https://example.com/user2.png'
                },
                {
                    id: 'user3',
                    name: 'User 3',
                    image: 'https://example.com/user3.png'
                }
            ],
            options: {
                maxPlayers: 8,
                timeLimit: 45,
                allowSpectators: false,
                rounds: 3
            }
        }
    ];
}