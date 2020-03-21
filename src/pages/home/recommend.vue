<template>
    <div class="box">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>每日推荐</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div v-if="isLogin">
            <div class="imgBox">
                <img v-lazy="imgBack">
            </div>
            <div class="songBox">
                <div v-for="(item, index) in song.details" :key="index" class="song" @click="songPaly(index)" :class="{isBule:item.id===stroeAudio.id}">
                    <img v-lazy="item.album.blurPicUrl">
                    <div class="txt">
                        <p>{{item.name}}</p>
                        <p>{{item.artists[0].name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isLogin">
            <div class="NotLoggedIn">
                <span class="iconfont icon-weidenglu-touxiang"></span>
                <p>您还没有登录~</p>
                <div @click="login">去登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import {mapState,mapActions} from 'vuex'
import myPrevNav from '../../components/back_prev'
export default {
    name:'red',
    data(){
        return {
            song:{
                data:[],
                details:[],
            },
            routePath:null,
            imgBack:'',
            messBox:false, //是否已经进入过页面
            isLogin:true
        }
    },
    components:{
        myPrevNav
    },
    computed:{
        ...mapState({
            stroeAudio:'audio'
        })
    },
    methods: {
        ...mapActions(['newSrc']),
        login(){
            this.$router.push({
                path:'/login'
            })
        },
        songPaly(index){
            this.stroeAudio.arr = this.song.data;
            this.newSrc(this.song.data[index])
        }
    },
    created(){
        this.routePath = this.$route.query.routePath;
        let key = this.cookieKey();//获取cookie所有的键 array类型
        if(key.includes('MUSIC_U')){ //判断用户是否登录
            this.$request.redSong().then(res=>{
                this.SongArray(res.recommend,this.song.data)
                this.song.details = res.recommend;
                this.imgBack = this.song.details[0].album.blurPicUrl;
            })
        }else{
            if(this.messBox) return //判断用户是否第一次进入页面 false为没有进入过页面 true为已经进入过页面
            MessageBox.confirm('您还没有登录，是否前往登录？').then(action => {
                this.$router.push({
                    path:'/login'
                })
            }).catch(err=>{
                this.isLogin = false;
            })
        }
    },
    mounted() {
        
    },
    activated(){
        let key = this.cookieKey();//获取cookie所有的键 array类型
        this.isLogin = key.includes('MUSIC_U');
        if(!key.includes('MUSIC_U')){
            this.song = {
                data:[],
                details:[],
            }
        }
        if(key.includes('MUSIC_U')&&this.song.data.length===0&&this.messBox){ //避免请求重复
            this.$request.redSong().then(res=>{
                this.SongArray(res.recommend,this.song.data)
                this.song.details = res.recommend;
                this.imgBack = this.song.details[0].album.blurPicUrl;
            })
        }
        this.messBox = true;
        
    }
}
</script>

<style scoped>
    .box{
        height: 100%;
    }
    .song{
        width: 96%;
        height: 7rem;
        margin: 0 auto;
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 0.5rem 0 0.5rem 0;
        position: relative;
        z-index: 10;

    }
    .song img{
        width: 7rem;
        border-radius: 1rem;
        margin-right: 1rem;
        height: 100%;
    }
    .songBox{
        width: 100%;
        box-sizing: border-box;
        padding: 2rem 0 0 0;
        border-radius: 2rem 2rem 0 0;
        margin-top:-30rem;
        background-color: white;
    }
    .imgBox img{
        width: 100%;
        position: relative;
        z-index: -1;
    }
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
    .txt{
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:flex-start;
    }
    .txt>p:nth-child(1){
        font-size: 1.5rem;
        font-weight: bold;
    }
    .txt>p:nth-child(2){
        font-size: 1rem;
        color: #888;
    }
    .NotLoggedIn{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .NotLoggedIn>span{
        font-size: 20rem;
        color: rgb(224, 222, 222);
    }
    .NotLoggedIn>p{
        font-size: 1.7rem;
        color: rgb(224, 222, 222);
        padding-bottom: 2rem;
        font-weight: bold;
    }
    .NotLoggedIn>div{
        width: 30%;
        height: 4rem;
        border-radius: 4rem;
        background-color: rgb(64,158,255);
        color: white;
        font-size: 1.7rem;
        line-height: 4rem;
    }
    .isBule{
        color: rgb(64,158,255)!important;
    }
    .isBule>.txt>p:nth-child(2){
        color: rgb(64,158,255)!important;
    }
</style>