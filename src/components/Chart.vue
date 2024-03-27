<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chart"
      v-if="loaded"
  />
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
      chartData: []
    }
  },
  async mounted() {
    const res = await axios.get("http://127.0.0.1:5000/violationsChar", {headers: {
        'Authorization': `Bearer ${this.$store.state.token}`}})
    this.chartData = res.data
    this.loaded = true

    // Создаем массив для меток (даты) и значений (количество нарушений)
    const labels = this.chartData.map(item => item.date)
    const data = this.chartData.map(item => item.count)
    console.log(this.chartData)



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
    }

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
    }
  }

}

</script>

<style scoped>

</style>