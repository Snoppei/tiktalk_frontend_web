<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();
router.replace('/login');
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
