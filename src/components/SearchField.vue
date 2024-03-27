<template>
  <div class="input-field">
    <input class="searchField" type="text" placeholder="Поиск нарушений" @change="searchReports" v-model="text"/>
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
  height: 40px;
  background-color: transparent;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid white;
  color: #FFFFFF;
}
</style>