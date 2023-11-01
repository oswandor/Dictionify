import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'; 
import SigupPage from '../views/SigupPage.vue';  
import TabsPage from '../views/TabsPage.vue';  
import TraductorPage from  '../views/TraductorPage.vue'; 
import DiccionariPage from  '../views/DiccionariPage.vue'; 

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  } , 
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
        component:TraductorPage,
      },
      {
        path: "DiccionariPage",
        component:DiccionariPage,
      }
    ],
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
