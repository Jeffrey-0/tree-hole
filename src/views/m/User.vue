<template>
  <div id="user">
    <div class="top">
      <div class="info">
        <div class="avatar">
          <img class="portrait" :src=" $baseImgUrl + this.currentUser.portrait">
        </div>
        <div class="usernameMotto">
          <div class="username">
            <span>{{ this.currentUser.username }}</span>
            <el-button v-if="currentUser.userId === $user.userId" round size="small">编辑</el-button>
            <el-button v-if="currentUser.userId === $user.userId" round size="small">退出</el-button>
            <el-button v-if="currentUser.userId !== $user.userId" round size="small">取关</el-button>
            <el-button v-if="currentUser.userId !== $user.userId" round size="small">聊天</el-button>
          </div>
          <div class="motto">{{ this.currentUser.motto }}</div>
        </div>
      </div>
      <!-- <div class="edit">
        <div class="nav">
          <div class="item">
            <div class="number">10</div>
            <div class="title">粉丝</div>
          </div>
          <div class="item">
            <div class="number">10</div>
            <div class="title">秘密</div>
          </div>
          <div class="item">
            <div class="number">10</div>
            <div class="title">计划</div>
          </div>
        </div>
        <div class="editBt">
          <el-button round>发送</el-button>
          <el-button icon="el-icon-setting" round></el-button>
        </div>
      </div> -->
    </div>
    <div class="bottom">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="秘密" name="first">
          <div class="wrapper" ref="wrapper">
            <div class="secretList">
              <secret-item v-for="secret in SecretList" :key="secret.secretId" :secret="secret"></secret-item>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="计划" name="second">
          <div class="targer">
            <div class="doingTarger">
              <div class="targerItem" v-for="(item,index) in doingTargers" :key="item.planId" @click="targerClick(item, index)">
                <div class="icon">
                  <i :class="item.content"></i>
                </div>
                <div class="content">{{ item.name }}</div>
              </div>
            </div>
            <!-- <el-divider></el-divider> -->
            <div class="title">已结束</div>
            <div class="endTarger">
              <div class="targerItem" v-for="(item,index) in endTargers" :key="item.planId" @click="targerClick(item, index)">
                <div class="icon">
                  <i :class="item.content"></i>
                </div>
                <div class="content">{{ item.name }}</div>
              </div>
              
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相册" name="third" v-if="this.$ifMobile.res">
          <!-- <div id="wrap"> -->
            
          <!-- </div> -->
        </el-tab-pane>
      </el-tabs>
      <div class="photo" v-if="activeName === 'third'">
        <vue-waterfall-easy :imgsArr="imgsArr"  @scrollReachBottom="fetchImgsData"></vue-waterfall-easy>
      </div>
    </div>

  </div>
</template>

<script>
// 导入滑动插件
import BScroll from 'better-scroll'
import SecretItem from '@/components/SecretItem'
import Album from '@/views/Album'
import vueWaterfallEasy from 'vue-waterfall-easy'
import {showAllByUserId} from "@/network/album"
import {showAllSecretByPage, showAllSecretByPower, showAllSecretByFollows, showAllSecretByUserId, showAllSecretByMyself} from '@/network/secret'
import {selectPlanById, showAllPlanByPage, deletePlanById, insertPlan, updatePlanById, showAllPlanByUserId, showAllByCurrentDate} from '@/network/plan'
import {selectUserById, showAllUserByPage, deleteUserById, insertUser, updateUserById} from '@/network/user'
export default {
  name: '',
  components: {
    Album,
    SecretItem,
    vueWaterfallEasy
  },
  data () {
    return {
      activeName: 'first',
      targers: [{
        id: 1,
        content: '学英语换行的反馈了上搭建费李',
        createTime: '2021-3-16',
        endTime: '2021-2-16',
        days: [1, 2, 3, 4, 5],
        icon: 'el-icon-baseball',
        finish: 0
      }],
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
      SecretList: [],
      currentUserId: 0,
      currentUser: {
        userId: 3,
        username: '无名',
        portrait: 'user/111.jpg'
      },
      // 秘密
      currentPage: 1,
      pageSize: 3,
      finish: 0,
      total: 0,
      // 目标
      endTargers: [],
      doingTargers: [],
      // 相册
      page: 1,
      rows: 16,
      myScroll: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
     targerClick() {
      // this.dialogFormVisible = true
    },
　　　fetchImgsData () {
        if (this.fetchImgsArr.length > 0) {
          this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
          if (this.fetchImgsArr.length === this.rows) {
            this.page ++
            showAllByUserId(this.$user.userId, this.page + 1, this.rows).then(res => {
              this.fetchImgsArr = res.data.map(item => {
                item.src = this.$baseImgUrl + item.path
                return item
              })
              console.log('获取图片', this.imgsArr, this.fetchImgsArr)
            })
          } else {
            this.fetchImgsArr = []
          }
        } else {
          this.$message.success('已经到底了')
        }
　　　},
    // 刷新
    refresh () {
      // 获取用户
      selectUserById(this.currentUser.userId).then(res => {
        this.currentUser = res
      })

      // 获取秘密
      if (this.currentUser.userId === this.$user.userId) {
        showAllSecretByMyself(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      } else {
        showAllSecretByUserId(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      }

      // 获取目标数据
      showAllPlanByUserId(this.currentUser.userId).then(res => {
        this.doingTargers = res.doing
        this.endTargers = res.finish
      })

      // 获取相册
      showAllByUserId(this.$user.userId, this.page, this.rows).then(res => {
        this.imgsArr = res.data
        this.imgsArr = res.data.map(item => {
          item.src = this.$baseImgUrl + item.path
          return item
        })
      })

      showAllByUserId(this.$user.userId, this.page + 1, this.rows).then(res => {
        // this.fetchImgsArr = res.data
        this.fetchImgsArr = res.data.map(item => {
          item.src = this.$baseImgUrl + item.path
          return item
        })
        console.log('获取图片', this.imgsArr, this.fetchImgsArr)
      })
    },
        // 下拉刷新
    pullingDown () {
      // if (activeName === 'first') {
        this.currentPage = 1
        this.finish = 0

        // 获取秘密
      if (this.currentUser.userId === this.$user.userId) {
        showAllSecretByMyself(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      } else {
        showAllSecretByUserId(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      }
    },
    // 上拉加载
    pullingUp () {
      if (this.finish) {
          this.$message('已经到底了!')
           this.myScroll.finishPullUp()
          return
        }
        
        this.currentPage ++
        // this.finish = 0
        // 获取秘密
      if (this.currentUser.userId === this.$user.userId) {
        showAllSecretByMyself(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
          if (res.data.length < this.pageSize) { this.finish = 1}
            this.SecretList = this.SecretList.concat(res.data)
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      } else {
        showAllSecretByUserId(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
          if (res.data.length < this.pageSize) { this.finish = 1}
            this.SecretList = this.SecretList.concat(res.data)
            let that = this
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      }
    },
  },
  computed : {
  },
  created () {
    
    // console.log('当前路由', this.$route, this.$route.path)
    this.currentUser.userId = this.$route.query.userId ? this.$route.query.userId - 0 :this.$user.userId
    this.refresh()
  },
  mounted () {
    this.$nextTick(() => {
      this.myScroll = new BScroll(this.$refs.wrapper, {
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
      this.myScroll.on('pullingDown', () => {

        console.log('下拉刷新')
        this.pullingDown()
        this.myScroll.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
      })
      this.myScroll.on('pullingUp', () => {
        console.log('上拉加载')
        this.pullingUp()
        this.myScroll.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      })
    })
  }
}
</script>

<style scoped lang='scss'>
#user {
  width: 100%;
  height: 100%;
  text-align: left;
  .top {
    width: 100%;
    height: 100px;
    background: #fff;
    .info {
      width: 100%;
      height: 100px;
      // background: #fff;
      .avatar {
        vertical-align: top;
        width: 100px;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        display: inline-block;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .usernameMotto {
        vertical-align: middle;
        width: calc(100% - 100px);
        height: 100px;
        display: inline-block;
        padding: 15px 5px;
        box-sizing: border-box;
        .username {
          width: 100%;
          height: 30px;
          font-size: 22px;
          line-height: 30px;
          // display: flex;
          // justify-content: space-between;
          button {
            margin-left: 30px;
          }
        }
        .motto {
          width: 100%;
          height: 40px;
          line-height: 40px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

    }
    .edit {
      width: 100%;
      height: 80px;
      padding: 10px;
      box-sizing: border-box;
      .nav {
        display: none;
        width: 200px;
        height: 100%;
        // display: inline-block;
        vertical-align: top;
        .item {
          width: 50px;
          height: 100%;
          padding: 0 5px;
          display: inline-block;
          text-align: center;
        }
      }
      .editBt{
        vertical-align: top;
        // width: calc(100% - 200px);
        width: 100%;
        // float: right;
        height: 100%;
        display: flex;
        justify-content: space-between;
        button {
          
        }      
      }
    }
  }
  .bottom {
    width: 100%;
    height: calc(100% - 100px);
    // background: red;
    background: #fff;
    position: relative;


    // 计划
    .targerItem {
      width: 20%;
      height: 200px;
      margin: 3% 6% 3% 7%;
      float: left;
      text-align: center;
      background: #fff;
      // margin: 20px;
      box-shadow: 1px 1px 2px 2px #8888881c;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.5s;
      .icon {
        font-size: 50px;
        margin-top: 20%;
      }
      .content {
        padding: 20px;
        vertical-align: middle;
        font-size: 20px;
        line-height: 25px;
      }
      &.finish {
        background: #409EFF;
        color: #fff;
      }
    }
    .doingTarger::after {
      content: '';
      display: block;
      clear: both;
    }
    .endTarger::after {
      content: '';
      display: block;
      clear: both;
    }
    .title {
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 20px;
      margin: 5px;
      text-align: center;
      // padding: 20px;
      box-sizing: border-box;
      // border-top: 1px solid #ddd;
    }
    #wrap {
      width: 150%;
      height: 100%;
    }
    .photo {
      position: absolute;
      width: 100%;
      height: calc(100% - 50px);
      bottom: 0;
    }
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
  
}
</style>
