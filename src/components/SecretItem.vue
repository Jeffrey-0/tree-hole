<template>
  <div id="secret">
    <div class="user">
      <img class="portrait" :src=" $baseImgUrl + secret.portrait" @click="toUserHome(secret)">
      <div class="username">{{ secret.username }}</div>
      <div class="create_time">{{ isOverOneDay(secret.createTime) ? $moment(secret.createTime).format('YYYY-MM-DD h:mm') : $moment(secret.createTime).fromNow()}}</div>
    </div>
    <div class="content">{{ secret.content }}</div>
    <div class="imgs" v-if="secret.pictures && secret.pictures.length > 0">
      <div v-if="secret.pictures.length === 1">
        <div class="imgWrap imgWrap1" v-for="item in secret.pictures" :key="item.pictureId" @load="isLoadOK">
          <el-image 
            style="width: 100%"
            :src="$baseImgUrl + item.path" 
            :preview-src-list="imgList">
          </el-image>
        </div>
      </div>
      <div v-else-if="secret.pictures.length === 2 || secret.pictures.length === 4">
        <div class="imgWrap imgWrap2" v-for="item in secret.pictures" :key="item.pictureId" @load="isLoadOK">
          <el-image 
            style="width: 100%"
            :src="$baseImgUrl + item.path" 
            :preview-src-list="imgList">
          </el-image>
        </div>
      </div>
      <div v-else>
        <div class="imgWrap" v-for="item in secret.pictures" :key="item.pictureId" @load="isLoadOK">
          <!-- <img :src="$baseImgUrl + item.img_url" alt="" width="100%" height="100%"> -->
           <el-image 
            style="width: 100%"
            :src="$baseImgUrl + item.path" 
            :preview-src-list="imgList">
          </el-image>

        </div>
      </div>
    </div>
    <div class="interact">
      <div class="icon" v-if="secret.userId === $user.userId" @click="clickDelete()">
        <i class="el-icon-error" title="删除"></i>
      </div>
      <div class="icon"  @click="clickReport()">
        <i class="el-icon-warning" title="举报"></i>
      </div>
      <div class="icon">
        <!-- <i class="el-icon-s-comment" title="评论" @click="showComments"></i> -->
        <!-- <el-badge :value="12" class="item"> -->
          <i class="el-icon-s-comment" title="评论" @click="showComments"></i>
          <span class="commentNumber number" v-if="secret.comments">{{ secret.comments.length }}</span>
        <!-- </el-badge> -->
      </div>
      <div class="icon" @click="clickLike(false)"  v-if="secret.likes.filter(item => item.userId === $user.userId).length > 0">
          <img class="love" title="取消点赞" style="" src="@/assets/img/icon/点赞.png">
          <span class="loveNumber number" v-if="secret.likes">{{ secret.likes.length }}</span>
      </div>
      <div class="icon" @click="clickLike(true)"  v-else>
          <img class="love" title="点赞" style="" src="@/assets/img/icon/未点赞.png">
          <span class="loveNumber number" v-if="secret.likes">{{ secret.likes.length }}</span>
      </div>

    </div>
    <div class="comments" :class="{show: ifShowComment}">
      <div style="margin-top: 15px;">
        <el-input :placeholder="this.replyname ? '回复' + this.replyname : '评论' " v-model="commentInput" class="input-with-select">
          <el-button  type="success" slot="append" icon="el-icon-finished" @click="sureComment"></el-button>
        </el-input>
      </div>
      <div v-for="item in secret.comments" :key="item.commentId" class="comment-item">
        <span class="comment-username">{{ item.userId === $user.userId ? '我' :  item.username}}</span>
        <span v-if="item.replyname"> 回复 </span>
        <span class="comment-username" v-if="item.replyname">{{  item.replyId === $user.userId ? '我' :  item.replyname }}</span>:
        <span class="comment-content" @click="clickComment(item)">  {{ item.content }}</span>
      </div>
      <!-- 分页 -->
      <!-- <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import {selectLikeById, showAllLikeByPage, deleteLikeById, insertLike, updateLikeById} from '@/network/like'
import {selectCommentById, showAllCommentByPage, deleteCommentById, insertComment, updateCommentById} from '@/network/comment'
import {selectSecretById, showAllSecretByPage, deleteSecretById, insertSecret, updateSecretById} from '@/network/secret'

export default {
  name: '',
  components: {
  },
  data () {
    return {
      ifShowComment: 0,
      commentInput: '',
      replyname: '',
      replyId: 0,
    }
  },
  props: {
    secret: {}
  },
  computed : {
    imgList: function () {
      return this.secret.pictures && this.secret.pictures.map((item) => this.$baseImgUrl + item.path)
    }
  },
  methods: {
    // 点击评论，切换评论可不可见
    showComments () {
      console.log(123)
      this.ifShowComment = this.ifShowComment ? 0 : 1
    },
    // 点击某条评论里的内容
    clickComment (comment) {
      console.log(comment)
      if (comment.userId === this.$user.userId) {
        this.$confirm('是否删除这条评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteCommentById(comment.commentId).then(res => {
            if (res) {
              this.$message.success('删除成功!')
              this.secret.comments = this.secret.comments.filter(item => item.commentId !== comment.commentId)
            } else {
              this.$message.error('删除失败!')
            }
          })

        }).catch(() => {
        })
      } else {
        this.replyname = comment.username
        this.replyId = comment.userId
        this.commentInput = ''
      }
    },
    // 点赞
    clickLike(like) {
      if (this.ifLogin()) { return }
      if (like) {
        let like = {
          userId: this.$user.userId,
          secretId: this.secret.secretId
        }
        insertLike(like).then(res => {
          if (res) {
            this.secret.likes.push({likeId: res, secretId: this.secret.secretId, userId: this.$user.userId})
          } else {
            this.$message.error('点赞失败')
          }
        })
        
      } else {
        let deletelike = this.secret.likes.filter(item => item.userId === this.$user.userId)[0]
        deleteLikeById(deletelike.likeId).then(res => {
          if (res) {
            let likes = this.secret.likes.filter(item => item.userId !== this.$user.userId)
            this.secret.likes = likes
          } else {
            this.$message.error('取消点赞失败')
          }
        })
      }
    },
    // 点击举报
    clickReport () {
      if (this.ifLogin()) { return }
      console.log('点击举报111', this.$common, this.$common.report)
      this.$common.report(this, this.secret.secretId, this.$user.userId, 1)
      // this.$moment.report()
      // this.$prompt('请输入备注', '举报', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     inputPattern: /a{10,}/,
      //     inputErrorMessage: '备注不能小于10个字符'
      //   }).then(({ value }) => {
      //     this.$message({
      //       type: 'success',
      //       message: '备注: ' + value
      //     })
      //   }).catch(() => {})
    },
    // 点击删除
    clickDelete () {
      if (this.ifLogin()) { return }
      // if (secret.userId === this.$user.userId) {
        this.$confirm('是否删除这条秘密?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteSecretById(this.secret.secretId).then(res => {
            if (res) {
              this.$message.success('删除成功!')
              // 通知父组件已经删除，刷新数据
              this.$emit('deleteSecret')
            } else {
              this.$message.error('删除失败!')
            }
          })
        }).catch(() => {})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 判断该时间是否与当前时间超过一天
    isOverOneDay (time) {
      // let time1 = new Date(time).getTime()
      let curTime = new Date().getTime()
      // console.log('Math.abs(time, curTime)', Math.abs(time, curTime), time, curTime)
      if (curTime - time < 86400000 && time - curTime < 86400000) {
        return false
      } else {
        return true
      }
    },
    // 发送评论
    sureComment () {
      if (this.ifLogin()) { return }
      let comment = {
        secretId: this.secret.secretId,
        userId: this.$user.userId,
        replyId: this.replyId ? this.replyId : '',
        content: this.commentInput,
        createTime: this.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        username: this.$user.username,
        replyname: this.replyname
      }
      console.log('发送评论', comment)
      insertComment(comment).then(res => {
        if (res) {
          console.log('评论成功，返回id' + res)
          comment.commentId = res
          this.$message.success('评论成功!')
          this.secret.comments.push(comment)
          this.commentInput = ''
        } else {
          this.$message.error('评论失败!')
        }
      })
    },
    // 查看某人主页
    toUserHome (item) {
      if (this.ifLogin()) { return }
      this.$router.push('m-user?userId=' + item.userId)
    },
    ifLogin () {
      if (!this.$user.userId) {
        this.$message.error('请前往登录')
        return true
      } else {
        return false
      }
    },
    // 图片加载完
    isLoadOK () {
      console.log('图片加载完成')
      this.$emit('imgLoad')
    }
  }
}
</script>

<style scoped lang="scss">
#secret {
  width: 100%;
  border-radius: 2px;
  min-height: 200px;
  background: white;
  // margin-bottom: 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-top: 0px;
  border-bottom: 1px solid #f2f2f2;
  padding: 30px 50px;
  .user, .content, .imgs, .interact, .comments {
    width: 100%;
  }
  .user {
    height: 50px;
    .portrait {
      object-fit: cover;
      width: 50px;
      height: 50px;
      float: left;
      border-radius: 50%;
      cursor: pointer;
    }
    .username {
      margin-left: 10px;
      height: 50px;
      line-height: 50px;
      float: left;
      cursor: pointer;
    }
    .create_time {
      height: 50px;
      line-height: 50px;
      float: right;
      margin-right: 10px;
    }
  }
  .content {
    line-height: 30px;
  }
  .imgs {
    // text-align: center;
    .imgWrap {
      width: 26%;
      display: inline-block;
      height: 0;
      padding-bottom: 26%;
      overflow: hidden;
      position: relative;
      margin: 1% 4% 1% 0%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-position: center;
        cursor: pointer;
        left: 0;
        top: 0;
      }
    }
    .imgWrap1 {
      width: 80%;
      padding-bottom: 50%;
    }
    .imgWrap2{
      width: 35%;
      padding-bottom: 35%;
      
    }
  }
  .interact {
    // border-bottom: 1px solid #bfbfbf;
    height: 20px;
    line-height: 20px;
    margin: 10px 0px;
    .icon {
      float: right;
      margin-left: 40px;
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
      color: #bfbfbf;
      .love {
        vertical-align: middle;
        display: inline-block;
        margin-top: -2px;
        width: 20px; 
        height: 20px;
      }
      .number {
        margin-left: 5px;
      }
    }
  }
  .comments {
    transition: 2s;
    max-height: 0;
    overflow: hidden;
    &.show{
      max-height: 1500px;
    }
    .comment-item {
      padding: 5px;
      white-space: 2px;
      line-height: 26px;
      text-align: left;
      .comment-username {
        cursor: pointer;
        color: #409eff;
        margin-right: 10px;
      }
      .comment-content {
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    background: #fff;
    text-align: center;
    border-radius: 5px;
  }
}
#secret .el-image__inner{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
