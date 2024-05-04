import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/create',
      name: 'create',
      component: () => import('../pages/Create.vue'),
    },

    // The specified employee detail
    {
      path: '/employee/:employeeId',
      name: 'employee',
      component: () => import('../pages/Employee.vue'),
    },

    {
      path: '/:catchAll(.*)*',
      component: () => import('../ui/PageNotFound.vue'),
    },
  ],
});

export default router;
