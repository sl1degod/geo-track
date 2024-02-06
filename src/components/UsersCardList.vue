<template>
  <div class="main-card">
    <div class="card"
         v-for="user in users"
         :key="user.id">
      <div class="img-container">
        <img :src="'http://127.0.0.1:5000/static/users/' + user.uuid_image + '.jpg'" alt="img">
      </div>
      <p style="margin-top: 10px;">{{ user.lastname + " " + user.firstname }}</p>
      <p>Должность: {{ user.post }}</p>
    </div>
    <div class="new-card" @click="newUser">
      <img src="../../public/plus.png" alt="img">
      <p>Добавить сотрудника</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "users-card-list",
  data() {
    return {
      users: []
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/users", {headers: {
          'Authorization': `Bearer ${this.$store.state.token}`}})
      this.users = res.data
    },
    async newUser() {
      console.log(123)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.main-card {
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
  border-radius: 16px;
  border: 2px solid white;
}

.img-container {
  align-items: center;
}

.img-container img{
  max-width: 200px;
  max-height: 270px;
  border-radius: 16px;
}

.new-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
  border-radius: 16px;
  border: 2px solid black;
  margin: 10px;
  padding: 10px;
}

.new-card p {
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>