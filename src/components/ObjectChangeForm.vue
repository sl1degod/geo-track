<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog-content">
      <form @submit.prevent>
        <p style="margin-top: 10px; margin-bottom: 20px">Изменение пользоваеля</p>
        <p class="labels">Введите название</p>
        <input type="text" placeholder="Введите название" v-model="name">
        <p class="labels">Введите долоту</p>
        <input type="text" placeholder="Введите долоту" v-model="latitude">
        <p class="labels">Введите широту</p>
        <input type="text" placeholder="Введите широту" v-model="longitude">
        <p class="labels">Выберите ответственного</p>
        <select v-model="selectedAdmin">
          <option v-for="admin in admins" :key="admin.id" :value="admin.id">
            {{ admin.firstname + ' ' + admin.secondname + ' ' + admin.lastname }}
          </option>
        </select>
        <button @click="changeData">Изменить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ObjectFormChange",
  data() {
    return {
      objects: [],
      admins: [],
      name: '',
      latitude: '',
      longitude: '',
      selectedAdmin: ''
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    objectId: {
      type: String,
      required: true
    }
  },
  methods: {
    async changeData() {
      await axios.put(`http://127.0.0.1:5000/objects/${this.objectId}`,
          {
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude,
            admin: this.selectedAdmin
          }, {
            headers: {
              'Authorization': `Bearer ${this.$store.state.token}`
            }})
      this.$emit('update:show', false)
    },
    hideDialog() {
      this.$emit('update:show', false)
    },
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/users", {headers: {
          'Authorization': `Bearer ${this.$store.state.token}`}})
      this.admins = res.data
      console.log(this.userId)
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
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
  color: #FFFFFF;
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
  height: 800px;
  max-height: 100%;
  width: 500px;
  padding: 20px;
  overflow: auto;
}
</style>