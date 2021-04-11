<template>
  <div id="friend-list">
      <div class="friend-item" v-for="item in users" :key="item.id">
        <img class="portrait" :src=" $baseImgUrl + item.portrait" @click="toUserHome(item)">
        <div class="username"  @click="toChatUser(item)">{{ item.username }}</div>
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
      currentUser: {
        userId: 0,
        username: '小疯子'
      }
    }
  },
  props : {
    users: {}
  },
  methods: {
    toUserHome (item) {
      this.$router.push('m-user?userId=' + item.userId)
    },
    toChatUser (item) {
      this.$router.push('m-chat?userId=' + item.userId)
    }
  },
  created () {

  }
}
</script>


<style scoped lang='scss'>
#friend-list {
  width: 100%;
  height: 100%;
  .friend-item {
  height: 81px;
  text-align: center;
  background: #fff;
  cursor: pointer;
    .portrait {
      width: 60px;
      height: 60px;
      float: left;
      margin: 10px;
      // border-radius: 50%;
      border-radius: 5px;
    }
    .username {
      font-size: 22px;
      // margin-left: 10px;
      text-align: left;
      height: 80px;
      line-height: 80px;
      text-indent: 1em;
      width: calc(100% - 80px);
      float: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
       border-bottom: 1px solid #eee;
    }
  }
}
</style>
