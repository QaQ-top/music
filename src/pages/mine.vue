<template>
    <div>
        <top-nav txt='我的'>
            <my-search txt='搜索' slot="cun"></my-search>
            <audio-list slot="icon">
            </audio-list>
        </top-nav>
        <div class="mine">
            <div class="user">
                <img v-lazy="img" class="lazy avatar" v-if="isImg">
                
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
            <mine-list @abme='abme()' @like='details(ilikeIt.id)'>
            </mine-list>
        </div>
        <div class="myMusic">
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
import audioList from '../components/audioList';
import { MessageBox } from 'mint-ui';

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
            collection:[],
            
            // popupVisible:false,
            // slots:[{
            //     values:[],
            // }]
        }
    },
    components: {
        topNav,
        mySearch,
        mineList,
        mySongList,
        audioList,
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
                window.localStorage.removeItem('login')
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
        details(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:520,
                    path:this.$route.path,
                    hendle:'del'
                }
            })
        },
        abme(){
            this.$router.push({
                name:'gab'
            })
        },
        
    },
    activated(){
        let loacl = window.localStorage;
        let user = JSON.parse(loacl.getItem('user'));
        if(!user) return
        if(user.name){
            this.name = user.name;
            this.isLogin = true;
            this.isImg = true;
            this.img = user.avatarUrl
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
                this.$store.state.mySongList.length = 0;
                this.$store.state.mySongList.push(this.ilikeIt,...this.newbuild)

            })
        }else{
            this.name = '您还没有登录~';
            this.isLogin = false;
            this.isImg = false;
            this.ilikeIt = {};
            this.collection = [];
            this.newbuild = []
        };
        // let arr = [...this.$store.state.audioState.alreadyPlay]
        // this.slots[0].values = arr.map(i=>i.name)
        
    }
}
</script>

<style scoped>
    *{
        font-size: 1.5rem;
    }
    .mine{
        background-color:  #3e9cff;
        color: white;
        height: 25rem;
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
        margin-top:-5rem;
        border-radius: 3rem 3rem 0 0;
        padding-top:1rem;
    }
    .user{
        padding: 3rem 0 0 0;
    }
    .avatar{
        height:100%;
        border-radius: 50%;
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
        font-size: 1.5rem;
    }
    .icon-download,.icon-aixin{
        color: rgb(224, 73, 73);
        font-size: 4rem;
    }
  
</style>