<template>
  <div class="main">
    <search-field @searchReports="searchReports"/>
    <p style="color: white; font-size: 30px; margin-bottom: 20px; text-align: center">Список актов</p>
    <div class="reports">
      <card-list :reports="reports"/>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import CardList from "@/components/CardList.vue";
import SearchField from "@/components/SearchField";

export default {
  name: 'MainView',
  data() {
    return {
      reports: [],
      searchField: ""
    }
  },
  components: {
    CardList,
    SearchField
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/reports", {headers: {
          'Authorization': `Bearer ${this.$store.state.token}`}})
      this.reports = res.data
      console.log(res.data)
    },
    searchReports (value) {
      console.log(value)
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
.main {
  height: 100%;
}
</style>
