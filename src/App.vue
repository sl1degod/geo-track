<template>
  <div class="wrapper">
    <navbar />
    <div class="app">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  components: {
    AppFooter,
    Navbar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

html, body {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app {
  flex: 1;
  padding: 20px;
  background: #1a1a1a;
}
</style>
