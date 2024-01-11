<template>
  <div class="card-container">
    <div class="card" v-for="report in reports" :key="report.id">
      <h3 style="margin-right: 20px; margin-left: 10px;">{{ report.id }}</h3>
      <img src="http://127.0.0.1:5000/static/reports/2.jpg" alt="Изображение">
      <div class="card-info">
        <p>{{ report.fio }}</p>
        <h3>{{ report.violations }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: {
    reports: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
}

.card {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 800px;
}

.card img {
  max-width: 100px;
  margin-right: 20px;
}

.card-info {
  text-align: left;
  flex-direction: column;
}

.card h3 {
  color: white;
}

.card p {
  color: white;
}

</style>