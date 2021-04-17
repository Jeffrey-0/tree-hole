<template>
  <div id="album">
    <top-navbar></top-navbar>
    <div id="wrap">
      <vue-waterfall-easy :imgsArr="imgsArr"  @scrollReachBottom="fetchImgsData" @click="clickFn"></vue-waterfall-easy>
    </div>
    <el-image 
      style="width: 100%"
      :src="currentImg" 
      :preview-src-list="imgList">
    </el-image>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import TopNavbar from "@/components/TopNavbar.vue"
import {showAllByUserId} from "@/network/album"

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
      currentImg: ''
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
        this.currentImg = value.src
    //     if (event.target.tagName.toLowerCase() == 'img') {
    //       console.log('img clicked',index, value);
    //       this.dialogVisible = true;
    //       this.imgIndex = index;
    //       this.srcList = value;
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
</style>
