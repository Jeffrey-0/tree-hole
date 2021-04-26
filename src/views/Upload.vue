<template>
  <div id="upload">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="秘密" name="first">
        <div class="secret">
          <el-form v-model="formSecret">
            <el-form-item>
              <el-input type="textarea" v-model="formSecret.content" placeholder="说点什么吧" minlength="3" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="photos">
                <el-upload
                  accept=".jpg, .png, .jpeg"
                  list-type="picture-card"
                  :action="$baseUrl + 'picture/upload'"
                  :data="currentSecret"
                  :headers="{accessToken : accessToken}"
                  :on-success="uploadSecretSuccess"
                  :on-error="uploadError"
                  :on-remove="handleRemove"
                  :limit="6"
                  ref="uploadSecret"
                  :auto-upload="false">
                  <i class="el-icon-plus"></i>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                    <!-- <i slot="default" class="el-icon-plus"></i>
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
                          @click="handleRemove(file, fileList)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div> -->
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formSecret.power">
                <el-option label="公开" :value="1"></el-option>
                <el-option label="私有" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-button @click="addSecret">上传</el-button>
          </el-form>          
        </div>
      </el-tab-pane>
      <el-tab-pane label="目标" name="second">

        <div class="targer">
          <el-form :model="form" :rules="rules" ref="targerForm">
            <el-form-item label="名称" required  prop="name">
              <el-input v-model="form.name" autocomplete="off"  required>
    `            <template slot="append">
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
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间"  prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="结束时间">
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
            <el-button @click="addPlan">上传</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="相册" name="third">
        <!-- <chat></chat> -->
        <div class="album">
          <el-form>
            <div class="photos">
              <!-- :file-list="fileList" -->
              <el-upload
                accept=".jpg, .png, .jpeg"
                list-type="picture-card"
                :action="$baseUrl + 'album/upload'"
                ref="upload"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :data="$user"
                :headers="{accessToken : accessToken}"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
                  <el-dialog :visible.sync="dialogVisibleAlbum">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
              </el-upload>
            </div>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button @click="submitUpload">上传</el-button>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {selectPlanById, showAllPlanByPage, deletePlanById, insertPlan, updatePlanById, showAllPlanByUserId, showAllByCurrentDate, updatePlanByIdSelective} from '@/network/plan'
import {selectSecretById, showAllSecretByPage, deleteSecretById, insertSecret, updateSecretById, showAllSecretByUserId} from '@/network/secret'


import Chat from '@/components/Chat'
import CommentList from '@/components/CommentList'
// import Calendar from '@/components/Calendar'
import Calendar from '../components/Calendar.vue'



let uploadSuccessAll = 1

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
      // 秘密表单
      formSecret: {
        content: '',
        power: 1,
        userId: this.$user.userId
      },
      // 目标表单
      form: {
        name: '',
        content: 'el-icon-edit', // 图标
        startTime: '',
        endTime: '',
        repeats: []
      },
      formLabelWidth: '0',
      activeName: 'third',
      records: [],
      iconsVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      dialogVisibleAlbum: false,
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
      fileList: [], //相册上传图片
      fileListSecret: [], // 秘密上传图片
      currentSecret: {
        secretId: 0
      },
      // 计划rules
      rules :{
        name: [
            { required: true, message: '请输入目标名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请选择图标', trigger: 'blur' }
        ],
      },
      // 秘密rules
      secretRules: {
        content: [
            { required: true, message: '请输入文本', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5到 10 个字符', trigger: 'blur' }
        ]
      },
      accessToken: sessionStorage.getItem('accessToken')
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
      this.form.content = item
      this.iconsVisible = false
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log('图片移除', file, fileList)
      return
      if (index === 1) {  //删除秘密图片列表中某项
        console.log(file, this.fileListSecret)
      } else { // 删除相册图片列表中某项
        console.log(file, this.fileList)
      }
      
      // this.fileList = this.fileList.filter(item => {
      //   return item.uid !== file.uid
      // });
    },
    // 图片移除2
    handleRemove2 (file, index) {
      console.log('图片移除2', index, this.fileListSecret, file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 添加目标
    addPlan () {
      console.log('添加目标', this.$refs.targerForm)
      this.$refs.targerForm.validate((valid) => {
        console.log('验证是否符合规则', valid)
        if (valid) {
                  // 格式数据
          this.form.repeat = ''
          this.form.repeats.map(item => {
            this.form.repeat = this.form.repeat + item + ','
          })
          this.form.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.form.userId = this.$user.userId
          insertPlan(this.form).then(res => {
            console.log(res)
            if (res) {
              this.$message.success('添加目标成功')
              this.dialogFormVisible = false
              this.form =  {
                name: '',
                content: 'el-icon-edit', // 图标
                startTime: '',
                endTime: '',
                repeats: []
              }
            } else {
              this.$message.error('添加目标失败')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },

    // 添加秘密
    addSecret () {
      if (!this.formSecret.content || this.formSecret.content.length < 5) {
        this.$message.error('文本长度不能小于5')
        return 
      } 
      console.log('添加秘密')
      this.formSecret.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      insertSecret(this.formSecret).then(res => {
        console.log(res)
        if (res) {
          console.log('添加秘密成功，返回id' + res)
          this.$message.success('添加秘密成功')
          this.currentSecret.secretId = res
          // 上传图片
          this.$refs.uploadSecret.submit()
          // this.fileListSecret = []
          this.formSecret =  {
            content: '',
            power: 1,
            userId: this.$user.userId
          }
        } else {
          this.$message.error('添加秘密失败')
        }
      })
    },
    // 上传相册
    submitUpload () {
      console.log('this.fileList', this.fileList)
      this.$refs.upload.submit()
      // this.$refs.upload.clearFiles()
      this.$message.success('上传成功')
      // this.fileList = []
    },
    // // 上传成功
    uploadSuccess () {
      // :on-success="uploadSuccess"  应该添加在upload元素上
      // this.$message.success('上传成功')
      console.log('上传成功')
      let that = this
      // this.dialogVisibleAlbum = false
      setTimeout(() => {
        that.$refs.upload.clearFiles()
      }, 1000)
    },
    // 上传秘密成功后
    uploadSecretSuccess () {
      console.log('上传成功')
      let that = this
      if (uploadSuccessAll === 1) {
        uploadSuccessAll = 0
        setTimeout(() => {
          that.$refs.uploadSecret.clearFiles()
          uploadSuccessAll = 1
        }, 1000)
      }
    },
    uploadError () {
      this.$message.error('请上传图片')
    },
    // 上传秘密之前
    // beforeSecretUpload (file, fileList) {
    //   console.log('上传秘密之前', file, fileList)
    //   return false
    // }
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
