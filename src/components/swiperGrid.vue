<template>
  <div>
      <swiper ref='myGrid' :options='optionsSwiper' class="grid">
          <swiper-slide v-for="(item, index) in imgArray" :key="index">
              I'm Slide {{item}}
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
export default {
    name:'grid',
    data() {
        return {
            optionsSwiper:{
                slidesPerView:this.column,//一行显示3个
                slidesPerColumn: this.row,//显示2行
                spaceBetween : this.bet, //空白
                freeMode : this.free, //free模式，slide会根据惯性滑动可能不止一格且不会贴合
                freeModeMomentum : true,
                freeModeMomentumRatio : 0.5,
            }
        }
    },
    props:{
        imgArray:{
            type:Array,
            default:[]
        },
        row:{
            type:Number,
            default:2
        },
        column:{
            type:Number,
            default:3
        },
        bet:{
            type:Number,
            default:20
        },
        free:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        swiper(){
            return this.$refs.myGrid.swiper
        }
    },
    mounted() {
        console.log(this.swiper)
    },
    //pull！
}
</script>

<style>

</style>
