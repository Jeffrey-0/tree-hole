import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui框架以及element-ui样式库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$user = Object.assign({
  id: '',
  userId: '',
  userName: '小疯子',
  userAge: '',
  userPassword: '',
  userEmail: '',
  userSex: '',
  userPhone: '',
  userCategory: ''
}, JSON.parse(window.sessionStorage.getItem('user')))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
