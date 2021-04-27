<template>
  <div id="messageItem" :class="{myself: message.userId === $user.userId}">
    <div class="avatar">
      <img :src="message.userId === $user.userId ? $baseImgUrl + $user.portrait : $baseImgUrl + acceptUser.portrait" alt="">
    </div>
    <div class="icon"></div>
    <div class="text" v-if="message.type">
      {{message && message.content}}
    </div>
    <div class="text" v-else>
      <!-- <img :src="message.content ? $baseImgUrl + message.content : $baseImgUrl + message.content" alt=""> -->
      <el-image 
            style="width: 100%"
            :src="message.content ? $baseImgUrl + message.content : $baseImgUrl + message.content"
             @click="handleClickImage"
            :preview-src-list="messagesPic">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
    message: {},
    acceptUser: {},
    messagesPic: {}
  },
  data () {
    return {
      // myself: 1
    }
  },
  methods: {
    // 点击图片
    handleClickImage () {
      console.log('点击图片', this.message, this.messagesPic)
    }
  },
  computed: {
    imgList () {
      let imgList = []
      
      if (this.message.type === 0) {
        this.message.path = this.$baseImgUrl + this.message.content
         imgList.push(this.message)
      }
      return imgList
    }
    // myself: message && message.myself
  },
  watch : {
    message (newVal, oldVal) {
      this.message = newVal
    }
  }
}
</script>

<style scoped lang='scss'>
// 其他人
#messageItem {
  width: 100%;
  padding: 20px 20px 2px 20px;
  box-sizing: border-box;
  .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: top;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .icon {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    // background: red;
    margin-left: 5px;
    vertical-align: top;
    margin-top: 13px;
    border: 5px solid transparent;
    border-right: 5px solid #fff;
  }
  .text {
    max-width: calc(60% - 50px);
    padding: 10px;
    line-height: 20px;
    background: #fff;
    vertical-align: top;
    display: inline-block;
    border-radius: 4px;
    img {
      width: 100%;
    }
    
  }
}
// 自己
#messageItem.myself {
  // float: right;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .avatar {
    float: right;
    // display: inline-block;
  }
  .icon {
    float: right;
    vertical-align: middle;
    border: 5px solid transparent;
    border-left: 5px solid rgb(128, 185, 242);
    margin-left: 0;
    margin-right: 5px;
  }
  .text {
    float: right;
    max-width: calc(60% - 50px);
    background: rgb(128, 185, 242);
    color: #fff;
    
  }

}
</style>
