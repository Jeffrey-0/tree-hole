<template>
  <div id="index">
    <div class="top-bg">
      <div class="title">
        <div class="header">树洞网</div>
        <div class="detail">分享乐趣，记录心情，吐露秘密，诉说心事。</div>
      </div>
      <div class="bt-down">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
    <top-navbar :defaultActive="1"></top-navbar>
    <div id="content">
      <nav-bar></nav-bar>
        <div class="content">
          <keep-alive exclude="Bookshelf,History">
            <router-view></router-view>
          </keep-alive>
        </div>
    </div>
    
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Index",
  components: {
    NavBar,
    TopNavbar
  },
  created () {
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log('sessionStorage', sessionStorage.getItem('user'))
    console.log(user && user.userName, user && user.userId)
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
.content {
  position: absolute;
  margin-top: 10px;
  margin-left: 370px;
  width: 910px;
  height: 570px;
  background: white;
  padding: 10px 30px;
  border-radius: 5px;
  overflow: auto;
}
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
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: #F5F5F5;
}*/

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #555;
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
  position: relative;
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
</style>
