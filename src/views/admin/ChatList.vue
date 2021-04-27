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
                  v-model="formInline.chatId"
                  placeholder="ID"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formInline.userId"
                  placeholder="发送者ID"
                ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formInline.username"
                placeholder="发送者"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.type" placeholder="类型">
                <el-option label="类型" value=""></el-option>
                <el-option label="文本" :value="true"></el-option>
                <el-option label="图片" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formInline.content"
                placeholder="内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="chatId" label="ID" width="80"> </el-table-column>
          <el-table-column prop="userId" label="发送者ID"> </el-table-column>
          <el-table-column prop="username" label="发送者"> </el-table-column>
          <el-table-column prop="acceptId" label="接收者ID"> </el-table-column>
          <el-table-column prop="type" label="类型" :formatter="forType">
          </el-table-column>
          <el-table-column prop="content" label="内容"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" :formatter="forDate">
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
        <el-dialog title="消息详情" :visible.sync="dialogFormVisible" center>
          <!-- <el-form :model="form"> -->
            <el-form
              :model="chat"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="chat.chatId" disabled></el-input>
              </el-form-item>
              <el-form-item label="发送者ID" :label-width="formLabelWidth">
                <el-input v-model="chat.userId" disabled></el-input>
              </el-form-item>
              <el-form-item label="发送者" :label-width="formLabelWidth">
                <el-input v-model="chat.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="接收者ID" :label-width="formLabelWidth">
                <el-input v-model="chat.acceptId" disabled></el-input>
              </el-form-item>
              
              <el-form-item label="类型" :label-width="formLabelWidth">
                <!-- <el-input v-model="chat.type" disabled></el-input> -->
                <el-select v-model="chat.type" placeholder="权限" disabled>
                  <el-option label="文本" :value="true"></el-option>
                  <el-option label="图片" :value="false"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <!-- <el-input v-model="chat.createTime" disabled></el-input> -->
                <el-date-picker
                  v-model="chat.createTime"
                  type="datetime"
                  placeholder="创建时间"
                  disabled>
                </el-date-picker>
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="chat.content" disabled v-if="chat.type"></el-input>
                <el-image  v-else
                  style="width: 300px; height: 300px"
                  :src="$baseImgUrl + chat.content" >
                </el-image>
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
import {showAllChatByPage, SelectFuzzy, deleteChatById } from "../../network/chat"
export default {
  name: "Chat",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        chatId: "",
        content: "",
        createTime: "",
        type: "",
        userId: "",
        acceptId: "",
        username: ""
      },
      tableData: [],
      tableHistory: [], //
      chat: {
        chatId: "",
        content: "",
        createTime: "",
        type: "",
        userId: "",
        acceptId: "",
        username: ""
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        chatId: "",
        content: "",
        createTime: "",
        type: "",
        userId: "",
        userId: "",
        acceptId: "",
        username: ""
      },
      formLabelWidth: "70px",
    }
  },
  created() {
    showAllChatByPage(this.currentPage, this.pageSize).then((res) => {
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
      this.chat = row
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
          this.chat = row
          deleteChatById(this.chat.chatId).then(res => {
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
      if (this.formInline.content !== '' || this.formInline.type !== '' || this.formInline.chatId !== '' || this.formInline.username !== ''|| this.formInline.userId !== '') {
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
        showAllChatByPage(this.currentPage, this.pageSize).then((res) => {
          console.log("普通查询")
          // TODO
          this.tableData = res.data
          this.total = res.total
        })
      }
    },
    forType(row) {
      return row.type  ? "图片" : "文本"  
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