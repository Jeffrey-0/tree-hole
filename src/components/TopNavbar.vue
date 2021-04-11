<template>
<div id="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#00000000" router>
      <el-menu-item index="home"><i class="el-icon-s-home"></i>首页</el-menu-item>
      <el-menu-item index="watch"><i class="el-icon-s-promotion"></i>关注</el-menu-item>
      <el-menu-item index="myself"><i class="el-icon-s-custom"></i>私人</el-menu-item>
      <el-menu-item index="plan"><i class="el-icon-s-claim"></i>计划</el-menu-item>
      <el-menu-item index="album"><i class="el-icon-picture"></i>相册</el-menu-item>
      <el-menu-item index="friend"><i class="el-icon-s-comment"></i>好友</el-menu-item>
      <el-menu-item index="upload"><i class="el-icon-circle-plus"></i>发表</el-menu-item>
      <!-- <el-menu-item>
        <el-switch
          v-model="value">
        </el-switch>
      </el-menu-item> -->
      <!-- <el-menu-item class="search">
        <el-input v-model="input" placeholder="搜索">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-menu-item> -->
    </el-menu>
  <!-- </div> -->
  <!-- <div class="right">
  </div> -->
</div>
</template>

<script>
export default {
  name: 'navbar',
  components: {
  },
  data () {
    return {
      searchInput: '',
      input: '',
      activeIndex: '1',
      value: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
#navbar {
  position: fixed;
  z-index: 1;
  top: 0;
  background-color: rgba(40,42,44,0.6);
  width: 100%;
}
.el-menu--horizontal>.el-menu-item {
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  &:hover {
    background-color: aqua;
  }
}
.left, .right {
  position: absolute;
}
.left {
  left: 0px;
}
.right{
  right: 0px;
}
.search{
  margin-left: 20%;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}
#navbar ul{
  padding-left: 50px;
}

#navbar ul li{
  
  color: #fff !important;
  background: #00000000 !important;
  font-size: 16px;
  
  &:hover  {
    color:#409eff !important;
  }
}

</style>
