<template>
  <div id="upload">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="秘密" name="first">
        <div class="secret">
          <el-form>
            <el-form-item>
              <el-input type="textarea" v-model="form.name" placeholder="说点什么吧"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="photos">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.access">
                <el-option label="公开" value=1>公开</el-option>
                <el-option label="私有" value=0>私有</el-option>
              </el-select>
            </el-form-item>
            <el-button>上传</el-button>
          </el-form>          
        </div>
      </el-tab-pane>
      <el-tab-pane label="目标" name="second">

        <div class="targer">
          <el-form :model="form">
            <el-form-item label="名称">
              <el-input v-model="form.name" autocomplete="off">
                <template slot="append">
                  <el-popover
                    placement="left"
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
            <!-- <el-form-item label="起止时间">
              <el-date-picker
                width="300"
                v-model="form.times"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
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
            <el-button>上传</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="相册" name="third">
        <!-- <chat></chat> -->
        <div class="album">
          <el-form :model="form">
            <div class="photos">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
              </el-upload>
            </div>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button>上传</el-button>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

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
      // clock模态框
      dialogVisible: false,
      // 打卡模态框的clock的位置
      currentClockIndex: 1,
      // 计划模态框
      dialogFormVisible: false,
      access: 1,
      form: {
        access: "公开",
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
      records: [],
      iconsVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
      ]
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
    },
    // 图片上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  mounted () {

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
#upload {
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
    border-top: 1px solid #ddd;
  }

  // 新改动
  .targer {
    width: 60%;
    padding: 5%;
    box-sizing: border-box;
    margin: 5% 20% 1% 20%;
    // box-shadow: 2px 2px 5px 5px #f2f2f2;
    // box-sizing: border-box;
    // background: yellow;
  }
  .secret {
    width: 60%;
    padding: 5%;
    box-sizing: border-box;
    margin: 5% 20% 1% 20%;
    // box-shadow: 2px 2px 5px 5px #f2f2f2;
  }
  .album {
    width: 60%;
    padding: 5%;
    box-sizing: border-box;
    margin: 5% 20% 1% 20%;
    // box-shadow: 2px 2px 5px 5px #f2f2f2;
  }
  .photos {
    width: 100%;
    min-height: 355px;
  }
  .secret .photos {
    width: 100%;
    min-height: 195px;
  }
}
</style>
