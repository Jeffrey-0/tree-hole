<template>
  <div id="friend">
    <!-- <div class="top">

    </div>
    <div class="content">

    </div> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="消息" name="first">
        <chat :users="latelyUsers"></chat>
      </el-tab-pane> -->
      <el-tab-pane label="关注" name="second">
        <chat :users="followUsers"></chat>
      </el-tab-pane>
      <el-tab-pane label="粉丝" name="third">
        <chat :users="fanUsers"></chat>
      </el-tab-pane>
      <!-- <el-tab-pane label="评论" name="fourth">
        <comment-list></comment-list>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import {selectrelationById, showAllrelationByPage, deleterelationById, insertrelation, updaterelationById, showAllFansByUserId, showAllFollowsByUserId} from '@/network/relation'
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
      activeName: 'second',
      fanUsers: [],
      followUsers: [],
      latelyUsers: [],

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created () {
    showAllFansByUserId(this.$user.userId).then (res => {
      this.fanUsers = res
    })
    showAllFollowsByUserId(this.$user.userId).then (res => {
      this.followUsers = res
    })
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
