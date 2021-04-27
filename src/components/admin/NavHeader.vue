<template>
  <div class="wrapper">
    <div class="header">
      <div class="collapse-btn" @click="toIndex">
        <!-- <li
          :class="{
            'el-icon-s-unfold': collapse,
            'el-icon-s-fold': !collapse,
          }"
        ></li> -->
      </div>
      <div class="logo" @click="toIndex">树洞网后台管理</div>
      <div class="header-right">
        <div class="header-user-con">
          <div class="user-avator">
            <!-- <img :src="$baseImgUrl + $user.portrait" alt="" /> -->
            <!-- {{ this.$user.username }} -->
          </div>
          <div class="user-name el-dropdown">
            <el-dropdown>
              <!-- <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span> -->
              <span class="username">
                {{ this.$user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="login-out">
                 <el-dropdown-item v-if="$user.username == 'admin'">
                   <div @click="add">
                    新增
                    </div>
                  </el-dropdown-item >
                  <el-dropdown-item v-else>
                   <div @click="edit">
                    编辑
                    </div>
                  </el-dropdown-item >
                <el-dropdown-item 
                  ><div @click="exit">
                    退出</div
                  >
                  </el-dropdown-item>
                 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑模态框 -->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="ltr"
      size="30%"
      >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <div class="form-title">用户信息</div>
      <el-form-item label="用户" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="20" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="text" v-model="ruleForm.motto" autocomplete="off" maxlength="20" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
        <div class="form-title">重置密码</div>
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off" maxlength="30" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" maxlength="30" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitPassword">保存</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
    </el-form>
    </el-drawer>

    <!-- 新增模态框 -->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer2"
      direction="ltr"
      size="30%"
      >
      <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="70px" class="demo-ruleForm3">
        <div class="form-title">新增管理员</div>
      <el-form-item label="用户" prop="username">
        <el-input type="text" v-model="ruleForm3.username" autocomplete="off" maxlength="20" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="text" v-model="ruleForm3.motto" autocomplete="off" maxlength="20" placeholder="备注"></el-input>
      </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm3.password" autocomplete="off" maxlength="30" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm3.checkPass" autocomplete="off" maxlength="30" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitAdd">新增</el-button>
          <el-button @click="closeDrawer(2)">取消</el-button>
        </el-form-item>
    </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {selectUserById, showAllUserByPage, deleteUserById, insertUser, updateUserById, selectByCurrentUserId, updateUserByIdSelective, SelectFuzzy } from '@/network/user'
export default {
  name: "NavBar",
  data() {

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
              SelectFuzzy({userId:  this.$user.userId, password: value}, 1, 1).then(res => {
                if (res && res.total > 0) {
                  return callback()
                } else {
                  return callback(new Error('原密码错误'))
                }
              })
              }
            }
          
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value === this.ruleForm2.password) {
          callback(new Error('新密码和旧密码一样!'));
        } else {
          callback();
        }
      }

      var checkUsernameAdd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          SelectFuzzy({userName: value}, 1, 1).then(res => {
            console.log('用户名检测', res)
              if (res && res.total > 0) {
                  return callback(new Error('该用户名已被注册'))
              } else {
                callback()
              }
            })
        }
      }

      var validatePassAdd = (rule, value, callback) => {
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
          return callback()
        }
      }
      var validatePass2Add = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm3.password) {
          callback(new Error('密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      collapse: true,
      userName: "",
      ruleForm: {
          userId: '',
          username: '',
          // phone: '',
          motto: '',
      },
      ruleForm2: {
        userId: '',
        password: '',
        checkPass: '',
      },
      ruleForm3: {
        username: '',
        // phone: '',
        motto: '',
        password: '',
        checkPass: '',
        type: 0
      },
      drawer: false,  //抽屉
      drawer2: false,  //抽屉
      rules: { // 用户编辑信息
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
      },
      rules2: { // 用户修改秘密
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      rules3: { // 新增管理员信息
        username: [
          { validator: checkUsernameAdd, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassAdd, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2Add, trigger: 'blur' }
        ]
      },
    };
  },
  created() {
    console.log('后台主页', this.$user, sessionStorage.getItem('user'))
    this.userName = this.$user.userName
    this.ruleForm.userId = this.$user.userId
    this.ruleForm.username = this.$user.username
    this.ruleForm.motto = this.$user.motto
    this.ruleForm2.userId = this.$user.userId
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    isCollapse() {
      this.collapse = !this.collapse;
      this.$eventBus.$emit("eventBusName", this.collapse)
    },
    toIndex () {
      this.$eventBusTag.$emit("eventBusName", '首页', 'el-icon-house')
      this.$eventBusiIcon.$emit("eventBusName", '首页', 'el-icon-house')
    },
    exit () {
      console.log('退出')
      Object.assign(this.$user,
      {
        userId : '',
        username: '',
        motto: '',
        type: '',
        portrait: ''
      } )
      
      sessionStorage.removeItem("user")
      console.log('退出后', this.$user)
      this.$router.push('/login')
    },
    // 确认编辑
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            updateUserByIdSelective(this.ruleForm).then(res => {
              if (res) {
                this.$message.success('修改成功!')
                this.drawer = false
                this.$user.username = this.ruleForm.username
                // Object.assgin(this.$user, this.ruleForm)
                sessionStorage.removeItem('user')
                this.$user.username = this.ruleForm.username
                this.$user.motto = this.ruleForm.motto

                sessionStorage.setItem('user', JSON.stringify(this.$user))
                // Object.assign(this.$user, newUser)
                console.log('新用户', this.$user, sessionStorage.getItem('user'))
              } else {
                this.$message.error('修改失败!')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    onSubmitPassword () {
      this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            updateUserByIdSelective(this.ruleForm2).then(res => {
              if (res) {
                this.$message.success('修改成功!')
                this.drawer = false
              } else {
                this.$message.error('修改失败!')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      
    },
    onSubmitAdd () {
      this.$refs.ruleForm3.validate((valid) => {
          if (valid) {
            insertUser( this.ruleForm3).then(res => {
              console.log(res)  
              if (!res) {
                this.$message({
                  message: '新增失败，用户名或手机号已存在',
                  type: 'error',
                  center: true,
                  offset: 40
                })
              } else {
                this.$message({
                  message: '新增成功',
                  type: 'success',
                  center: true,
                  offset: 40
                })
                this.ruleForm3 = {
                  username: '',
                  // phone: '',
                  motto: '',
                  password: '',
                  checkPass: '',
                  type: 0
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    // 取消抽屉
    closeDrawer (index) {
      if (index == 2) {
        this.drawer2 = false
      } else {
        this.drawer = false
      }
    },
    // 点击编辑
    edit () {
      this.drawer = true
    },
    // 点击添加
    add () {
      this.drawer2 = true
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #000;
  /* background: #242f42; */
  background: #fff;
}
.header .collapse-btn {
  cursor: pointer;
  float: left;
  /* padding: 10px; */
  margin:  0px  10px;
  /* cursor: pointer; */
  line-height: 50px;
  width: 40px;
  height: 50px;
  box-sizing: border-box;
  background: url('../../assets/img/logo.png') no-repeat center;
  background-size: 100%;
}
.header .collapse-btn:hover {
  /* background-color: #2c3a50; */
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
  text-align: left;
  font-size: 20px;
  cursor: pointer;
}
.header .header-right {
  float: right;
  padding-right: 50px;
}
.header .header-right .header-user-con {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.header .header-right .header-user-con .btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.header .header-right .header-user-con .btn-bell .el-icon-bell {
  color: #fff;
}
.header .header-right .header-user-con .user-avator {
  margin-left: 20px;
  font-size: 16px;
}
.header .header-right .header-user-con .user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header .header-right .header-user-con .user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.login-out a {
  text-decoration: none;
  color: #666;
}
.username {
  display: inline-block;
  height: 30px;
  /* padding: 10px; */
  box-sizing: border-box;
  line-height: 30px;
  cursor: pointer;
}
</style>