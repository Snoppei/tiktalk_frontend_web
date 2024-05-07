<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const isAuthenticated = localStorage.getItem('isAuthenticated');

const redirectPath = localStorage.getItem('redirectPath');

if (isAuthenticated && redirectPath && router.currentRoute.value.path === '/login') {
  router.replace(redirectPath);
} else if (!isAuthenticated) {
  localStorage.setItem('redirectPath', router.currentRoute.value.fullPath);
  router.replace('/login');
}
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>