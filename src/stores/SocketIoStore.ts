import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "@/utils/socket";

export const useSocketIoStore = defineStore("socketIo",{
    state: () => ({
        connected: ref(false),
        chat_msgs: ref<string[]>([]),
        currentRoomId: ref<string | null>(null)
    }),
    actions: {
        bindEvents() {
            socket.on("connect", () => {
                this.connected = true;
            });

            socket.on("disconnect", () => {
                this.connected = false;
            });

            socket.on("chat_msg", (msg: string) => {
                this.chat_msgs.push(msg);
            });
        },

        connect() {
            socket.connect();
        },

        disconnect() {
            socket.disconnect();
        },

        sendChatMessage(msg: string) {
            socket.emit("chat_msg", msg, this.currentRoomId);
        },

        joinRoom(roomId: string) {
            if (this.currentRoomId) {
                socket.emit("leave_room", this.currentRoomId);
                this.chat_msgs = [];
            }
            socket.emit("join_room", roomId);
            this.currentRoomId = roomId;
        }
    }
});