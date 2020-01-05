<template>
  <div id="app">
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
import myAudio from './components/self_define_audio'

//myFooter
import myFooter from './components/footer'

//路由切换

//getFooterRoute
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
        transName:'rlcut-left',
        routeIndex:0,
        active:0, //当前页面路径在getFooterRoute的索引
    }
  },
  methods: {
    success(a){
      
    }
  },
  computed:{
    ...mapGetters(['getFooterRoute'])
  },
  components: {
      myAudio,myFooter
  },
  watch: {
    'active'(to, from) {
      this.$router.push(this.getFooterRoute[to])
    },
    '$route':{
      handler:function(to,from){
          if(this.getFooterRoute.includes(to.path)&&this.getFooterRoute.includes(from.path)){
          let toIndex = this.getFooterRoute.findIndex(item=>to.path==item)
          let fromIndex = this.getFooterRoute.findIndex(item=>from.path==item)
          this.$store.state.route = to.path  //将当前路径存入vuex
          this.active = toIndex //储存当前页面路径索引
        }
        if(to.name==='particulars'){
          this.$store.state.previous = from.name
        }

        //判断是否缓存搜索页面
        let current = ['songList','album','singer','single'].includes(to.name); //判断当前页面是否符合数组条件
        let previous = ['songList','album','singer','single'].includes(from.name); //判断之前页面是否符合数组条件
        if(current||previous){
            this.$store.state.cache = ''; //缓存页面
        }else if(this.getFooterRoute.includes(to.path)){ //如果进入tab 页面 取消缓存
            this.$store.state.cache = 'search';
        }else {
          this.$store.state.cache = 'search';
        }
        
      }
    }
  },
  beforeCreate() {
    this.$router.push('/musicG')
  },
  mounted() {
    // this.$store.state.ajax = this.$ajax


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
        //  this.sendCurVideoTime(localStorage.getItem("webviewDuration"));
        // window.open('http://www.baidu.com')
        return false
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
  /* margin-top: 60px; */
}
input[placeholder]{
  font-size:1.2rem
}
</style>
