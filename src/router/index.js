import { createRouter, createWebHistory } from 'vue-router'
import {useAuth} from "../composition/useAuth";
const { outAuth } = useAuth()

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/login/login.vue'),
    meta: {
      withoutAuth: true,
      title: 'Fastlead - Авторизация'
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import ('../views/registration/registration.vue'),
    meta: {
      withoutAuth: true,
      title: 'Fastlead - Регистрация'
    }
  },
  {
    path: '/',
    name: 'messenger',
    component: () => import ('../views/messenger/messenger.vue'),
    meta: {
        requiresAuth: true,
        title: 'Fastlead - Мессенджер'
    }
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: () => import ('../views/messenger/messenger.vue'),
    meta: {
      requiresAuth: true,
      title: 'Fastlead - Мессенджер'
    }
  },
  {
    path: '/authorization/:token',
    name: 'authorization',
    component: () => import ('../views/authorization/authorization.vue'),
    meta: {
      title: 'Fastlead - Авторизация'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import ('../views/settings/settings.vue'),
    meta: {
      requiresAuth: true,
      title: 'Fastlead - Настройки'
    },
    children: [
      {
        path: '', redirect: '/settings/mailings'
      },
      {
        path: 'mailings', component: () => import('../views/settings/mailings/mailings.vue'), meta: {requiresAuth: true, title: 'Fastlead - Рассылки'}
      },
      {
        path: 'whatsapps', component: () => import('../views/settings/whatsapps/whatsapps.vue'), meta: {requiresAuth: true, title: 'Fastlead - WhatsApp аккаунты'}
      },
      {
        path: 'instagrams', component: () => import('../views/settings/instagrams/instagrams.vue'), meta: {requiresAuth: true, title: 'Fastlead - Instagram аккаунты'}
      },
      {
        path: 'account', component: () => import('../views/settings/account/account.vue'), meta: {requiresAuth: true, title: 'Fastlead - Настройки аккаунта'}
      },
      {
        path: 'autoresponder', component: () => import('../views/settings/autoresponder/autoresponder.vue'), meta: {requiresAuth: true, title: 'Fastlead - Автоответчики'}
      },
      {
        path: 'message-templates', component: () => import('../views/settings/message-templates/message-templates.vue'), meta: {requiresAuth: true, title: 'Fastlead - Шаблоны сообщений'}
      },
      {
        path: 'integrations', component: () => import('../views/settings/integrations/integrations.vue'), meta: {requiresAuth: true, title: 'Fastlead - Интеграции'}
      },
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
function isAuth() {
  return !!localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title
  // next()
  if (to.meta.requiresAuth) {
    if (isAuth()) {
      document.title = to.meta.title
      next()
      return
    }
    next('/login')
  }
  else {
    // if (to.meta.withoutAuth) {
    //   if (isAuth()) {
    //     outAuth();
    //   }
    // }
    document.title = to.meta.title
    next()
  }
})

export default router
