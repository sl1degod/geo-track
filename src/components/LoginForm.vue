<template>
  <div class="main">
    <div class="form">
      <p>Авторизация</p>
      <div class="input">
        <input type="text" placeholder="Логин">
        <input type="text" placeholder="Пароль">
      </div>
      <button>Войти</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-form"
}
</script>

<style scoped>
.main {
  display: flex;

}

.form {
  margin: auto;
  background: black;
  border-radius: 12px;
  min-height: 500px;
  min-width: 400px;
  border: 2px solid black;
  padding: 20px;
}

.form p {
  font-size: 20px;
  color: #FFFFFF;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.input {
  display: flex;
  flex-direction: column;
}

input {
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-top: 10px;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
}
</style>