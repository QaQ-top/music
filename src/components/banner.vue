<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in bannerArray" :key="index">
      <div class="img">
        <img :src="item.pic" alt="">
        <div>
          {{item.typeTitle}}
        </div>
      </div>
       
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
    name: 'banner', //name不能为swiper
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
        bannerArray:{
            type:Array,
            default:[1,2,3]
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

<style scoped>
  .img{
    width: 96%;
    margin: 0 auto;
    position: relative;
    font-size: 0;
  }
  .img img{
    width: 100%;
    border-radius: 0.5rem;
  }
  .img div{
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    color: white;
    background-color:#007aff;
    padding: 1%;
    font-size: 1rem;
    border-radius: 0.5rem 0 0.5rem 0
  }
</style>