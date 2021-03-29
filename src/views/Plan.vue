<template>
  <div id="plan">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="打卡" name="first">
        <!-- <chat></chat> -->
        <div class="clock">
          <div class="clockItem" v-for="(item,index) in clocks" :key="item.id" @click="clockClick(item, index)" :class="{'finish' : item.finish}">
            <div class="icon">
              <i :class="item.finish ? 'el-icon-circle-check' : item.icon"></i>
            </div>
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="目标" name="second">
        <!-- <chat></chat> -->
        <!-- <div class="targer">目标</div> -->
        <div class="targer">
          <div class="doingTarger">
            <div class="targerItem" v-for="(item,index) in doingTargers" :key="item.id" @click="targerClick(item, index)">
              <div class="icon">
                <i :class="item.icon"></i>
              </div>
              <div class="content">{{ item.content }}</div>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
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
      <el-tab-pane label="记录" name="third">
        <!-- <chat></chat> -->
        <div class="record">
          <e-calendar></e-calendar>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 取消打卡模态框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      v-if="ifMobile"
      >
      <span>是否取消打卡</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">否</el-button>
        <el-button type="primary" @click="cancleClock">是</el-button>
      </span>
    </el-dialog>
        <el-dialog
      :visible.sync="dialogVisible"
      width="20%"
      v-else
      >
      <span>是否取消打卡</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">否</el-button>
        <el-button type="primary" @click="cancleClock">是</el-button>
      </span>
    </el-dialog>


    <!-- 计划模态框 -->
    <el-dialog title="修改目标" :visible.sync="dialogFormVisible" id="updatePlan">
      <el-form :model="form">
        <!-- <el-form-item label="图标" :label-width="formLabelWidth" > -->
          <!-- <el-popover
            placement="right"
            width="400"
            trigger="click"
             v-model="iconsVisible"
            >
            <div id="icons">
              <el-button v-for="item in icons" :key="item" @click="chanceIcon(item)">
                <i :class="item"></i>
              </el-button>
            </div>
            <el-button slot="reference"><i class="icon" :class="form.icon"></i></el-button>
          </el-popover> -->
        <!-- </el-form-item> -->
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">
              <el-popover
                placement="left"
                width="400"
                trigger="click"
                v-model="iconsVisible"
                >
                <div id="icons">
                  <el-button v-for="item in icons" :key="item" @click="chanceIcon(item)">
                    <i :class="item"></i>
                  </el-button>
                </div>
                <el-button slot="reference"><i class="icon" :class="form.icon"></i></el-button>
              </el-popover>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <!-- <el-date-picker
            v-model="form.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker> -->
            <el-date-picker
              v-model="form.times"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.times"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="重复方式">
          <el-checkbox-group v-model="form.days">
            <el-checkbox label="周一"></el-checkbox>
            <el-checkbox label="周二"></el-checkbox>
            <el-checkbox label="周三"></el-checkbox>
            <el-checkbox label="周四"></el-checkbox>
            <el-checkbox label="周五"></el-checkbox>
            <el-checkbox label="周六"></el-checkbox>
            <el-checkbox label="周日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chat from '@/components/Chat'
import CommentList from '@/components/CommentList'
// import Calendar from '@/components/Calendar'
import Calendar from '../components/Calendar.vue'
export default {
  name: '',
  components: {
    Chat,
    CommentList,
    // Calendar
    ECalendar:Calendar
  },
  data() {
    return {
      ifMobile: false,
      // clock模态框
      dialogVisible: false,
      // 打卡模态框的clock的位置
      currentClockIndex: 2,
      // 计划模态框
      dialogFormVisible: false,
      form: {
        name: '',
        icon: 'el-icon-edit',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        times:'',
        days: ['周一', '周二', '周三', '周四', '周五']
      },
      formLabelWidth: '0',
      activeName: 'first',
      clocks: [{
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
      records: [],
      icons: [
        'el-icon-user-solid',
        'el-icon-user',
        'el-icon-phone',
        'el-icon-phone-outline',
        'el-icon-more',
        'el-icon-more-outline',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-s-goods',
        'el-icon-goods',
        'el-icon-warning',
        'el-icon-warning-outline',
      ],
      iconsVisible: false
    };
  },
  methods: {
    // 切换标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击打卡
    clockClick (item, index) {
      if (item.finish) {
        this.dialogVisible = true
        this.currentClockIndex = index
      } else {
        item.finish = item.finish ? 0 : 1
      }
      console.log(this.clocks)
    },
    // 模态框取消打卡
    cancleClock () {
      this.clocks[this.currentClockIndex].finish = 0
      this.dialogVisible = false
    },
    // 计划模态框
    targerClick() {
      this.dialogFormVisible = true
    },
    // 改变图标
    chanceIcon (item) {
      this.form.icon = item
      this.iconsVisible = false
    }
  },
  mounted () {
    this.ifMobile = this.$ifMobile.res
    console.log('this.ifMobile', this.ifMobile)
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

  .el-tabs--top {
    background: #fff;
    padding: 20px 15px;
    border-radius: 5px;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    }
    .el-tabs__header {
      box-shadow: 0 0px 0px #ddd
    }
  .clock{
    width: 100%;
    min-height: 590px;
    // background: red;
  }
  .targer {
    width: 100%;
    min-height: 590px;
    // background: yellow;
  }
  .record {
    width: 100%;
    min-height: 590px;
    // background: green;
    position: relative;
  }
  .clockItem {
    width: 20%;
    height: 200px;
    margin: 6% 6% 2% 7%;
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
    margin: 20px;
    text-align: center;
    // padding: 20px;
    box-sizing: border-box;
    // border-top: 1px solid #ddd;
  }
}
</style>
