<template>
  <div id="friend-list">
      <div class="friend-item" v-for="item in friends" :key="item.id">
        <img class="portrait" :src="require('../../assets/img/avatar.png')">
        <div class="username">小疯子</div>
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
      friends: [
        {
          userId: 1,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 2,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 3,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 4,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 5,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 6,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 7,
          userName: '小疯子',
          avatar: 'avatar.png'
        },
        {
          userId: 8,
          userName: '小疯子',
          avatar: 'avatar.png'
        }
      ]
    }
  },
  methods: {
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
