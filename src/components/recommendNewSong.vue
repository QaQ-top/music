<template>
  <div class="dailySongSheet">
      <span>{{columnType}}</span>
      <swiper ref='myGrid' :options='optionsSwiper' class="grid">
          <swiper-slide v-for="(item, index) in imgArray" :key="index">
              
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
export default {
    name:'recommendNewSong',
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
            default:[1,2,3]
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
        },
        columnType:{
            type:String,
            default:''
        }
    },
    computed:{
        swiper(){
            return this.$refs.myGrid.swiper
        }
    },
    mounted() {

    },
}
</script>

<style scoped>
    .dailySongSheet{
        text-align: left;
        width: 96%;
        margin: 1rem auto
    }
    .dailySongSheet>span{
        font-size: 2rem;
        line-height: 2.5rem;
    }
    
</style>