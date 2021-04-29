import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui框架以及element-ui样式库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
// 导入加载中
import { Loading } from 'element-ui'
// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
// // 导入格式化时间
import moment from 'moment'
// 导入公共方法
import common from './common/common'
// // 导入滑动插件
// import BScroll from 'better-scroll'
// 导入百度API
// import BaiduAipSdk from 'baidu-aip-sdk'
// 导入百度API接口
import {getNewAccessToken, imgReview} from '@/network/baidu'

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
Vue.prototype.$loading = Loading

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$eventBusTag = new Vue()
Vue.prototype.$eventBusiIcon = new Vue()
// websocket实例
Vue.prototype.$websocket = {
  websocket: '',
  setWebsocket (websocket) {
    this.websocket = websocket
  }
}

Vue.prototype.$mydata = {
  recentUsers: [],
  setRecentUsers (recentUsers) {
    this.recentUsers = recentUsers
  }
}
// Vue.prototype.$recentUsers = []

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// window.localStorage.removeItem('access_token')

// 获取百度API的access_token,先获取本地，若本地无或过期，则发送新的请求，获取新access_token，并保存到本地localStorage
var baiduAccessToken = window.localStorage.getItem('access_token')
if (!baiduAccessToken || JSON.parse(baiduAccessToken).deadline < new Date().getTime()) {
  var APP_ID = "24032774"
  var API_KEY = "4MxyitmxeNW9cXNKk6p568GI"
  var SECRET_KEY = "gpqvQFI7nlAscbXgNe6MQeYV1DmGWbQr"
  
  getNewAccessToken('client_credentials', API_KEY, SECRET_KEY).then(res => {
    if (res) {
      console.log(res)
      // res.deadline = new Date().getTime() + 10000  // 截止时间
      res.deadline = new Date().getTime() + res.expires_in  // 截止时间
      window.localStorage.setItem('access_token', JSON.stringify(res))
      baiduAccessToken = res
    }
  })
}

imgReview(null, 'https://ai.bdstatic.com/file/D174D7CF8EF2461B8AB35B81243E9B1B').then(res => {
  console.log('图像审核结果', res)
})
