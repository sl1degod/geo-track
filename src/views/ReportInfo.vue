<template>
  <div class="main">
    <p style="color: white; text-align: center; font-size: 30px; margin-top: 50px;">Отчет о нарушении #{{ $route.params.id }}</p>
    <div class="container">
    <div class="image">
      <img :src="'http://91.222.238.181:5000/reports/' + reports.violations_image">
    </div>
      <div class="info">
      <div class="report-info">
        <p>Составитель: {{reports.fio}}</p>
        <p>Тип нарушения: {{reports.violations}}</p>
        <p>Описание: {{reports.description}}</p>
        <p>Координаты нарушения: {{reports.rep_latitude}}, {{reports.rep_longitude}}</p>
        <p>Объект: {{reports.object}}</p>
        <p>Нужно устранить: {{reports.days}}</p>
        <p>Статус: {{reports.status}}</p>
        <p>Дата составления: {{reports.date}}, {{ reports.time }}</p>
        <div class="btn">
          <button @click="download" v-show="isVisible">Сформировать акт</button>
          <button @click="sendEmail" v-show="isVisible">Отправить по почте</button>
          <button @click="changeStatusVio">Устранено</button>
          <button @click="deleteVio" v-show="isVisible">Удалить нарушение</button>
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
      reports: [],
      isVisible: false
    }
  },
  components: {

  },
  methods: {
    async fetchData() {
      const res = await axios.get("http://91.222.238.181:5000/reports/" + this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      })
      this.reports = res.data[0]
      console.log(res.data)
    },
    async download() {
      if (parseInt(localStorage.getItem('user_role')) === 2 || parseInt(localStorage.getItem('user_role')) === 3) {

        axios
            .get("http://91.222.238.181:5000/reportsAct/" + this.$route.params.id, {
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
      }
    },
    async deleteVio() {
      if (parseInt(localStorage.getItem('user_role')) === 2 || parseInt(localStorage.getItem('user_role')) === 3) {

        await axios.delete("http://91.222.238.181:5000/reports/" + this.$route.params.id, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        })
        alert("Удаление прошло успешно")
        this.$router.push('/reports');
      }
    },

    async changeStatusVio() {
      await axios.patch("http://91.222.238.181:5000/reports/" + this.$route.params.id, {status: 'Устранено'}, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      })
      alert("Статус был изменен")
      this.$router.push('/reports');
    },

    async sendEmail() {
      if (parseInt(localStorage.getItem('user_role')) === 2 || parseInt(localStorage.getItem('user_role')) === 3) {

        const email = prompt("Введите адрес электронной почты:");
        if (email) {
          try {
            await axios.post(`http://91.222.238.181:5000/reports/${this.$route.params.id}/sendEmail`, {email}, {
              headers: {
                'Authorization': `Bearer ${this.$store.state.token}`
              }
            });
            alert("Документ успешно отправлен на указанный адрес: " + email);
          } catch (error) {
            console.error('Ошибка при отправке по почте:', error);
          }
        }
      }
    },

    async showDialog() {
      this.isVisible = true
    }


  },
    mounted() {
      this.fetchData();
      if (parseInt(localStorage.getItem('user_role')) === 2 || parseInt(localStorage.getItem('user_role')) === 3) {
        this.showDialog()
      }
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
  height: 50%;
  width: 50%;
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

.btn {
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>