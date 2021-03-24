// 手机端主页
<template>
  <div id="mIndex">
    <!-- <el-button>手机端主页</el-button> -->
    <!-- <div class="top">
      {{ title }}
    </div> -->
    <div class="center">
      <!-- 嵌套路由 -->
      <router-view></router-view>
    </div>
    <div class="bottom">
      <bottom-bar></bottom-bar>
    </div>
  </div>
</template>

<script>
import BottomBar from '@/components/m/BottomBar'
export default {
  name: 'mIndex',
  components: {
    BottomBar
  },
  data () {
    return {
      title: '秘密'
    }
  },
  methods: {
  },
  mounted () {
    this.title = this.$route.name
  },
  watch: {
    $route: {
      handler (to, form = null) {
        this.title = this.$route.name
      }
    }
  }
}
</script>

<style scoped lang='scss'>
#mIndex {
  width: 100%;
  height: 100%;
  color: #000;
}
.top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
}
.center {
  background: #f2f2f2;
  width: 100%;
  height: calc(100% - 60px);
  overflow: scroll;
  position: relative;
}
.bottom {
  width: 100%;
  height: 60px;
  // background: red;
  // border-top: 1px solid #aaa;
  box-sizing: border-box;
}
</style>
