<template>
<div id="chat-box">
    <ul>
        <li v-for="msg in io.chat_msgs" :key="msg">{{ msg }}</li>
    </ul>
    <input type="text" placeholder="Type a message..." @keyup.enter="chat();" ref="input"/>
</div>
</template>
<script setup lang="ts">
import { useSocketIoStore } from '@/stores/SocketIoStore';
import { onMounted, ref } from 'vue';

const io = useSocketIoStore();

const input = ref<HTMLInputElement | null>(null);
onMounted(() => {
});

function chat() {
    if (!input.value || input.value.value === '') { return; }
    io.sendChatMessage(input.value.value);
    input.value.value = '';
}
</script>