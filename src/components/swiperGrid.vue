<template>
  <div class="dailySongSheet">
      <span>{{columnType}}</span>
      <swiper ref='myGrid' :options='optionsSwiper' class="grid">
          <swiper-slide v-for="(item, index) in imgArray" :key="index">
              <div class="boxImgTxt">
                  <div class="palyVolume">
                      <span class="iconfont icon-z"></span>
                      <span>{{item.playCount}}</span>
                  </div>
                  <img :src="item.picUrl" alt="">
                  <p>{{item.name}}</p>
              </div>
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
        // console.log(this.swiper)
    },
}

</script>

<style scoped>
    .dailySongSheet{
        text-align: left;
        width: 96%;
        margin: 0 auto;
        padding:2rem 0 2rem 0;
    }
    .dailySongSheet>span{
        font-size: 1.8rem;
        line-height: 3rem;
        font-weight: bold;
    }
    .boxImgTxt{
        width: 100%;
        position: relative;
    }
    .boxImgTxt img{
        width: 100%;
        border-radius: 1.5rem;
    }
    .boxImgTxt p{
        font-size: 1rem;
    }
    .palyVolume{
        position: absolute;
        right: 0.5rem;
        top:0;
        color: white;
        font-size: 1rem;
    }
</style>