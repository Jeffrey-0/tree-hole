<template>
  <div id="index" ref="index">
    <div class="top-bg">
      <div class="title">
        <div class="header">树洞网</div>
        <div class="detail">分享乐趣，记录心情，吐露秘密，诉说心事。</div>
      </div>
      <div class="bt-down">
        <i class="el-icon-arrow-down" @click="clickDown"></i>
        <!-- <a href="#content" class="el-icon-arrow-down"></a> -->
        <!-- <i class="el-icon-arrow-down" @click="clickDown"></i> -->
      </div>
    </div>
    <top-navbar :defaultActive="1"></top-navbar>
    <div class="navbar">
      <nav-bar></nav-bar>
    </div>
    <div id="content">
<!--       <nav-bar></nav-bar>
      <div class="content">
        <keep-alive exclude="Bookshelf,History">
          <router-view></router-view>
        </keep-alive>
      </div> -->
      <!-- <div class="navbar">
        <nav-bar></nav-bar>
      </div> -->
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <!-- <bottom-navbar></bottom-navbar> -->
    <div class="back-to-top" v-if="ifToTop" @click="backToTop"></div>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Index",
  data() {
    return {
      ifToTop: false
    }
  },
  components: {
    NavBar,
    TopNavbar,
    BottomNavbar
  },
  methods: {
    clickDown() {
      console.log('clickDown', '过渡')
      this.$el.querySelector(`#content`).scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block:    "start"  // 上边框与视窗顶部平齐。默认值
      })
    },
    backToTop () {
      // this.$refs.index.scrollIntoView({
      //   behavior: "smooth",  // 平滑过渡
      //   block:    "end"  // 上边框与视窗顶部平齐。默认值
      // })
      let timer = setInterval(() => {
        if (this.$refs.index.scrollTop <= 0) {
          this.$refs.index.scrollTop = 0
          clearInterval(timer)
        } else {

          this.$refs.index.scrollTop = this.$refs.index.scrollTop - 50
        }
      }, 10);
    }
  },
  created () {
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log('sessionStorage', sessionStorage.getItem('user'))
    console.log(user && user.userName, user && user.userId)

    // // 监听页面滚动
    // window.addEventListener('scroll', function () {
    //   console.log('滚动', document.documentElement.clientHeight)
    // })
  },
  mounted () {
    // console.log('mounted', '滚动')
    let that = this
    this.$refs.index.addEventListener('scroll', function () {
      if (that.$refs.index.scrollTop >= 1000) {
        that.ifToTop = true
      } else {
        that.ifToTop = false
      }
    })
  },
  watch: {
    // $route: {
    //   handler (to, form = null) {
    //     if (to.path !== '/home' && to.path !== '/') {
    //       this.clickDown()
    //       console.log(to.path)
    //     }
    //     // this.clickDown()
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
#index {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg_index.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: auto;
}
/* .content {
  float: left;
  display: inline-block;
  margin-left: 280px;
  margin-top: 40px;
  width: 810px;
  min-height: 570px;
  min-height: 770px;
  background: white;
  padding: 10px 30px;
  border-radius: 5px;
  // overflow: auto;
} */

.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
/*.nav, .content {
    height: 100%;
    box-sizing: border-box;
    margin: 20px;
    background: red;
  }*/

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 2px;
  background-color: rgba(0,0,0,0);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: rgba(0,0,0,0);
  color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  background-color: rgba(0,0,0,0.5);
}
.top-bg {
  width: 100%;
  height: 65%;
  background: url(../assets/img/bg.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
}

#content {
  vertical-align: top;
  position: relative;
  text-align: left;
  width: 100%;
  min-height: 100%;
  width: calc(100% - 350px);
  display: inline-block;

}
/* #content::after, .content::after {
  content: '';
  display: block;
  clear: both;
  width:0;
  height:0;
  visibility:hidden;
} */
.content {
  width: 100%;
  height: 100%;

}
.title{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
  .header {
    font-size: 60px;
    padding: 20px;
    letter-spacing: 10px;
  }

}
  .bt-down {
    font-size: 35px;
    position: absolute;
    font-weight: 1000;
    bottom: 5%;
    color: #fff;
    left: 50%;
    transform: translate(-50%);
    cursor: pointer;
    animation: move 2s ease-out infinite;
  }
  @keyframes move {
    0% {
      bottom: 5%;
    }
    50% {
      bottom: 2%;
    }
    100% {
      bottom: 5%;
    }
  }
  // #content {
  //   vertical-align: top;
  // }
  .navbar {
    position: sticky;
    vertical-align: top;
    display: inline-block;
    width: 280px;
    // background: red;
    margin-left: 70px;
    top: 60px;
    margin-top: 60px;
  }
  @media screen and (max-width: 1000px){
    .navbar {
    display: none;
    }
    #content {
      width: calc(100%);
    }
    #content .content {
      width: 90%;
      margin-left: 5%;
    }
  }
  .content {
    vertical-align: top;
    display: inline-block;
    width: 80%;
    margin-left: 10%;
    // min-height: 662px;
    // background: white;
    // border: 1px solid black;
    // padding: 10px 30px;
    border-radius: 5px;
    // margin-top: 60px;
    // margin-bottom: 30px;
    position: relative;
    // 修改
    position: absolute;
    top: 60px;
    bottom: 0;
    height: calc(100% - 60px);
    &::after {
      display: block;
      content: '';
      clear: both;
    }
  }
  // 返回顶部
  .back-to-top {
    position: fixed;
    width: 50px;
    height: 50px;
    // background-color: red;
    background-image: url('../assets/img/icon/上拉.png');
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: gray;
    border-radius: 50%;
    bottom: 100px;
    right: 40px;
    cursor: pointer;
  }
</style>
