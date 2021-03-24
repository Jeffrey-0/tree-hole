<template>
  <div id="secret">
    <div class="user">
      <img class="portrait" :src="require('../assets/img/' + secret.user_portrait)">
      <!-- <img v-if="secret.user_portrait" :src="$baseImgUrl + secret.user_portrait" > -->
      <div class="username">{{ secret.user_name }}</div>
      <div class="create_time">{{ secret.create_time }}</div>
    </div>
    <div class="content">{{ secret.content }}</div>
    <div class="imgs" v-if="secret.imgs && secret.imgs.length > 0">
      <div v-if="secret.imgs.length === 1">
        <div class="imgWrap imgWrap1" v-for="item in secret.imgs" :key="item.id">
          <!-- <img :src="require('../assets/img/' + item.img_url)" alt="" width="100%" height="100%"> -->
          <el-image 
            style="width: 100%"
            :src="require('../assets/img/' + item.img_url)" 
            :preview-src-list="srcList">
          </el-image>
        </div>
      </div>
      <div v-else-if="secret.imgs.length === 2 || secret.imgs.length === 4">
        <div class="imgWrap imgWrap2" v-for="item in secret.imgs" :key="item.id">
          <!-- <img :src="require('../assets/img/' + item.img_url)" alt="" width="100%" height="100%"> -->
          <el-image 
            style="width: 100%"
            :src="require('../assets/img/' + item.img_url)" 
            :preview-src-list="srcList">
          </el-image>
        </div>
      </div>
      <div v-else>
        <div class="imgWrap" v-for="item in secret.imgs" :key="item.id">
          <!-- <img :src="require('../assets/img/' + item.img_url)" alt="" width="100%" height="100%"> -->
           <el-image 
            style="width: 100%"
            :src="require('../assets/img/' + item.img_url)" 
            :preview-src-list="srcList">
          </el-image>

        </div>
      </div>
    </div>
    <div class="interact">
      <div class="icon">
        <i class="el-icon-error" title="删除"></i>
      </div>
      <div class="icon">
        <i class="el-icon-warning" title="举报"></i>
      </div>
      <div class="icon">
        <!-- <i class="el-icon-s-comment" title="评论" @click="showComments"></i> -->
        <!-- <el-badge :value="12" class="item"> -->
          <i class="el-icon-s-comment" title="评论" @click="showComments"></i>
          <span class="commentNumber number" v-if="commentNumber">{{ commentNumber }}</span>
        <!-- </el-badge> -->
      </div>
      <div class="icon" @click="clickLike">
        <!-- <el-badge :value="12" class="item"> -->
          <img v-if="secret.is_like" class="love" title="点赞" style="" src="@/assets/img/icon/点赞.png">
          <img v-else class="love" title="点赞" style="" src="@/assets/img/icon/未点赞.png">
          <!-- <i class="love" title="点赞" style="background: url('@/assets/img/icon/未点赞.png')"></i> -->
          <span class="loveNumber number" v-if="loveNumber">{{ loveNumber }}</span>
        <!-- </el-badge> -->
      </div>
      <!-- <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button size="small">回复</el-button>
      </el-badge> -->

    </div>
    <div class="comments" :class="{show: ifShowComment}">
      <div style="margin-top: 15px;">
        <el-input :placeholder="this.reply_name ? '回复' + this.reply_name : '评论' " v-model="commentInput" class="input-with-select">
          <el-button slot="append" icon="el-icon-finished"></el-button>
        </el-input>
      </div>
      <div v-for="item in secret.comments" :key="item.id" class="comment-item">
        <span class="comment-username">{{ item.user_name }}:</span>
        <span class="comment-content" @click="clickComment(item.user_name)">{{ item.content }}</span>
      </div>
      <!-- 分页 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      ifShowComment: 0,
      commentInput: '',
      loveNumber: 10,
      commentNumber: 3,
      reply_name: '',
      currentPage: 5,
      secret: {
        id: '1',
        content: `呐，其实马上就上高二了。我是想考清华的，没和别人说过，因为怕没有毅力啊。
        还有不到两年，一定努力，一定加油。清华虽然很远但请一定要相信我能考上！`,
        create_time: '2020-07-12 13:27:08',
        status: 0,
        user_id: 5,
        user_name: '小疯子',
        user_portrait: 'avatar.png',
        likes: [1, 2, 4, 5],
        is_like: 0,
        comments: [
          {
            id: '2',
            content: '为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！为自己理想奋斗！',
            user_name: 'Jeffrey',
            reply_name: 'Json'
          },
          {
            id: '3',
            content: '加油加油，传播正能量，人人有责',
            user_name: 'JSON',
            reply_name: 'XFZ'
          },
          {
            id: '4',
            content: '努力总有收获',
            user_name: 'Jeffrey',
            reply_name: ''
          }
        ],
        imgs: [
          {
            id: 1,
            img_url: 'avatar.png'
          },
          {
            id: 2,
            img_url: 'bg_index.jpg'
          },
          {
            id: 3,
            img_url: 'bg.jpg'
          },
          // {
          //   id: 4,
          //   img_url: 'avatar.png'
          // },
          // {
          //   id: 5,
          //   img_url: 'bg_index.jpg'
          // },
          // {
          //   id: 6,
          //   img_url: 'bg.jpg'
          // },
          // {
          //   id: 7,
          //   img_url: 'avatar.png'
          // },
          // {
          //   id: 8,
          //   img_url: 'bg_index.jpg'
          // },
          // {
          //   id: 9,
          //   img_url: 'bg.jpg'
          // }
        ]
      }
    }
  },
  computed : {
    imgList: function () {
      return this.secret.imgs && this.secret.imgs.map((item) => this.$baseImgUrl + item.img_url)
    }
  },
  methods: {
    showComments () {
      console.log(123)
      this.ifShowComment = this.ifShowComment ? 0 : 1
    },
    clickComment (user_name) {
      console.log(user_name)
      this.reply_name = user_name
      this.commentInput = ''
    },
    clickLike() {
      // console.log(this.secret.is_like)
      this.secret.is_like = this.secret.is_like ? 0 : 1
      // console.log(this.imgList)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped lang="scss">
#secret {
  width: 100%;
  border-radius: 5px;
  min-height: 200px;
  background: white;
  margin-bottom: 30px;
  box-sizing: border-box;
  padding: 30px 50px;
  .user, .content, .imgs, .interact, .comments {
    width: 100%;
  }
  .user {
    height: 50px;
    .portrait {
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
      max-height: 500px;
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
.el-image {

}
#secret .el-image__inner{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
