<template>
  <div class="main" style="height: 100vh">
    <h1 style="color: white; text-align: center;">Отчет о нарушении #{{ $route.params.id }}</h1>
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
      this.reports = res.data
      console.log(res.data)
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>

</style>