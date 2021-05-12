import { createRouter, createWebHistory } from 'vue-router'
import {useAuth} from "../composition/useAuth";
const { outAuth } = useAuth()

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
      withoutAuth: true,
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import ('../views/registration/registration.vue'),
    meta: {
      withoutAuth: true,
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
      },
      {
        path: 'whatsapps', component: () => import('../views/settings/whatsapps/whatsapps.vue')
      },
      {
        path: 'account', component: () => import('../views/settings/account/account.vue')
      },
      {
        path: 'autoresponder', component: () => import('../views/settings/autoresponder/autoresponder.vue')
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
    if (to.matched.some(record => record.meta.withoutAuth)) {
      if (getCookie('SessionKey')) {
        outAuth();
      }
    }
    next()
  }
})

export default router
