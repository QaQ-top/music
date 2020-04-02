<template>
  <div id="app" ref='app'>
    <my-audio></my-audio>
    <my-footer musicG='音遇' rec='推荐' dynamic='歌手' mine='我的'></my-footer>

      <keep-alive :exclude="this.$store.state.cache">
        <router-view class="view"></router-view>
      </keep-alive>

      <handle-song-list>
        
      </handle-song-list>
     

      <transition name="logo">
        <my-lottie v-if="logo">
        </my-lottie>
      </transition>

  </div>
</template>

<script>
//屏蔽路由二次点击错误

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
//自定义音频
import myAudio from './components/self_define_audio';

//myFooter
import myFooter from './components/footer';

//vuex
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex';

import { MessageBox } from 'mint-ui';

import handleSongList from './components/handleSongList';

import myLottie from './components/lottie'

export default {
  name: 'App',
  //------------------
  components: {
      myAudio,myFooter,handleSongList,myLottie
  },
  //-----------------
  data () {
    return {
        routeIndex:0,
        active:0, //当前页面路径在getFooterRoute的索引
        logo:true,
    }
  },
  //------------------
  computed:{
    ...mapState({
      stroeAudio:'audio',
      stroeFooterRoute:'footerRoute',
    })
  },
  //-----------------
  methods: {
  },

  //------------------
  watch: { 
    'active'(to, from) {
      this.$router.push(this.stroeFooterRoute[to])
    },
    '$route':{ 
      handler:function(to,from){
        if(to.name==='particulars'){
          this.$store.state.previous = from.name
        }

        //判断是否缓存搜索页面
        let current = ['songList','album','singer','single'].includes(to.name); //判断当前页面是否符合数组条件
        let previous = ['songList','album','singer','single'].includes(from.name); //判断之前页面是否符合数组条件
        if(current||(previous&&to.name==='particulars')||(previous&&to.name==='songBox')){
            this.$store.state.cache = 'songBox'; //缓存页面
        }else {
          this.$store.state.cache = 'search';//不缓存
        }
        if((to.name==='particulars'&&from.name==='songBox')||to.name==='songBox'){
            this.$store.state.cache = '';
        }else if(this.$store.state.cache==='search'){
            this.$store.state.cache = 'search,songBox';
        }else{
            this.$store.state.cache = 'songBox';
        }
      }
    }
  },
  //----------------------
  beforeCreate(){
    let audio = window.localStorage.getItem('audio')
    let audioState = window.localStorage.getItem('audioState')
    if(audio){
      this.$store.state.audio = JSON.parse(audio) //获取上次播放歌曲
      this.$store.state.audioState = JSON.parse(audioState) //获取此播放歌曲状态
    }else{
      this.$store.state.isAudio = false
    }
    this.$router.push('/musicG');
  },
  created(){
    let user = window.localStorage.getItem('user');
    if(user&&JSON.parse(user).userId){
      let _user = JSON.parse(user)
      this.$request.usePlaylist(_user.userId).then(res=>{  //获取用户歌单
                let arr = res.playlist;
                let ilikeIt = arr.slice(0,1)[0]  //数组中第一个对象 永远为我喜欢的音乐
                arr.splice(0,1)
                let newbuild = arr.filter(item => {
                    return item.ordered===false; //ordered 为 false  新键歌单
                })
                newbuild.unshift(ilikeIt)
                this.$store.state.mySongList.length = 0;
                this.$store.state.mySongList.push(...newbuild)
            })
    }else{
      MessageBox.confirm('您还没有登录，是否前往登录？').then(action => {
        this.$router.push({
          path:'/login'
        })
      })
    }
  },
  //---------------------
   mounted() {
    if (typeof document.addEventListener === "undefined") {
    } else {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == "hidden") {
        };
        if(document.visibilityState == "visible"){
        }
      });
      window.addEventListener("beforeunload", () => {
        this.$store.commit('pause'); //暂停歌曲
        this.stroeAudio.storage = true; //改变状态
        this.stroeAudio.type = 'new'
        this.stroeAudio.index = -1;
        let storage = window.localStorage;
        storage.setItem('audio',JSON.stringify(this.$store.state.audio)) //关闭网页时将audio的数据存入本地缓存
        if(!this.$store.state.audioState){
          storage.setItem('audioState',JSON.stringify({randomPlay:false,disabled:false}))
        }else{
          storage.setItem('audioState',JSON.stringify(this.$store.state.audioState))
        }
        
      });
    }
    setTimeout(() => {
      this.logo = false
    }, 4000)
  },
  
}

</script>

<style>

</style>
