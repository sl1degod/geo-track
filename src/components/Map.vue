<template>
  <div class="map">
    <YandexMap :coordinates="coordinates"
               :zoom="14"
               :controls="controls"
               map-type="map"
               @click="handleMapClick">
      <YandexMarker v-for="object in objects"
                    :key="object.id"
                    :coordinates="[object.latitude, object.longitude]"
                    type="Point"
                    marker-id="object.id"
                    options="hint">
      </YandexMarker>
    </YandexMap>
    <object-form v-model:show="isVisible" :latitude="latitude" :longitude="longitude" :after-click="afterClick" :all-objects="objects"/>
  </div>
</template>
<script>
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import axios from "axios";
import ObjectForm from "@/components/ObjectForm.vue";

export default {
  name: 'yandex-map-app',
  components: {ObjectForm, YandexMap, YandexMarker},
  data() {
    return {
      objects: [],
      coordinates: [54.900333, 52.275421],
      controls: [
        'fullscreenControl'
      ],
      isVisible: false,
      latitude: null,
      longitude: null,
      afterClick: false
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/objects", {headers: {
          'Authorization': `Bearer ${localStorage.access_token}`}});
      this.objects = res.data;
    },
    handleMapClick(event) {
      this.isVisible = true;
      this.afterClick = true;
      this.latitude = event.get('coords')[0];
      this.longitude = event.get('coords')[1];
      console.log('Latitude:', this.latitude);
      console.log('Longitude:', this.longitude);
    },
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>

.yandex-container {
  width: 80%;
  height: 600px;
  border: solid white 2px;
  border-radius: 16px;
  padding: 10px;
}
</style>
