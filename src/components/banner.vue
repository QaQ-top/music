<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in bannerArray" :key="index" @touchstart.native="startDev" @touchmove.native='move' @touchend.native="deilt(item)">
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
        },
        moveing:false,
        strat:null,
      }
    },
    props:{
        bannerArray:{
            type:Array,
            default:[1,2,3],
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    watch:{
      bannerArray:{
        handler:function () {
          this.bannerArray.map((i,n)=>{
            if(i.url){
              this.bannerArray.splice(n,1)
            }
          })
          deep:true;
        }
      }
    },
    methods: {
      move(){
        this.moveing = true;
      },
      startDev(){
        this.strat = new Date()
      },
      deilt(item){
        let date = new Date()
        if(date-this.strat<200&&!this.moveing){
          this.$emit('bannerDst',item)
        }else{
          this.moveing = false
        }
      }
    },
    created(){
      
    },
    mounted() {
      // console.log(this.bannerArray)
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(0, 1000, false)
    }
  }
</script>

<style scoped>
  .swiper{
    padding-top: 1rem;
  }
  .img{
    width: 96%;
    height: 20rem;
    margin: 0 auto;
    position: relative;
    font-size: 0;
    overflow: hidden;
    border-radius: 1rem;
    display: flex;
    align-items: flex-end;
  }
  .img img{
    height:120%;
    display: flex;
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
    border-radius: 1rem 0 1rem 0
  }
</style>