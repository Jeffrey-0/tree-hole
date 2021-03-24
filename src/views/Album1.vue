<template>
  <div id="album">
    <img-item :waterfallData="waterfallData"></img-item>
  </div>
</template>

<script>
// import ImgItem from '@/components/ImgItem.vue'
import ImgItem from '@/components/ImgItem.vue'

export default {
  name: '',
  components: {
    ImgItem
  },
  data () {
    return {
      waterfallData:[
      {
      e_img: "http://xfz.zone/images/avatar.png",
      // 图片
      e_intro: "描述信息1",
      u_img: "http://xfz.zone/images/avatar.png",
      // 标记图
      u_name: "开发者"},
 {
      e_img: "http://xfz.zone/assets/img/blog/helloworld-1.jpg",
      e_intro: "描述信息2",
      u_img: "http://xfz.zone/assets/img/blog/helloworld-1.jpg",
      u_name: "开发者"}
   ]
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
#album {
  width: 100%;
}
</style>
