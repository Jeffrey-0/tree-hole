<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary">退出</el-button>
    <el-button type="primary" class="exit" @click="signOut">退出登录</el-button>
  </div>

</template>

<style scoped lang="scss">
$color: green;
h1 {
  color: $color;
}
</style>
