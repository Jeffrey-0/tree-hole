<template>
  <div id="chat">
    <!-- 聊天组件 -->
    <div class="person">
      <!-- <div class="title">最近聊天</div> -->
      <div class="user" v-for="item in users" :key="item.userId" @click="changeAcceptUser(item)">
        <img class="portrait" :src="$baseImgUrl + item.portrait">
        <div class="username">{{ item.username }}</div>
      </div>
    </div>
    <div class="chatWrap">
      <div class="title">{{ acceptUser.username }}</div>
      <div class="chat-content" id="messageList">
        <div v-for="(item, index) in messages" :key="index">
          <message-item :message="item" :acceptUser="acceptUser"></message-item>
        </div>
        <div id="msgEnd" style="height:0px; overflow:hidden" ref="msgEnd"></div>
      </div>
      <div class="edit">
        <div class="tool">
          <div class="sendPic"></div>
          <div class="sendEmjoy">
            <!-- <vue-emoji ref="emoji" @input="onInput" :value="emojiInput" /> -->
          </div>
        </div>
        <div class="input-content">
            <el-input type="textarea" v-model="chatInput" placeholder="回复一下吧"></el-input>
        </div>
        <div class="send">
          <div class="button">
            <el-button v-if="chatInput" @click="addChat">发送</el-button>
            <el-button v-else disabled>发送</el-button>
          </div>
          <div class="number">
            {{chatInput.length}} /100
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {selectChatById, showAllChatByPage, deleteChatById, insertChat, updateChatById, showAllByTowUserId} from '@/network/chat'
import MessageItem from '@/components/MessageItem'
// 引入表情库
// import VueEmoji from 'emoji-vue'
export default {
  name: '',
  components: {
    MessageItem,
    // VueEmoji
  },
  data () {
    return {
      chatInput: '',
      emojiInput: '',
      page: 1,
      rows: 10,
      acceptUser: {
        userId: 0,
        username: '暂无选中用户',
        portrait: 'user/114.jpg'
      },
      messages: []
    }
  },
  props : {
    users: {}
  },
  methods: {
    onInput(event) {
        //事件。数据包含文本区域的值
        this.chatInput = this.chatInput + event.data
        
        console.log(event, this.emojiInput, this.chatInput)
        this.clearTextarea()
    },
    clearTextarea(){
      this.$refs.emoji.clear()
    },
    // 刷新聊天记录
    refresh () {
      showAllByTowUserId(this.$user.userId, this.acceptUser.userId, this.page, this.rows).then(res => {
        console.log('获取聊天记录', res)
        this.messages = res.data
        let that = this
        setTimeout(function () {
            that.$el.querySelector(`#msgEnd`).scrollIntoView({
              behavior: "smooth",  // 平滑过渡
              block:    "start"  // 上边框与视窗顶部平齐。默认值
            })
          }, 50)
      })
    },
    // 点击切换发送用户
    changeAcceptUser (item) {
      this.acceptUser = item
      console.log('切换发送用户', item)
      this.refresh()
    },
    // 发送消息
    addChat() {
      let chat = {
        userId: this.$user.userId,
        acceptId: this.acceptUser.userId,
        content: this.chatInput,
        createTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        type: 1
      }
      let that = this
      insertChat(chat).then(res => {
        if (res) {
          console.log('发送成功', res)
          this.chatInput = ''
          chat.chatId = res
          this.messages.push(chat)

          setTimeout(function () {
            that.$el.querySelector(`#msgEnd`).scrollIntoView({
              behavior: "smooth",  // 平滑过渡
              block:    "start"  // 上边框与视窗顶部平齐。默认值
            })
          }, 50)

          // msgEnd.scrollIntoView()
          // that.$refs('msgEnd').scrollIntoView()
        } else {
          this.$message.error('发送失败!')
        }
      })
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style scoped lang='scss'>
#chat {
  width: 100%;
  height: 100%;
  .person {
    display: inline-block;
    width: 200px;
    height: 100%;
    // background: red;
    vertical-align: top;
    // border-right: 1px solid grey;
    overflow-y: hidden;
    overflow-x: hidden;
    &:hover {
      overflow-y: scroll;
    }
  }
  .chatWrap{
    display: inline-block;
    width: calc(100% - 200px);
    height: 100%;
    background: #f4f5f7;
    vertical-align: top;
    .chat-content {
      width: 100%;
      height: 65%;
      // overflow: hidden;
      overflow-x: hidden;
      overflow-y: scroll;
      transition: 2s;
      // background: red;
      &:hover {
        // overflow-y: scroll;
      }
    }
    .edit {
      width: 100%;
      height: calc(35% - 45px);
      // background: yellow;
      border-top: 1px solid #ddd;
      .tool {
        width: 100%;
        height: 40px;
        // background: red;
        >div {
          float: left;
          width: 30px;
          height: 30px;
          margin-top: 5px;
          margin-left: 10px;
          margin-right: 10px;
          background-size: 100% 100%;
          // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAAXNSR0IArs4c6QAAAjFJREFUOBG1lUtrU0EUgHMfSX5AkEINSOmii4JuigihFERpoIgrsykEal6bLgQ34h8oXZUiCnlgaRZSshErhZQWAn24sEUFoSRIQQlEEZJNaRpoHn7n0gupN2mTWx04mTkz53znzJm5E8Vx1pLJ5P1mszmpKMqgOddP32q1SqqqrkcikQ3xU+UnHo8vAs0CHRPdThNfYQhL/JVEInGPaOuapk2Fw+GsHajpk0ql/I1GY43M/SpQP9G2rwoVuDCEJSVVGUhNS2ZU6YnsQx4Q1ChV+1oP45IwLY6UJsB2dpBVDnSuB1BHEwuYLNsPsH3cEdBt0gLGMI4cIL8Q2xnrOJ9rsVjskInRc5M2lE4Z28BYXf4b2FIKa2zrDLdlgFszyUHfZPUU+ezxeN4HAoET07ovcC6X0wuFwvN6vf4MwE/kI3dWo58pl8uvuKqP+wYLNJ/Pr+B4m0/2EYe8ZkIymYxWqVRm2UWGta8E+yZvxRsx8Hq9M8Vi8Snbm0YdQRrIF2TZ7Xa/rtVq84wfOp3OCT7dH4wtjQdoCv93LGwZYBQducHENfp5HqRPRHeh+5BZMpDaDZGNLxqN7jHu2oB/YPHUqDGPxh2U3y6X61YoFDpq89pNp9Mvq9XqAvCly6Dih9136XWg0l9ni3f/gsq8IxgMHtNFDaW3n0F2va/quv6WLToIMNybX3creY+BjpN1VhGzs1dfarmNWurueuGKZCrQF5TsiQEW83/xnyeZAt0U3h+pCu2ZMB0nRQAAAABJRU5ErkJggg==) no-repeat;
          cursor: pointer;
        }
        .sendPic {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAAXNSR0IArs4c6QAAAjFJREFUOBG1lUtrU0EUgHMfSX5AkEINSOmii4JuigihFERpoIgrsykEal6bLgQ34h8oXZUiCnlgaRZSshErhZQWAn24sEUFoSRIQQlEEZJNaRpoHn7n0gupN2mTWx04mTkz53znzJm5E8Vx1pLJ5P1mszmpKMqgOddP32q1SqqqrkcikQ3xU+UnHo8vAs0CHRPdThNfYQhL/JVEInGPaOuapk2Fw+GsHajpk0ql/I1GY43M/SpQP9G2rwoVuDCEJSVVGUhNS2ZU6YnsQx4Q1ChV+1oP45IwLY6UJsB2dpBVDnSuB1BHEwuYLNsPsH3cEdBt0gLGMI4cIL8Q2xnrOJ9rsVjskInRc5M2lE4Z28BYXf4b2FIKa2zrDLdlgFszyUHfZPUU+ezxeN4HAoET07ovcC6X0wuFwvN6vf4MwE/kI3dWo58pl8uvuKqP+wYLNJ/Pr+B4m0/2EYe8ZkIymYxWqVRm2UWGta8E+yZvxRsx8Hq9M8Vi8Snbm0YdQRrIF2TZ7Xa/rtVq84wfOp3OCT7dH4wtjQdoCv93LGwZYBQducHENfp5HqRPRHeh+5BZMpDaDZGNLxqN7jHu2oB/YPHUqDGPxh2U3y6X61YoFDpq89pNp9Mvq9XqAvCly6Dih9136XWg0l9ni3f/gsq8IxgMHtNFDaW3n0F2va/quv6WLToIMNybX3creY+BjpN1VhGzs1dfarmNWurueuGKZCrQF5TsiQEW83/xnyeZAt0U3h+pCu2ZMB0nRQAAAABJRU5ErkJggg==) center/24px no-repeat;
          &:hover {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAAXNSR0IArs4c6QAAAkFJREFUOBG1lctr1FAUxr+bZKzFhStRFJX6aqlgN4MIQzeiOCDSlYNQa9GFqy4EN+I/IF2VIgpuKp1IkW5EpdKi4MLHQkUFYRKtilKoRRAXVdoyTU6/k2E0Np3OQ72Qm5Nz7vnly0nuiUF5uIXDEHMEgs1lV11ng2kYmUBP+33Ns6LkvDeI0IzTTkfXjU3piKEsDoPhd4eAYAKWOYqeNoU3Plw/i1DGYEnWggmyxD/6a6jKUWHKYkmtqKbC+sTHDT+DvHcMIqVSxWPVbGXxPSUTXT+HIHxM6B243qVqnErxJBhh7AWamF0JsbI/CU6lrrFOBS6fgdgNK3YS9zux+wN9exP+Oh1JxXUCKi3/b+BkKSpJiPtHPm5EMM/tb/bRXYQxr9C07i5yW+fKy+oDPxQHU/5FLC5c4Kb9QsgzHjYkPI35H1fh+me48yJ27eAS9Ca/7/3sMMfZbMbK6jAqNhbe9hE6St8bHpO/wfcmm/Bt8TwTu6mmFZCAO+g1Fw1jW/MQlfbTl4azthPdOz7/gqqRMwHnQbiF9yzPbebNsgl5I/xuHQK3s1YbaPfDWC8JWYMQGT5mH/1zjLfAtjM42fr8D+jyi7z3lOBiSbHIAar8ivWmA11ts7G1T5CfuQJ8HyD8elWoJgo+6cmJOnJotsBKHUTXrjhU48CpTT85n43sWiYT/SheWOzDt7QtQ4o7a8lbdY32Y0EnW8E4iRza9QWspfbSZS10VVIsqEoVCrmM3vZzJbDG/8U/j0rRu+eB4pYAPcu+2hPWIJ0AAAAASUVORK5CYII=);
          }
        }
        .sendEmjoy {
          // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA1tJREFUSA3FVU1oE1EQntmkaQ9qUGltWg+CaVIpglpF8OfQiopSrIngQQoitSBaEUVBEYueBBWEnkToRerBShIrimARvQh6EA9qqU2qIDYpLTa09JAm2TfOrFndpLtG9OC7vDfzfd/MvPd25wH8r7F6MNUSjE60lssfiCa3BQfHtzrxNEdAQUgHdS84OLXYidP0fHKRDhDRFRxy4jgmUOi5DkCLdZU/4yTOTuunEchb4cFrThwsBaSqbDq/i4AaCKCd8Q0IeBOI5ou4iJVEdJp9bxHhAXPinqXupx9aauasvKIE/th4JxFw5ZjlgO945hOANbyTYQ6StwqZ5waEJiAcZtwFiGt59jDvXCJU32flGuvV0dRZfyQ51xBNHblM5Hh0C4QFh2hEKzEklskzdtAYnQrkKfde07B9NOR7YoJ/MwdiqT2K6KEbKppGwtWjRqU5yB7l7b741+BSUCHGcyMm2+ZRNPP5PTMrlrvwR1LHTbvcLFzR/OIZsTgm8EUZA72EkP6x5qsl+KJQDfB5tnqXVHW+2blsxsSsc/PQtHdmNtNHqHZoBAdNjBDTQOAV29yBiRlzPFw/5PK4mznpqpnZ+beNj5K7iwhsiE8w4QhXNKUcsW0TCDDatuITi68SqNr8PFwRn3WITzDhCNeKWde2CaQ9+KPjfRrRXUCtpyPs22IVydrwMSYc4Tq1FNsEej53gWM0uzXXprGw78ZlRFWaQHyCCYd/uo26njtfyhG7cMnF0Pqw79IAwEVEvu4yY2R/7TtuGev4hrWEDdc2wX1E3ewhgQfJ7UqHZ9ybKqx6xrMuN7R+bK9/WShE2sqCYXtEVpYiV5K3sZCHqAG6klau3doQcjXT/N1W2xESoRVjGkI3V/mz2XHnzPHPcuzjvtrPdhqJZcRk0EjAn9ordu6xJbMzHq67xdU2ctHdCNoJV4UWtO2YhQBItNeIybZx1P7It5UEmThq2JUI1fU7JfoTvz+W7CBFtxGqAokDy78aCUQYiKYOK1K3OeeVymXu3tKHo1xweagy6fwprr6HUOviT/iOaH4mEKMhOtFGpHr5fOv4IUnwNjPiLzf4Y65ijZ81Sb6fk/EDvsempiiBOOXh6I9NbuY20MCiKpP425kww3cT7wjVvC79Kb8DAUpTLTuW+H8AAAAASUVORK5CYII=);
          // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB5UlEQVR4AWIYMDBz5kzH2bNnOxGhzmbOnDnWJFswa9asSYDWygCigSgO41YAJQAoWSMgAIQASQoUQJbEZAGM0aRERQAEuAFgAkIpAVXDUAzAKLBEQWptcf0+Hp6zd3fPGp+z//u+7/9/9+67Q/wWBMGoi1Or1UbgvMI99W5QrVYnEHfYxV7M9LvisIPJ1MaaCtMVpiojvpcBOAb7EajWgfcgrjTSxppD2kT0jqANrsEleKZ2wfXchmrgRRzDbUsrD9c9L4FPCBthGA753lJppJWHvKLm03Tvcl0c9OmTB149edqHdULh6r8ecXnJ0y7cgLJ9FvwvehgW7XsvL3nahAaEgtVgntoHOGOSMZex1sQRVxpLX5Cns4HJwZTqoAUWouaqmbWGuKp5NdCPFK8y5Rfr9T4N6loTR/+9Guj1QC0wQSr1e2xV05rhBNKkbsD/I4SPYCbpgMWB/8T1MHUDIj/MhBmPkGWk8T4DQ55TCEFoA82P4zXt1wCzHOu/Mo2ghyabtoGSV4kJ0pYMLfOuguXiy0ueduGAwm3CYeYw3TapzSYk+06e9pbGKX5zXRv0PSQP5UOe0QnXdXAs7CR+ONyfz4rxyLu2tgxaJjxN0EiJpjRGu5T44SCVs5oCFFIiL02/xP8BToUvO6m2Rg4AAAAASUVORK5CYII=) center/24px no-repeat;
          // &:hover {
            // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA1tJREFUSA3FVU1oE1EQntmkaQ9qUGltWg+CaVIpglpF8OfQiopSrIngQQoitSBaEUVBEYueBBWEnkToRerBShIrimARvQh6EA9qqU2qIDYpLTa09JAm2TfOrFndpLtG9OC7vDfzfd/MvPd25wH8r7F6MNUSjE60lssfiCa3BQfHtzrxNEdAQUgHdS84OLXYidP0fHKRDhDRFRxy4jgmUOi5DkCLdZU/4yTOTuunEchb4cFrThwsBaSqbDq/i4AaCKCd8Q0IeBOI5ou4iJVEdJp9bxHhAXPinqXupx9aauasvKIE/th4JxFw5ZjlgO945hOANbyTYQ6StwqZ5waEJiAcZtwFiGt59jDvXCJU32flGuvV0dRZfyQ51xBNHblM5Hh0C4QFh2hEKzEklskzdtAYnQrkKfde07B9NOR7YoJ/MwdiqT2K6KEbKppGwtWjRqU5yB7l7b741+BSUCHGcyMm2+ZRNPP5PTMrlrvwR1LHTbvcLFzR/OIZsTgm8EUZA72EkP6x5qsl+KJQDfB5tnqXVHW+2blsxsSsc/PQtHdmNtNHqHZoBAdNjBDTQOAV29yBiRlzPFw/5PK4mznpqpnZ+beNj5K7iwhsiE8w4QhXNKUcsW0TCDDatuITi68SqNr8PFwRn3WITzDhCNeKWde2CaQ9+KPjfRrRXUCtpyPs22IVydrwMSYc4Tq1FNsEej53gWM0uzXXprGw78ZlRFWaQHyCCYd/uo26njtfyhG7cMnF0Pqw79IAwEVEvu4yY2R/7TtuGev4hrWEDdc2wX1E3ewhgQfJ7UqHZ9ybKqx6xrMuN7R+bK9/WShE2sqCYXtEVpYiV5K3sZCHqAG6klau3doQcjXT/N1W2xESoRVjGkI3V/mz2XHnzPHPcuzjvtrPdhqJZcRk0EjAn9ordu6xJbMzHq67xdU2ctHdCNoJV4UWtO2YhQBItNeIybZx1P7It5UEmThq2JUI1fU7JfoTvz+W7CBFtxGqAokDy78aCUQYiKYOK1K3OeeVymXu3tKHo1xweagy6fwprr6HUOviT/iOaH4mEKMhOtFGpHr5fOv4IUnwNjPiLzf4Y65ijZ81Sb6fk/EDvsempiiBOOXh6I9NbuY20MCiKpP425kww3cT7wjVvC79Kb8DAUpTLTuW+H8AAAAASUVORK5CYII=);
          // }
        }
      }
      .input-content {
        width: 100%;
        height: calc(100% - 80px);
        // background: yellow;
        .el-textarea {
          height: 100%;
          textarea {
            background: transparent;
            border: 0px;
            height: 100%;
            overflow-y: hidden;
          }
        }
      }
      .send {
        width: 100%;
        height: 40px;
        // background: red;
        >div {
          float: right;
          height: 100%;
          line-height: 40px;
          vertical-align: center;
          margin-right: 10px;
          button {
            padding: 8px 20px;
          }
        }
      }
    }
  }
  // .username {
  //   text-align: center;
  // }
  .title {
    text-align: center;
    // border-bottom: 1px solid grey;
    padding: 12px 0px;
    color: #aaa;
    border-bottom: 1px solid #ddd;
  }
  .user {
    height: 80px;
    text-align: center;
    // overflow: hidden;
    &:hover {
      background: #e4e5e6;
    }
    .portrait {
      width: 50px;
      height: 50px;
      float: left;
      margin: 15px;
      // border-radius: 50%;
      cursor: pointer;
    }
    .username {
      // margin-left: 10px;
      text-align: left;
      height: 80px;
      line-height: 80px;
      width: 110px;
      float: left;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 1px;
  background-color: rgba(0,0,0,0);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.3);
	border-radius: 2px;
	background-color: rgba(0,0,0,0);
  color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 0.5px rgba(0, 0, 0, 0.3);
  background-color: rgba(0,0,0,0.5);
}


</style>
