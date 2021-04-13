<template>
  <div>
    <div :class="{ 'content-box': true, 'content-collapse': collapse }">
      <div class="content">
        <div class="search">
          <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            size="small"
          >
          <el-form-item>
              <el-input
                v-model="form.userId"
                placeholder="用户ID"
              ></el-input>
            </el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="权限">
              <el-option label="全部用户" value=""></el-option>
              <el-option label="管理员" :value="0"></el-option>
              <el-option label="普通用户" :value="1"></el-option>
              <el-option label="被禁用户" :value="2"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="userId" label="ID"> </el-table-column>
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column
            :formatter="forUserCategory"
            prop="type"
            min-width="80"
            label="权限"
          >
          </el-table-column>
          <!-- <el-table-column prop="type" label="类型" width="60">
          </el-table-column> -->
          <el-table-column prop="phone" label="手机" min-width="150"> </el-table-column>
          <!-- <el-table-column prop="userAge" label="年龄" width="60">
          </el-table-column> -->
          <el-table-column prop="motto" label="座右铭" min-width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="170">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                class="tag-btn"
                >查 看</el-tag
              >
              <el-tag
                @click="cancel(scope.row)"
                v-if="scope.row.type == 1 || scope.row.type == 2"
                :type="
                  scope.row.type == 1
                    ? 'danger'
                    : 'success'
                "
                class="tag-btn"
                >{{
                  scope.row.type == 1
                    ? "禁用"
                    : "解禁"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看资料对话框 -->
        <el-dialog title="用户资料" :visible.sync="dialogFormVisible" center>
          <el-form :model="form">
            <el-form
              :model="user"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="user.userId" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户姓名" :label-width="formLabelWidth">
                <el-input v-model="user.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="权限" :label-width="formLabelWidth">
                <el-input v-model="user.type" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="user.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="座右铭" :label-width="formLabelWidth">
                <el-input v-model="user.motto" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-form>
        </el-dialog>
        <!-- 分页 -->
        <div class="page">
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import {showAllUserByPage, SelectFuzzy, forbiddenUser } from "../../network/user";
export default {
  name: "User",
  data() {
    return {
      collapse: true,
      tagName: "",
      // formInline: {
      //   user: "",
      //   region: "",
      // },
      tableData: [],
      tableHistory: [], //
      user: {
        id: "",
        userId: "",
        username: "",
        userAge: "",
        userPassword: "",
        motto: "",
        type: "",
        phone: "",
        type: "",
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        username: "",
        type: ''
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    showAllUserByPage(this.currentPage, this.pageSize).then((res) => {
      console.log(this.currentPage);
      // TODO
      console.log(res)
      this.tableData = res.data;
      this.total = res.total;
    });
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },

    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.user = row;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log(res, "+++");
            this.tableData = res.data;
            this.total = res.total;
          }
        );
      } else {
        // 普通查询
        showAllUserByPage(this.currentPage, this.pageSize).then((res) => {
          console.log("普通查询");
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },

    cancel(row) {
      if (row.type != 0) {
        let text = row.type === 1 ? '禁用' : '解禁'
        this.$confirm("此操作将"+ text +"这个用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.user = row;
            if (row.type == 1) {
              this.user.type = 2;
            } else {
              this.user.type = 1;
            }
            forbiddenUser({
              userId: this.user.userId,
              type: this.user.type
            });
            this.$message({
              type: "success",
              message: text +"成功!",
            });
          })
          .catch(() => {
          });
      } else {
        this.user = row;
        if (row.type == "-1") {
          this.user.type = "1";
        } else {
          this.user.type = "0";
        }
        forbiddenUser(this.user.userId, this.user.type);
        this.$message({
          type: "success",
          message: "已解除禁用",
        });
      }
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      console.log(this.form.username, "++++");
      if (this.form.username || this.form.type !== '' || this.form.userId !== '') {
        SelectFuzzy(this.form, this.currentPage, this.pageSize).then((res) => {
          // TODO
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        showAllUserByPage(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    forReturnDate(row) {
      return row.returnDate ? row.returnDate : "暂未归还";
    },
    forIsReturn(row) {
      return row.returnDate ? "已还" : "未还";
    },
    forUserCategory(row) {
      return row.type === 0
        ? "管理员"
        :  row.type === 1 ?  "普通用户"  : "被禁用户"
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      console.log(val);
      this.tagName = val;
    });
  },
};
</script>
<style scoped>
.content-box {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  padding-left: 375px;
}
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.content-box .crumbs {
  margin: 10px 0;
  text-align: left;
  color: #606266;
}
.content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>