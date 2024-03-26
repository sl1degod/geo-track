<template>
  <input class="searchField" type="text" placeholder="Поиск нарушений" @change="searchReports" v-model="text"/>
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
.searchField {

}
</style>