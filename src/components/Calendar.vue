<template>
  <div id="calendar">
    <div class="left">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        v-on:isToday="clickToday"
      ></Calendar>
    </div>
    <div class="right">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          size="large"
          :timestamp="$moment(activity.createTime).format('YYYY-MM-DD')">
          {{activity.name}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {showHistoryByUserIdAndTime} from '@/network/sign'
import Calendar from 'vue-calendar-component'
export default {
  name: '',
  components: {
    Calendar
  },
  data () {
    return {
      reverse: true,
      activities: []
    }
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
      showHistoryByUserIdAndTime(this.$user.userId, this.$moment(data).format('YYYY-MM-DD')).then(res => {
        this.activities = res || []
      })
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }
  },
  created () {
    showHistoryByUserIdAndTime(this.$user.userId, this.$moment(new Date()).format('YYYY-MM-DD')).then(res => {
      this.activities = res || []
    })
  }
}
</script>

<style scoped lang='scss'>
#calendar {
  width: 100%;
  height: 100%;
  position: absolute;
  .left {
    width: 50%;
    // height: 100%;
    position: absolute;
    top: 20%;
    left: 10%;
    // transform: translateY(-50%);
    display: inline-block;
    vertical-align: top;
  }
  .right {
    width: 30%;
    display: inline-block;
    vertical-align: top;
    top: 20%;
    right: 5%;
    position: absolute;
  }
  .el-timeline-item {
    font-size: 20px;
    padding: 30px;
  }
}
</style>
