import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'

Vue.use(Router)

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },
  // {
  //   path: '/404',
  //   component: () => import("@/views/error-page/404"),
  //   hidden: true
  // }
]

const createRouter = () => new Router({
  mode:'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
