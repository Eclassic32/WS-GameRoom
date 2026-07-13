<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue';
import { useRoomListStore } from '@/stores/RoomListStore';

const roomListStore = useRoomListStore();
</script>

<template>
  <TopNavBar />
  <h1>Game Rooms</h1>
  
</template>
