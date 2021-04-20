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
// 导入公共方法
import common from './common/common'
// // 导入滑动插件
// import BScroll from 'better-scroll'

Vue.use(ElementUI)
Vue.use(VueLazyLoad)
Vue.config.productionTip = false

// moment插件中文
moment.locale('zh-cn')

Vue.prototype.$user = Object.assign({
  userId: '',
  username: '',
  portrait: '',
  phone: '',
  type: ''
}, JSON.parse(window.sessionStorage.getItem('user')))

Vue.prototype.$baseImgUrl = 'http://localhost:8080/tree-hole/img/' // 公司服务器图片接口地址
// Vue.prototype.$baseImgUrl = 'http://localhost:8085/tree-hole/img/' // 宿舍服务器图片接口地址

Vue.prototype.$baseUrl = 'http://localhost:8082/' // 后端接口地址
// 记录是手机端还是PC端
Vue.prototype.$ifMobile = {}
console.log('跑一趟main.js', Vue.prototype.$ifMobile)

// 格式化时间
Vue.prototype.$moment = moment

Vue.prototype.$common = common

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$eventBusTag = new Vue()
Vue.prototype.$eventBusiIcon = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
