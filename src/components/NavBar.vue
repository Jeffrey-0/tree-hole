<template>
  <div id="container">
    <img class="portrait" title="点击切换头像" @click="changeAvatar" :src='avatarUrl'>
    <div class="username"  @click="toInfo">{{ $user && $user.userName ? $user.userName : '无名氏'}}</div>
    <div class="username motto">
      <el-input v-model="motto" placeholder="个性签名" type="textarea">
      </el-input>
    </div>
    
    <div class="nav">
      <div class="item">
        <div class="number">12</div>
        <div>
          <router-link  to="/index/library">秘密</router-link>
        </div>
      </div>
      <div class="item">
        <div class="number">12</div>
        <div>
          <router-link  to="/index/library">关注</router-link>
        </div>
      </div>
      <div class="item">
        <div class="number">12</div>
        <div>
          <router-link  to="/index/library">粉丝</router-link>
        </div>
      </div>
    </div>
    <el-button type="primary" class="exit" @click="signOut">退出登录</el-button>
  </div>
</template>

<script>
// import {getNewNotice} from '../network/notice'
export default {
  name: '',
  data () {
    return {
      user: {

      },
      notice: {

      },
      avatar: 0,
      motto: ''
    }
  },
  computed: {
    avatarUrl () {
      // return require('../assets/img/avatar/' + this.avatar + '.jpg')
      return require('../assets/img/avatar.png')
    }
  },
  methods: {
    toInfo () {
      if (this.$route && this.$route.path !== '/index/info') {
        this.$router.push('/index/info')
      }
    },
    toNotice () {
      if (this.$route && this.$route.path !== '/index/notice') {
        this.$router.push('/index/notice')
      }
    },
    signOut () {
      if (this.$route && this.$route.path !== '/login') {
        this.$router.push('/login')
      }
    },
    changeAvatar () {
      this.avatar = (this.avatar + 1) % 10
      localStorage.setItem('avatar', this.avatar)
    }
  },
  created () {
    // this.user = JSON.parse(sessionStorage.getItem('user'))
    // this.user = this.$user
    this.user = this.$user
    console.log('this.$user', this.$user)
    // getNewNotice().then(res => {
    //   this.notice = res
    //   console.log(this.notice)
    // })
    // this.avatar = localStorage.getItem('avatar') || 0
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  top: 50px;
  left: 70px;
  width: 280px;
  height: 420px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
}
.portrait {
  cursor: pointer;
  margin: 20px auto;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  /* background-image: url(../assets/img/avatar.jpg); */
  background-size: 100%;
}
.portrait:hover {
  transform: rotate(360deg);
  transition: 1s;
}
.username {
  font-size: 20px;
  cursor: pointer;
}
.nav {
  margin: 20px;
  padding: 5px;
  border-top:1px dashed #dadada;
  /* border-bottom:1px dashed #dadada; */
  position: relative;
  height: 40px;
}
.nav a {
  text-decoration: none;
  color: rgb(94, 185, 244);
  /* position: absolute; */
}

.nav a:hover {
  color: #409EFF;
}
/* .nav a:nth-child(1) {
  left: 20px;
}
.nav a:nth-child(2) {
  left: 50%;
  transform: translate(-50%);
  margin: auto;
}
.nav a:nth-child(3) {
  right: 20px;
} */
.nav::after {
  content: '';
  clear: both;
  display: block;
}
.notice {
  margin: 0px auto;
  width: 80%;
  height: 120px;
  border: 1px dashed #dadada;
  overflow-y: scroll;
  line-height: 20px;
  padding: 5px;
  text-align: left;
  /* text-indent: 2em; */
}
.notice_head {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}
.exit {
  width: 80%;
  margin: 20px;
}
/* 定义滚动条 */

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
	background-color: #555;
}
.motto {
  padding: 10px 20px 5px 20px;
}
/* .nav {
  position: relative;
} */

.nav .item {
  width: 33%;
  float: left;
}
.nav .item:nth-child(2) {
  border-left: 1px dashed #dadada;
  border-right: 1px dashed #dadada;
}
.nav .item .number {
  padding: 5px 0px;
}
</style>