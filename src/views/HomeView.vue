<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue';
import { useRoomListStore } from '@/stores/RoomListStore';
import { RouterLink } from 'vue-router';

const roomListStore = useRoomListStore();
</script>

<template>
  <TopNavBar />
  <main>
    <h1>Game Rooms</h1>
    <RouterLink to="/create">Create Room</RouterLink>
    <section>
      <div v-for="room in roomListStore.rooms" :key="room.id">
        <h2>{{ room.name }}</h2>
        <p>Players: {{ room.players.length }}/{{ room.options.maxPlayers }}</p>
        <RouterLink :to="`/room/${room.id}`">Join Room</RouterLink>

      </div>
    </section>
    
  </main>
</template>
