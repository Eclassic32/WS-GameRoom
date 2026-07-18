import type { Room } from '@/types/RoomType';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as API from '@/utils/api';

export const useRoomListStore = defineStore('roomList', {
    state: () => ({
        rooms: ref<Room[]>([]),
        current: ref<Room | null>(null),
    }),
    actions: {
        async setRoomsFromAPI() {
            try { 
                this.rooms = await API.getRoomsList() as Room[];
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        },

        addRoom(room: Room) {
            this.rooms.push(room);
        }
    },
});
