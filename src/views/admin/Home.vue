<template>
  <div :class="{ 'content-box': true }">
    <div class="content">
      <div class="card-info">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-user"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.user }}</div>
                <div>用户</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-edit"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.secret }}</div>
                <div>秘密</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-document-checked"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.plan }}</div>
                <div>计划</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-picture-outline"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.album }}</div>
                <div>相册</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-s-custom"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.relation }}</div>
                <div>好友</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="icons">
                <i class="el-icon-chat-line-round"></i>
              </div>
              <div class="info">
                <div class="num">{{ totals.chat }}</div>
                <div>聊天</div>
              </div>
            </el-card>
          </el-col>
          
        </el-row>
      </div>
      <!-- 公告显示 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最新举报</span>
        </div>
        <div class="new">
                  <el-table
          :data="tableData"
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="reportId" label="ID" width="40"> </el-table-column>
          <el-table-column prop="contentId" label="内容ID" width="80"> </el-table-column>
          <el-table-column prop="type" label="类型" :formatter="forType" width="60"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
          <el-table-column prop="userId" label="举报者ID" width="80"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" :formatter="forDate">
          </el-table-column>
          
           <el-table-column label="状态">
            <template slot-scope="scope" align="center">
              <el-switch
                style="display: block"
                v-model="scope.row.finish"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="已处理"
                inactive-text="待处理"
                :active-value="1"
                :inactive-value="0"
                @change="changeFinish(scope.row)">
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
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {showAllReportByPage, SelectFuzzy, deleteReportById, updateReportByIdSelective } from "../../network/report"
export default {
  name: "Home",
  data() {
    return {
      totals: {
        user: 10,
        secret: 20,
        plan: 20,
        album: 30,
        relation: 15,
        chat: 30
      },
      tableData: []
    }
  },
  created() {
    showAllReportByPage(1, 6).then((res) => {
      console.log("普通查询")
      // TODO
      this.tableData = res.data
      // this.total = res.total
    })
  },
  methods : {
    forType(row) {
      if (row.type === 0) {
        return '用户'
      } else if (row.type === 1) {
        return '秘密'
      } else if (row.type === 2) {
        return '计划'
      } else if (row.type === 3) {
        return '相册'
      } else if (row.type === 4) {
        return '消息'
      } else if (row.type === 5) {
        return '评论'
      } else {
        return '未知'
      }
    },
    forDate(row) {
      return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm')
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
.container .content-box {
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
  padding: 10px 30px;
}
.content-box .content .icons {
  height: 80px;
  width: 80px;
  color: #fff;
  display: inline-block;
  line-height: 80px;
  font-size: 40px;
  text-align: center;
  background: #2d8cf0;
}
.content-box .content .info {
  width: 60%;
  color: #666;
  text-align: center;
  display: inline-block;
}

.content-box .content .info .num {
  font-size: 30px;
  font-weight: 700;
  color: #2d8cf0;
}
.content-box .content .box-card {
  margin: 0 7% 0 6%;
  height: 510px;
}
.content-box .content .box-card .new {
  margin: 15px 30px;
}
</style>