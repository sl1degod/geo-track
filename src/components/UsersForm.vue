<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog-content">
      <form @submit.prevent>
        <p style="margin-top: 10px; margin-bottom: 20px">Создание нового пользоваеля</p>
        <p class="labels">Введите фамилию</p>
        <input type="text" placeholder="Введите фамилию" v-model="firstName">
        <p class="labels">Введите имя</p>
        <input type="text" placeholder="Введите имя" v-model="secondName">
        <p class="labels">Введите отчество</p>
        <input type="text" placeholder="Введите отчество" v-model="lastName">
        <p class="labels">Выберие фото</p>
        <input type="file" @change="onFileChange">
        <p class="labels">Введите должность</p>
        <select v-model="selectedPost">
          <option v-for="post in posts" :key="post.id" :value="post.id">
            {{ post.name }}
          </option>
        </select>
        <p class="labels">Введите Логин</p>
        <input type="text" placeholder="Введите логин" v-model="login">
        <p class="labels">Введите Пароль</p>
        <input type="text" placeholder="Введите пароль" v-model="password">
        <button @click="createUser">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersForm",
  data() {
    return {
      posts: [],
      firstName: '',
      secondName: '',
      lastName: '',
      selectedPost: '',
      login: '',
      password: '',
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async createUser() {
      const formData = new FormData();
      formData.append('firstname', this.firstName);
      formData.append('secondname', this.secondName);
      formData.append('lastname', this.lastName);
      formData.append('uuid_image', this.selectedFile);
      formData.append('post_id', this.selectedPost);
      formData.append('login', this.login);
      formData.append('password', this.password);
      this.$store.dispatch('createUser', { newUser: formData, token: this.$store.state.token });
      this.$emit('update:show', false)
      this.firstName = ''
      this.secondName = ''
      this.lastName = ''
      this.selectedPost = ''
      this.login = ''
      this.password = ''
    },
    hideDialog() {
      this.$emit('update:show', false)
      this.firstName = ''
      this.secondName = ''
      this.lastName = ''
      this.selectedPost = ''
      this.login = ''
      this.password = ''
    },
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/posts", {headers: {
          'Authorization': `Bearer ${this.$store.state.token}`}})
      this.posts = res.data
      console.log(this.posts)
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
}

.labels {
  font-size: 16px;
  margin-top: 10px;
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

select {
  margin-top: 10px;
  width: 200px;
  height: 40px;
  border-radius: 12px;
  padding: 10px;
}

input:active {
  border: none;
}

button {
  margin-top: 20px;
  height: 40px;
  width: 100px;
  border-radius: 12px;
  border: 2px solid white;
  background: transparent;
  color: white;
  cursor: pointer;
}

.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog-content {
  margin: auto;
  background: #1a1a1a;
  border-radius: 12px;
  height: 800px;
  width: 500px;
  padding: 20px;
}
</style>