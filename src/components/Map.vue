<template>
  <div class="map">
    <YandexMap :coordinates="coordinates"
               :zoom="14"
               :controls="controls"
               map-type="map">
      <YandexMarker v-for="object in objects"
                    :key="object.id"
                    :coordinates="[object.latitude, object.longitude]"
                    type="Point"
                    marker-id="object.id">
      </YandexMarker>
    </YandexMap>
  </div>
</template>

<script>
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import axios from "axios";

export default {
  name: 'yandex-map-app',
  components: { YandexMap, YandexMarker },
  data() {
    return {
      objects: [],
      coordinates: [54.900333, 52.275421],
      controls: [
        'fullscreenControl'
      ],
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/objects");
      this.objects = res.data;
      console.log(res.data);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.yandex-container {
  margin-top: 50px;
  width: 60%;
  height: 600px;
  border: solid white 2px;
  padding: 10px;
  border-radius: 16px;
}
</style>
