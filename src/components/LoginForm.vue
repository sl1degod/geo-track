<template>
  <div class="main">
    <div class="form">
      <p>Авторизация</p>
      <div class="input">
        <input type="text" placeholder="Логин" v-model="loginUser">
        <input type="password" placeholder="Пароль" v-model="passwordUser" >
      </div>
      <label style="color: red; font-size: 16px; margin-top: 20px;"> {{ error }} </label>
      <button class="sign_btn" @click.prevent="login">Войти</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login-form",
  data() {
    return {
      loginUser: null,
      passwordUser: null,
      error: ''
    }
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:5000/login', {login: this.loginUser, password: this.passwordUser})
          .then(res => {
            if (res.data.token) {
              this.$store.commit('setToken', res.data.token);
              localStorage.setItem('access_token', res.data.token);
              this.$store.dispatch('changeAuthStatus', true);
              this.$router.push('/reports');
              // this.$router.push('/objects');
            } else {
              this.error = "Введенные данные неверны";
            }
          })
          .catch(error => {
            if (error.response.status === 403) {
              this.error = "Введенные данные неверны";
            }
          });

    }
  },
  mounted() {
    this.$store.state.token = null
  }

}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}

.form {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  background: #111111;
  border-radius: 12px;
  height: 450px;
  width: 400px;
  border: 2px solid white;
  padding: 20px;
  align-items: center;
}

.form p {
  font-size: 20px;
  color: #FFFFFF;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}

.input {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
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

.sign_btn {
  margin-top: 60px;
  height: 40px;
  width: 100px;
  border-radius: 12px;
  border: 2px solid white;
  background: transparent;
  color: white;
  cursor: pointer;
}
</style>