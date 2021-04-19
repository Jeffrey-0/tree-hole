<template>
  <div>
    <div :class="{ 'content-box': true, 'content-collapse': collapse }">
      <div class="content">
        <div class="search">
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            size="small"
          >
            <el-form-item>
                <el-input
                  v-model="formInline.planId"
                  placeholder="ID"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formInline.userId"
                  placeholder="用户ID"
                ></el-input>
              </el-form-item>
            <!-- <el-form-item>
              <el-select v-model="formInline.repeat" placeholder="重复天数">
                <el-option label="重复天数" value=""></el-option>
                <el-option label="公开" :value="0"></el-option>
                <el-option label="私人" :value="1"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-input
                v-model="formInline.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formInline.name"
                placeholder="内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button repeat="primary" @click="onSubmitFuzzy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="planId" label="ID" width="80"> </el-table-column>
          
          <el-table-column prop="userId" label="用户ID"> </el-table-column>

          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="name" label="内容"> </el-table-column>
          <!-- <el-table-column prop="repeat" label="重复天数"></el-table-column> -->
          <el-table-column prop="createTime" label="创建时间" :formatter="forDate"></el-table-column>
          <el-table-column  label="操作"  align="center">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                class="tag-btn"
              >查 看</el-tag>
              <el-tag
                @click="deleteClick(scope.row)"
                type="danger"
                class="tag-btn"
              >删除</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看资料对话框 -->
        <el-dialog title="秘密详情" :visible.sync="dialogFormVisible">
          <!-- <el-form :model="form"> -->
            <el-form
              :model="plan"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="plan.planId" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="plan.userId" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="plan.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="plan.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="重复天数" :label-width="formLabelWidth">
                <el-input v-model="plan.repeat" disabled></el-input>
              </el-form-item>
              
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <!-- <el-input v-model="plan.createTime" disabled></el-input> -->
                <el-date-picker
                  v-model="plan.createTime"
                  type="datetime"
                  placeholder="创建时间"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-form>
          <!-- </el-form> -->
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
import {showAllPlanByPage, SelectFuzzy, deletePlanById } from "../../network/plan"
export default {
  name: "Plan",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        planId: "",
        name: "",
        createTime: "",
        repeat: "",
        userId: "",
        username: ""
      },
      tableData: [],
      tableHistory: [], //
      plan: {
        planId: "",
        name: "",
        createTime: "",
        repeat: "",
        userId: ""
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        planId: "",
        name: "",
        createTime: "",
        repeat: "",
        userId: "",
        userId: ""
      },
      formLabelWidth: "70px",
    }
  },
  created() {
    showAllPlanByPage(this.currentPage, this.pageSize).then((res) => {
      console.log(this.currentPage)
      // TODO
      console.log(res)
      this.tableData = res.data
      this.total = res.total
    })
  },
  methods: {
    isCollapse(val) {
      this.collapse = val
    },

    onSubmit() {
      console.log("submit!")
    },
    handleClick(row) {
      this.dialogFormVisible = true
      this.plan = row
    },
    forDate(row) {
      return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm')
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.refresh()
    },
    // 删除
    deleteClick(row) {
      this.$confirm("此操作将删除这条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        repeat: "warning",
      }).then(() => {
          this.plan = row
          deletePlanById(this.plan.planId).then(res => {
            if (res) {
              this.$message.success('删除成功!')
              this.refresh()
            } else {
              this.$message.error('删除失败')
            }
          })
        })
        .catch(() => {
        })
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1
      if (this.formInline.userId !== '' ||this.formInline.name !== '' || this.formInline.repeat !== '' || this.formInline.planId !== '') {
        this.queryModel = 2
        this.refresh()
      } else {
        this.queryModel = 0
        this.refresh()
      }
    },
    // 刷新
    refresh () {
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.formInline, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log(res, "+++")
            this.tableData = res.data
            this.total = res.total
          }
        )
      } else {
        // 普通查询
        showAllPlanByPage(this.currentPage, this.pageSize).then((res) => {
          console.log("普通查询")
          // TODO
          this.tableData = res.data
          this.total = res.total
        })
      }
    }
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val)
    })
    this.$eventBusTag.$on("eventBusName", (val) => {
      console.log(val)
      this.tagName = val
    })
  },
}
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