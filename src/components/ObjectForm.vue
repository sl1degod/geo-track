<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog-content">
      <form @submit.prevent>
        <p style="margin-top: 10px; margin-bottom: 20px">Создание объекта</p>
        <p class="labels">Название объекта</p>
        <input type="text" v-model="objectName" placeholder="Название объекта">
        <p class="labels">Ответственный сотрудник</p>
        <select v-model="adminId">
          <option v-for="object in adminId" :key="object.id" :value="object.id">
            {{ object.firstname + ' ' + object.secondname + ' ' + object.lastname }}
          </option>
        </select>
        <p class="labels">Долгота</p>
        <input type="text" placeholder="Долгота" :value="longitude">
        <p class="labels">Широта</p>
        <input type="text" placeholder="Широта" :value="latitude">
        <button @click="createObject">Добавить</button>
      </form>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "object-form",
  data() {
    return {
      objectName: "",
      adminId: [],
    }
  },
  props: {
    longitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    afterClick: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async createObject() {
      const data = {
        name: this.objectName,
        longitude: this.longitude,
        latitude: this.latitude,
        admin: this.adminId
      };
      const res = await axios.post("http://127.0.0.1:5000/objects", data);
      console.log(res.data);
      this.$emit('update:show', false)
      window.location.reload();
    },
    hideDialog() {
      this.$emit('update:show', false)
    },
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/users")
      this.adminId = res.data
      console.log(this.objects)
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: 20px;
  text-align: center;
}

.labels {
  font-size: 16px;
  margin-top: 10px;
}

input {
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-top: 10px;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
}

select {
  margin-top: 10px;
  width: 200px;
  height: 40px;
  border-radius: 12px;
  padding: 10px;
}

input:active {
  border: none;
}

button {
  margin-top: 20px;
  height: 40px;
  width: 100px;
  border-radius: 12px;
  border: 2px solid white;
  background: transparent;
  color: white;
  cursor: pointer;
}

.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog-content {
  margin: auto;
  background: #1a1a1a;
  border-radius: 12px;
  min-height: 500px;
  min-width: 400px;
  padding: 20px;
}


</style>