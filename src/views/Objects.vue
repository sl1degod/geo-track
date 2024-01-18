<template>
  <div class="main">
    <div class="map-container">
      <p>Карта</p>
      <yandex-map/>
    </div>
    <div class="objects-container">
      <p>Объекты</p>
      <objects-card-list :objects="objects" class="card-list"/>
    </div>
  </div>
</template>

<script>
import YandexMap from "@/components/Map.vue";
import ObjectsCardList from "@/components/ObjectsCardList.vue";
import axios from "axios";

export default {
  name: "objects-view",
  components: {ObjectsCardList, YandexMap},
  data() {
    return {
      objects: [],
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/objects")
      this.objects = res.data
      console.log(this.objects)
    },
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  color: white;
  display: flex;
}

.map-container {
  width: 60%;
  margin-left: 100px;
}
.map-container p {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}

.objects-container p{
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}

</style>