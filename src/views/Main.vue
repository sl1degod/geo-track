<template>
  <div class="main">
    <div class="reports">
      <card-list/>
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
      report: {
        id: "",
        fio: "",
        violations: "",
        object: "",
        latitude: "",
        longitude: "",
        violations_image: "",
        date: "",
        time: ""
      }
    }
  },
  components: {
    CardList
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/reports/1")
      this.report = res.data
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
