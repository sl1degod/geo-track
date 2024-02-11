<template>
  <div class="main-card">
    <div class="card"
         v-for="user in users"
         :key="user.id">
      <div class="img-container">
        <img :src="'http://127.0.0.1:5000/static/users/' + user.uuid_image" alt="img">
      </div>
      <p style="margin-top: 10px;">{{ user.secondname + " " + user.firstname }}</p>
      <p>Должность: {{ user.post }}</p>
    </div>
    <div class="new-card" @click="openDialog">
      <img src="../../public/plus.png" alt="img">
      <p>Добавить сотрудника</p>
    </div>
  </div>
  <users-form v-model:show="isVisible" />
</template>

<script>
import {mapGetters} from "vuex";
import UsersForm from "@/components/UsersForm.vue";

export default {
  name: "users-card-list",
  components: {UsersForm},
  data() {
    return {
      users: [],
      isVisible: false
    }
  },
  methods: {
    async fetchData() {
      console.log(localStorage.token);
      this.$store.dispatch('getUsers', localStorage.token);
      this.users = this.getUsers;
    },
    openDialog() {
      this.isVisible = true
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'getUsers'
    })
  },
  mounted() {
    this.fetchData();
    console.log(this.objects);
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