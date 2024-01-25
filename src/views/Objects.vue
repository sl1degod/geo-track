<template>
  <div class="main">
    <div class="map-container">
      <p>Карта</p>
      <yandex-map/>
      <p style="font-size: 14px">*Для того, чтобы добавить новый объект, нажмите на нужное вам место на карте</p>
    </div>
    <div class="objects-container">
      <p>Объекты</p>
      <transition-group name="object-list">
        <objects-card-list :objects="getObjects" class="card-list"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import YandexMap from "@/components/Map.vue";
import ObjectsCardList from "@/components/ObjectsCardList.vue";
import {mapGetters} from "vuex";


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
      this.$store.dispatch('fetchObjects', this.$store.state.token);
      this.objects = this.getObjects;
    },
  },
  computed: {
    ...mapGetters({
      getObjects: 'getObjects'
    })
  },
  mounted() {
    this.fetchData();
    console.log(this.objects)
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

.objects-container p {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}

.object-list-item {
  display: inline-block;
  margin-right: 10px;
}

.object-list-enter-active,
.object-list-leave-active {
  transition: all 0.5s ease;
}

.object-list-enter-from,
.object-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.object-list-move {
  transition: all 0.5s ease;
}


</style>