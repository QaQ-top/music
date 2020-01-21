<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in imgArray" :key="index">
        I'm Slide {{item}}
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <!-- 上一页 -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- 下一页 -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- 进度条 -->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</template>

<script>
  export default {
    name: 'mySwiper', //name不能为swiper
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          pagination:{
              el:'.swiper-pagination',
              clickable:true
          }
        }
      }
    },
    props:{
        imgArray:{
            type:Array,
            default:[]
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(0, 1000, false)
    }
  }
</script>

<style>

</style>