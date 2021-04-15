<template>
  <div id="loginC">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
      <!-- <el-form-item label="ID" prop="id">
        <el-input type="text" v-model.number="ruleForm.id" autocomplete="off" maxlength="15" placeholder="ID"></el-input>
      </el-form-item> -->
      <el-form-item label="用户" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="20" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" maxlength="30" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="passwordword" v-model="ruleForm.password" autocomplete="off" maxlength="30" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="passwordword" v-model="ruleForm.checkPass" autocomplete="off" maxlength="30" placeholder="确认密码"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {logon, CheckuserId, CheckuserPhone} from '../network/login'
import { SelectFuzzy, insertUser } from "../network/user"
export default {
    data() {
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
          // if (value !== '') {
          //   let regex = /^[\u4e00-\u9fa5]+$/
          //   if (!regex.test(value)) {
          //     return callback(new Error('姓名只能为汉字'))
          //   } else {
          //     callback()
          //   }
          // }
          SelectFuzzy({userName: value}, 1, 1).then(res => {
            console.log('用户名检测', res)
              if (res && res.total > 0) {
                console.log('该用户已被注册')
                return callback(new Error('该用户名已被注册'))
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
          return callback(new Error('手机号不能为空'));
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
                return callback(new Error('该手机号已注册过账号'))
              } else {
                callback()
              }
            })
              
            }
          }
          // callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
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
              callback()
            }
          }
          callback()
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          phone: '',
          password: '',
          checkPass: '',
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
          //  ,
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // this.$emit('logonSuccess', {
        //   id: 123,
        //   passwordword: 123
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('logon请求')
            
            insertUser( this.ruleForm).then(res => {
              console.log(res)  
              if (!res) {
                this.$message({
                  message: '注册失败，用户名或手机号已存在',
                  type: 'error',
                  center: true,
                  offset: 40
                })
              } else {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  center: true,
                  offset: 40
                })
                // this.$router.go(0)
                // this.$router.replace('/login')
                // res.userPassword = this.ruleForm.password
                this.$emit('logonSuccess', this.ruleForm)
              }
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
 .el-button {
   width: 100%;
 }

 .el-tabs--border-card{
   /* background: hsla(0,0%,100%,.3); */
   border: 0px solid white;
 }
</style>
