<template>
  <div class="left-container">
    <div class="user-img">
      <img :src="`https://sl1degod.ru/static/users/`+ user.uuid_image"  alt="Изображение">
    </div>
    <div class="info-user">
      <p>{{ user.secondname + " " + user.firstname }}</p>
      <p style="margin-top: 10px;">Должность: {{ user.post }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "left-bar",
  data() {
    return {
      user: []
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get(`https://sl1degod.ru/users/${localStorage.getItem('user_id')}`, {headers: {
          'Authorization': `Bearer ${this.$store.state.token}`}})
      this.user = res.data
      console.log(res.data)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.left-container {
  display: flex;
  margin-left: 50px;
  flex-direction: column;
}

.user-img {
  width: 220px;
  height: 300px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-img img{
  max-width: 250px;
  max-height: 300px;
  border-radius: 16px;
}

.info-user {
  width: 220px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #FFFFFF;
  flex-wrap: wrap;
}
</style>