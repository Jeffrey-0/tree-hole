<template>
  <div id="plan">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="打卡" name="first">
        <!-- <chat></chat> -->
        <div class="clock">
          <div class="clockItem" v-for="(item,index) in clocks" :key="item.planId" @click="clockClick(item, index)" :class="{'finish' : item.finish}">
            <div class="icon">
              <i :class="item.finish ? 'el-icon-circle-check' : item.content"></i>
            </div>
            <div class="content">{{ item.name }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="目标" name="second">
        <!-- <chat></chat> -->
        <!-- <div class="targer">目标</div> -->
        <div class="targer">
          <div class="doingTarger">
            <div class="targerItem" v-for="(item,index) in doingTargers" :key="item.planId" @click="targerClick(item, index)">
              <div class="icon">
                <i :class="item.content"></i>
              </div>
              <div class="content">{{ item.name }}</div>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
          <div class="title">已结束</div>
          <div class="endTarger">
            <div class="targerItem" v-for="(item,index) in endTargers" :key="item.planId" @click="targerClick(item, index)">
              <div class="icon">
                <i :class="item.content"></i>
              </div>
              <div class="content">{{ item.name }}</div>
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
                <el-button slot="reference"><i class="icon" :class="form.content"></i></el-button>
              </el-popover>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="开始时间"
              value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="重复方式">
          <el-checkbox-group v-model="form.repeats">
            <el-checkbox :label="1">周一</el-checkbox>
            <el-checkbox :label="2">周二</el-checkbox>
            <el-checkbox :label="3">周三</el-checkbox>
            <el-checkbox :label="4">周四</el-checkbox>
            <el-checkbox :label="5">周五</el-checkbox>
            <el-checkbox :label="6">周六</el-checkbox>
            <el-checkbox :label="7">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePlan">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {selectPlanById, showAllPlanByPage, deletePlanById, insertPlan, updatePlanById, showAllPlanByUserId, showAllByCurrentDate, updatePlanByIdSelective} from '@/network/plan'
import {selectSignById, showAllSignByPage, deleteSignById, insertSign, updateSignById, showAllSignByUserId, deleteByPlanIdAndTime} from '@/network/sign'

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
      endTargers: [],
      doingTargers: [],
      ifMobile: false,
      // clock模态框
      dialogVisible: false,
      // 打卡模态框的clock的位置
      currentClockIndex: 2,
      // 计划模态框
      dialogFormVisible: false,
      form: {
        name: '',
        content: 'el-icon-edit', // 图标
        startTime: '',
        endTime: '',
        repeats: [],
        createTime: ''
      },
      formLabelWidth: '0',
      activeName: 'second',
      clocks: [],
      // targers: [],
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
        let sign = {
          planId: item.planId,
          createTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
        insertSign(sign).then(res => {
          if (res) {
            console.log('打卡')
            this.$message.success('打卡成功')
            item.finish = item.finish ? 0 : 1
          } else {
            this.$message.error('打卡失败')
          }
        })
      }
      console.log(this.clocks)
    },
    // 模态框取消打卡
    cancleClock () {
      deleteByPlanIdAndTime(this.clocks[this.currentClockIndex].planId, this.$moment(new Date()).format('YYYY-MM-DD')).then(res => {
          if (res) {
            console.log('打卡')
            this.$message.success('取消打卡成功')
            this.clocks[this.currentClockIndex].finish = 0
            this.dialogVisible = false
          } else {
            this.$message.error('取消打卡失败')
          }
      })
      
    },
    // 计划模态框
    targerClick(item) {
      console.log('点击编辑计划', item)
      this.form = Object.assign(item)
      this.form.startTime = this.$moment(this.form.startTime).format('YYYY-MM-DD')
      this.form.endTime = this.$moment(this.form.endTime).format('YYYY-MM-DD')
      // this.form.createTime = new Date(item.createTime)
      this.dialogFormVisible = true
    },
    // 改变图标
    chanceIcon (item) {
      this.form.content = item
      this.iconsVisible = false
    },
    // 刷新
    refresh () {
      // 获取目标数据
      showAllPlanByUserId(this.$user.userId).then(res => {
        this.doingTargers = res.doing
        this.endTargers = res.finish
      })

      // 查询今日打卡目标
      showAllByCurrentDate(this.$user.userId).then(res => {
        this.clocks = res.data
      })
    },
    // 修改目标
    updatePlan () {
      
      // 格式数据
      this.form.repeat = ''
      this.form.repeats.map(item => {
        this.form.repeat = this.form.repeat + item + ','
      })
      // this.form.createTime = new Date()
      this.form.userId = this.$user.userId

      console.log('修改目标', this.form, this.form.createTime)
      this.form.createTime = this.$moment(this.form.createTime).format('YYYY-MM-DD HH:mm:ss')
      updatePlanById(this.form).then(res => {
        console.log(res)
        if (res) {
          this.$message.success('修改目标成功')
          this.dialogFormVisible = false
          // 修改成功，更新目标数据
          showAllPlanByUserId(this.$user.userId).then(res => {
            this.doingTargers = res.doing
            this.endTargers = res.finish
          })
        } else {
          this.$message.error('修改目标失败')
        }
      })
    }
  },
  mounted () {
    this.ifMobile = this.$ifMobile.res
    this.refresh()
  },
  computed : {
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
