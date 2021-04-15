<template>
  <div id="m-secret">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广场" name="first">
        <div class="wrapper" ref="wrapper">
          <div class="secretList">
            <secret-item v-for="secret in allSecretList" :key="secret.secretId" :secret="secret" @imgLoad="imgLoad"></secret-item>
          </div>
        </div>
        
      </el-tab-pane>
      <el-tab-pane label="关注" name="second" v-if="$user.userId">
        <secret-item v-for="secret in followSecretList" :key="secret.secretId" :secret="secret"></secret-item>
      </el-tab-pane>
      <el-tab-pane label="私人" name="third" v-if="$user.userId">
        <secret-item v-for="secret in myselfSecretList" :key="secret.secretId" :secret="secret"></secret-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入滑动插件
import BScroll from 'better-scroll'
import Pulldown from '@better-scroll/pull-down'
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
      pageSize: 6,
      myScroll: '',
      finish: 0
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
        let that = this
        // 延迟0.2秒给图片加载时间
        setTimeout(function () {
          that.myScroll.refresh()
        }, 200)
      })
      if (this.$user.userId) {
        showAllSecretByFollows(this.$user.userId, this.currentPage, this.pageSize).then(res => {
          this.followSecretList = res.data
          this.total2 = res.total
        })
      }
      if (this.$user.userId) {
        showAllSecretByMyself(this.$user.userId, this.currentPage, this.pageSize).then(res => {
          this.myselfSecretList = res.data
          this.total3 = res.total
        })
      }
    },
    imgLoad () {
      // 图片加载完成
      this.myScroll.refresh()
      console.log('图片加载完成')
    }
  },
  created () {
    this.refresh()
  },
  mounted() {
    this.$nextTick(() => {
      this.myScroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        pullDownRefresh: {
          threshold: 50,
          // probeType: 3
        },
        pullUpLoad: {
          threshold: -100,
          probeType: 3
        }
      })
      this.myScroll.on('pullingDown', () => {

        console.log('下拉刷新')
        // this.$nextTick(() => {
        //   this.myScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
        // })
        this.currentPage = 1
        this.finish = 0
        showAllSecretByPower(this.currentPage, this.pageSize).then(res => {
          this.allSecretList = res.data
          this.total1 = res.total
          let that = this
          // 延迟0.2秒给图片加载时间
          setTimeout(function () {
            that.myScroll.refresh()
          }, 200)
        })
        this.myScroll.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
      })
      this.myScroll.on('pullingUp', () => {
        console.log('上拉加载')
        if (this.finish) {
          console.log('到底了')
           this.myScroll.finishPullUp()
          return
        }
        this.currentPage ++
        showAllSecretByPower(this.currentPage, this.pageSize).then(res => {
          if (res.data.length < this.pageSize) { this.finish = 1}
          res.data.map(item => {
            this.allSecretList.push(item)
          })
          
          this.total1 = res.total
          let that = this
          // 延迟0.2秒给图片加载时间
          setTimeout(function () {
            that.myScroll.refresh()
          }, 200)
        })
        // this.$nextTick(() => {
        //   this.myScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
        // })
        this.myScroll.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      })
    })


    // this.myScroll.on('pullingDown', () => {
    //   console.log('下拉刷新')
    //   this.$nextTick(() => {
    //     this.myScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
    //   })
    //   this.myScroll.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
    // })

    // this.myScroll.on('pullingUp', () => {
    //   console.log('上拉加载')
    //   this.$nextTick(() => {
    //     this.myScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
    //   })
    //   this.myScroll.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
    // })
  }
}
</script>

<style scoped lang='scss'>
#m-secret {
  width: 100%;
  height: 100%;
}
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  -webkit-overflow-scrolling : touch;
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
