import type { RouteRecordRaw } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'indexPage',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'aboutMe',
        path: '/about',
        component: () => import('pages/AboutMe.vue'),
      },
      {
        name: 'projects',
        path: '/projects',
        component: () => import('pages/ProjectsShowcase.vue'),
      },
      {
        name: 'employers',
        path: '/for-employers',
        component: () => import('pages/ForEmployers.vue'),
      },
      {
        name: 'changelog',
        path: '/changelog',
        component: () => import('pages/EmptyPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
]

export default routes
