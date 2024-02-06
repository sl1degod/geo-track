<template>
  <p style="font-size: 36px;color:#FFFFFF; text-align: center; margin-top: 20px;">Список сотрудников</p>
  <div class="main">
    <left-bar/>
    <users-card-list/>
  </div>
</template>

<script>
import UsersCardList from "@/components/UsersCardList.vue";
import LeftBar from "@/components/LeftBar.vue";

export default {
  name: "profile-view",
  components: {LeftBar, UsersCardList}
}
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
}

users-card-list {
}





</style>