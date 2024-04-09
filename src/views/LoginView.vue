<script>
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      // обработка кнопки войти
    }
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
        <form @submit="onSubmit">
            <div>
              <p>Логин</p>
              <input type="text" v-model="login" placeholder="">
            </div>
            <div>
              <p>Пароль</p>
              <input type="password" v-model="password" placeholder="">
            </div>
            <button type="submit">Войти</button>
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
  
input {
  width: 436px;
  height: 53px;
  padding: 10px;
  margin-bottom: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
  
button {
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