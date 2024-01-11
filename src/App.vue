<template>
  <navbar/>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>



import Navbar from "@/components/Navbar.vue";

export default {
  components: {
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
