import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    component: () => import('@/views/home/home.vue'),
    name: 'home',
    path: '/home',
    meta: {
      title: 'home'
    }
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
