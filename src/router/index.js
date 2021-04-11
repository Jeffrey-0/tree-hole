import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import SecretList from '../components/SecretList.vue'
import Login from '../views/Login.vue'
import Friend from '../views/Friend.vue'
import Album from '../views/Album.vue'
import Plan from '../views/Plan.vue'
import Upload from '../views/Upload.vue'
import Secret from '../views/m/Secret.vue'
import Chat from '../views/m/Chat.vue'
import User from '../views/m/User.vue'
import Admin from '../views/admin/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '秘密',
    component: SecretList
  },
  {
    path: '/home',
    name: '所有',
    component: SecretList
  },
  {
    path: '/watch',
    name: '关注',
    component: SecretList
  },
  {
    path: '/myself',
    name: '私有',
    component: SecretList
  },
  {
    path: '/index',
    name: '主页',
    component: Index
  },
  {
    path: '/about',
    name: '关于',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home1',
    name: '主页',
    component: Home
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/friend',
    name: '消息',
    component: Friend
  },
  {
    path: '/album',
    name: '相册',
    component: Album
  },
  {
    path: '/message',
    name: '消息',
    component: Friend
  },
  {
    path: '/plan',
    name: '计划',
    component: Plan
  },
  {
    path: '/upload',
    name: '上传',
    component: Upload
  },

  // 导入手机端页面
  {
    path: '/mobile/',
    name: 'mobile',
    component: () => import('@/views/m/Index')
  },
  {
    path: '/mobile/index',
    name: 'mobile/index',
    component: () => import('@/views/m/Index')
  },
  {
    path: '/m-secret',
    name: 'Secret',
    component: Secret
  },
  {
    path: '/m-friend',
    name: 'Friend',
    component: () => import('@/views/m/Friend')
  },
  {
    path: '/m-chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/m-user',
    name: 'User',
    component: User
  },
  {
    path: '/admin',
    name: '后台管理系统',
    component: Admin
  }

]

// const router = new VueRouter({
//   routes
// })

// 解决跳转到相同路径报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫，如果用户未登陆，则跳转到登录页面
// router.beforeEach((to, form, next) => {
// if (to.path === '/login') {
//   return next()
// }
// const user = window.sessionStorage.getItem('user')
// console.log('tooken', user)
// if (!user) {
//   return next('/login')
// } else {
//   return next()
// }
// })

export default router
