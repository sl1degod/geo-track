<template>
  <div class="main">
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'MainView',
  data() {
    return {
      fio: ""
    }
  },
  computed: {
    firstName() {
      return this.fio
    }
  },
  components: {

  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/users/1")
      this.fio = res.data
      console.log(res.data)
      console.log("123")
    }
  },
  mounted() {
    // this.fetchData();
  },
}
</script>

<style>

</style>
