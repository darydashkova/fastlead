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
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: () => import ('../views/messenger/messenger.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import ('../views/settings/settings.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '', redirect: '/settings/mailings'
      },
      {
        path: 'mailings', component: () => import('../views/settings/mailings/mailings.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getCookie('SessionKey')) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
