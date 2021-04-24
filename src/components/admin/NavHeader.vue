<template>
  <div class="wrapper">
    <div class="header">
      <div class="collapse-btn" @click="toIndex">
        <!-- <li
          :class="{
            'el-icon-s-unfold': collapse,
            'el-icon-s-fold': !collapse,
          }"
        ></li> -->
      </div>
      <div class="logo" @click="toIndex">树洞网后台管理</div>
      <div class="header-right">
        <div class="header-user-con">
          <div class="user-avator">
            <!-- <img :src="$baseImgUrl + $user.portrait" alt="" /> -->
            <!-- {{ this.$user.username }} -->
          </div>
          <div class="user-name el-dropdown">
            <el-dropdown>
              <!-- <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span> -->
              <span class="username">
                {{ this.$user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="login-out">
                 <!-- <el-dropdown-item
                  ><div>
                    设置</div
                  ></el-dropdown-item
                > -->
                <el-dropdown-item 
                  ><div @click="exit">
                    退出</div
                  >
                  </el-dropdown-item>
                 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      collapse: true,
      userName: "",
    };
  },
  created() {
    this.userName = this.$user.userName
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    isCollapse() {
      this.collapse = !this.collapse;
      this.$eventBus.$emit("eventBusName", this.collapse)
    },
    toIndex () {
      this.$eventBusTag.$emit("eventBusName", '首页', 'el-icon-house')
      this.$eventBusiIcon.$emit("eventBusName", '首页', 'el-icon-house')
    },
    exit () {
      console.log('退出')
      Object.assign(this.$user,
      {
        userId : '',
        username: '',
        motto: '',
        type: '',
        portrait: ''
      } )
      
      sessionStorage.removeItem("user")
      console.log('退出后', this.$user)
      this.$router.push('/login')
    }
  },
  created () {
    // this.isCollapse()
  }
};
</script>

<style scoped>
.header {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #000;
  /* background: #242f42; */
  background: #fff;
}
.header .collapse-btn {
  cursor: pointer;
  float: left;
  /* padding: 10px; */
  margin:  0px  10px;
  /* cursor: pointer; */
  line-height: 50px;
  width: 40px;
  height: 50px;
  box-sizing: border-box;
  background: url('../../assets/img/logo.png') no-repeat center;
  background-size: 100%;
}
.header .collapse-btn:hover {
  /* background-color: #2c3a50; */
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
  text-align: left;
  font-size: 20px;
  cursor: pointer;
}
.header .header-right {
  float: right;
  padding-right: 50px;
}
.header .header-right .header-user-con {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.header .header-right .header-user-con .btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.header .header-right .header-user-con .btn-bell .el-icon-bell {
  color: #fff;
}
.header .header-right .header-user-con .user-avator {
  margin-left: 20px;
  font-size: 16px;
}
.header .header-right .header-user-con .user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header .header-right .header-user-con .user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.login-out a {
  text-decoration: none;
  color: #666;
}
.username {
  display: inline-block;
  height: 30px;
  /* padding: 10px; */
  box-sizing: border-box;
  line-height: 30px;
  cursor: pointer;
}
</style>