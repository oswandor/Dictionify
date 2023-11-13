import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import SigupPage from '../views/SigupPage.vue';
import TabsPage from '../views/TabsPage.vue';
import TraductorPage from '../views/TraductorPage.vue';
import DiccionariPage from '../views/DiccionariPage.vue';
import LoginPage from '../views/LoginPage.vue';
import { auth } from '@/views/firebase.js'; // Ajusta la ruta según tu estructura de carpetas


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
    meta: {
      requiresAuth: true, // Agrega esta meta si la ruta requiere autenticación
    },
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

// Agrega un guardia de navegación para verificar la autenticación
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = auth.currentUser;
    if (!user) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router
