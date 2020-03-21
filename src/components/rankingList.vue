<template>
  <div class="dailySongSheet">
      <span>{{columnType}}</span>
      <swiper ref='rankingList' :options='optionsSwiper' class="grid">
          <swiper-slide>
              <div class="rank">
                  <h3>原创歌曲榜</h3>
                  <div v-for="(item, index) in original" :key="index">
                      <img :src="item.al.picUrl" alt="">
                      <div class="txt">
                          <span>{{index+1}}</span>
                          <div>
                              {{item.name}}
                          </div>
                      </div>
                  </div>
              </div>
          </swiper-slide>
          <swiper-slide>
               <div class="rank">
                  <h3>飙升榜</h3>
                  <div v-for="(item, index) in soar" :key="index">
                      <img :src="item.al.picUrl" alt="">
                      <div class="txt">
                          <span>{{index+1}}</span>
                          <div>
                              {{item.name}}
                          </div>
                      </div>
                  </div>
              </div>
          </swiper-slide>
          <swiper-slide>
               <div class="rank">
                  <h3>电音榜</h3>
                  <div v-for="(item, index) in electricSound" :key="index">
                      <img :src="item.al.picUrl" alt="">
                      <div class="txt">
                          <span>{{index+1}}</span>
                          <div>
                              {{item.name}}
                          </div>
                      </div>
                  </div>
              </div>
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
export default {
    name:'rankingList',
    data() {
        return {
            arr:[1,1,1,1,1,1],
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
        },
        original:{
            type:Array,
            default:[1,2,3]
        },
        soar:{
            type:Array,
            default:[1,2,3]
        },
        electricSound:{
            type:Array,
            default:[1,2,3]
        }
    },
    computed:{
        swiper(){
            return this.$refs.rankingList.swiper
        }
    },
    methods:{

    },
    watch:{
        
    },
    mounted() {
        
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
    .rank img{
        width: 15%;
        border-radius: 1rem;
    }
    .rank > div{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 1%;
    }
    .rank > h3{
        font-size: 1.2rem;
    }
    .txt{
        width: 80%;
        font-size: 1rem;
    }
    .txt span{
        font-size: 1.8rem;
        font-weight: bold;
    }
</style>