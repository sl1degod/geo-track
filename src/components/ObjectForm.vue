<template>
  <div class="dialog">
    <div class="dialog-content">
      <form>
        <p>Создание объекта</p>
        <input type="text" v-model="objectName" placeholder="Название объекта">
        <input type="text" placeholder="ФИО ответственного">
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
  },
  methods: {
    async createObject() {
      const data = {
        name: this.objectName,
        // longitude: this.longitude,
        // latitude: this.latitude
      };
      const res = await axios.post("http://127.0.0.1:5000/objects", data);
      this.objects = res.data;
      console.log(res.data);
    },
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
  margin-top: 30px;
  text-align: center;
  margin-bottom: 50px;
}

input {
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-top: 20px;
  align-items: center;
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
  min-height: 400px;
  min-width: 300px;
  padding: 20px;
}

</style>