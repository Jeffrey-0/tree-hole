<template>
  <div id="m-secret">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广场" name="first">
        <div class="wrapper" ref="wrapper1">
          <div class="secretList">
            <secret-item v-for="(secret, index) in SecretList.first" :key="index" :secret="secret" @deleteSecret="deleteSecret"></secret-item>
          </div>
        </div>
        
      </el-tab-pane>
      <el-tab-pane label="关注" name="second">
        <div class="wrapper" ref="wrapper2">
          <div class="secretList">
            <secret-item v-for="(secret, index) in SecretList.second" :key="index" :secret="secret" @deleteSecret="deleteSecret"></secret-item>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="私人" name="third">
        <div class="wrapper" ref="wrapper3">
          <div class="secretList">
            <secret-item v-for="(secret, index) in SecretList.third" :key="index" :secret="secret" @deleteSecret="deleteSecret"></secret-item>
          </div>
        </div>
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
      // total1: 0,
      // total2: 0,
      // total3: 0,
      total: {
        first: 0,
        second: 0,
        third: 0
      },
      SecretList: {
        first: [],
        second: [],
        third: [],
      },
      currentPage: {
        first: 1,
        second: 1,
        third: 1
      },
      finish: {
        first: 0,
        second: 0,
        third: 0
      },
      pageSize: 6,
      myScroll: {
        first: '',
        second: '',
        third: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    refresh () {
      showAllSecretByPower(this.currentPage.first, this.pageSize).then(res => {
        this.SecretList.first = res.data
        this.total.first = res.total
        let that = this
        // 延迟0.2秒给图片加载时间
        setTimeout(function () {
          that.myScroll.first.refresh()
        }, 200)
      })
      if (this.$user.userId) {
        showAllSecretByFollows(this.$user.userId, this.currentPage.second, this.pageSize).then(res => {
          this.SecretList.second = res.data
          this.total.second = res.total
        })
      }
      if (this.$user.userId) {
        showAllSecretByMyself(this.$user.userId, this.currentPage.third, this.pageSize).then(res => {
          this.SecretList.third = res.data
          this.total.third = res.total
        })
      }
    },
    // 下拉刷新
    pullingDown () {
      // if (activeName === 'first') {
        console.log('this.activeName', this.activeName)
        this.currentPage[this.activeName] = 1
        this.finish[this.activeName] = 0
        if (this.activeName === 'first') {
          showAllSecretByPower(this.currentPage[this.activeName], this.pageSize).then(res => {
            this.SecretList[this.activeName] = res.data
            this.total[this.activeName] = res.total
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        } else if (this.activeName === 'second') {
          showAllSecretByFollows(this.$user.userId, this.currentPage[this.activeName], this.pageSize).then(res => {
            this.SecretList[this.activeName] = res.data
            this.total[this.activeName] = res.total
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        } else if (this.activeName === 'third') {
          showAllSecretByMyself(this.$user.userId, this.currentPage[this.activeName], this.pageSize).then(res => {
            this.SecretList[this.activeName] = res.data
            this.total[this.activeName] = res.total
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        }
    },
    // 上拉加载
    pullingUp () {
      console.log('this.activeName', this.activeName, this.finish[this.activeName])
      if (this.finish[this.activeName]) {
          this.$message('已经到底了!')
           this.myScroll[this.activeName].finishPullUp()
          return
        }
        
        this.currentPage[this.activeName] ++
        // this.finish[this.activeName] = 0
        if (this.activeName === 'first') {
          showAllSecretByPower(this.currentPage[this.activeName], this.pageSize).then(res => {
            if (res.data.length < this.pageSize) { this.finish[this.activeName] = 1}
            res.data.map(item => {
              this.SecretList[this.activeName].push(item)
            })
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        } else if (this.activeName === 'second') {
          showAllSecretByFollows(this.$user.userId, this.currentPage[this.activeName], this.pageSize).then(res => {
            if (res.data.length < this.pageSize) { this.finish[this.activeName] = 1}
            res.data.map(item => {
              this.SecretList[this.activeName].push(item)
            })
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        } else if (this.activeName === 'third') {
          showAllSecretByMyself(this.$user.userId, this.currentPage[this.activeName], this.pageSize).then(res => {
            if (res.data.length < this.pageSize) { this.finish[this.activeName] = 1}
            res.data.map(item => {
              this.SecretList[this.activeName].push(item)
            })
            let that = this
            // 延迟0.2秒给图片加载时间
            setTimeout(function () {
              that.myScroll[that.activeName].refresh()
            }, 200)
          })
        }
    },
    imgLoad () {
      // 图片加载完成
      this.myScroll.refresh()
      console.log('图片加载完成')
    },
    // 监听到子组件删除秘密
    deleteSecret (secretId) {
      // this.refresh()
      this.SecretList.first = this.SecretList.first.filter((item) => item.secretId !== secretId)
      this.SecretList.second = this.SecretList.second.filter((item) => item.secretId !== secretId)
      this.SecretList.third = this.SecretList.third.filter((item) => item.secretId !== secretId)
    }
  },
  created () {
    this.refresh()
    
  },
  mounted() {
    let that = this

    this.$nextTick(() => {
      this.myScroll.first = new BScroll(this.$refs.wrapper1, {
        scrollY: true,
        pullDownRefresh: {
          threshold: 50,
        },
        pullUpLoad: {
          threshold: -50,
          probeType: 3
        },
        mouseWheel: true,
        click: true
      })
      this.myScroll.first.on('pullingDown', () => {

        console.log('下拉刷新')
        this.pullingDown()
        this.myScroll.first.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
      })
      this.myScroll.first.on('pullingUp', () => {
        console.log('上拉加载')
        this.pullingUp()
        this.myScroll.first.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      })
    })
  },
  watch : {
    activeName (newVal, oldVal) {
      this.activeName = newVal
      if (newVal === 'second') {
        if (!this.myScroll.second) {
          this.$nextTick(() => {
            this.myScroll.second = new BScroll(this.$refs.wrapper2, {
              scrollY: true,
              pullDownRefresh: {
                threshold: 50,
              },
              pullUpLoad: {
                threshold: -70,
                probeType: 3
              },
              mouseWheel: true,
              click: true
            })
            this.myScroll.second.on('pullingDown', () => {
              console.log('下拉刷新')
              this.pullingDown()
              this.myScroll.second.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
            })
            this.myScroll.second.on('pullingUp', () => {
              console.log('上拉加载')
              this.pullingUp()
              this.myScroll.second.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
            })
          })
        }
      } else if (newVal === 'third') {
        if (!this.myScroll.third) {
          this.$nextTick(() => {
            this.myScroll.third = new BScroll(this.$refs.wrapper3, {
              scrollY: true,
              pullDownRefresh: {
                threshold: 50,
              },
              pullUpLoad: {
                threshold: -70,
                probeType: 3
              },
              mouseWheel: true,
              click: true
            })
            this.myScroll.third.on('pullingDown', () => {

              console.log('下拉刷新')
              this.pullingDown()
              this.myScroll.third.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
            })
            this.myScroll.third.on('pullingUp', () => {
              console.log('上拉加载')
              this.pullingUp()
              this.myScroll.third.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
            })
          })
        }
      }
    }
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
  // height: 500px;
  overflow: hidden;
  // -webkit-overflow-scrolling : touch;
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
