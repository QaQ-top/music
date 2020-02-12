<template>
  <div id="app" :style="height" ref='app'>
    <my-audio></my-audio>
    <my-footer musicG='音遇' recom='推荐' dynamic='动态' mine='我的'></my-footer>

      <keep-alive :exclude="this.$store.state.cache"> 
        <router-view></router-view>
      </keep-alive>
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

export default {
  name: 'App',
  //------------------
  components: {
      myAudio,myFooter
  },
  //-----------------
  data () {
    return {
        transName:'rlcut-left',
        routeIndex:0,
        active:0, //当前页面路径在getFooterRoute的索引
        height:{
          
        }
    }
  },
  //------------------
  computed:{
    ...mapState({
      stroeAudio:'audio',
      stroeFooterRoute:'footerRoute'
    })
  },
  //-----------------
  methods: {
    
  },

  //------------------
  watch: { // 使用 mapState,mapGetters 会出现settr gettr报错 用this.$store比较好
    'active'(to, from) {
      this.$router.push(this.stroeFooterRoute[to])
    },
    '$route':{ 
      handler:function(to,from){
          if(this.stroeFooterRoute.includes(to.path)&&this.stroeFooterRoute.includes(from.path)){
          let toIndex = this.stroeFooterRoute.findIndex(item=>to.path==item)
          let fromIndex = this.stroeFooterRoute.findIndex(item=>from.path==item)
          this.$store.state.route = to.path  //将当前路径存入vuex
          this.active = toIndex //储存当前页面路径索引
        }
        if(to.name==='particulars'){
          this.$store.state.previous = from.name
        }

        //判断是否缓存搜索页面
        let current = ['songList','album','singer','single'].includes(to.name); //判断当前页面是否符合数组条件
        let previous = ['songList','album','singer','single'].includes(from.name); //判断之前页面是否符合数组条件
        if(current||(previous&&to.name==='particulars')){
            this.$store.state.cache = ''; //缓存页面
        }else {
          this.$store.state.cache = 'search';
        }
      }
    }
  },
  //----------------------
  beforeCreate() { //数据加载前不能使用 mapState,mapActions,mapGetters,mapMutations 所以只能使用this.$store.state
    let audio = window.localStorage.getItem('audio')
    let audioState = window.localStorage.getItem('audioState')
    if(audio){
      this.$store.state.audio = JSON.parse(audio) //获取上次播放歌曲
      this.$store.state.audioState = JSON.parse(audioState) //获取此播放歌曲状态
    }
    this.$router.push('/musicG')
  },
  //---------------------
   mounted() {
    // if(window.innerHeight>this.$refs.app.offsetHeight){
    //   this.height = {
    //         'height':`${window.innerHeight}px`
    //       }
    // }
    if (typeof document.addEventListener === "undefined") {
      console.error("浏览器不支持addEventListener,请升级");
    } else {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == "hidden") {
          // _this.sendCurVideoTime(localStorage.getItem("webviewDuration"));
          
          console.log('隐藏')
        };
        if(document.visibilityState == "visible"){
          console.log('显示')
        }
      });
      window.addEventListener("beforeunload", () => {
        this.$store.commit('pause'); //暂停歌曲
        this.stroeAudio.storage = true; //改变状态
        this.stroeAudio.type = 'new'
        this.stroeAudio.index = -1;
        let storage = window.localStorage;
        storage.setItem('audio',JSON.stringify(this.$store.state.audio)) //关闭网页时将audio的数据存入本地缓存
        storage.setItem('audioState',JSON.stringify(this.$store.state.audioState))
      });
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  background: rgb(252,252,252);
  padding: 4rem 0;
}
input[placeholder]{
  font-size:1.2rem;
}
</style>
