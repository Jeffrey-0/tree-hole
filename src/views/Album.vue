<template>
  <div id="album">
    <top-navbar></top-navbar>
    <div id="wrap">
      <vue-waterfall-easy :imgsArr="imgsArr"  @scrollReachBottom="fetchImgsData"></vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import TopNavbar from "@/components/TopNavbar.vue"

export default {
  name: '',
  components: {
    vueWaterfallEasy,
    TopNavbar
  },
data () {
    return {
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: []     //存放每次滚动时下一批要加载的图片的数组
    }
  },
　　methods: {
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
　　created () {
　　　　this.imgsArr = this.initImgsArr(0, 40)       //初始化第一次（即页面加载完毕时）要加载的图片数据
　　　　this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
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
