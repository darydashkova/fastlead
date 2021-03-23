import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
  {
    path: '',
    component: () => import ('../views/messenger/messenger.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/login/login.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: () => import ('../views/messenger/messenger.vue'),
    meta: {
      requiresAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
