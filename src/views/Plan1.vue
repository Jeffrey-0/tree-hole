<template>
  <div id="plan">
    <div class="plans">
      <div class="plan-item" v-for="item in tableData" :key="item.planId"  @click="handleClick(item)">
        <img v-if="item.planImg" :src="require('../assets/img/' + item.planImg)" alt="" @error="defImg()">
        <img v-else src="../assets/img/bg.jpg" alt="">
        <div class="planname">{{ item.planName }}</div>
        <div class="plandetail">
          <div class="introduce">
          {{ item.planIntroduce }}
          </div>
          <div class="ifFinish" :class="{primary : item.ifFinish}">
          {{ item.ifFinish != 1 ? "借完" : "借阅" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  components: {
  },
  data() {
    return {
      tableData: [{
        planId: 1,
        planImg: 'avatar.png',
        planName: '背单词',
        planIntroduce: '',
        ifFinish: 1
      },{
        planId: 2,
        planImg: 'avatar.png',
        planName: '背单词',
        planIntroduce: '',
        ifFinish: 1
      },{
        planId: 3,
        planImg: 'avatar.png',
        planName: '背单词',
        planIntroduce: '',
        ifFinish: 1
      },{
        planId: 4,
        planImg: 'avatar.png',
        planName: '背单词',
        planIntroduce: '',
        ifFinish: 1
      }],
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    defImg () {
      let img = event.srcElement;
        img.src = this.defaultImg;
        img.onerror = null; //防止闪图
    },
    onError() {
      console.log('错误图片' + event)
      var img=event.srcElement;
      img.src= require('../assets/img/bg.jpg');
      // img.οnerrοr=null;
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;
      // TODO
      this.formInlineifFinish = row.ifFinish === 0 ? 0 : 1;
    },
    ifFinish(row) {
      return row.ifFinish ? "取消" : "签到";
    }
  }
}
</script>

<style scoped lang='scss'>
#plan {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  border-radius: 5px;
}

.plans {
  width: 100%;
  /* background: #00000020; */
  height: 480px;
  /*display: flex;
  justify-content: space-between;
  flex-wrap: wrap;*/
}
.plan-item:nth-child(4),.plan-item:nth-child(8) {
  margin-right: 0;
}
.plan-item {
  transition-duration: .7s;
  /*box-sizing: border-box;
  padding: 10px 30px;*/
  width: 20%;
  height: 220px;
  margin-right: 6%;
  float: left;
  position: relative;
  margin-top: 3px;
  margin-bottom: 12px;
  overflow: hidden;
  cursor: pointer;
}
.plan-item img {
  width: 100%;
  height: 90%;
  border-radius: 5px;
  object-fit: cover;
}
.plan-item .planname {
  text-align: center;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  overflow: hidden;
  height: 10%;
}
.plandetail {
  position: absolute;
  /* bottom: 20px; */
  width: 100%;
  height: 90%;
  top: -100%;
  left: 0;
  color: #ffffff;
  background: #000000aa;
  transition: 1s;
  border-radius: 5px;
}
.plan-item:hover .plandetail {
  display: block;
  cursor: pointer;
  transition: 1s;
  top: 0px;
}
.plan-item .introduce {
  width: 100%;
  height: 85%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 18px 20px;
  line-height: 22px;
  color: #ccc;
  text-align: left;
}
.plan-item .introduce .content {
  width: 100%;
  height: 20px;
  text-indent: 2em;
}
.plan-item .ifFinish {
  width: 100%;
  height: 15%;
  color:#F56C6C;
  line-height: 22px;
}
.plan-item .ifFinish.primary {
  color:#66b1ff;
}
</style>
