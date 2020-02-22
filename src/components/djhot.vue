<template>
    <div class="dailySongSheet">
         <span>{{columnType}}</span>
        <swiper ref='djhot' :options='optionsSwiper' class="grid">
            <swiper-slide v-for="(item, index) in imgArray" :key="index">
                <div class="boxImgTxt">
                  <img :src="item.picUrl" alt="">
                  <p>{{item.copywriter}}</p>
              </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
    name:'djhot',
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
    computed:{
        swiper(){
            return this.$refs.djhot.swiper
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
        },
    },
    mounted(){
        // console.log(this.swiper,this.imgArray)
    },
}
</script>

<style scoped>
    .dailySongSheet{
        text-align: left;
        width: 96%;
        margin: 2rem auto
    }
    .dailySongSheet>span{
        font-size: 2rem;
        line-height: 2.5rem;
    }
    .boxImgTxt{
        width: 100%;
        position: relative;
    }
    .boxImgTxt img{
        width: 100%;
        border-radius: 0.5rem;
    }
    .boxImgTxt p{
        font-size: 1rem;
    }
</style>