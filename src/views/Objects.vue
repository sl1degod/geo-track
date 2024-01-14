<template>
  <div class="main">
    <yandex-map/>
  </div>
</template>

<script>

import YandexMap from "@/components/Map.vue";

export default {
  name: "objects-view",
  components: {YandexMap},
}
</script>

<style scoped>
.main {
  height: 100vh;
  color: white;
}
</style>