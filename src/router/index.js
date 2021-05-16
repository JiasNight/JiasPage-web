import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import Index from '../views/frontend/Index.vue'
import Home from '../views/frontend/Home.vue'

Vue.use(VueRouter)
Vue.use(ViewUI)

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
        component: () => import('../views/frontend/SignIn.vue')
      },  
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('../views/frontend/SignUp.vue')
      },  
      {
        path: 'userlist',
        name: 'UserList',
        meta: {requireAuth: true},
        component: () => import('../views/frontend/UserList.vue')
      }
    ]
  },
  {
    // 后台路由
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/backend/index.vue'),
    // 需要登录才能进入的页面可以增加一个meta属
    meta: {requireAuth: true},
    children: []
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否登录
    if (localStorage.getItem('userName')) {
      next()
    } else {  
    // 没登录则跳转到登录界面
      next({
        path: '/login',
        // query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  console.log(route)
  ViewUI.LoadingBar.finish()
})

export default router
