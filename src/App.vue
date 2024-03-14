<template>
  <navbar/>
  <div class="app">
    <router-view/>
  </div>
  <app-footer/>

</template>

<script>



import Navbar from "@/components/Navbar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  components: {
    AppFooter,
    Navbar
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.app {
  padding: 20px;
  background: #1a1a1a;
  height: 100%;
}

</style>
