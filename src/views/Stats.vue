<template>
<div class="stats">
  <div class="chart">
    <chart/>
  </div>
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
  height: 70vh; /* Установите высоту контейнера, чтобы диаграмма была видимой */
}

.chart {
  width: 80%; /* Установите ширину диаграммы на 100% */
  height: 400px; /* Установите желаемую высоту диаграммы (например, 400px) */
}
</style>
