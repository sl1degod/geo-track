<template>
  <div class="card-container">
    <div class="card">
      <img src="your-image.jpg" alt="Изображение">
      <div class="card-info">
        <h3 v-bind:>{{ report.id }}</h3>
        <p>121</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: {
    report: {
      type: Object,
      required: true
    }
  }
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