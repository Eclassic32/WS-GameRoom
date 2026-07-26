import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

export const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000");
