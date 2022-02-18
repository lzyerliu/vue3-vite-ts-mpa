import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/page2/views/Demo1.vue')
  },
  {
    path: '/demo2',
    component: () => import('@/pages/page2/views/Demo2.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
