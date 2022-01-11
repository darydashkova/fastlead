import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from "../composition/useAuth";
const { outAuth } = useAuth()

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/messenger',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      withoutAuth: true,
      title: 'Fastlead - Авторизация'
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/registration/registration.vue'),
    meta: {
      withoutAuth: true,
      title: 'Fastlead - Регистрация'
    }
  },
  {
    path: '/',
    name: 'messenger',
    component: () => import('../views/messenger/messenger.vue'),
    meta: {
      requiresAuth: true,
      title: 'Fastlead - Мессенджер'
    }
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: () => import('../views/messenger/messenger.vue'),
    meta: {
      requiresAuth: true,
      title: 'Fastlead - Мессенджер'
    }
  },
  {
    path: '/authorization/:token',
    name: 'authorization',
    component: () => import('../views/authorization/authorization.vue'),

    meta: {
      title: 'Fastlead - Авторизация'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings/settings.vue'),
    meta: {
      requiresAuth: true,
      title: 'Fastlead - Настройки'
    },
    children: [
      {
        path: '', redirect: '/settings/mailings'
      },
      {
        path: 'mailings', component: () => import('../views/settings/mailings/mailings.vue'), meta: { requiresAuth: true, title: 'Fastlead - Рассылки' }
      },
      {
        path: 'accounts', component: () => import('../views/settings/accounts/accounts.vue'), meta: { requiresAuth: true, title: 'Fastlead - Аккаунты' },
        children: [
          {
            path: '/settings/whatsapps', component: () => import('../views/settings/whatsapps/whatsapps.vue'), meta: { requiresAuth: true, title: 'Fastlead - WhatsApp аккаунты' }
          },
          {
            path: '/settings/instagrams', component: () => import('../views/settings/instagrams/instagrams.vue'), meta: { requiresAuth: true, title: 'Fastlead - Instagram аккаунты' }
          },
          {
            path: '/settings/instagrams-api', component: () => import('../views/settings/instagrams-api/instagrams-api.vue'), meta: { requiresAuth: true, title: 'Fastlead - Instagram аккаунты' }
          },
        ]
      },
      {
        path: 'account', component: () => import('../views/settings/account/account.vue'), meta: { requiresAuth: true, title: 'Fastlead - Настройки аккаунта' }
      },
      {
        path: 'finance', component: () => import('../views/settings/finance/finance.vue'), meta: { requiresAuth: true, title: 'Fastlead - Финансы' },
        children: [
          {
            path: '/settings/finance/rates', component: () => import('../views/settings/finance/rates/rates.vue'), meta: { requiresAuth: true, title: 'Fastlead - Финансы' },
          },
          {
            path: '/settings/finance/history', component: () => import('../views/settings/finance/history/history.vue'), meta: { requiresAuth: true, title: 'Fastlead - Финансы' },
          }
        ]
      },
      {
        path: 'partners', component: () => import('../views/settings/partners/partners.vue'), meta: { requiresAuth: true, title: 'Fastlead - Партнерская программа' },
        children: [
          {
            path: '/settings/partners/profit', component: () => import('../views/settings/partners/profit/profit.vue'), meta: { requiresAuth: true, title: 'Fastlead - Партнерская программа' },
          },
          {
            path: '/settings/partners/links', component: () => import('../views/settings/partners/links/links.vue'), meta: { requiresAuth: true, title: 'Fastlead - Партнерская программа' },
          },
          {
            path: '/settings/partners/history', component: () => import('../views/settings/partners/history/history.vue'), meta: { requiresAuth: true, title: 'Fastlead - Партнерская программа' },
          },
        ]
      },
      {
        path: 'answerphone', component: () => import('../views/settings/answerphone/answerphone.vue'), meta: { requiresAuth: true, title: 'Fastlead - Автоответчик' },
        children: [
          {
            path: '/settings/answerphone/list-answerphone', component: () => import('../views/settings/answerphone/list/list-answerphone.vue'), meta: { requiresAuth: true, title: 'Fastlead - Автоответчик' },
          },
          {
            path: '/settings/answerphone/settings-answerphone', component: () => import('../views/settings/answerphone/settings/settings-answerphone.vue'), meta: { requiresAuth: true, title: 'Fastlead - Автоответчик' },
          },
        ]
      },
      {
        path: 'autoresponder', component: () => import('../views/settings/autoresponder/autoresponder.vue'), meta: { requiresAuth: true, title: 'Fastlead - Автоответчики' }
      },
      {
        path: 'ignore', component: () => import('../views/settings/ignore/ignore.vue'), meta: { requiresAuth: true, title: 'Fastlead - Автоответчики' }
      },
      {
        path: 'message-templates', component: () => import('../views/settings/message-templates/message-templates.vue'), meta: { requiresAuth: true, title: 'Fastlead - Шаблоны сообщений' }
      },
      {
        path: 'integrations', component: () => import('../views/settings/integrations/integrations.vue'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
        children: [
          {
            path: '', component: () => import('../views/settings/integrations/Default'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
          },
          {
            path: 'list', component: () => import('../views/settings/integrations/IntegrationList.vue'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
          },
          {
            path: 'amo/connect', component: () => import('../views/settings/integrations/AmoConnect.vue'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
          },
          {
            path: 'create', component: () => import('../views/settings/integrations/integrationTabs/IntegrationTabsCreatedTasks.vue'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
          },
          // {
          //   path: 'ignore', component: () => import('../views/settings/integrations/integrationTabs/integrationTabsIgnore.vue'), meta: { requiresAuth: true, title: 'Fastlead - Интеграции' },
          // },
          {
            path: 'yclients/connect', component: () => import('../views/settings/integrations/Yclient/YclientsConnect.vue'), meta: { requiresAuth: false, title: 'Fastlead - Интеграции' },
          },
          {
            path: 'yclients/create', component: () => import('../views/settings/integrations/Yclient/YclienCreatedTasks.vue'), meta: { requiresAuth: false, title: 'Fastlead - Интеграции' },
          }
          ]
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
