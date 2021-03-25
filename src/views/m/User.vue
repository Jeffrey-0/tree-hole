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
    <div class="bottom">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="秘密" name="first">
          <div class="secretList">
            <secret-item></secret-item>
            <secret-item></secret-item>
            <secret-item></secret-item>
            <secret-item></secret-item>
            <secret-item></secret-item>
            <secret-item></secret-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="计划" name="second">
          <div class="targer">
            <div class="doingTarger">
              <div class="targerItem" v-for="(item,index) in doingTargers" :key="item.id" @click="targerClick(item, index)">
                <div class="icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="content">{{ item.content }}</div>
              </div>
            </div>
            <div class="title">已结束</div>
            <div class="endTarger">
              <div class="targerItem" v-for="(item,index) in endTargers" :key="item.id" @click="targerClick(item, index)">
                <div class="icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相册" name="third">
          <!-- <div id="wrap"> -->
            
          <!-- </div> -->
        </el-tab-pane>
      </el-tabs>
      <div class="photo" v-if="activeName === 'third'">
        <vue-waterfall-easy :imgsArr="imgsArr"  @scrollReachBottom="fetchImgsData"></vue-waterfall-easy>
      </div>
    </div>

  </div>
</template>

<script>
import SecretItem from '@/components/SecretItem'
import Album from '@/views/Album'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: '',
  components: {
    Album,
    SecretItem,
    vueWaterfallEasy
  },
  data () {
    return {
      activeName: 'first',
      targers: [{
        id: 1,
        content: '学英语换行的反馈了上搭建费李',
        createTime: '2021-3-16',
        endTime: '2021-2-16',
        days: [1, 2, 3, 4, 5],
        icon: 'el-icon-baseball',
        finish: 0
      },{
        id: 2,
        content: '看书',
        createTime: '2021-3-16',
        endTime: '2021-1-16',
        days: [1, 2, 3, 4, 5, 6, 7],
        icon: 'el-icon-service',
        finish: 0
      },{
        id: 3,
        content: '背单词',
        createTime: '2021-3-16',
        endTime: '2021-4-16',
        days: [1],
        icon: 'el-icon-coffee-cup',
        finish: 1
      },{
        id: 4,
        content: '锻炼',
        createTime: '2021-3-16',
        endTime: '2021-4-16',
        days: [6, 7],
        icon: 'el-icon-bicycle',
        finish: 0
      },{
        id: 5,
        content: '看书',
        createTime: '2021-3-16',
        endTime: '2021-4-16',
        days: [1, 2, 3, 4, 5, 6, 7],
        icon: 'el-icon-service',
        finish: 1
      }],
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: []     //存放每次滚动时下一批要加载的图片的数组
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
     targerClick() {
      // this.dialogFormVisible = true
    },
    initImgsArr (n, m) {   //初始化图片数组的方法，把要加载的图片装入
　　　　var arr = []
　　　　for (var i = n; i < m; i++) {
　　　　　　if(i % 5 == 1) arr.push({ src: `http://xfz.zone/assets/img/blog/helloworld-1.jpg`, link: '', info: '一些图片描述文字' + i }) //src为加载的图片的地址、link为超链接的链接地址、 info为自定义的图片展示信息，请根据自己的情况自行填写
　　　　　　else if (i % 5 == 2) arr.push({ src: `http://xfz.zone/images/avatar.png`, link: '', info: '一些图片描述文字' + i }) //src为加载的图片的地址、link为超链接的链接地址、 info为自定义的图片展示信息，请根据自己的情况自行填写
　　　　　　else if (i % 5 == 3) arr.push({ src: `http://browser9.qhimg.com/bdm/384_237_0/t01a78941bc25ae2cf9.jpg`, link: '', info: '一些图片描述文字' + i }) //src为加载的图片的地址、link为超链接的链接地址、 info为自定义的图片展示信息，请根据自己的情况自行填写
　　　　　　else if (i % 5 == 4) arr.push({ src: `http://browser9.qhimg.com/bdm/768_474_0/t0148bbf85c878da0b8.jpg`, link: '', info: '一些图片描述文字' + i }) //src为加载的图片的地址、link为超链接的链接地址、 info为自定义的图片展示信息，请根据自己的情况自行填写
　　　　　　else arr.push({ src: `http://browser9.qhimg.com/bdm/768_474_0/t013a4ed4683039d101.jpg`, link: '', info: '一些图片描述文字' + i }) //src为加载的图片的地址、link为超链接的链接地址、 info为自定义的图片展示信息，请根据自己的情况自行填写
　　　　}
　　　　return arr
　　　},

　　　fetchImgsData () {    //获取新的图片数据的方法，用于页面滚动满足条件时调用
        if(this.imgsArr.length >= 100) {
          console.log('已经到底了')
          return
        }
　　　　this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
        console.log('加载更多')
// 　　　　this.imgsArr = this.imgsArr.concat(this.imgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
　　　}
  },
  computed : {
    endTargers: function () {
      return this.targers.filter((item) => {
        let endTime = new Date(Date.parse(item.endTime))
        let curTime = new Date()
        return endTime < curTime
      })
    },
    doingTargers: function () {
      return this.targers.filter((item) => {
        let endTime = new Date(Date.parse(item.endTime))
        let curTime = new Date()
        return endTime >= curTime
      })
    }
  },
  created () {
    this.imgsArr = this.initImgsArr(0, 20)       //初始化第一次（即页面加载完毕时）要加载的图片数据
    this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
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
    background: #fff;
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
    height: calc(100% - 180px);
    // background: red;
    background: #fff;
    position: relative;


    // 计划
    .targerItem {
      width: 20%;
      height: 200px;
      margin: 3% 6% 3% 7%;
      float: left;
      text-align: center;
      background: #fff;
      // margin: 20px;
      box-shadow: 1px 1px 2px 2px #8888881c;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.5s;
      .icon {
        font-size: 50px;
        margin-top: 20%;
      }
      .content {
        padding: 20px;
        vertical-align: middle;
        font-size: 20px;
        line-height: 25px;
      }
      &.finish {
        background: #409EFF;
        color: #fff;
      }
    }
    .doingTarger::after {
      content: '';
      display: block;
      clear: both;
    }
    .endTarger::after {
      content: '';
      display: block;
      clear: both;
    }
    .title {
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 20px;
      margin: 5px;
      text-align: center;
      // padding: 20px;
      box-sizing: border-box;
      // border-top: 1px solid #ddd;
    }
    #wrap {
      width: 150%;
      height: 100%;
    }
    .photo {
      position: absolute;
      width: 100%;
      height: calc(100% - 50px);
      bottom: 0;
    }
  }
  
}
</style>
