<template>
    <div>
        <top-nav txt='推荐'>
            <my-search txt='搜索' slot="cun"></my-search>
            <audio-list slot="icon">
            </audio-list>
        </top-nav>
        <div v-if="isLogin">
            <div class="song">
                <ul>
                    <li v-for="(item, index) in song.details" :key="index" class="songItem" @click='end(index)' :class="{color:item.id===stroeAudio.id}">
                        <div class="imagr">
                            <img v-lazy="item.album.blurPicUrl" class="lazy" alt="加载失败...">
                        </div>
                        <div class="asn">
                            <h2 class="ovflEllip">{{item.name}}</h2>
                            <div class="artists">
                                <div>歌手：</div>
                                <div class="artistsname">
                                    <p v-for="(item, index) in item.artists" :key="index" class="ovflEllip" @click.stop="artis(item.id)">
                                        {{item.name}}
                                    </p>
                                </div>
                            </div>
                            <div class="album">
                                <span>专辑：</span>
                                <div class="albumname ovflEllip" @click.stop="album(item.album.id)">{{item.album.name}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="!isLogin">
            <div class="NotLoggedIn">
                <span class="iconfont icon-weidenglu-touxiang"></span>
                <p>您还没有登录~</p>
                <div @touchstart="login">去登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import audioList from '../components/audioList'
import {mapState,mapActions} from 'vuex' 
export default {
    name:"rec",
    data () {
        return {
            song:{
                data:[],
                details:[],
            },
            messBox:false, //是否已经进入过页面
            isLogin:true,
        }
    },
    components: {
        topNav,mySearch,audioList
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
        artis(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:100,
                    path:this.$route.path
                }
            })
        },
        album(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:10,
                    path:this.$route.path
                }
            })
        },
        end(index){
            this.stroeAudio.arr.length = 0
            this.stroeAudio.arr.push(...this.song.data)
            this.newSrc(this.song.data[index])
        },
    },
    created(){
        let loginDate = window.localStorage.getItem('login')
        let key = 1296000000 > Date.parse(new Date()) - Date.parse(loginDate)
        if(key){ //判断用户是否登录
            if(this.$store.state.everyday.length===0){
                this.$request.redSong().then(res=>{
                    this.SongArray(res.recommend,this.song.data)
                    this.$store.state.everyday.push(...res.recommend)
                    this.song.details.push(...res.recommend);
                })
            }else{
                this.song.details.push(...this.$store.state.everyday);
            }
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
    activated(){
        // let key = this.cookieKey();//获取cookie所有的键 array类型 1,296,000,000
        let loginDate = window.localStorage.getItem('login')
        let key = 1296000000 > Date.parse(new Date()) - Date.parse(loginDate)
        this.isLogin = key;
        if(!key){
            this.song.data.length = 0,
            this.song.details.length = 0 
        }
        if(key&&this.song.data.length===0&&this.messBox){ //避免请求重复
            if(this.$store.state.everyday.length===0){
                this.$request.redSong().then(res=>{
                    this.SongArray(res.recommend,this.song.data)
                    this.$store.state.everyday.push(...res.recommend)
                    this.song.details.push(...res.recommend);
                })
            }else if(this.song.details.length===0){
                this.song.details.push(...this.$store.state.everyday);
            }
        }
        this.messBox = true;
        
    }
}
</script>

<style scoped>

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
    .songItem{
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        margin: 1rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 15rem;
    }
    .imagr{
        height: 100%;
        width: 13rem;
        font-size: 0;
        border-radius: 1rem;
        position: relative;
    }
    .imagr::before{
        content: '';
        display: block;
        background-color: rgb(240, 240, 240);
        width: 1rem;
        height: 10rem;
        position: absolute;
        border-radius: 0 .7rem .7rem 0;
        top: 50%;
        transform: translateY(-50%);
        right: -1rem;
    }
    .imagr>img{
        width: 100%;
        border-radius: 1rem;
        height: 100%;
    }
    .asn{
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
    }
    .ovflEllip{
        width: 100%;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .asn>h2{
        font-size: 2rem;
        line-height: 2.2rem;
    }
    .artists{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.2rem;
        line-height: 2rem;
    }
    .album{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.2rem;
        line-height: 2rem;
    }
    .artistsname{
        max-width: 20%;
    }
    .albumname{
        max-width: 20%;
        text-align: left;
    }
    .color{
        color:rgb(64,158,255);
    }
</style>