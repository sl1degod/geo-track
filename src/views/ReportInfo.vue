<template>
  <div class="main">
    <p style="color: white; text-align: center; font-size: 30px;">Отчет об акте #{{ $route.params.id }}</p>
    <div class="container">
    <div class="image">
      <img :src="'http://127.0.0.1:5000/static/reports/' + reports.violations_image">
    </div>
      <div class="info">
      <div class="report-info">
        <p>Составитель: {{reports.fio}}</p>
        <p>Тип нарушения: {{reports.violations}}</p>
        <p>Описание: {{reports.description}} null</p>
        <p>Объект: {{reports.object}}</p>
        <p>Дата составления: {{reports.date}}, {{ reports.time }}</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "report-info-view",
  data() {
    return {
      reports: []
    }
  },
  components: {

  },
  methods: {
    async fetchData() {
      const res = await axios.get(`http://127.0.0.1:5000/reports/` + this.$route.params.id)
      this.reports = res.data[0]
      console.log(res.data)
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
.main {
  height: 80vh;
}

.container {
  display: flex;
  margin-top: 50px;
  margin-left: 200px;
}

.info {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  height: auto;
  width: auto;
  margin-left: 100px;
  align-items: center;
}

.image {
  margin-top: 50px;
  height: 35%;
  width: 35%;
  object-fit: cover;
  border-radius: 8px;
}

p {
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>