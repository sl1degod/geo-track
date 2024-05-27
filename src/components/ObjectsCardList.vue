<template>
  <div class="card-container">
    <div class="search-and-sort">
      <input type="text" v-model="searchQuery" placeholder="Поиск..." @input="filterObjects" />
      <img src="../../public/icons8-сортировать-100.png" alt="Сортировка" class="sort-icon" @click="sortObjects" />
    </div>
    <div class="card"
         style="cursor:pointer;"
         v-for="object in filteredObjects"
         :key="object.id"
         :itemid="object.id"
         @click="openDialogForChangeData">
      <h3 style="margin-right: 20px; margin-left: 10px; width: 20px">{{ object.id }}</h3>
      <div class="image">
        <img :src="'http://91.222.238.181:5000/static/objects/' + object.uuid_image" alt="Изображение">
      </div>
      <div class="card-info">
        <p>{{ object.name }}</p>
        <h3>{{ object.fio }}</h3>
        <p>{{ object.count }}</p>
      </div>
    </div>
    <object-form-change v-model:show="isVisibleForChange" :object-id="objectId"/>
  </div>
</template>

<script>
import ObjectFormChange from "@/components/ObjectChangeForm.vue";

export default {
  name: "objects-card-list",
  components: { ObjectFormChange },
  data() {
    return {
      isVisibleForChange: false,
      objectId: '',
      searchQuery: '',
      sortAscending: true,
      filteredObjects: this.objects // Initialize with all objects
    }
  },
  props: {
    objects: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    objects: {
      handler(newObjects) {
        this.filteredObjects = newObjects;
      },
      immediate: true
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
    filterObjects() {
      const query = this.searchQuery.toLowerCase();
      this.filteredObjects = this.objects.filter(object =>
          object.name.toLowerCase().includes(query) ||
          object.fio.toLowerCase().includes(query) ||
          object.count.toString().includes(query)
      );
    },
    sortObjects() {
      this.sortAscending = !this.sortAscending;
      const sortFactor = this.sortAscending ? 1 : -1;
      this.filteredObjects.sort((a, b) => (a.name > b.name ? sortFactor : -sortFactor));
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-and-sort {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-and-sort input {
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #FFF;
  width: 450px;
}

.search-and-sort .sort-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.card {
  display: flex;
  align-items: center;
  border: 1px solid #FFF;
  border-radius: 5px;
  padding: 10px;
  width: 500px;
  height: 100px;
  margin-bottom: 10px;
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
