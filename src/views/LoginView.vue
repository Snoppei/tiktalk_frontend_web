<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authenticate } from '../model/keycloak';

export default {
  setup() {
    const router = useRouter();
    const login = ref('');
    const password = ref('');

    const onSubmit = async () => {
      try {
        const response = await authenticate(login.value, password.value);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('isAuthenticated', true);
        console.log(response.access_token);
        router.push('/podcasts');
      } catch (error) {
        console.error('Login failed', error);
      }
    };

    return {
      login,
      password,
      onSubmit
    };
  }
}
</script>
<template>
  <div class="login-page">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo">
    </div>
    <div class="form-container">
      <h1>Авторизация</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <p>Логин</p>
          <input class="fields" type="text" v-model="login" placeholder="Введите логин">
        </div>
        <div>
          <p>Пароль</p>
          <input class="fields" type="text" v-model="password" placeholder="Введите пароль">
        </div>
        <button class="auth" type="submit" style="cursor: pointer;">Войти</button>
      </form>
    </div>
  </div>
</template>
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  margin-bottom: 40px;
}

.form-container {
  width: 450px;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
}

.fields {
  width: 436px;
  height: 53px;
  padding: 10px;
  margin-bottom: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.auth {
  display: block;
  width: 50%;
  height: 64px;
  font-size: 32px;
  padding: 10px;
  background-color: #3067DE;
  color: #fff;
  border: 1px solid #3067DE;
  border-radius: 16px;
  margin: 0 auto;
}

a {
  text-align: center;
  display: block;
  margin-top: 10px;
}
</style>