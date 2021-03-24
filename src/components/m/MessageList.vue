<template>
  <div id="message-list">
      <div class="message-item" v-for="item in messages" :key="item.id" @click="toChat">
        <img class="portrait" :src="require('../../assets/img/avatar.png')">
        <div class="content">
          <div class="top">
            <div class="username">{{ item.userName }}</div>
            <div class="create-time">{{ item.createTime }}</div>
          </div>
          <div class="bottom">
            <div class="message">{{ item.message }}</div>
          </div>
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
      messages: [
        {
          userId: 1,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 2,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 3,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 4,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 5,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 6,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        },
        {
          userId: 7,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱撒旦法第三方是 撒旦法'
        },
        {
          userId: 8,
          userName: '小疯子',
          avatar: 'avatar.png',
          createTime: '2020-3-23',
          message: '为切实提高师生安全意识，有效预防诈骗陷阱，撒旦法第三方是 撒旦法'
        }
      ]
    }
  },
  methods: {
    toChat () {
      this.$router.push('m-chat')
    }
  }
}
</script>


<style scoped lang='scss'>
#message-list {
  width: 100%;
  height: 100%;
  .message-item {
  height: 81px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  // border-bottom: 1px solid #eee;
  cursor: pointer;
    .portrait {
      width: 60px;
      height: 60px;
      float: left;
      margin: 10px;
      // border-radius: 50%;
      border-radius: 5px;
    }
    .content {
      font-size: 20px;
      // margin-left: 10px;
      text-align: left;
      height: 80px;
      // line-height: 70px;
      width: calc(100% - 90px);
      float: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      .top {
        width: 100%;
        height: 40px;
        .username {
          width: 50%;
          height: 100%;
          font-size: 20px;
          line-height: 40px;
          display: inline-block;
        }
        .create-time {
          width: 50%;
          height: 100%;
          font-size: 14px;
          line-height: 40px;
          color: #999;
          display: inline-block;
          text-align: right;
        }
      }
      .bottom {
        width: 100%;
        height: 40px;
        color: #999;
        line-height: 40px;
        
        font-size: 14px;
        .message {
          width: 100%;
          white-space: nowrap;
          overflow:hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
