import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue";
import About from "@/views/About.vue";
import Objects from "@/views/Objects.vue";

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/objects',
    component: Objects
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
