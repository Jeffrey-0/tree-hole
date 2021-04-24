<template>
  <div id="friend">
    <!-- <div class="top">

    </div>
    <div class="content">

    </div> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消息" name="first">
        <chat :users="latelyUsers" :usersType="1" @updateUsersBySon="updateUsersBySon"></chat>
      </el-tab-pane>
      <el-tab-pane label="关注" name="second">
        <chat :users="followUsers" :usersType="2"></chat>
      </el-tab-pane>
      <el-tab-pane label="粉丝" name="third">
        <chat :users="fanUsers" :usersType="3"></chat>
      </el-tab-pane>
      <!-- <el-tab-pane label="评论" name="fourth">
        <comment-list></comment-list>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import {selectrelationById, showAllrelationByPage, deleterelationById, insertrelation, updaterelationById, showAllFansByUserId, showAllFollowsByUserId} from '@/network/relation'
import {showRecentChatByUserId} from '@/network/chat'
import Chat from '@/components/Chat'
import CommentList from '@/components/CommentList'
export default {
  name: '',
  components: {
    Chat,
    CommentList
  },
  data() {
    return {
      activeName: 'first',
      fanUsers: [],
      followUsers: [],
      latelyUsers: [],

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    updateUsersBySon(index) {
      // 1:需要重新获取列表，2不需要
      console.log('监听到chat组件发送过来的更新请求')
      if (index === 1) {
        showRecentChatByUserId(this.$user.userId).then(res => {
          this.latelyUsers = res.data
        })
      } else {
        this.latelyUsers = this.$mydata.recentUsers
      }
    }
  },
  created () {
    showAllFansByUserId(this.$user.userId).then (res => {
      this.fanUsers = res
    })
    showAllFollowsByUserId(this.$user.userId).then (res => {
      this.followUsers = res
    })
    this.latelyUsers = this.$mydata.recentUsers
    this.$eventBus.$on('updateRecentUsers', () => {
      this.latelyUsers = this.$mydata.recentUsers
    })
    // showRecentChatByUserId(this.$user.userId).then(res => {
    //   this.latelyUsers = res.data
    // })
  }
}
</script>

<style scoped lang='scss'>
#friend {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  border-radius: 5px;

  .el-tabs--top {
    background: #fff;
    padding: 20px 15px;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    }
    .el-tabs__header {
      box-shadow: 0 0px 0px #ddd
    }
    .el-tabs__content {
      height: calc(100% - 40px);
      background: yellow;
      .el-tab-pane {
        height: 100%;
      }
    }

}
</style>
