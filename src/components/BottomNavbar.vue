<template>
  <div id="bottomWrap">
    <div class="link">
      <router-link to="/">意见反馈</router-link>
      <router-link to="/">服务条款</router-link>
      <router-link to="/">隐私政策</router-link>
      <router-link to="/">关于树洞</router-link>
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

<style scoped>
#bottomWrap {
  width: 100%;
  height: 63px;
  position: relative;
  background: #2d2e30;
}
#bottomWrap .link {
  margin-top: 10px;
  padding-top: 20px;
}
#bottomWrap a {
  text-decoration: none;
  color: gainsboro;
  padding: 0 40px;
}
#bottomWrap a:hover {
  color: rgb(94, 185, 244);
}
</style>
