<template>
  <div class="main">
    <p style="color: white; font-size: 30px; margin-bottom: 20px; text-align: center">Список актов</p>
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
      reports: [],
    }
  },
  components: {
    CardList
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/reports", {headers: {
          'Authorization': `Bearer ${localStorage.access_token}`}})
      this.reports = res.data
      console.log(res.data)
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
