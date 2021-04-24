<template>
  <div id="login">
    <!-- <div class="resource">
      <img src="../assets/img/resources.png" alt="">
    </div> -->
    <el-col id="container" :xs="24" :sm="12" :md="6">
      <div class="logo" @click="goHome">
        <img src="../assets/img/logo.png" alt="">
        <span>树洞网</span>
      </div>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="登录" id="loginBt">
          <login-c :toLoginC="data"></login-c>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <logon-c @logonSuccess="logonSuccess"></logon-c>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import LoginC from '../components/LoginC.vue'
import LogonC from '../components/LogonC.vue'


export default {
  data () {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    LoginC,
    LogonC
  },
  methods: {
    logonSuccess (data) {
      console.log('切换登录')
      console.log(document.getElementById('tab-0'))
      document.getElementById('tab-0').click()
      console.log(data)
      this.data = data
    },
    goHome () {
      this.$router.push('home')
    }
  }
  }
</script>

<style scoped lang="scss">
 #login {
  width: 100%;
  height: 100%;
  // background-image: url(../assets/img/background.png);
  background-image: url(../assets/img/bg.jpg);
  // background-image: url(../assets/img/bg_room.jpg);
  // background-image: url(../assets/img/bg_index.jpg);
  /* background-image: url(../assets/img/bg_lake.jpg); */
  background-size: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
 }
 #container {
  /* width: 400px; */
  /* margin: 0px auto; */
  /* margin: auto; */
  position: absolute;
  left: 50%;
  /* right: 0; */
  transform: translate(-50%, 0);
  top: 15%;
  /* bottom: 0; */
  padding: 20px;
  /* top: 100px; */
  box-sizing: border-box;
  
  .logo {
    width: 100%;
    height: 50px;
    text-align: center;
    color: white;
    line-height: 50px;
    font-size: 28px;
    margin-bottom: 20px;
    cursor: pointer;
    img {
      // width: 50px;
      height: 50px;
      background-size: 100%;
      vertical-align: top;
      margin-right: 10px;
    }
    span {
      vertical-align: top;
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
  }
 }
/* .el-tabs--border-card {
background: hsla(0,0%,100%,.3);
 }*/      
 .el-button {
   width: 100%;
 }

 .el-tabs--border-card{
   /* background: hsla(0,0%,100%,.8); */
   background: hsla(0,0%,100%,.8);
   border: 0px solid white;
 }
 .resource {
   position: absolute;
  //  left: 50px;
   top: 50%;
   transform: translateY(-50%);
  //  width: 200px;
  //  height: 400px;

 }
</style>
