<template>
  <div id="loginC">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户" prop="username">
        <el-input v-model="ruleForm.username" maxlength="15" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          show-password
          placeholder="密码"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SelectFuzzy } from "../network/user"
// TODO
// import {loginP} from '../network/login'
export default {
  props: ["toLoginC"],
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("ID不能为空"));
      }
        callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value !== "") {
          let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
          if (value.length < 8) {
            return callback(new Error("长度不能小于8"));
          } else if (value.length > 30) {
            return callback(new Error("长度不能大于30"));
          } else if (!regex.test(value)) {
            return callback(new Error("必须有大小写字母和特殊字符"));
          } else {
            callback();
          }
        }
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log("login---");
          console.log(this.ruleForm.username, this.ruleForm.password);
          // 发起登录请求
          // TODO  ----loginP

          SelectFuzzy(this.ruleForm, 1, 1).then((res) => {
            console.log(res);
            // TODO ---res.userId
            if (res && res.total > 0) {
              // 保存用户到sessionStorage
              // TODO res[0] => res
              if (res.data[0].type == 2) {
                this.$message({
                message: "登录失败，该用户已被禁用",
                type: "error",
                center: true,
                offset: 40,
              })
              } else {
                sessionStorage.setItem("user", JSON.stringify(res.data[0]));
                Object.assign(this.$user, res.data[0]);

                console.log("登录成功$user", this.$user);
                this.$message({
                  message: "登录成功",
                  type: "success",
                  center: true,
                  offset: 40,
                });

                // TODO
                console.log(res);
                if (res.data[0].type === 0) {
                  this.$router.push("/admin");
                } else {
                  this.$router.push("/home");
                }
              }

            } else {
              console.log("登录失败");
              this.$message({
                message: "用户名或密码错误",
                type: "error",
                center: true,
                offset: 40,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // 监听父组件中传过来的参数toLoginC变化
  watch: {
    toLoginC: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        this.ruleForm.username = newValue && newValue.username;
        this.ruleForm.password = newValue && newValue.password;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.el-button {
  width: 100%;
}

.el-tabs--border-card {
  background: hsla(0, 0%, 100%, 0.3);
  border: 0px solid white;
}
</style>
