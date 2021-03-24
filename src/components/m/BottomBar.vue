<template>
  <div id="mBottomBar">
    <div class="item" @click="$router.push('m-secret')">
      <div class="icon">
        <i class="el-icon-edit"></i>
      </div>
      <div class="title">
        秘密
      </div>
    </div>
    <div class="item" @click="$router.push('plan')">
      <div class="icon">
        <i class="el-icon-tickets"></i>
      </div>
      <div class="title">
        计划
      </div>
    </div>
    <div class="item" @click="$router.push('upload')">
      <div class="icon">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
      <div class="title">
        发表
      </div>
    </div>
    <div class="item" @click="$router.push('m-friend')">
      <div class="icon">
        <i class="el-icon-chat-line-round"></i>
      </div>
      <div class="title">
        消息
      </div>
    </div>
    <div class="item"  @click="$router.push('album')">
      <div class="icon">
        <i class="el-icon-user"></i>
      </div>
      <div class="title">
        我
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
#mBottomBar {
  width: 100%;
  height: 100%;
  .item {
    display: inline-block;
    width: 20%;
    height: 100%;
    vertical-align: center;
    color: black;
    cursor: pointer;
    .icon {
      width: 100%;
      height:40px;
      font-size: 30px;
      line-height: 40px;
    }
    .title {
      font-size: 14px;
    }
  }
}
</style>
