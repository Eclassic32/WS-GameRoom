<template>
    <TopNavBar />
    <h1>Room View</h1>
    <div v-if="data == null">
        <p>Loading room data...</p>
    </div>
    <div v-else-if="data && 'error' in data">
        <p>{{ data.error }}</p>
    </div>
    <div v-else>
        <h2>{{ data.name }}</h2>
        <p>Max Players: {{ data.options.maxPlayers }}</p>
        <p>Time Limit: {{ data.options.timeLimit }} seconds</p>
    </div>
    
</template>
<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue';
import type { Room } from '@/types/RoomType';
import { getRoomById, type APIError } from '@/utils/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const data = ref(null as Room | APIError | null);
const route = useRoute();

onMounted(async () => {
    const room = await getRoomById(route.params.id as string);
    data.value = room;
});

</script>