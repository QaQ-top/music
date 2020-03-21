<template>
    <div class="heiop">
        <div @click="noSetUp()">
            <my-prev-nav :tabRoutePath ='routePath'>
                <div slot='prev_center' class="music_name">
                    <span>{{getAudioData.title}}</span>
                </div>
                <span slot='prev_right' class="icon iconfont icon-diandiandianshu dian_part" @click.stop="setUps()"></span>
            </my-prev-nav>

            <!-- 背景虚化 -->
            <div class="partBoxBack">
                <img :src="getAudioData.img" alt="" @load="srcChange">
            </div>

            <div class="partBox" >
                
                <div class="albLrc">
                    <!-- 专辑封面 -->
                    <div class="albumImg" v-if="!isLrc" @mousedown="down" @mouseup="up">
                        <div>
                            <img :src="getAudioData.img" alt="" ref="albumImg">
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
                            <span class="iocn iconfont icon-step-backward" @click="LastSong()"></span>
                        </div>
                        <div class="playpase">
                            <span class="iocn iconfont icon-bofang" v-if="!getAudioData.play" @click="AudioPlay()"></span>
                            <span class="iocn iconfont icon-poweroff-circle-fill" v-if="getAudioData.play" @click="AudioPlay()"></span>
                        </div>
                        <div>
                            <span class="iocn iconfont icon-step-forward" @click="NextSong()"></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <!-- 设置 -->
        <div class="setUp" v-if="setUp">
            <!-- 开关静音 -->
            <div class="setList">
                <div>
                    静音
                </div>
                <div>
                    <el-switch
                    v-model="getAudioData.muted"
                    active-color="#3399FF"
                    inactive-color="#DDDDDD"
                    @change="muted()"
                    >
                    </el-switch>
                </div>
            </div>

            <div class="setList">
                <div>
                    单曲循环
                </div>
                <div>
                    <el-switch
                    v-model="getAudioData.loop"
                    active-color="#3399FF"
                    inactive-color="#DDDDDD"
                    @change="isLoop()"
                    >
                    </el-switch>
                </div>
            </div>
            <div class="setList">
                <div>
                    列表循环
                </div>
                <div>
                    <el-switch
                    v-model="getAudioState.randomPlay"
                    :disabled='getAudioState.disabled'
                    active-color="#3399FF"
                    inactive-color="#DDDDDD"
                    @change='isListFor()'
                    >
                    </el-switch>
                </div>
            </div>
               
            <!-- 音量控制 -->
            <div class="setList">
                <div>
                    音量大小：{{getAudioData.volume}}
                </div>
                <el-slider
                v-model='getAudioData.volume'
                @change="volume()"
                :show-tooltip='false'
                >
                </el-slider>
            </div>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev'
import { mapState,mapGetters,mapActions } from 'vuex';
export default {
    components:{
        myPrevNav
    },
    name:'particulars',
    data() {
        return {
            routePath:'',
            lrc:[],
            lrcDtate:[],
            isLrc:false,
            old:null,
            setUp:false,
        }
    },
    computed:{
        ...mapGetters(['getAudioData','getAudioState']),
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
            'toPlay',//点击歌词去到点击歌曲的地方播放
            'LastSong',//上一曲
            'NextSong',//下一曲
            'isListFor',
        ]),
        playDate(index){
            let data = this.lrcDate[index].split(':');
            let date = (parseInt(data[0])*60)+Number(data[1])
            console.log(this.lrc[index],this.lrcDate[index],date)
            this.toPlay(date)
        },
        //长按切换歌词和专辑封面
        down(){
            clearTimeout(this.old);
            this.old = setTimeout(()=>{
                this.isLrc = !this.isLrc
            },1000)
        },
        up(){
            clearTimeout(this.old);
        },

        //设置栏显示与关闭
        setUps(){
            this.setUp = !this.setUp;
        },
        noSetUp(){
            this.setUp = false;
        },
        srcChange(){ //确保图片为正方形
            let img = this.$refs.albumImg
            if(this.$route.name==='particulars'){
                img.style.height = `${img.width}px`
            }
        }
    },
    watch:{

    },
    activated(){
        this.setUp = false;
        this.routePath = this.$route.params.routePath;
        if(this.getAudioData.type==='new'){ //如果是新src 发送歌词请求
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
            let img = this.$refs.albumImg
            img.style.height = `${img.width}px`
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
        padding-top: 6rem;
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
    .partBoxBack img{
        height: 100%;
        margin-left: -35%;
        filter: blur(90px)
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
    .setUp{
        position: absolute;
        width: 40%;
        height: 50%;
        background-color: white;
        z-index: 9999;
        right: 0;
    }
    .setList{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 4rem;
    }
    .setList div:nth-child(1){
        text-align: left;
        width: 38%;
    }
    .setList div:nth-child(2){
        width: 58%;
        text-align: right;
    }
</style>