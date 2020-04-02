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
                <img v-lazy="imgBack" class="lazy">
            </div>
            <div class="songBox">
                <div v-for="(item, index) in song.details" :key="index" class="song" @touchstart="startTime" @touchend='end(index)' :class="{isBule:item.id===stroeAudio.id}">
                    <img v-lazy="item.album.blurPicUrl" class="lazy">
                    <div class="txt">
                        <p>{{item.name}}</p>
                        <p>{{item.artists[0].name}}</p>
                    </div>
                    <div class="checkbox" v-if='dels' :class="{checkedTrueAdd:checkArr.includes(item.id),add:true}" @touchstart.stop='addCheckArr(item.id)'>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isLogin">
            <div class="NotLoggedIn">
                <span class="iconfont icon-weidenglu-touxiang"></span>
                <p>您还没有登录~</p>
                <div @touchstart="login">去登录</div>
            </div>
        </div>
         <div class="btn" v-if="dels">
            <div class="cal" @click="quit">退出编辑</div>
            <div class="btnAdd" @click="allAdd">加入歌单</div>
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
            isLogin:true,
            setTiem:null,
	        dels:false,
           	checkArr:[],
            strat:null,
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
         quit(){
            this.dels = false;
            this.checkArr.length = 0;
        },
        allAdd(){
            if(this.checkArr.length===0) return
            this.$store.state.isSongBox = true;
            this.$store.state.songListData.songId.length = 0;
            this.$store.state.songListData.songId.push(...this.checkArr);
            this.checkArr.length = 0;
            this.dels = false;
        },
        startDev(){
            this.strat = new Date()
        },
        startTime(){
            this.strat = new Date()
            this.setTiem = setTimeout(() => {
                this.dels = true;
            }, 1500);
        },
        end(index){
            clearTimeout(this.setTiem);
            let date = new Date();
            if(date-this.strat<200){
                this.stroeAudio.arr.length = 0
                this.stroeAudio.arr.push(...this.song.data)
                this.newSrc(this.song.data[index])
            }
        },

        addCheckArr(id){
            if(this.checkArr.includes(id)){
                let index = this.checkArr.findIndex(i=>i===id);
                this.checkArr.splice(index,1);
            }else{
                this.checkArr.push(id);
            }
        }
    },
    created(){
        this.routePath = this.$route.query.routePath;
        let key = this.cookieKey();//获取cookie所有的键 array类型
        console.log(key,key.includes('MUSIC'))
        if(key.includes('MUSIC')){ //判断用户是否登录
            if(this.$store.state.everyday.length===0){
                this.$request.redSong().then(res=>{
                    this.SongArray(res.recommend,this.song.data)
                    this.$store.state.everyday.push(...res.recommend)
                    this.song.details.push(...res.recommend);
                    this.imgBack = this.song.details[0].album.blurPicUrl;
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
        let key = this.cookieKey();//获取cookie所有的键 array类型
        this.isLogin = key.includes('MUSIC');
        if(!key.includes('MUSIC')){
            this.song.data.length = 0,
            this.song.details.length = 0 
        }
        if(key.includes('MUSIC')&&this.song.data.length===0&&this.messBox){ //避免请求重复
            if(this.$store.state.everyday.length===0){
                this.$request.redSong().then(res=>{
                    this.SongArray(res.recommend,this.song.data)
                    this.$store.state.everyday.push(...res.recommend)
                    this.song.details.push(...res.recommend);
                    this.imgBack = this.song.details[0].album.blurPicUrl;
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
        font-size: 1.7rem;

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
    .add{
    border: 0.2rem solid rgb(64,158,255);
 }

.checkbox{
    box-sizing: border-box;
    background-color: rgb(250, 250, 250);
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    position: absolute;
    right: 2%;
}
.checkbox::after{
    transition: all ease-in-out 0.25s;
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 0;
    width: 0;
    margin-left: 0rem;
    margin-top: 0rem;
    position: absolute;
    opacity: 0;
    left: 50%;
    top: 50%;
}
.checkedTrueAdd::after{
    content: '';
    display: flex;
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    left: 50%;
    top: 50%;
    background-color: rgb(64,158,255);
    height:1rem;
    width: 1rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;

}

.btn{
    width: 100%;
    box-sizing: border-box;
    padding: 2%;
    height: 6.5rem;
    position: fixed;
    bottom: 0;
    z-index: 101;
    background-color: white;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0.7rem 1rem 0.05rem #000;
}
.btn div{
    width: 36%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.5rem;
}
.cal{
    background-color: white;
    border: 1px solid rgb(64,158,255);
    font-size: 2rem;
    color: rgb(64,158,255);
}
.btnDel{
    background-color: rgb(241, 71, 65);
    border: 1px solid rgb(241, 71, 65);
    font-size: 2rem;
    color:  rgb(255, 255, 255);
}
.btnAdd{
    background-color: rgb(64,158,255);
    border: 1px solid rgb(64,158,255);
    font-size: 2rem;
    color: rgb(255, 255, 255);
}
</style>