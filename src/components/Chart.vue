<template>
  <div>
    <div class="date-inputs">
      <input type="date" v-model="startDate" style="margin-right: 10px;">
      <input type="date" v-model="endDate" style="margin-right: 10px;">
      <button @click="filterChartData">Применить</button>
    </div>
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
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "Chart-app",
  components: { Bar },
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
        return [];
      }

      return this.chartData.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(this.startDate) && date <= new Date(this.endDate);
      });
    }
  },
  methods: {
    filterChartData() {
      const labels = this.filteredChartData.map(item => item.date);
      const data = this.filteredChartData.map(item => item.count);

      if (this.$refs.myChart) {
        this.$refs.myChart.chart.data.labels = labels;
        this.$refs.myChart.chart.data.datasets[0].data = data;
        this.$refs.myChart.chart.update();
      }
    }

  },
  async mounted() {
    const res = await axios.get("http://127.0.0.1:5000/violationsChar", {
      headers: {
        'Authorization': `Bearer ${this.$store.state.token}`
      }
    });
    this.chartData = res.data;
    this.loaded = true;

    // Создаем массив для меток (даты) и значений (количество нарушений)
    const labels = this.chartData.map(item => item.date);
    const data = this.chartData.map(item => item.count);

    this.chart = {
      labels: labels,
      datasets: [
        {
          label: 'Количество нарушений',
          data: data,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderColor: 'rgb(255,255,255)',
          borderWidth: 1,
        }
      ]
    };

    this.filterChartData();

    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Количество нарушений по датам',
          color: 'white',
          font: {
            size: 20
          }
        }
      },
      legend: {
        labels: {
          color: 'white',
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
  }
}


</script>

<style>
.date-inputs {
  text-align: center;
  margin-bottom: 20px;
}
</style>
