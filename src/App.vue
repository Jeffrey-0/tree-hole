<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
    <admin v-if="path === '/admin'"></admin>
    <m-index v-else-if="mobile"></m-index>
    <login v-else-if="login"></login>
    <album v-else-if="path === '/album'"></album>
    <index v-else></index>
  </div>
</template>

<script>
import Index from '@/views/Index.vue'
import Album from '@/views/Album.vue'
import Login from '@/views/Login.vue'
import mIndex from '@/views/m/Index.vue'
import Admin from '@/views/admin/Admin.vue'
import {showRecentChatByUserId} from '@/network/chat'

export default {
  name: '',
  components: {
    Index: Index,
    Login: Login,
    Album,
    mIndex,
    Admin
  },
  data () {
    return {
      login: 0,
      path: '',
      mobile: 0  // 手机端
    }
  },
  methods: {
    // 判断是否是手机端
    _isMobile() {
      let flag = navigator.userAgent.match(
     /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
      );
      return flag;
    },
        // 建立websocket
    conectWebSocket () {
      if (this.$websocket.websocket) {
        console.log('websocket已经建立')
        return
      }
      console.log('登录成功22， 建立websocket通信')
      console.log("建立连接");
      if (this.$user.userId == "") {
        this.$message.error('用户还未登录')
        return
      } else {
        //判断当前浏览器是否支持WebSocket
        if ("WebSocket" in window) {
          let websocket = new WebSocket(
            "ws://localhost:8082/websocket/" + this.$user.userId
          )
          this.$websocket.setWebsocket(websocket)
          console.log('this.$websocket', this.$websocket, this.$websocket.websocket)
        } else {
          alert("不支持建立socket连接");
        }
        //连接发生错误的回调方法
        this.$websocket.websocket.onerror = function() {
          
        };
        //连接成功建立的回调方法
        this.$websocket.websocket.onopen = function(event) {
          
        }
        //接收到消息的回调方法
        var that = this;
        this.$websocket.websocket.onmessage = function(event) {
          console.log('接受到消息:', event)
          
          var object = eval("(" + event.data + ")")
          if (object.socketType == 0) {
            // 提示连接成功
            console.log("连接成功", object.people, object.aisle);
            
            // that.showInfo(object.people, object.aisle);
          }
          if (object.socketType == 1) {
            //显示消息
            console.log("接受消息", object, that.acceptUser);
            // 获取最近聊天用户
            showRecentChatByUserId(that.$user.userId).then(res => {
              that.$mydata.setRecentUsers(res.data)
              that.$eventBus.$emit('updateRecentUsers', object)
              // this.$recentUsers = res.data
              console.log('获取最近聊天用户', that.$mydata.recentUsers)
            })

            // 当前聊天框是否为发送用户，如果是，则添加到消息列表，不是则返回
            
            // if (object.userId != that.acceptUser.userId) {
            //   return
            // }
            // that.messages.push(object)
            // setTimeout(function () {
            //   that.$el.querySelector(`#msgEnd`).scrollIntoView({
            //     behavior: "smooth",  // 平滑过渡
            //     block:    "start"  // 上边框与视窗顶部平齐。默认值
            //   })
            // }, 50)
          }
        };
        //连接关闭的回调方法
        this.$websocket.websocket.onclose = function() {};
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
          this.$websocket.websocket.close();
        };
      }
    }
  },
  created () {
    console.log('判断是否是手机', this._isMobile())
    if (this._isMobile()) {
      // 手机端
      console.log('是手机')
      // this.$router.replace("/mobile/");
      this.mobile = 1
      this.$ifMobile.res = true
      console.log('this.$ifMobile', this.$ifMobile)
    } else {
      // pc端
      this.mobile = 0
      console.log('是pc')
      this.$ifMobile.res = false
      // this.$router.replace("/");
    }
    if (this.$route.path === '/login') {
      this.login = 1
    } else {
      this.login = 0
    }
    this.path = this.$route.path
    window.addEventListener('scroll', function () {
      console.log(112)
    })

    // 判断用户是否登录，登录则建立websocket
    if (this.$user.userId) {
      this.conectWebSocket()

      // 获取最近聊天用户
      showRecentChatByUserId(this.$user.userId).then(res => {
        this.$mydata.setRecentUsers(res.data)
        this.$eventBus.$emit('updateRecentUsers')
        // this.$recentUsers = res.data
        console.log('获取最近聊天用户', this.$mydata.recentUsers)
      })
    }
    // 接收conectWebSocket事件，若登录成功，建立websocket
    this.$eventBus.$on('conectWebSocket', () => {
      this.conectWebSocket()
    })
  },
  watch: {
    $route: {
      handler (to, form = null) {
        // const currentTab = this.editableTabs.filter((item) => item.content === to.path)
        
        this.path = this.$route.path
        if (this.$route.path === '/login') {
          this.login = 1
        } else {
          this.login = 0
        }
        console.log('路由切换1', to)
        console.log('路由切换2', form.path, this.$el.querySelector(`#content`), document.getElementById('content'))
        if (this.$el.querySelector(`#content`) && to.path !== '/' && to.path !== '/home') {
          this.$el.querySelector(`#content`).scrollIntoView({
            behavior: "smooth",  // 平滑过渡
            block:    "start"  // 上边框与视窗顶部平齐。默认值
          });
        }
      }
    }
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
