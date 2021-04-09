<template>
  <div id="secretList">
    <secret-item v-for="secret in secretList" :key="secret.secretId" :secret="secret"></secret-item>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SecretItem from './SecretItem'
import {showAllSecretByPage} from '@/network/secret'
export default {
  name: '',
  components: {
    SecretItem: SecretItem
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 6,
      total: 0,
      secretList: []
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.refresh()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.refresh()
    },
    // 刷新数据
    refresh () {
      if(window.document.getElementById(`content`)) {
        window.document.getElementById(`content`).scrollIntoView({
          behavior: "smooth",  // 平滑过渡
          block:    "start"  // 上边框与视窗顶部平齐。默认值
        })
      }

      showAllSecretByPage(this.currentPage, this.pageSize).then(res => {
        this.secretList = res.data
        this.total = res.total
        console.log(this.secretList)
      })
    }
  },
  created () {
    console.log('route', this.$route.path)
    // if (this.$route.path === '/home' || this.$route.path === '/') {
      this.refresh()
    // }
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
