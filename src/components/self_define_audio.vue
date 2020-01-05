<template>
    <div>
        <!-- //音频 -->
        <audio 
        :src='getAudioData.url'
        ref="audio" 
        :loop="getAudioData.loop"
        @timeupdate="time()" 
        @canplay='getDuration()'
        >
        </audio>


        <!-- 进度条 -->
        <div class="block">
            <el-slider 
            v-model="getAudioData.percent" 
            @change="slider()" 
            :show-tooltip='false'
            >
            </el-slider>
        </div>

        <!-- 开关静音 -->
        <el-switch
        v-model="getAudioData.muted"
        active-color="#ff4949"
        inactive-color="#13ce66"
        @change="muted()"
        >
        </el-switch>



        <button @click="isLoop()">
            循环播放
        </button>
        

        <!-- 音量控制 -->
        <el-slider
        v-model='getAudioData.volume'
        vertical
        height="100px"
        tooltip-class="none"
        @change="volume()"
        :show-tooltip='false'
        >
        </el-slider>

        <div :class="{audioBox:isAudioBox,audioBox2:!isAudioBox,transition:true}" @click="particulars(routeName)" v-if="this.$route.name!=='particulars'">
            
            <div class="audioDetail">
                <div class="audioImg">
                    <img :src="getAudioData.img" alt="">
                </div>
                <div class="audioTitle">
                    <p>{{getAudioData.title}}</p>
                    <p>{{getAudioData.albumName}}</p>
                </div>
                
            </div>
            
            <div class="pro_play_pause">
                <!-- 环状进度条 -->
                <el-progress 
                type="circle" 
                :percentage="getAudioData.percent"
                :text-inside="true"
                :width="30"
                :stroke-width="2"
                >
                </el-progress>
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
           refs:this.$refs,
           routeName:this.$route.name
        }
    },
    watch: {
        '$route'(){
            let ret = ['musicG','recommend','dynamic','mine']
            this.isAudioBox = ret.includes(this.$route.name)
            this.routeName = this.$route.path
        }
    },
    computed:mapGetters([
        'getAudioData'
    ]),
    methods: {
        ...mapActions([
            'getDuration', //获取duration，默认获取音频总时间解决bug
            'AudioPlay', //播放暂停
            'time', //获取当前时间，和已播放百分比
            'muted', //是否静音
            'slider', //点击进度条，播放
            'isLoop', //是否循环播放
            'volume',//音量大小调节
            'particulars',//进入详情
        ]),
        
    },
    mounted() {
        this.getAudioData.dom = this.$refs.audio;
    },
}
</script>

<style>
    
    .audioBox{
        width: 100%;
        height:3.8rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        z-index: 100;
        position: fixed;
        background: white;
        bottom: 4.3rem;
    }
    .audioBox2{
        width: 100%;
        height:3.8rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        z-index: 100;
        position: fixed;
        background: white;
        bottom: 0;
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
    }
    .pause{
        position: absolute;
        right: 6.6px;
        top:7px;
        color:rgb(64,158,255);
    }
    .transition{
        transition: all ease 0.2s;
    }
    .audioImg img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        position: relative;
        left: 0.7rem;
        bottom: 0.5rem

    }
    .audioDetail{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .audioTitle{
        height:100%;
        width: 17rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
    }
    .audioTitle>p:nth-child(1){
        font-size: 12px;
        text-align: left;
        margin-top: 0.3rem;
        padding-left: 1.7rem
    }
    .audioTitle>p:nth-child(2){
        font-size: 10px;
        color: rgb(199, 199, 199);
        text-align: left;
        margin-bottom: 0.3rem;
        transform: scale(0.8);
    }
</style>