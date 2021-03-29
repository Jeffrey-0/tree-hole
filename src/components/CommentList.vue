<template>
  <div id="commentList">
    <!-- 聊天组件 -->
    <div class="top">
      <comment-item></comment-item>
      <el-divider></el-divider>
      <comment-item></comment-item>    
      <el-divider></el-divider>
      <comment-item></comment-item>
      <el-divider></el-divider>
      <comment-item></comment-item>
      <el-divider></el-divider>
      <comment-item></comment-item>
      <el-divider></el-divider>
    </div>
    <div class="bottom">
    <!-- 分页 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>

    <!-- <comment-item></comment-item> -->

  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
export default {
  name: '',
  components: {
    CommentItem
  },
  data () {
    return {
      currentPage: 5,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped lang='scss'>
#commentList {
  padding: 15px;
  .el-pagination {
    text-align: center;
  }
  height: 100%;
  .top {
    height: calc(100% - 70px);
  }
  .bottom {
    height: 50px;
    padding: 10px 0px;
  }
}
</style>
