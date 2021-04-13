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
                  v-model="formInline.relationId"
                  placeholder="ID"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formInline.userId"
                  placeholder="用户ID"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formInline.followId"
                  placeholder="被关注ID"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-input
                  v-model="formInline.username"
                  placeholder="用户名"
                ></el-input>
              </el-form-item>
            <el-form-item>
                <el-input
                  v-model="formInline.followName"
                  placeholder="被关注者"
                ></el-input>
              </el-form-item>
            <!-- <el-form-item>
              <el-select v-model="formInline.power" placeholder="权限">
                <el-option label="权限" value=""></el-option>
                <el-option label="公开" :value="0"></el-option>
                <el-option label="私人" :value="1"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item>
              <el-input
                v-model="formInline.content"
                placeholder="内容"
              ></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button power="primary" @click="onSubmitFuzzy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="relationId" label="ID" width="80"> </el-table-column>
          <!-- <el-table-column prop="content" label="内容"> </el-table-column>
          <el-table-column prop="power" label="权限">
          </el-table-column> -->
          <el-table-column prop="userId" label="用户ID"> </el-table-column>
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="followId" label="被关注ID"></el-table-column>
          <el-table-column prop="followName" label="被关注者"></el-table-column>
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
        <el-dialog title="关系详情" :visible.sync="dialogFormVisible" center>
          <!-- <el-form :model="form"> -->
            <el-form
              :model="relation"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="relation.relationId" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="relation.content" disabled></el-input>
              </el-form-item>
              <el-form-item label="权限" :label-width="formLabelWidth">
                <el-input v-model="relation.power" disabled></el-input>
              </el-form-item> -->
              <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="relation.userId" disabled></el-input>
              </el-form-item>
              
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="relation.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="被关注ID" :label-width="formLabelWidth">
                <el-input v-model="relation.followId" disabled></el-input>
              </el-form-item>
              <el-form-item label="被关注者" :label-width="formLabelWidth">
                <el-input v-model="relation.followName" disabled></el-input>
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
import {showAllRelationByPage, SelectFuzzy, deleteRelationById } from "../../network/relation"
export default {
  name: "Relation",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        relationId: "",
        content: "",
        followId: "",
        power: "",
        userId: "",
        username: "",
        followName: ""
      },
      tableData: [],
      tableHistory: [], //
      relation: {
        relationId: "",
        content: "",
        followId: "",
        power: "",
        userId: "",
        username: "",
        followName: ""
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        relationId: "",
        content: "",
        followId: "",
        power: "",
        userId: "",
        username: "",
        followName: ""
      },
      formLabelWidth: "70px",
    }
  },
  created() {
    showAllRelationByPage(this.currentPage, this.pageSize).then((res) => {
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
      this.relation = row
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
        power: "warning",
      }).then(() => {
          this.relation = row
          deleteRelationById(this.relation.relationId).then(res => {
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
      if ( this.formInline.username !== ''|| this.formInline.userId !== '' || this.formInline.followName !== ''|| this.formInline.followId !== '') {
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
        showAllRelationByPage(this.currentPage, this.pageSize).then((res) => {
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