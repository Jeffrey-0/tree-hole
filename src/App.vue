<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
    <m-index v-if="mobile"></m-index>
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

export default {
  name: '',
  components: {
    Index: Index,
    Login: Login,
    Album,
    mIndex
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
    }
  },
  // created () {
  //   console.log(this.$route.path)

  // },
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
