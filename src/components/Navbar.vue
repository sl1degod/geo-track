<template>
  <div class="nav">
    <div class="logo" @click="$router.push('/reports')">
      Geo Track
    </div>
    <div class="navigation">
      <a @click="$router.push('/reports')">Нарушения</a>
      <a @click="$router.push('/objects')">Объекты</a>
      <a @click="$router.push('/stats')">Статистика</a>
      <a @click="$router.push('/profile')">Сотрудники</a>
      <a @click="$router.push('/about')">О продукте</a>
<!--      <button class="profile_btn" @click.prevent="$router.push('/profile')" v-show="getAuthStatus">Профиль</button>-->
      <button class="sign_btn" @click="logout" v-show="getAuthStatus">Выйти</button>
    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "app-navbar",
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.state.token = null
      this.$store.dispatch('changeAuthStatus', false);
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters({
      getAuthStatus: 'getIsAuthorized'
    })
  },
  mounted() {
    this.isAuth = this.getAuthStatus
  }
}
</script>

<style scoped>
.nav {
  background: #111111;
  height: 75px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.logo {
  color: white;
  font-size: 20px;
  margin-left: 50px;
  cursor: pointer;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.navigation {
  height: 50px;
  display: flex;
  align-items: center;
  margin-right: 50px;
  padding: 0 15px;
}

.navigation a {
  text-decoration: none;
  color: white;
  margin-left: 20px;
  cursor: pointer;
  border-bottom: solid transparent 1px;
  transition-delay: 0.2s;
  transition-duration: 0.3s;
}

.navigation a:hover {
  border-bottom: solid #ffffff 1px;
}

.profile_btn {
  margin-left: 100px;
  color: white;
  border: solid 2px white;
  padding: 5px;
  background: transparent;
  cursor: pointer;
}
.sign_btn {
  margin-left: 20px;
  color: white;
  border: solid 2px white;
  padding: 5px;
  background: transparent;
  cursor: pointer;
  margin-bottom: 20px;
}

</style>