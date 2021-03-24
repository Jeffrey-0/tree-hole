<template>
  <div id="secretList">
    <secret-item></secret-item>
    <secret-item></secret-item>
    <secret-item></secret-item>
    <secret-item></secret-item>
    <secret-item></secret-item>
    <secret-item></secret-item>
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
import SecretItem from './SecretItem'
export default {
  name: '',
  components: {
    SecretItem: SecretItem
  },
  data () {
    return {
      currentPage: 5
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
#secretList{
  width: 100%;
}

#secretList .el-pagination {
  background: #fff;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 50px;
}
</style>
