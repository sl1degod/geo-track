<template>
  <div class="main">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chart"
        ref="myChart"
        v-if="loaded"
    />
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "ChartByObjects",
  components: {Bar},
  data() {
    return {
      loaded: false,
      chartData: [],
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    filteredChartData() {
      if (!this.chartData || !this.startDate || !this.endDate) {
        return this.chartData;
      }

      return this.chartData.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(this.startDate) && date <= new Date(this.endDate);
      });
    }
  },
  methods: {
    filterChartData() {
      const labels = this.filteredChartData.map(item => item.object_name);
      const data = this.filteredChartData.map(item => item.violation_count);

      if (this.$refs.myChart) {
        this.$refs.myChart.chart.data.labels = labels;
        this.$refs.myChart.chart.data.datasets[0].data = data;
        this.$refs.myChart.chart.update();
      }
    }
  },
  async mounted() {
    const res = await axios.get("https://sl1degod.ru/objectsChar", {
      headers: {
        'Authorization': `Bearer ${this.$store.state.token}`
      }
    });
    this.chartData = res.data;
    this.loaded = true;

    // Создаем массив для меток (названия объектов) и значений (количество нарушений)
    const labels = this.chartData.map(item => item.object_name);
    const data = this.chartData.map(item => item.violation_count);

    this.chart = {
      labels: labels,
      datasets: [
        {
          label: 'Количество нарушений на объектах',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Количество нарушений на объектах',
          color: 'white',
          font: {
            size: 20
          }
        },
        legend: {
          labels: {
            color: 'white',
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white'
          }
        },
        y: {
          ticks: {
            color: 'white'
          }
        }
      }
    };

    this.filterChartData();
  }
}
</script>

<style scoped>
.main {
  margin-top: 100px;
}
</style>
