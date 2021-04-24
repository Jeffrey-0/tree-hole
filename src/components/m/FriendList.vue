<template>
  <div id="friend-list">
    <div  v-if="usersType!==1">
      <div class="friend-item" v-for="item in users" :key="item.id">
        <img class="portrait" :src=" $baseImgUrl + item.portrait" @click="toUserHome(item)">
        <div class="username"  @click="toChatUser(item)">{{ item.username }}</div>
      </div>
    </div>
    <div  v-else class="recently">
      <div class="friend-item" v-for="item in users" :key="item.id">
        <div class="left" @click="toUserHome(item)">
            <el-badge :value="item.unread" :max="99" class="item" v-if="item.unread">
              <img class="portrait" :src="$baseImgUrl + item.portrait" >
            </el-badge>
          <img class="portrait" :src="$baseImgUrl + item.portrait" v-else>
        </div>
        <div class="right" @click="toChatUser(item)">
          <div class="top">
            <div class="createTime">{{isOverOneDay(item.createTime) ? $moment(item.createTime).format('YYYY-MM-DD') : $moment(item.createTime).fromNow()}}</div>
            <div class="username">{{ item.username }}</div>
          </div>
          <div class="bottom">
            <div class="content">{{ item.content }}</div>
          </div>
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
      currentUser: {
        userId: 0,
        username: '小疯子'
      }
    }
  },
  props : {
    users: {},
    usersType: {}  // 1.最近聊天，2.关注，3.粉丝
  },
  methods: {
    toUserHome (item) {
      this.$router.push('m-user?userId=' + item.userId)
    },
    toChatUser (item) {
      item.unread = 0
      this.$router.push('m-chat?userId=' + item.userId)
    },
    // 判断该时间是否与当前时间超过一天
    isOverOneDay (time) {
      // let time1 = new Date(time).getTime()
      let curTime = new Date().getTime()
      // console.log('Math.abs(time, curTime)', Math.abs(time, curTime), time, curTime)
      if (curTime - time < 86400000 && time - curTime < 86400000) {
        return false
      } else {
        return true
      }
    },
  },
  created () {

  },
  watch : {
     users (newVal, oldVal) {
       this.users = newVal
     }
   }
}
</script>


<style scoped lang='scss'>
#friend-list {
  margin-top: 10px;
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
    // 最近来聊天头像
    
  .recently .friend-item  {
    // .el-badge {
    //   margin: 15px;
    //   float: left;
    //   img {
    //     margin: 0;
    //   }
    // }
    .left {
      float: left;
      width: 80px;
      height: 100%;
      // background: red;
    }
    .right {
      float: left;
      width: calc(100% - 80px);
      height: 100%;
      // background: green;
      .top {
        width: 100%;
        height: 50px;
        .createTime {
          float: right;
          color: #aaa;
          height: 50px;
          line-height: 50px;
        }
        .username {
          float: left;
          height: 50px;
          line-height: 50px;
          border: 0;
        }
      }
      .bottom {
        width: 100%;
        height: 30px;
        .content {
          text-align: left;
          height: 30px;
          line-height: 16px;
          font-size: 16px;
          color: #aaa;
          text-indent: 1em;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
