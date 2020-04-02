<template>
  <div class="dailySongSheet">
      <span>{{columnType}}</span>
      <swiper ref='recommendNewSong' :options='optionsSwiper' class="grid">
          <swiper-slide v-for="(item, index) in imgArray" :key="index" @touchstart.native="startDev" @touchmove.native='move' @touchend.native="song(item.id,index)">
              <div class="song">
                    <img v-lazy="item.picUrl" class="lazy">
                    <div class="txt">
                        <p>{{arr[index].name}}</p>
                        <p>{{arr[index].album.albumName}}</p>
                    </div>
                    <span class="icon iconfont icon-caret-right play" @touchstart.stop="play(item.id,index)" v-if="!audio.play||item.id!==audio.id">
                    </span>
                    <span class="icon iconfont icon-iconstop pause" @touchstart.stop="play(item.id,index)" v-if="audio.play&&item.id===audio.id">
                    </span>
              </div>
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
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
            },
            strat:null,
            moveing:false,
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
            return this.$refs.recommendNewSong.swiper
        },
        ...mapState(['audio'])
    },
    methods:{
        move(){
            this.moveing = true;
        },
        startDev(){
            this.strat = new Date()
        },
        ...mapActions(['newSrc','particulars','AudioPlay']),
        song(id,index){ //点击触发
        	let date = new Date()
            if(date-this.strat<200&&!this.moveing){
                this.audio.arr.length = 0
                this.audio.arr.push(...this.arr)
                this.newSrc({
                    id,
                    album:{
                        albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                        albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                    }
                })
                this.particulars('/musicG')
            }else{
                this.moveing = false
            }
        },
        play(id,index){
            if(id===this.audio.id){
                this.AudioPlay()
            }else{
                this.audio.arr.length = 0
                this.audio.arr.push(...this.arr)
                this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
            }
        }
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
        margin: 0 auto;
        padding:2rem 0 2rem 0;
    }
    .dailySongSheet>span{
        font-size: 1.8rem;
        line-height: 3rem;
        font-weight: bold;
    }
    .song{
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0;
    }
    .song img{
        width:13%;
        border-radius: 1rem;
    }
    .play{
        color:rgb(64,158,255);
        font-size: 2rem
    }
    .pause{
        color:rgb(64,158,255);
        font-size: 2rem
    }
    .song .txt{
        width: 80%;
    }
    .txt p:nth-child(1){
        font-size: 1.7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
    }
    .txt p:nth-child(2){
        font-size: 1.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #888;
    }
</style>