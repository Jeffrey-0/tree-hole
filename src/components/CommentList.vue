<template>
  <div id="commentList">
    <!-- 聊天组件 -->
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
    <!-- <comment-item></comment-item> -->
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
  min-height: 530px;
}
</style>
