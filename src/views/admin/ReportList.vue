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
                  v-model="formInline.reportId"
                  placeholder="ID"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formInline.userId"
                  placeholder="举报者ID"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                v-model="formInline.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-select v-model="formInline.type" placeholder="类型">
                <el-option label="类型" value=""></el-option>
                <el-option label="秘密" :value="1"></el-option>
                <el-option label="计划" :value="2"></el-option>
                <el-option label="相册" :value="3"></el-option>
                <el-option label="消息" :value="4"></el-option>
                <el-option label="评论" :value="5"></el-option>
                <el-option label="用户" :value="-1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formInline.contentId"
                placeholder="内容ID"
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
          <el-table-column prop="reportId" label="ID" width="80"> </el-table-column>
          <el-table-column prop="contentId" label="内容ID" width="80"> </el-table-column>
          <el-table-column prop="type" label="类型" :formatter="forType"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
          <el-table-column prop="userId" label="举报者ID"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" :formatter="forDate">
          </el-table-column>
          
           <el-table-column label="状态">
            <template slot-scope="scope" align="center">
              <el-switch
                style="display: block"
                v-model="scope.row.type"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="已处理"
                inactive-text="待解决">
              </el-switch>
            </template>
          </el-table-column>
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
        <el-dialog title="举报详情" :visible.sync="dialogFormVisible" center>
          <!-- <el-form :model="form"> -->
            <el-form
              :model="report"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="report.reportId" disabled></el-input>
              </el-form-item>
              <el-form-item label="内容ID" :label-width="formLabelWidth">
                <el-input v-model="report.contentId" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="report.note" disabled></el-input>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <!-- <el-input v-model="report.type" disabled></el-input> -->
                <el-select v-model="report.type" placeholder="权限" disabled>
                  <el-option label="类型" value=""></el-option>
                  <el-option label="秘密" :value="1"></el-option>
                  <el-option label="计划" :value="2"></el-option>
                  <el-option label="相册" :value="3"></el-option>
                  <el-option label="消息" :value="4"></el-option>
                  <el-option label="评论" :value="5"></el-option>
                  <el-option label="用户" :value="-1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="举报者ID" :label-width="formLabelWidth">
                <el-input v-model="report.userId" disabled></el-input>
              </el-form-item>
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <!-- <el-input v-model="report.createTime" disabled></el-input> -->
                <el-date-picker
                  v-model="report.createTime"
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
import {showAllReportByPage, SelectFuzzy, deleteReportById } from "../../network/report"
export default {
  name: "Report",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        reportId: "",
        contentId: "",
        createTime: "",
        type: "",
        userId: "",
        username: "",

        note: ""
      },
      tableData: [],
      tableHistory: [], //
      report: {
        reportId: "",
        contentId: "",
        createTime: "",
        type: "",
        userId: "",
        note: "",
        username: ""
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        reportId: "",
        contentId: "",
        createTime: "",
        type: "",
        userId: "",
        userId: "",
        note: ""
      },
      formLabelWidth: "70px",
    }
  },
  created() {
    showAllReportByPage(this.currentPage, this.pageSize).then((res) => {
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
      this.report = row
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
        type: "warning",
      }).then(() => {
          this.report = row
          deleteReportById(this.report.reportId).then(res => {
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
      if (this.formInline.contentId !== '' || this.formInline.type !== '' || this.formInline.reportId !== '' || this.formInline.userId !== '') {
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
        showAllReportByPage(this.currentPage, this.pageSize).then((res) => {
          console.log("普通查询")
          // TODO
          this.tableData = res.data
          this.total = res.total
        })
      }
    },
    forType(row) {
      switch (row.type) {
        case -1 : return '用户'
        case 1 : return '秘密'
        case 2 : return '计划'
        case 3 : return '相册'
        case 4 : return '消息'
        case 5 : return '评论'
        default: return '未知'
      }
    },
    forDate(row) {
      return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm')
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