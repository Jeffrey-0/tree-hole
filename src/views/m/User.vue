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
            <span class="username-motto">{{ this.currentUser.motto }}</span>
            
          </div>
          <div class="motto">
            <el-button v-if="currentUser.userId === $user.userId" round size="mini" @click="edit">编辑</el-button>
            <el-button v-if="currentUser.userId === $user.userId" round size="mini" @click="signOut">退出</el-button>
            <el-button v-if="currentUser.userId !== $user.userId && currentUser.ifFollow" round size="mini" @click="cancelWatch" type="danger">取关</el-button>
            <el-button v-if="currentUser.userId !== $user.userId && !currentUser.ifFollow" round size="mini" @click="sureWatch" >关注</el-button>
            <el-button v-if="currentUser.userId !== $user.userId && currentUser.ifBlock" round size="mini" @click="cancelBlock"  type="info">拉白</el-button>
            <el-button v-if="currentUser.userId !== $user.userId && !currentUser.ifBlock" round size="mini" @click="sureBlock" >拉黑</el-button>
            <el-button v-if="currentUser.userId !== $user.userId" round size="mini" @click="chatTo">聊天</el-button>
            <!-- <el-button v-if="currentUser.userId !== $user.userId" round size="mini" @click="chatTo">拉黑</el-button> -->
            <el-button v-if="currentUser.userId !== $user.userId" round size="mini" @click="clickReport">举报</el-button>
          </div>
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

<!-- 编辑模态框 -->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="ltr"
      size="100%"
      >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <div class="form-title">用户信息</div>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="20" placeholder="用户名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" maxlength="30" placeholder="手机号"></el-input>
      </el-form-item> -->
      <el-form-item label="座右铭">
        <el-input type="text" v-model="ruleForm.motto" autocomplete="off" maxlength="20" placeholder="座右铭"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>

      <div class="form-title">重置密码</div>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="30" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="30" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmitPassword">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
    </el-form>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item> -->
<!--     
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-title">用户信息</div>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="座右铭">
          <el-input v-model="form.motto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
        <div class="form-title">重置密码</div>
        
        <el-form-item label="旧密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="秘密">
          <el-switch v-model="form.secret"></el-switch>
        </el-form-item>
        <el-form-item label="计划">
          <el-switch v-model="form.plan"></el-switch>
        </el-form-item>
        <el-form-item label="相册">
          <el-switch v-model="form.album"></el-switch>
        </el-form-item>
        <el-form-item label="聊天">
          <el-switch v-model="form.chat"></el-switch>
        </el-form-item> -->
        
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
      </el-form> -->
    </el-drawer>
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
import {selectUserById, showAllUserByPage, deleteUserById, insertUser, updateUserById, selectByCurrentUserId, updateUserByIdSelective, SelectFuzzy } from '@/network/user'
import {selectRelationById, showAllRelationByPage, deleteRelationById, insertRelation, updateRelationById, cancelFollow} from '@/network/relation'
import {insertBlacklist, cancelBlock} from '@/network/blacklist'
export default {
  name: '',
  components: {
    Album,
    SecretItem,
    vueWaterfallEasy
  },
  data () {
      var checkID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ID不能为空'))
        }
          if (value !== '') {
          let regex = /^[1234567890]+$/
          if (!regex.test(value)) {
            return callback(new Error('ID只能为数字'))
          } else {
            
            CheckuserId(value).then(res => {
              console.log('id检测', res)
              if (res) {
                return callback(new Error('ID已存在'))
              } else {
                callback()
              }
            })
            
          }
        }
      }
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          SelectFuzzy({userName: value}, 1, 1).then(res => {
            console.log('用户名检测', res)
              if (res && res.total > 0) {
                if (res.data[0].userId !== this.$user.userId) {
                  return callback(new Error('该用户名已被注册'))
                } else {
                  callback()
                }
                
              } else {
                callback()
              }
            })
          // callback()
        }
        // callback()
      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback()
        } else {
          if (value !== '') {
            // let regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/   //  邮箱正则
            // let regex = /^1[3456789]d{9}$/   //  邮箱正则
            let regex = /^1[34578]\d{9}$/   //  手机
            if (!regex.test(value)) {
              // console.log('手机格式错误')
              return callback(new Error('手机号格式错误'))
            } else {
              
            SelectFuzzy({phone: value}, 1, 1).then(res => {
              console.log('手机检测', res)
              if (res && res.total > 0) {
                if (res.data[0].userId !== this.$user.userId) {
                  return callback(new Error('该手机号已注册过账号'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            })
              
            }
          }
        }
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          if (value !== '') {
            let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}/
            if (value.length < 8) {
              return callback(new Error('长度不能小于8'))
            } else if (value.length > 30) {
              return callback(new Error('长度不能大于30'))
            } else if (!regex.test(value)) {
              return callback(new Error('必须有大小写字母和特殊字符'))
            } else {
              return callback()
            }
            }
          
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value === this.ruleForm.password) {
          callback(new Error('新密码和旧密码一样!'));
        } else {
          callback();
        }
      }
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
        portrait: 'user/111.jpg',
        ifFollow: 0
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
      myScroll: '',
      drawer: false,  //抽屉
      form: {       // 用户编辑
        userId: '',
          username: '',
          phone: '',
          motto: '',
          password: '',
          newPassword: '',
          portrait: '',
          secret: true,
          plan: true,
          album: false,
          chat: true
        },

        ruleForm: {
          userId: '',
          username: '',
          phone: '',
          password: '',
          checkPass: '',
          motto: '',
          type: 1
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
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
      selectByCurrentUserId(this.currentUser.userId, this.$user.userId).then(res => {
        this.currentUser = res
        this.form = Object.assign( this.form, res)
        this.ruleForm = Object.assign( this.form, res)
        // this.form.ifFollow = 1
        console.log('this.form', this.form)
      })

      // 获取秘密
      if (this.currentUser.userId === this.$user.userId) {
        showAllSecretByMyself(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
            console.log('获取自己秘密', this.SecretList)
          setTimeout(function () {
              that.myScroll.refresh()
            }, 200)
        })
      } else {
        showAllSecretByUserId(this.currentUser.userId, this.currentPage, this.pageSize).then(res => {
            this.SecretList = res.data
            this.total = res.total
            let that = this
            console.log('获取用户秘密', this.SecretList)
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
    // 退出登录
    signOut () {
      // if (this.ifLogin()) { return }
      if (this.$user.userId) {
        Object.assign(this.$user,
          {
            userId : '',
            username: '',
            motto: '',
            type: '',
            portrait: ''
          } 
        )
        
        sessionStorage.removeItem("user")
      }
      if (this.$route && this.$route.path !== '/login') {
        this.$router.push('/login')
      }
    },
    // 聊天
    chatTo () {
      if (this.$ifMobile.res) {
        this.$router.push('/m-chat?userId=' + this.currentUser.userId)
      } else {
        this.$router.push('/friend?userId=' + this.currentUser.userId)
      }
    },
    // 取消关注
    cancelWatch () {
      cancelFollow(this.$user.userId, this.currentUser.userId).then(res => {
        if (res) {
          this.currentUser.ifFollow =0
        } else {
          this.$message.error('取消关注失败')
        }
      })
    },
    // 关注
    sureWatch () {
      let relation = {
        userId: this.$user.userId,
        followId: this.currentUser.userId
      }
      insertRelation(relation).then(res => {
        if (res) {
          this.currentUser.ifFollow = 1
        } else {
          this.$message.error('关注失败')
        }
      })
    },

        // 取消拉黑 === 拉白
    cancelBlock () {
      cancelBlock(this.$user.userId, this.currentUser.userId).then(res => {
        if (res) {
          this.currentUser.ifBlock =0
        } else {
          this.$message.error('取消关注失败')
        }
      })
    },
    // 拉黑
    sureBlock () {

      let blacklist = {
        userId: this.$user.userId,
        blockId: this.currentUser.userId
      }
      insertBlacklist(blacklist).then(res => {
        if (res) {
          this.currentUser.ifBlock = 1
        } else {
          this.$message.error('关注失败')
        }
      })
    },
    // 点击编辑
    edit () {
      this.drawer = true
    },
    // 确认编辑
    onSubmit() {
      if (!this.ruleForm.username) {
        this.$message.error('用户名不能为空')
        return}

          SelectFuzzy({userName: this.ruleForm.username}, 1, 1).then(res => {
              if (res && res.total > 0) {
                if (res.data[0].userId !== this.$user.userId) {
                  this.$message.error('用户名已被注册')
                  return}
              } else {
                 let newForm = {
                  userId: this.ruleForm.userId,
                  username: this.ruleForm.username,
                  motto: this.ruleForm.motto
                }
                console.log('submit!', newForm);
                updateUserByIdSelective(newForm).then(res => {
                  if (res) {
                    this.$message.success('修改成功!')
                    this.currentUser = Object.assign(this.currentUser, newForm)
                    this.drawer = false
                  } else {
                    this.$message.error('修改失败!')
                  }
                })

              }
            })
            
     
    },
    onSubmitPassword () {
      let result = 1
      if (!this.ruleForm.password || !this.ruleForm.checkPass) {
        this.$message.error('请输入密码')
        return
      }
      SelectFuzzy({userId: this.$user.userId, password: this.ruleForm.password}, 1, 1).then(res => {
        console.log('密码检测', res)
        if (!res || res.total === 0) {
          this.$message.error('原密码错误')
          result = 0
        } else {
          let newForm = {
            userId: this.ruleForm.userId,
            password: this.ruleForm.checkPass,
          }
          
          updateUserByIdSelective(newForm).then(res => {
            if (res) {
              this.$message.success('修改成功!')
              // this.currentUser = Object.assign(this.currentUser, newForm)
              this.drawer = false
            } else {
              this.$message.error('修改失败!')
            }
          })
        }
      })
      
    },
    // 取消抽屉
    closeDrawer () {
      this.drawer = false
    },
    // 举报某人
    // 点击举报
    clickReport () {
      console.log('点击举报111', this.$common, this.$common.report)
      this.$common.report(this, this.currentUser.userId, this.$user.userId, 0)
    },
  },
  computed : {
  },
  created () {
    this.currentUser.userId = this.$route.query.userId ? this.$route.query.userId - 0 :this.$user.userId
    this.refresh()
    // console.log('当前路由', this.$route, this.$route.path)
    
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
  },
  watch : {
    $route (newVal, oldVal) {
      console.log('路由切换')
      this.currentUser.userId = this.$route.query.userId ? this.$route.query.userId - 0 :this.$user.userId
      this.refresh()
    }
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
        .username-motto {
          font-size: 14px;
          margin-left: 20px;
          color: grey;
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
.portrait {
  object-fit: cover;
}
 .form-title {
   font-size: 18px;
   text-align: center;
   padding: 10px;
   box-sizing: border-box;
 }
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(0,0,0,0);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: rgba(0,0,0,0);
  color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
  background-color: rgba(0,0,0,0.5);
}
</style>
