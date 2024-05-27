<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog-content">
      <form @submit.prevent="changeData">
        <p style="margin-top: 10px; margin-bottom: 20px">Изменение пользователя</p>
        <p class="labels">Введите название</p>
        <input type="text" placeholder="Введите название" v-model="name">
        <p class="labels">Введите долготу</p>
        <input type="text" placeholder="Введите долготу" v-model="latitude">
        <p class="labels">Введите широту</p>
        <input type="text" placeholder="Введите широту" v-model="longitude">
        <p class="labels">Выберите ответственного</p>
        <select v-model="selectedAdmin">
          <option v-for="admin in admins" :key="admin.id" :value="admin.id">
            {{ admin.firstname + ' ' + admin.secondname + ' ' + admin.lastname }}
          </option>
        </select>
        <button type="submit">Изменить</button>
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
  watch: {
    show(newVal) {
      if (newVal) {
        this.loadObjectData();
      }
    }
  },
  methods: {
    async loadObjectData() {
      try {
        const res = await axios.get(`http://91.222.238.181/objects/${this.objectId}`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        });
        const object = res.data;
        this.name = object.name;
        this.latitude = object.latitude;
        this.longitude = object.longitude;
        this.selectedAdmin = object.admin;
      } catch (error) {
        console.error("Error loading object data:", error);
      }
    },
    async changeData() {
      try {
        await axios.put(`http://91.222.238.181/objects/${this.objectId}`, {
          name: this.name,
          latitude: this.latitude,
          longitude: this.longitude,
          admin: this.selectedAdmin
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }});
        this.$emit('update:show', false);
      } catch (error) {
        console.error("Error updating object:", error);
      }
    },
    hideDialog() {
      this.$emit('update:show', false);
    },
    async fetchAdmins() {
      try {
        const res = await axios.get("http://91.222.238.181/users", {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }});
        this.admins = res.data;
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    }
  },
  mounted() {
    this.fetchAdmins();
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
  height: 600px;
  max-height: 100%;
  width: 500px;
  padding: 20px;
  overflow: auto;
}
</style>