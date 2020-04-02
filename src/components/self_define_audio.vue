<template>
    <div>
        <!-- //音频 -->
        <audio 
        :src='getAudioData.url'
        ref="audio" 
        :loop="getAudioData.loop"
        @timeupdate="time()" 
        @canplay='getDuration()'
        @error="error"
        @unhandledrejection='fun'
        >
        </audio>

        <div :class="{audioBox:isAudioBox,audioBox2:!isAudioBox,transition:true}" @click="particulars(routePath)" v-if="this.$route.name!=='login'&&this.$route.name!=='particulars'">
            
            <div class="audioDetail">
                <!-- 歌曲图片 名称 专辑名称 -->
                <div class="audioImg">
                    <img v-lazy="getAudioData.img" class="lazy">

                </div>
                <div class="audioTitle">
                    <p>{{getAudioData.title}}</p>
                    <p>{{getAudioData.albumName}}</p>
                </div>
                
            </div>
            
            <div class="pro_play_pause">
                <span class="icon iconfont icon-caret-right play" @click.stop="AudioPlay()" v-if="!getAudioData.play">
                </span>
                <span class="icon iconfont icon-iconstop pause" @click.stop="AudioPlay()" v-if="getAudioData.play">
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>

import { mapActions,mapGetters,mapMutations,mapState } from 'vuex'
export default {
    name:"myAudio",
    data () {
        return {
           isAudioBox : true,
           routePath:this.$route.path //获取默认路径
        }
    },
    watch: {
        '$route':{
            handler:function(to,from){
                let ret = ['musicG','rec','dynamic','mine']
                this.isAudioBox = ret.includes(this.$route.name)
                this.routePath = this.$route.path //获取当前页面路径
            }
        }
    },
    computed:{
        ...mapGetters([
        'getAudioData'
        ]),
        
    },
    methods: {
        ...mapActions([
            'getDuration', //获取duration，默认获取音频总时间解决bug
            'AudioPlay', //播放暂停
            'time', //获取当前时间，和已播放百分比
            'particulars',//进入详情
        ]),
        error(error){
            this.$request.song(this.getAudioData.id).then(res=>{
                this.getAudioData.url = res.data[0].url; //将audio的src替换
            })
        },
        fun(error){
            console.log(error)
        }
    },
    mounted() {
        this.getAudioData.dom = this.$refs.audio;
        this.$store.commit('volume');
        this.$store.commit('muted');
    }
}
</script>

<style scoped>
    
    .audioBox{
        width: 100%;
        height:5rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        z-index: 100;
        position: fixed;
        background: white;
        bottom: 6.2rem;
    }
    .audioBox2{
        width: 100%;
        height:6rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        z-index: 100;
        position: fixed;
        background: white;
        bottom: -1px;
    }
    .pro_play_pause{
        position: absolute;
        right: 13.2%;
        top: 16.7%;
    }
    .play{
        position: absolute;
        right: 5.5px;
        top:7px;
        color:rgb(64,158,255);
        font-size: 2rem
    }
    .pause{
        position: absolute;
        right: 6.6px;
        top:7px;
        color:rgb(64,158,255);
        font-size: 2rem
    }
    .transition{
        transition: all ease 0.2s;
    }
    .audioImg{
        width: 5.5rem;
        height: 5.5rem;
        border-radius: 50%;
        position: relative;
        left: 0.7rem;
        bottom: 0.5rem;
        box-shadow: 0 -10px 10px -14px #000;
        background-color: white;
        overflow: hidden;
    }
    .audioImg img{
        width: 5.5rem;
        height: 5.5rem;
    }
    .audioDetail{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .audioTitle{
        height:100%;
        width: 60%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
    }
    .audioTitle>p:nth-child(1){
        font-size: 1.6rem;
        text-align: left;
        margin-top: 0.3rem;
        padding-left: 1.7rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .audioTitle>p:nth-child(2){
        font-size: 1rem;
        color: rgb(199, 199, 199);
        text-align: left;
        padding-left: 1.7rem;
        margin-bottom: 0.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
</style>