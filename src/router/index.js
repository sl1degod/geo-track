import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue";
import About from "@/views/About.vue";
import Objects from "@/views/Objects.vue";
import ReportInfo from "@/views/ReportInfo.vue";
import Login from "@/views/Login.vue";
import store from "@/store";
import Profile from "@/views/Profile.vue";

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
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/objects',
    component: Objects,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: "/reports/:id",
    name: "ReportInfo",
    component: ReportInfo,
    props: true,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.access_token || !store.getters.getIsAuthorized) {
      next('/login');
      alert('Для перехода на страницу, необходимо авторизироваться');
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
