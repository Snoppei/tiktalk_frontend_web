<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authenticate } from '../model/keycloak';

export default {
  setup() {
    const router = useRouter();
    const login = ref('');
    const password = ref('');
    const authError = ref(null);

    const onSubmit = async () => {
      authError.value = null;

      try {
        const response = await authenticate(login.value, password.value);
        if (!response || !response.access_token) { 
          authError.value = 'Неправильный логин или пароль.';
          return;
        }
        const accessToken = response.access_token;

        const roles = getRolesFromAccessToken(accessToken);
        if (!roles.includes('ADMIN')) {
          authError.value = 'Неправильный логин или пароль.';
          return; 
        }

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expires_in', response.expires_in);
        localStorage.setItem('token_received_at', Math.floor(Date.now() / 1000));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentPage', '1');
        localStorage.setItem('currentPageHistory', '1');

        router.push('/podcasts');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authError.value = 'Неверный логин или пароль.';
          return;
        } else {
          authError.value = 'Произошла ошибка авторизации. Попробуйте позже.';
          return;
        }
        return;
      }
    };

    const getRolesFromAccessToken = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.realm_access.roles || [];
      } catch (error) {
        return [];
      }
    };

    onMounted(() => {
      if (localStorage.getItem('isAuthenticated') === 'true') {
        router.push('/podcasts');
      }
    });

    return {
      login,
      password,
      authError,
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
          <input class="fields" type="password" v-model="password" placeholder="Введите пароль">
        </div>

        <div class="error-message-container"> 
          <div v-if="authError" class="error-message">
            {{ authError }}
          </div>
        </div>

        <button class="auth" type="submit" style="cursor: pointer;">Войти</button>
      </form>
    </div>
  </div>
</template>

<style>
.error-message-container {
  height: 20px;
  margin-bottom: 10px;
}

.error-message {
  color: red;
}
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
  width: 160px;
  height: 60px;
  font-size: 30px;
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