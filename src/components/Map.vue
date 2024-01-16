<template>
  <div class="map">
    <YandexMap :coordinates="coordinates"
               :zoom="14"
               :controls="controls"
               map-type="map"
               @click="addNewObject">
      <YandexMarker v-for="object in objects"
                    :key="object.id"
                    :coordinates="[object.latitude, object.longitude]"
                    type="Point"
                    marker-id="object.id"
                    options="hint">
      </YandexMarker>
    </YandexMap>
    <object-form v-show="isVisible"/>
  </div>
</template>
<script>
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import axios from "axios";
import ObjectForm from "@/components/ObjectForm.vue";


export default {
  name: 'yandex-map-app',
  components: {ObjectForm, YandexMap, YandexMarker },
  data() {
    return {
      objects: [],
      coordinates: [54.900333, 52.275421],
      controls: [
        'fullscreenControl'
      ],
      isVisible: false,
      latitude: event.get('coords')[0],
      longitude: event.get('coords')[1]
    }
  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/objects");
      this.objects = res.data;
      console.log(res.data);
    },
    addNewObject() {
      this.isVisible = true
      // const newObject = {
      //   id: this.objects.length + 1,
      //   latitude: event.get('coords')[0],
      //   longitude: event.get('coords')[1]
      // };
      // this.objects.push(newObject);
    }
    // addNewObject(event) {
    //   this.dialogVisible = true
    //   const newObject = {
    //     id: this.objects.length + 1,
    //     latitude: event.get('coords')[0],
    //     longitude: event.get('coords')[1]
    //   };
    //   this.objects.push(newObject);
    // }
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
