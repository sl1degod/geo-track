<template>
  <div class="main">
    <div class="reports">
      <card-list :reports="reports"/>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import CardList from "@/components/CardList.vue";

export default {
  name: 'MainView',
  data() {
    return {
      reports: []
    }
  },
  components: {
    CardList
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/reports/1")
      this.reports = res.data
      console.log(this.reports)
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
.main {

}
</style>
