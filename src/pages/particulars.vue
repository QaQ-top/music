<template>
    <div class="heiop">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="music_name">
                <span>{{musicName}}</span>
            </div>
            <span slot='prev_right' class="icon iconfont icon-diandiandianshu dian_part"></span>
        </my-prev-nav>

        <div class="partBoxBack" :style="backImg">

        </div>

        <div class="partBox" >
            
            <div class="albLrc">
                <div class="albumImg" v-if="!isLrc" @mousedown="down" @mouseup="up">
                    <div>
                        <img :src="getAudioData.img" alt="">
                    </div>
                </div>
                <div class="lyrc" v-if="isLrc">
                    <!-- 歌词 -->
                    <div v-for="(item, index) in lrc" :key="index" @click="playDate(index)" @mousedown="down" @mouseup="up">
                        {{item}}
                    </div>
                </div>
            </div>

            <div class="bomt">
                <div class="slider">
                    <div class="ms">{{curTimeMS}}</div>
                    <!-- 进度条 -->
                    <div class="block">
                        <el-slider 
                        v-model="getAudioData.percent" 
                        @change="slider()" 
                        :show-tooltip='false'
                        >
                        </el-slider>
                    </div>
                    <div class="ms">{{durationMS}}</div>
                </div>
                <div class="control">
                    <div>
                        <span class="iocn iconfont icon-step-backward"></span>
                    </div>
                    <div class="playpase">
                        <span class="iocn iconfont icon-bofang" v-if="!getAudioData.play" @click.stop="AudioPlay()"></span>
                        <span class="iocn iconfont icon-poweroff-circle-fill" v-if="getAudioData.play" @click.stop="AudioPlay()"></span>
                    </div>
                    <div>
                        <span class="iocn iconfont icon-step-forward"></span>
                    </div>
                </div>
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
        </div>

    </div>
</template>

<script>
import myPrevNav from '../components/back_prev'
import { mapGetters,mapActions } from 'vuex';
export default {
    components:{
        myPrevNav
    },
    name:'particulars',
    data() {
        return {
            musicName:this.$store.state.audio.title,
            routePath:'',
            lrc:[],
            lrcDtate:[],
            backImg:{
                'background-image':`url(${this.$store.state.audio.img})`,
                'background-repeat':'no-repeat',
                'background-size': 'cover',
                'background-position':'center',
                'filter': 'blur(120px)'
            },
            isLrc:false,
            old:null
        }
    },
    computed:{
        ...mapGetters(['getAudioData']),
        curTimeMS(){
            let num = this.$store.state.audio.currentTime/60
            let second = parseInt(this.$store.state.audio.currentTime - (Math.floor(num)*60))
            return `${Math.floor(num)<10?`0${Math.floor(num)}`:Math.floor(num)}:${second<10?`0${second}`:second}`
        },
        durationMS(){
            let num = this.$store.state.audio.duration/60
            let minute,second;
            minute = Math.floor(num)<10?`0${Math.floor(num)}`:Math.floor(num);
            second = parseInt(this.$store.state.audio.duration - (Math.floor(num)*60))<10?`0${parseInt(this.$store.state.audio.duration - (Math.floor(num)*60))}`:parseInt(this.$store.state.audio.duration - (Math.floor(num)*60))
            return `${minute}:${second}`
        }
    },
    methods:{
         ...mapActions([
            'AudioPlay', //播放暂停
            'time', //获取当前时间，和已播放百分比
            'muted', //是否静音
            'slider', //点击进度条，播放
            'isLoop', //是否循环播放
            'volume',//音量大小调节,
            'toPlay'
        ]),
        playDate(index){
            let data = this.lrcDate[index].split(':');
            let date = (parseInt(data[0])*60)+Number(data[1])
            console.log(this.lrc[index],this.lrcDate[index],date)
            this.toPlay(date)
        },
        down(){
            clearTimeout(this.old);
            this.old = setTimeout(()=>{
                this.isLrc = !this.isLrc
            },1000)
        },
        up(){
            clearTimeout(this.old);
        }
    },
    watch:{
        
    },
    mounted() {
        
    },
    activated(){
        this.backImg = {
                'background-image':`url(${this.$store.state.audio.img})`,
                'background-repeat':'no-repeat',
                'background-size': 'cover',
                'background-position':'center',
                'filter': 'blur(120px)'
            }
        this.musicName = this.$store.state.audio.title
        this.routePath = this.$route.params.routePath;
        if(this.getAudioData.type==='new'){ //如果是新src 发送歌词请求
            console.log(this.getAudioData.type)
            this.$request.ci(this.$store.state.audio.id).then(res=>{
                let lrcDate = res.lrc.lyric.replace(/[^\[(0-9:.)\]$]/g,'').split(/[\[\]]/); //将时间戳 提取  为数组
                let lrc = res.lrc.lyric.replace(/[\[(0-9:.)]/g,'').split(']'); //将歌词提取 为数组
                lrc.splice(0,1)
                screen(lrcDate);
                this.lrcDate = lrcDate;
                this.lrc = lrc;
                this.isLrc = false;
                function screen(array) {
                    array.forEach((item,index)=>{
                        if(item.length!==8){ //如果 item 不是时间戳 将其删除
                            array.splice(index,1)
                        }
                    });
                }
            })
            this.getAudioData.type = 'used' //标记为 used 
        }  
    }
}
</script>

<style scoped>
    .heiop{
        color: #000;
    }
    .music_name{
        width: 65%;
        font-size: 1.5rem;
        text-align: left;
        padding-left: 1%;
        padding-right: 1%;
        white-space: nowrap;
        overflow: hidden;
    }
    .dian_part{
        font-size: 4.1rem
    }
    .partBox{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 4rem;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
    }
    .partBoxBack{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 4rem;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
    }
    .albumImg{
        padding: 28% 0;
    }
    .albumImg img{
        width: 75%;
        border-radius: 50%;
        box-shadow: 0 0 1rem -1px #fff;
    }
    .bomt{
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 999;
        background-color: white
    }
    .ms{
        font-size: 1.25rem
    }
    .slider{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .block{
        width: 70%;
    }
    .lyrc{
        position: absolute;
        width: 100%;
        height: 75%;
        overflow: scroll;
    }
    .lyrc div {
        height: 3rem;
        line-height: 3rem;
        font-size: 2rem
    }
    .control{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 6rem;
    }
    .control span{
        font-size: 3rem
    }
    .playpase span{
        font-size: 4.5rem
    }
</style>