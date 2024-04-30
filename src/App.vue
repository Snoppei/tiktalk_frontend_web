<script setup>
import { useRouter } from 'vue-router';
import LoginView from './views/LoginView.vue';

const router = useRouter();

// Проверяем, был ли пользователь аутентифицирован
const isAuthenticated = localStorage.getItem('isAuthenticated');

// Получаем сохраненный путь перенаправления
const redirectPath = localStorage.getItem('redirectPath');

if (isAuthenticated && redirectPath && router.currentRoute.value.path === '/login') {
  router.replace(redirectPath);
} else if (!isAuthenticated) {
  // Если пользователь не был аутентифицирован, сохраняем текущий путь и перенаправляем его на страницу входа
  localStorage.setItem('redirectPath', router.currentRoute.value.fullPath);
  router.replace('/login');
}
// } else if (router.currentRoute.value.path === '/') {
//   router.replace('/login');
// }
</script>

<template>
  <RouterView />
  <LoginView/>
</template>

<style scoped>

</style>