<template>
  <div id="m-secret">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广场" name="first">
        <div class="secretList">
          <secret-item v-for="secret in allSecretList" :key="secret.secretId" :secret="secret"></secret-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注" name="second">
        <secret-item v-for="secret in followSecretList" :key="secret.secretId" :secret="secret"></secret-item>
      </el-tab-pane>
      <el-tab-pane label="私人" name="third">
        <secret-item v-for="secret in myselfSecretList" :key="secret.secretId" :secret="secret"></secret-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SecretItem from '@/components/SecretItem'
import {showAllSecretByPage, showAllSecretByPower, showAllSecretByFollows, showAllSecretByUserId, showAllSecretByMyself} from '@/network/secret'
export default {
  name: '',
  components: {
    SecretItem
  },
  data () {
    return {
      activeName: 'first',
      allSecretList: [],
      followSecretList: [],
      myselfSecretList: [],
      total1: 0,
      total2: 0,
      total3: 0,
      currentPage: 1,
      pageSize: 6
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    refresh () {
      showAllSecretByPower(this.currentPage, this.pageSize).then(res => {
        this.allSecretList = res.data
        this.total1 = res.total
      })
      showAllSecretByFollows(this.$user.userId, this.currentPage, this.pageSize).then(res => {
        this.followSecretList = res.data
        this.total2 = res.total
      })
      showAllSecretByMyself(this.$user.userId, this.currentPage, this.pageSize).then(res => {
        this.myselfSecretList = res.data
        this.total3 = res.total
      })
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style scoped lang='scss'>
#m-secret {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
#m-secret {
  #secret {
    padding: 10px;
    .content {
      text-align: left;
    }
  }
}
</style>
