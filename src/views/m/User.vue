<template>
  <div id="user">
    <div class="top">
      <div class="info">
        <div class="avatar">
          <img class="portrait" :src="require('../../assets/img/avatar.png')">
        </div>
        <div class="usernameMotto">
          <div class="username">小疯子</div>
          <div class="motto">座右铭座右铭座右铭座右铭座右铭座右铭</div>
        </div>
      </div>
      <div class="edit">
        <div class="nav">
          <div class="item">
            <div class="number">10</div>
            <div class="title">关注</div>
          </div>
          <div class="item">
            <div class="number">10</div>
            <div class="title">粉丝</div>
          </div>
          <div class="item">
            <div class="number">10</div>
            <div class="title">获赞</div>
          </div>
        </div>
        <div class="editBt">
          <el-button round>编辑</el-button>
          <el-button icon="el-icon-search" round></el-button>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
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
#user {
  width: 100%;
  height: 100%;
  text-align: left;
  .top {
    width: 100%;
    height: 180px;
    // background: yellow;
    .info {
      width: 100%;
      height: 100px;
      // background: #fff;
      .avatar {
        vertical-align: top;
        width: 100px;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        display: inline-block;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .usernameMotto {
        vertical-align: middle;
        width: calc(100% - 100px);
        height: 100px;
        display: inline-block;
        padding: 15px 5px;
        box-sizing: border-box;
        .username {
          width: 100%;
          height: 30px;
          font-size: 22px;
          line-height: 30px;
        }
        .motto {
          width: 100%;
          height: 40px;
          line-height: 40px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

    }
    .edit {
      width: 100%;
      height: 80px;
      padding: 10px;
      box-sizing: border-box;
      .nav {
        width: 200px;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        .item {
          width: 50px;
          height: 100%;
          padding: 0 5px;
          display: inline-block;
          text-align: center;
        }
      }
      .editBt{
        vertical-align: top;
        width: calc(100% - 200px);
        height: 100%;
        display: inline-block;          
      }
    }
  }
  .bottom {
    width: 100%;
    height: calc(100% - 200px);
    background: red;
  }
}
</style>
