import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue";
import About from "@/views/About.vue";
import Objects from "@/views/Objects.vue";
import ReportInfo from "@/views/ReportInfo.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/reports',
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
  {
    path: "/reports/:id",
    name: "ReportInfo",
    component: ReportInfo,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
