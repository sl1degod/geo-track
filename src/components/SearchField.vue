<template>
  <div class="input-field">
    <input class="searchField" type="text" placeholder="Поиск нарушений" @change="searchReports" v-model="text"/>
    <img src="../../public/icons8-сортировать-100.png" alt="img" style="height: 30px; width: 30px; margin-top: 10px; cursor:pointer; color: #FFFFFF" @click="sortByDate">
  </div>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      text: ""
    }
  },
  methods: {
    searchReports() {
      this.$emit('searchReports', this.text)
    }
  }
}
</script>

<style scoped>
.input-field {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.searchField {
  width: 800px;
  height: 50px;
  background-color: transparent;
  padding: 10px;
  border-radius: 16px;
  border: 2px solid white;
  color: #FFFFFF;
}
</style>