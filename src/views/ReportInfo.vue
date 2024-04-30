<template>
  <div class="main">
    <p style="color: white; text-align: center; font-size: 30px; margin-top: 50px;">Отчет об акте #{{ $route.params.id }}</p>
    <div class="container">
    <div class="image">
      <img :src="'http://127.0.0.1:5000/static/reports/' + reports.violations_image">
    </div>
      <div class="info">
      <div class="report-info">
        <p>Составитель: {{reports.fio}}</p>
        <p>Тип нарушения: {{reports.violations}}</p>
        <p>Описание: {{reports.description}}</p>
        <p>Координаты нарушения: {{reports.rep_latitude}}, {{reports.rep_longitude}}</p>
        <p>Объект: {{reports.object}}</p>
        <p>Дата составления: {{reports.date}}, {{ reports.time }}</p>
        <div class="btn">
          <button @click="download">Сформировать акт</button>
          <button @click="deleteVio" style="margin-left: 20px;">Удалить нарушение</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "report-info-view",
  data() {
    return {
      reports: []
    }
  },
  components: {

  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://127.0.0.1:5000/reports/" + this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      })
      this.reports = res.data[0]
      console.log(res.data)
    },
    async download() {
      axios
          .get("http://127.0.0.1:5000/reportsAct/" + this.$route.params.id, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.token
            },
            responseType: 'blob'
          })
          .then(response => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'act.docx'); // Указываем имя файла для скачивания
            link.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Ошибка при скачивании файла:', error);
          });
    },
    async deleteVio() {
      await axios.delete("http://127.0.0.1:5000/reports/" + this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      })
      alert("Удаление прошло успешно")
      this.$router.push('/reports');
    },

  },
    mounted() {
    this.fetchData();
  }

}
</script>

<style scoped>
.main {
  height: 100%;
  min-height: 900px;
}

.container {
  display: flex;
  margin-top: 50px;
  margin-left: 200px;
}

.info {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  height: auto;
  width: auto;
  margin-left: 100px;
  align-items: center;
  margin-top: 50px;
}

.image {
  margin-top: 50px;
  height: 35%;
  width: 35%;
  object-fit: cover;
  border-radius: 8px;
}

p {
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
}

button {
  width: 200px;
}
</style>