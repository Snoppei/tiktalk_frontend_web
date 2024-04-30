<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Проверяем, был ли пользователь аутентифицирован
const isAuthenticated = localStorage.getItem('isAuthenticated');

// Получаем сохраненный путь перенаправления
const redirectPath = localStorage.getItem('redirectPath');

if (isAuthenticated && redirectPath && router.currentRoute.value.path === '/login') {
  router.replace(redirectPath);
} else if (!isAuthenticated) {
  router.replace('/login');
}
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>