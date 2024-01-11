<template>
  <div class="nav">
    <div class="logo" @click="$router.push('/')">
      Geo Track
    </div>
    <div class="navigation">
      <a @click="$router.push('/objects')">Объекты</a>
      <a @click="$router.push('/about')">О продукте</a>
      <button class="sign_btn">Войти</button>
    </div>
  </div>

</template>

<script>



export default {
  name: "app-navbar",
  components: {
  },
}
</script>

<style scoped>
.nav {
  background: #111111;
  height: 75px;
  box-shadow: 2px 2px 4px white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  /*border-bottom: solid 1px white;*/
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
}

.navigation a:hover {
  border-bottom: solid white 1px;
}

.sign_btn {
  margin-left: 100px;
  color: white;
  border: solid 2px white;
  padding: 5px;
}

</style>