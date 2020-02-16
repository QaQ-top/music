<template>
  <div class="dailySongSheet">
      <span>{{columnType}}</span>
      <swiper ref='myGrid' :options='optionsSwiper' class="grid">
          <swiper-slide v-for="(item, index) in imgArray" :key="index">
              <div class="song">
                  <img :src="item.picUrl" alt="">
                  <div class="txt">
                      <p>{{arr[index].name}}</p>
                      <p>{{arr[index].album.albumName}}</p>
                  </div>
                  <span class="icon iconfont icon-caret-right play"></span>
              </div>
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
export default {
    name:'recommendNewSong',
    data() {
        return {
            arr:[],
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
    methods:{

    },
    watch:{
        imgArray(to,from){
            let arr = []
            this.imgArray.map(i=>{
                arr.push(i.song)
            })
            this.SongArray(arr,this.arr);
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
        margin: 2rem auto
    }
    .dailySongSheet>span{
        font-size: 2rem;
        line-height: 2.5rem;
    }
    .song{
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0;
    }
    .song img{
        width:13%;
        border-radius: 0.5rem;
    }
    .play{
        color:rgb(64,158,255);
        font-size: 2rem
    }
    .song .txt{
        width: 80%;
    }
    .txt p:nth-child(1){
        font-size: 1.8rem;
        font-weight: bold;
    }
    .txt p:nth-child(2){
        font-size: 0.8rem
    }
</style>