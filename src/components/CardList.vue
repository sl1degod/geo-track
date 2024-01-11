<template>
  <div class="card-container">
    <div class="card">
      <img src="http://127.0.0.1:5000/static/reports/1.jpg" alt="Изображение">
      <div class="card-info">
        <h3>{{ reports.id }}</h3>
        <p>{{ reports.fio }}</p>
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