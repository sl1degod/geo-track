<template>
  <div class="left-container">
    <div class="user-img">
      <img src="http://127.0.0.1:5000/static/users/1.jpg"  alt="Изображение">
    </div>
    <div class="info-user">
      <p>ФамилияИмя</p>
      <p>Должность:Сотрудник</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "left-bar"
}
</script>

<style scoped>
.left-container {
  display: flex;
  margin-left: 50px;
  margin-top: 50px;
  flex-direction: column;
}

.user-img {
  width: 220px;
  height: 300px;
  border-radius: 16px;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-img img{
  max-width: 200px;
  max-height: 250px;
  border-radius: 16px;
}

.info-user {
  width: 220px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: #FFFFFF;
  flex-wrap: wrap;
}
</style>