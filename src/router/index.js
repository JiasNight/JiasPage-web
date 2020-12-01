import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/frontend/Index.vue'
import Home from '../views/frontend/Home.vue'
import SignIn from '../views/frontend/SignIn.vue'
import SignUp from '../views/frontend/SignUp.vue'
import adminIndex from '../views/backend/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 前台路由
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
        ]
      },
      {
        path: 'login',
        name: 'SignIn',
        component: SignIn
      },  
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      }
    ]
  },
  {
    // 后台路由
    path: '/admin',
    name: 'Admin',
    component: adminIndex,
    children: []
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
