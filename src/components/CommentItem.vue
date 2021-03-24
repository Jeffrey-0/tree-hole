<template>
  <div id="comment">
    <div class="left">
      <img src="../assets/img/avatar.png" alt="">
    </div>
    <div class="center">
      <div class="commentInfo">
        <div class="username">小疯子</div>
        <div class="createTime">2021年3月13日</div>
        <div class="reply">
          <i class="el-icon-chat-line-round"></i>
        </div>
      </div>
      <div class="commentText">
        撒打飞机拉萨的房间了
      </div>
    </div>
    <div class="right">
      <img src="../assets/img/bg.jpg" alt="">
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
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
#comment {
  width: 100%;
  // margin-bottom: 10px;
  .left {
    width: 50px;
    height: 50px;
    // margin-top: 20px;
    display: inline-block;
    background: red;
    vertical-align: top;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .center {
    width: calc(100% - 130px);
    display: inline-block;
    // background: #000;
    // min-height: 100px;
    vertical-align: top;
    .commentInfo {
      
      width: 100%;
      >div {
        display: inline-block;
        margin-left: 2%;
        margin-right: 20%;
        color: #999;
      }
      .username {
        // font-weight: bold;
        font-size: 20px;
        color: #000;
      }
      .createTime {
        color: #999;
      }
      .reply {
        cursor: pointer;
      }
    }
    .commentText {
      padding: 10px 30px 10px 20px;
      cursor: pointer;
    }
  }
  .right {
    width: 70px;
    height: 70px;
    display: inline-block;
    background: yellow;
    vertical-align: top;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-position: center;
    }
  }
}
</style>
