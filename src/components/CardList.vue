<template>
  <div class="card-container">
    <div class="card" v-for="report in reports" :key="report.id">
      <img src="http://127.0.0.1:5000/static/reports/ + {{ report }}" alt="Изображение">
      <div class="card-info">
        <h3>{{ report }}</h3>
        <p>{{ report }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: ['reports']
}
</script>

<style>
.card-container {
  display: flex;
  justify-content: center;
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