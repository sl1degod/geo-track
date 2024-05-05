<template>
  <div class="card-container">
    <div class="card"
         style="cursor:pointer;"
         v-for="objects in objects"
         :key="objects.id"
         :itemid="objects.id"
         @click="openDialogForChangeData">
      <h3 style="margin-right: 20px; margin-left: 10px; width: 20px">{{ objects.id }}</h3>
      <div class="image">
        <img :src="'http://127.0.0.1:5000/static/objects/' + objects.uuid_image"  alt="Изображение">
      </div>
      <div class="card-info">
        <p>{{ objects.name }}</p>
        <h3>{{ objects.fio }}</h3>
        <p>{{ objects.count }}</p>
      </div>
    </div>
    <object-form-change  v-model:show="isVisibleForChange" :object-id="objectId"/>
  </div>
</template>

<script>
import ObjectFormChange from "@/components/ObjectChangeForm.vue";

export default {
  name: "objects-card-list",
  components: {ObjectFormChange},
  data() {
    return {
      isVisibleForChange: false,
      objectId: ''
    }
  },
  props: {
    objects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async openDialogForChangeData(event) {
      if (parseInt(localStorage.getItem('user_role')) === 2) {
        this.isVisibleForChange = true
        this.objectId = event.currentTarget.getAttribute('itemid');
        console.log('Выбранный айди объекта:', this.objectId);
      } else {
        console.log(123)
      }
    },
  },

}
</script>

<style scoped>
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
  padding: 10px;
  width: 500px;
  height: 100px;
}

.image img {
  height: 100%;
  width: 100%;
  object-fit: fill;
  border-radius: 8px;
}

.image {
  margin-right: 20px;
  height: 80px;
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