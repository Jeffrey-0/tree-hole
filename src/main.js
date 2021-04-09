import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui框架以及element-ui样式库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
// // 导入格式化时间
import moment from 'moment'
moment.locale('zh-cn')

Vue.use(ElementUI)
Vue.use(VueLazyLoad)
Vue.config.productionTip = false

Vue.prototype.$user = Object.assign({
  id: 3,
  userId: 3,
  username: '小疯子',
  userAge: '',
  userPassword: '',
  userEmail: '',
  userSex: '',
  userPhone: '',
  userCategory: ''
}, JSON.parse(window.sessionStorage.getItem('user')))

Vue.prototype.$baseImgUrl = 'http://localhost:8085/tree-hole/img/' // 服务器图片接口地址

// 记录是手机端还是PC端
Vue.prototype.$ifMobile = {}
console.log('跑一趟main.js', Vue.prototype.$ifMobile)

// 格式化时间
Vue.prototype.$moment = moment

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
