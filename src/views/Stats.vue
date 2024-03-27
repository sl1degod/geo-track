<template>
<div class="stats">
  <chart/>
</div>
</template>

<script>
import Chart from "@/components/Chart.vue";

export default {
  name: "Stats-app",
  components: {Chart}
}
</script>

<style scoped>
.stats {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Установите высоту контейнера, чтобы диаграмма была видимой */
}

chart {
  width: 80%; /* Установите ширину диаграммы */
}
</style>