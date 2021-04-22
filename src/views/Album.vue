<template>
  <div id="album">
    <top-navbar></top-navbar>
    <div id="wrap">
      <vue-waterfall-easy :imgsArr="imgsArr"  @scrollReachBottom="fetchImgsData" @click="clickFn"></vue-waterfall-easy>
    </div>
    <!-- <el-image 
      style="width: 100%"
      :src="currentImg" 
      :preview-src-list="imgList">
    </el-image> -->
    <el-dialog  :visible.sync="dialogVisible">
      <div class="wrapper" @click="close">
        <div class="left">
          <i class="el-icon-arrow-left" title="上一张" @click.stop="lastOne"></i>
        </div>
        <div class="center">
          <img v-if="currentIndex !== -1"  :src="imgsArr[currentIndex].src" alt=""  @click.stop="deleteItem">
        </div>
        <div class="right">
          <i class="el-icon-close close" title="关闭"></i>
          <i class="el-icon-arrow-right" title="下一张" @click.stop="nextOne"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import TopNavbar from "@/components/TopNavbar.vue"
import {showAllByUserId, deleteAlbumById} from "@/network/album"

export default {
  name: '',
  components: {
    vueWaterfallEasy,
    TopNavbar
  },
data () {
    return {
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片
      fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
      page: 1,
      rows: 16,
      total: 0,
      currentImg: {
        src: '',
        id: '',
      },
      currentIndex: -1,
      dialogVisible: false, //弹出框可见
      
    }
  },
　　methods: {

　　　fetchImgsData () {
        if (this.fetchImgsArr.length > 0) {
          this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
          if (this.fetchImgsArr.length === this.rows) {
            this.page ++
            showAllByUserId(this.$user.userId, this.page + 1, this.rows).then(res => {
              this.fetchImgsArr = res.data.map(item => {
                item.src = this.$baseImgUrl + item.path
                return item
              })
              console.log('获取图片', this.imgsArr, this.fetchImgsArr)
            })
          } else {
            this.fetchImgsArr = []
          }
        } else {
          this.$message.success('已经到底了')
        }
　　　},
    clickFn(event, { index, value }) {
        // 阻止a标签跳转
        event.preventDefault()
        // 只有当点击到图片时才进行操作
        console.log('点击到图片', index, value)
        this.currentImg = value
        this.dialogVisible = true
        this.currentIndex = index
        },
      // 点击模态框
      close() {
        this.dialogVisible = false
      },
      // 点击上一张
      lastOne () {
        if (this.currentIndex === 0) {
          this.$message('无上一张！')
          return
        }
        this.currentIndex --
        console.log('点击上一张')
      },
      // 点击下一张
      nextOne () {
        if (this.currentIndex === this.imgsArr.length - 1) {
          this.$message('无下一张！')
          return
        }
        this.currentIndex ++
        console.log('点击下一张')
      },
      // 点击删除图片
      deleteItem () {
        console.log('删除该图片')
        this.$confirm('是否删除这张图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteAlbumById(this.imgsArr[this.currentIndex].albumId).then(res => {
            if (res) {
              this.$message.success('删除成功!')
              this.dialogVisible = false
              this.imgsArr.splice(this.currentIndex, 1)
              this.currentIndex = -1
            } else {
              this.$message.error('删除失败!')
            }
          })
        }).catch(() => {})
      }
　　},
    created () {
      // this.imgsArr = this.initImgsArr(0, 40)       //初始化第一次（即页面加载完毕时）要加载的图片数据
      // this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
      showAllByUserId(this.$user.userId, this.page, this.rows).then(res => {
        this.total = res.total
        this.imgsArr = res.data
        this.imgsArr = res.data.map(item => {
          item.src = this.$baseImgUrl + item.path
          return item
        })
      })

      showAllByUserId(this.$user.userId, this.page + 1, this.rows).then(res => {
        // this.fetchImgsArr = res.data
        this.fetchImgsArr = res.data.map(item => {
          item.src = this.$baseImgUrl + item.path
          return item
        })
        console.log('获取图片', this.imgsArr, this.fetchImgsArr)
      })

　　},
    computed : {
      imgList () {
        return this.imgsArr && this.imgsArr.map((item) => this.$baseImgUrl + item.path)
      }
    }
}
</script>

<style scoped lang='scss'>
#album {
  width: 100%;
  height: 100%;
  // margin-top: 60px;
  // box-sizing: border-box;
}
#wrap {
  // margin-top: 60px;
  width: 100%;
  height: calc(100%);
}
.wrapper {
  width: 100%;
  height: 100%;
  font-size: 20px;
  .left, .right {
    float: left;
    width: 10%;
    height: 100%;
    // vertical-align: middle;
    position: relative;
    i {
      cursor: pointer;
      position: absolute;
      top: 50%;
      font-size: 25px;
      text-align: center;
      line-height: 40px;
      width: 40px;
      height: 40px;
      color: #eee;
      left: 50%;
      transform: translate(-50%);
      display: inline-block;
      background: #2f2f2f2a;
      border-radius: 50%;
    }
    .close {
      top: 10%;
    }
  }
  .center {
    float: left;
    width: 80%;
    // background: red;
    height: 100%;
    img {
      height: 100%;
      width: 100%;
      // object-fit: scale-down;
      object-fit: contain;
    }
  }
}
</style>
