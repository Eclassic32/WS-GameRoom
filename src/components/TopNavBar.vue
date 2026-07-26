<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const loginBtn = ref<HTMLButtonElement | null>(null);

</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/rooms">Rooms</RouterLink>
    <button id="login-btn" ref="loginBtn">Login</button>
  </nav>
</template>
<style scoped>

</style>