import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import SigupPage from '../views/SigupPage.vue';
import TabsPage from '../views/TabsPage.vue';
import TraductorPage from '../views/TraductorPage.vue';
import DiccionariPage from '../views/DiccionariPage.vue';
import LoginPage from '../views/LoginPage.vue';


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/LoginPage',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/SigupPage',
    name: 'SigupPage',
    component: SigupPage
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "TraductorPage",
        component: TraductorPage,
      },
      {
        path: "DiccionariPage",
        component: DiccionariPage,
      }
    ],
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //duracion de desplazamiento entre pantallas 
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        duration: 100, // Ajusta la duración en milisegundos
        type: 'smooth', // Tipo de animación ('smooth' para animación suave)
      };
    }
  },
})

export default router
