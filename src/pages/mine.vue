<template>
    <div>
        <top-nav txt='我的'>
            <my-search txt='搜索' slot="cun"></my-search>
            <audio-list slot="icon">
            </audio-list>
        </top-nav>
        <div class="mine">
            <div class="user">
                <img :src="img" alt="" v-if="isImg" class="avatar">
                <div class="icon iconfont icon-wode" v-if="!isImg"></div>
                <div class="name">
                    {{name}}
                </div>
                <div @click="login" v-if="!isLogin">
                    立即登录
                </div>
                <div @click="logout" v-if="isLogin">
                    切换账号
                </div>
            </div>
            <mine-list>
            </mine-list>
        </div>
        <div class="myMusic">
            <h2>我的音乐</h2>
            <div>
                <div class="love">
                    <span class="iconfont icon-aixin">

                    </span>
                    我喜欢的音乐
                </div>
                <div class="bd">
                    <span class="iconfont icon-download">

                    </span>
                    本地音乐
                </div>
            </div>
            <h2>最近播放</h2>
            <div class="zjPaly">
                <img :src="audio.img" alt="">
                <div>
                    <p>全部已播放歌曲</p>
                    <p>{{audioState.alreadyPlay.length}}首</p>
                </div>
            </div>

            <my-song-list :newBuilb='newbuild' :collEction='collection'>
            
            </my-song-list>
        </div>
        
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import mineList from '../components/mineList'
import {mapState} from 'vuex';
import mySongList from '../components/mySongList';
import audioList from '../components/audioList'
export default {
    name:"mine",
    data () {
        return {
            img:null,
            name:null,
            isImg:null,
            isLogin:null,
            ilikeIt:{},
            newbuild:[],
            collection:[]
        }
    },
    components: {
        topNav,
        mySearch,
        mineList,
        mySongList,
        audioList
    },
    computed:{
       ...mapState(['audio','audioState'])
    },
    methods:{
        login(){
            this.$router.push({
                path:'/login'
            })
        },
        logout(){
            this.$request.logout().then(res=>{
                if(res.code===200){
                this.setCookie('MUSIC_U',null,-1)
                let local = window.localStorage;
                    let str = JSON.stringify({
                        name:'',
                        userId:'',
                        avatarUrl:'',
                        bgUrl:'',
                        token:''
                    })
                    local.setItem('user',str)
                    this.$router.push({
                        path:'/login'
                    })
                }
            })            
        },  
    },
    activated(){ 
        let loacl = window.localStorage;
        let user = JSON.parse(loacl.getItem('user'));
        this.img = user.avatarUrl
        if(user.name){
            this.name = user.name;
            this.isLogin = true;
            this.isImg = true;
            this.$request.usePlaylist(user.userId).then(res=>{  //获取用户歌单
                let arr = res.playlist;
                this.ilikeIt = arr.slice(0,1)[0]  //数组中第一个对象 永远为我喜欢的音乐
                arr.splice(0,1)
                this.collection = arr.filter(item => {
                    return item.ordered===true;  //ordered 为 true  收藏歌单
                });
                this.newbuild = arr.filter(item => {
                    return item.ordered===false; //ordered 为 false  新键歌单
                })
                // console.log(this.ilikeIt,this.collection,this.newbuild)
            })
        }else{
            this.name = '您还没有登录~';
            this.isLogin = false;
            this.isImg = false;
            this.ilikeIt = {};
            this.collection = [];
            this.newbuild = []
        };
        
    }
}
</script>

<style scoped>
    .mine{
        background-color:  #3e9cff;
        color: white;
        height: 30rem;
    }
    .mine>div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 96%;
        height: 7rem;
        margin: 0 auto;
    }
    .icon-wode{
        font-size: 5rem
    }
    .name{
        width: 65%;
        text-align: left;
    }
    .myMusic{
        background-color: white;
        margin-top:-14rem;
        border-radius: 3rem 3rem 0 0;
        /* height: 30rem; */
    }
    .user{
        padding: 1rem 0 0 0;
    }
    .avatar{
        height:100%;
        border-radius: 50%;
    }
    .myMusic h2 {
        font-size: 1.6rem;
        line-height: 4rem;
        text-align: left;
        padding: 2rem 0 0 2rem;
    }
    .myMusic>div:nth-child(2){
        display: flex;
        justify-content: space-around;
    }
    .bd,.love{
        width: 45%;
        margin: 0 auto;
        background-color: #f0f0f0;
        border-radius: 2rem;
        height: 15rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        color: #000;
        font-size: 1rem;
    }
    .icon-download,.icon-aixin{
        color: rgb(224, 73, 73);
        font-size: 4rem;
    }
    .zjPaly{
        width: 96%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
    }
    .zjPaly img{
        width: 16%;
        border-radius: 1rem;
    }
    .zjPaly div{
        width: 80%;
        text-align: left;

    }
</style>