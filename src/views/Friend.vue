<template>
  <div id="friend">
    <!-- <div class="top">

    </div>
    <div class="content">

    </div> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消息" name="first">
        <chat></chat>
      </el-tab-pane>
      <el-tab-pane label="关注" name="second">
        <chat></chat>
      </el-tab-pane>
      <el-tab-pane label="粉丝" name="third">
        <chat></chat>
      </el-tab-pane>
      <el-tab-pane label="评论" name="fourth">
        <comment-list></comment-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
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
    min-height: 100%;
    box-sizing: border-box;
    }
    .el-tabs__header {
      box-shadow: 0 0px 0px #ddd
    }

}
</style>
