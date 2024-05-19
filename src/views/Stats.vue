<template>
  <div class="main">
<div class="stats">
  <div class="chart">
    <chart/>
    <chart-objects-app/>
  </div>
</div>
</div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import ChartObjectsApp from "@/components/ChartByObjects.vue";

export default {
  name: "Stats-app",
  components: {ChartObjectsApp, Chart}
}
</script>

<style scoped>


.stats {
  display: flex;
  justify-content: center;
}

.chart {
  width: 80%;
  height: 100%; /* Установите высоту контейнера диаграммы на 500px */
}

</style>
