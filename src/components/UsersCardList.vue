<template>
  <div class="main-card">
  <search-field @searchEmpl="searchEmpl" @click="sortByDate"/>
    <div class="main">
    <div class="card"
         v-for="user in filter"
         :key="user.id"
         :itemid="user.id"
         @click="openDialogForChangeData">
      <div class="img-container">
        <img :src="'http://91.222.238.181/static/users/' + user.uuid_image" alt="img">
      </div>
      <p style="margin-top: 10px;">{{ user.secondname + " " + user.firstname }}</p>
      <p>Должность: {{ user.post }}</p>
    </div>
    <div class="new-card" @click="openDialog">
      <img src="../../public/plus.png" alt="img">
      <p>Добавить сотрудника</p>
    </div>
    </div>
  </div>
  <users-form v-model:show="isVisible" />
  <users-form-change v-model:show="isVisibleForChange" :clickedUser="clickedUser" :user-id="userId"/>
</template>

<script>
import {mapGetters} from "vuex";
import UsersForm from "@/components/UsersForm.vue";
import SearchField from "@/components/SearchField";
import UsersFormChange from "@/components/UsersFormChange.vue";
import axios from "axios";

export default {
  name: "users-card-list",
  components: {UsersFormChange, UsersForm, SearchField},
  data() {
    return {
      users: [],
      clickedUser: [],
      userId: "",
      isVisible: false,
      isVisibleForChange: false,
      search: ""
    }
  },
  methods: {
    async fetchData() {
      console.log(localStorage.token);
      this.$store.dispatch('getUsers', localStorage.token);
      this.users = this.getUsers;
    },
    openDialog() {
      if (parseInt(localStorage.getItem('user_role')) === 2) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    },
    async openDialogForChangeData(event) {
      if (parseInt(localStorage.getItem('user_role')) === 2) {
        this.isVisibleForChange = true
        this.userId = event.currentTarget.getAttribute('itemid');
        console.log('Выбранный айди карточки:', this.userId);
        const resUsers = await axios.get(`http://91.222.238.181/users/${this.userId}`, {headers: {
            'Authorization': `Bearer ${this.$store.state.token}`}})
        this.clickedUser = resUsers.data
      } else {
        console.log(123)
      }
    },
    searchEmpl(value) {
      this.search = value;
    },
    sortByDate() {
      if (this.sortedByDate) {
        this.users.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.sortedByDate = false;
      } else {
        this.users.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.sortedByDate = true;
      }
    },
  },
  computed: {
    ...mapGetters({
      getUsers: 'getUsers'
    }),
    filter() {
      if (!this.search) {
        return this.users;
      } else {
        return this.users.filter((user) =>
            (user.secondname + " " + user.firstname + " " + user.lastname).toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },

  },
  mounted() {
    this.fetchData();
    console.log(this.objects);
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
}
.main-card {
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
  flex-wrap: wrap;
  margin-bottom: 50px;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
  border-radius: 16px;
  border: 2px solid white;
  cursor: pointer;
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