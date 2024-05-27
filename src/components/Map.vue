<template>
  <div class="map">
    <YandexMap :coordinates="coordinates"
               :zoom="14"
               :controls="controls"
               map-type="map"
               @click="handleMapClick"
               class="yandex-container">
      <YandexMarker v-for="object in objects"
                    :key="object.id"
                    :coordinates="[object.latitude, object.longitude]"
                    :options="circleOptions">
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
      controls: ['fullscreenControl'],
      isVisible: false,
      latitude: null,
      longitude: null,
      afterClick: false,
      radius: 100
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://91.222.238.181/objects", {
        headers: {
          'Authorization': `Bearer ${localStorage.access_token}`
        }
      });
      this.objects = res.data;
    },
    handleMapClick(event) {
      if (parseInt(localStorage.getItem('user_role')) === 2) {
        this.isVisible = true;
        this.afterClick = true;
        this.latitude = event.get('coords')[0];
        this.longitude = event.get('coords')[1];
      } else {
        console.log(123)
      }
    },
    async markerOptions() {
      const violationCount = this.objects.count; // Предположим, что количество нарушений находится в объекте
      return {
        hintContent: `Нарушения: ${violationCount}`,
        balloonContent: `Нарушения: ${violationCount}`,
        preset: `islands#circleIcon`,
        iconRadius: this.radius,
        iconColor: `rgba(0, 191, 255, 0.3)` // Светло-синий цвет с прозрачностью
      };
    },
  },
  computed: {
    circleOptions() {
      return {
        fillColor: 'rgba(0, 191, 255, 0.1)', // Задает цвет заливки зоны
        strokeColor: 'rgba(0, 191, 255, 0.5)', // Задает цвет обводки зоны
        strokeWidth: 2 // Задает толщину обводки зоны
      };
    }
  },
  async mounted() {
    await this.fetchData();
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
