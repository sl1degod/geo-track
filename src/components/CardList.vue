<template>
  <div class="card-container">
    <div class="card"
         style="cursor:pointer;"
         v-for="report in reports"
         :key="report.id"
         @click="$router.push(`/reports/${report.id}`)">
      <h3 style="margin-right: 20px; margin-left: 10px; width: 20px">{{ report.id }}</h3>
      <div class="image">
        <img :src="'http://127.0.0.1:5000/static/reports/' + report.violations_image"  alt="Изображение">
      </div>
      <div class="card-info">
        <p>{{ report.fio }}</p>
        <h3>{{ report.violations }}</h3>
        <p>{{ report.date }}</p>
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
  },

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
  border: 1px solid #FFF;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  width: 800px;
  height: 125px;
}

.image img {
  height: 100%;
  width: 100%;
  object-fit: fill;
  border-radius: 8px;

}

.image {
  margin-right: 20px;
  height: 100px;
  width: 130px;
}

.card-info {
  text-align: left;
}

.card h3 {
  color: white;
  margin-right: 20px;
}

.card p {
  color: white;
}

</style>