<template>
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
  height: 100vh;
  display: flex;
  flex-direction: row;
}

users-card-list {
  align-items: center;
  justify-content: center;

}





</style>