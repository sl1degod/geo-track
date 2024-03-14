<template>
  <div class="main">
    <login-form/>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login-view",
  components: {LoginForm}
}
</script>

<style scoped>
.main {
  position: relative;
  height: 100%;
}
</style>