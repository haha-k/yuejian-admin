import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

import { clubAdminRoutes } from './modules/clubAdminRoutes'
import sysAdminRoutes from './modules/sysAdminRoutes'

Vue.use(Router)

export const constantRoutes = [{
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/',
        component:Layout,
        redirect:'/home/index'
    },
    {
        path: '/home',
        component: Layout,
        // component: () => import('@/layout/index'),
        redirect: '/home/index',
        // hidden: true,
        children: [{
            path: 'index',
            component: () => import('@/views/home/index'),
            name: 'Home',
            meta: {
                title: 'Home',
                icon: 'home',
                affix: true,
            }
        }]
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [{
            path: 'index',
            component: () => import('@/views/profile/index'),
            name: 'Profile',
            meta: {
                title: '个人信息',
                icon: 'user',
                noCache: true
            }
        }]
    },
    {
        path:'/redirect',
        component:Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component:() => import('@/views/redirect/index')
        }]
    },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: '',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

]

export const asyncRoutes= [];



const createRouter = () => new Router({
    mode: 'history',
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})


const router = createRouter()
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
// console.log("------")
// console.log(clubAdminRoutes);
router.addRoutes(clubAdminRoutes);
export default router
