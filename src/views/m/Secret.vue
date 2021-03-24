<template>
  <div id="m-secret">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广场" name="first">
        <div class="secretList">
          <secret-item></secret-item>
          <secret-item></secret-item>
          <secret-item></secret-item>
          <secret-item></secret-item>
          <secret-item></secret-item>
          <secret-item></secret-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注" name="second">
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
      </el-tab-pane>
      <el-tab-pane label="私人" name="third">
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
        <secret-item></secret-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SecretItem from '@/components/SecretItem'
export default {
  name: '',
  components: {
    SecretItem
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped lang='scss'>
#m-secret {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
#m-secret {
  #secret {
    padding: 10px;
    .content {
      text-align: left;
    }
  }
}
</style>
