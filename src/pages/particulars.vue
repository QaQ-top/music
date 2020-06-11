<template>
    <div class="heiop">
        <div>
            <my-prev-nav :tabRoutePath ='routePath'>
                <div slot='prev_center' class="music_name">
                    <span>{{getAudioData.title}}</span>
                </div>
                <span slot='prev_right' class="icon iconfont icon-diandiandianshu dian_part" @click="noSetUp"></span>
            </my-prev-nav>

            <!-- 背景虚化 -->
            <div class="partBoxBack">
                <img :src="getAudioData.img" alt="">
            </div>

            <div class="partBox" >

                <div class="albLrc">
                    <!-- 专辑封面 -->
                    <div class="lyrc" ref="lyrc" @scroll="scroll">
                        <!-- 歌词 -->
                        <div v-for="(item, index) in lrc" :key="index" @click="playDate(index)" class="lyrcBox" :class="{color:playde(index)<=vtime&&vtime<playde(index+1)}"> <!-- -->
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
        <mt-popup
        v-model="setUp"
        position="right">
            <div class="mint-cell-title">
                <span>设置</span>
            </div>
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
            <div class="setList add" @touchstart="start" @touchend='end' :class="{addhover:hover}">
                添加到歌单
            </div>
        </mt-popup>

    </div>
</template>

<script>
import myPrevNav from '../components/back_prev'
import { mapState,mapGetters,mapActions } from 'vuex';
import { MessageBox } from 'mint-ui';

export default {
    components:{
        myPrevNav
    },
    name:'particulars',
    data() {
        return {
            routePath:'',
            lrc:[],
            lrcDate:[],
            isLrc:false,
            old:null,
            setUp:false,
            position:true,
            setTime:null,
            hover:false,
            songBox:false
        }
    },
    computed:{
        ...mapGetters(['getAudioData','getAudioState']),
        ...mapState(['songListData']),
        vtime(){
            return this.getAudioData.currentTime
        },
        newType(){
            return  this.getAudioData.type
        },
        curTimeMS(){
            let num = this.getAudioData.currentTime/60
            let second = parseInt(this.getAudioData.currentTime - (Math.floor(num)*60))
            return `${Math.floor(num)<10?`0${Math.floor(num)}`:Math.floor(num)}:${second<10?`0${second}`:second}`
        },
        durationMS(){
            let num = this.getAudioData.duration/60
            let minute,second;
            minute = Math.floor(num)<10?`0${Math.floor(num)}`:Math.floor(num);
            second = parseInt(this.getAudioData.duration - (Math.floor(num)*60))<10?`0${parseInt(this.getAudioData.duration - (Math.floor(num)*60))}`:parseInt(this.$store.state.audio.duration - (Math.floor(num)*60))
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
            'del',
            'add'
        ]),
        playde(index){
            if(this.lrcDate.length&&this.lrcDate[index]){
                let data = this.lrcDate[index].split(':');
                return (parseInt(data[0])*60)+Number(data[1])
            }
        },
        playDate(index){
            if(this.lrcDate.length){
                let data = this.lrcDate[index].split(':');
                let date = (parseInt(data[0])*60)+Number(data[1])
                this.toPlay(date)
            }
        },
        //设置栏显示与关闭
        noSetUp(){
            this.setUp = true;
        },
        ci(){
            this.$request.ci(this.getAudioData.id).then(res=>{
                if(res.hasOwnProperty('lrc')){
                    let lrcDate = res.lrc.lyric.replace(/[^\[(0-9:.)\]$]/g,'').split(/[\[\]]/); //将时间戳 提取  为数组
                    let lrc = res.lrc.lyric.replace(/[\[(0-9:.)]/g,'').split(']'); //将歌词提取 为数组
                    lrc.splice(0,1)
                    screen(lrcDate);
                    function dats(i){
                        let data = i.split(':');
                        return (parseInt(data[0])*60)+Number(data[1])
                    }
                    console.log(lrcDate)
                    for(var i = 0;i<lrcDate.length;i++){
                        if(i<lrcDate.length-1){
                            let a = dats(lrcDate[i])
                            let b = dats(lrcDate[i+1])
                            if(Math.abs(a-b)>100){
                                if(a<b){
                                    lrcDate.splice(i+1,1);
                                    lrc.splice(i+1,1)
                                    i--
                                }
                            }
                        }
                    }
                    console.log(lrcDate,this.lrcDate,this.lrcDate.length)
                    this.lrcDate.length = 0;
                    this.lrcDate.push(...lrcDate);
                    this.lrc.length = 0;
                    this.lrc = lrc;
                }else{
                    this.lrcDate.length = 0;
                    this.lrc.length = 0;
                    this.lrc .push('该歌曲没有歌词~')
                }
                function screen(array) {
                    array.forEach((item,index)=>{
                        if(item.length!==8){ //如果 item 不是时间戳 将其删除
                            array.splice(index,1)
                        }
                    });
                }
            })
        },
        scroll(ev){
            this.position = false;
            clearTimeout(this.setTime)
            this.setTime = setTimeout(()=>{
                this.position = true;
            },2500)
        },
        start(){
            this.hover = true;
        },
        end(){
            this.hover = false;
            this.setUp = false;
            let user = window.localStorage.getItem('user');
             if(user&&JSON.parse(user).userId){
                 this.$store.state.isSongBox = true;
                 this.songListData.songId.push(this.getAudioData.id);
             }else{
                 setTimeout(()=>{
                     window.history.back();
                     MessageBox.confirm('您还没有登录，是否前往登录？').then(action => {
                        this.$router.push({
                        path:'/login'
                        })
                    })
                 },100)
             }
        },
    },
    watch:{
        'newType':{
            handler:function () {
                if(this.getAudioData.type === 'new'){
                    this.ci()
                    this.getAudioData.type = 'used' //标记为 used
                }
            },
            deep:true
        },
        'vtime':{
            handler:function(){
                let lrc = this.$refs.lyrc
                let nodeArr = Array.from(lrc.children)
                // if(nodeArr.length<22) return
                nodeArr.map(i=>{
                    if(i.getAttribute('class').includes('color')){
                        if(i.offsetTop>lrc.offsetHeight/2&&this.position){
                            lrc.scrollTo({
                                top: i.offsetTop-lrc.offsetHeight/2,
                                behavior: "smooth"
                            })
                        }else if(this.position){
                            lrc.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }
                    }
                })
            },
            deep:true
        }
    },
    created(){
        this.setUp = false;
        if(this.getAudioData.type==='new'){ //如果是新src 发送歌词请求
            this.isLrc = false;
            this.ci();
            this.getAudioData.type = 'used' //标记为 used
        }

    },
    activated(){
        this.routePath = this.$route.params.routePath;
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
        display: block;
        width: 4rem;
        height: 4rem;
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
        z-index: 99;
    }
    .partBoxBack{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 6rem;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        -moz-filter:blur(50px);
        -o-filter: blur(50px);
        -ms-filter:blur(50px);
        -webkit-filter: blur(50px);
        filter: blur(50px)
    }
    .partBoxBack img{
        height: 100%;
        margin-left: -35%;
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
        z-index: 99;
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
        top: 10%;
        width: 100%;
        height: 75%;
        overflow: scroll;
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
        z-index: 99;
        right: 0;
    }
    .setList{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding-left: 1%;
        height: 5rem;
        background-color: white;
        font-size: 1.6rem;
        margin: 1rem 0;
    }
    .setList div:nth-child(1){
        text-align: left;
        width: 38%;
    }
    .setList div:nth-child(2){
        width: 58%;
        text-align: right;
    }
    .heiop >>> .mint-popup,.mint-popup-right {
        width:60%;
        height: 100%;
        background-color: rgb(250,250,250);
    }
    .mint-cell-title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 2rem;
        width: 100%;
        height: 6rem;
        font-size: 1.7rem;
        font-weight: bold;
        line-height: 4rem;
        text-align: left;
        box-sizing: border-box;
        padding: 1rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        background-color: white;
    }
    .heiop >>> .icon-icon-test{
        font-size: 2.5rem;
    }
    .lyrcBox{
        width: 70%;
        /* tab-size: ; */
        line-height: 2.5rem;
        font-size: 2rem;
        margin:  1rem auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .color{
        color: rgb(64,158,255);
    }
    .add{
        width: 70%;
        margin: 0 auto;
        background-color: rgb(64,158,255);
        transition: all ease-in-out 0.1s;
        color: #fff;
        border-radius: 1rem;
        font-size: 1.7rem;
    }
    .addhover{
        transform: scale(0.9);
    }

</style>
