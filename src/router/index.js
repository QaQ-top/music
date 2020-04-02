import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '../store/vuex'


//footer
import MusicG from '../pages/musicG'
      //电台
      import Dj from '../pages/home/dj.vue';
      //每日推荐
      import Red from '../pages/home/recommend.vue';
      //排行
      import Rank from '../pages/home/rank.vue';
      //歌单
      import Sl from '../pages/home/songList.vue'

import rec from '../pages/recommend'
import Dynamic from '../pages/dynamic.vue'
import Mine from '../pages/mine'

//搜索
import Search from '../pages/search'

//音乐详情
import Particulars from '../pages/particulars'

//搜索search 路由
import Album from '../pages/search_res/album'
import Singer from '../pages/search_res/singer'
import Single from '../pages/search_res/single'
import songList from '../pages/search_res/song_list'

//登录
import login from '../pages/login'

//广告
import advertisement from '../pages/advertisement'

//歌单，专辑，电台节目，歌手详情
import songBox from '../pages/songBox'

export default new Router({
  scrollBehavior (to, fom, savePosition) {
    if(store.state.scroll.has(to.name)){
      let top = store.state.scroll.get(to.name);
      if(top){
        return {x:0 , y: top}
      }
    }
  },
  routes: [
    {
      path:"/",
      redirect:"/musicG" //默认显示音遇
    },
    {
      path:"/musicG",
      name:"musicG",
      component:MusicG //音遇页面
    },
    {
      path:"/rec",
      name:"rec",
      component:rec //音遇页面
    },
    {
      path:"/dynamic",
      name:"dynamic",
      component:Dynamic //动态页面
    },
    {
      path:"/mine",
      name:"mine",
      component:Mine //我的页面
    },
    {
      path:"/search",
      name:"search",
      component:Search, //搜索页面
      meta: { 
        isCache:false
      },
      children:[ //子路由
        {
          path:'album',
          name:'album',
          component:Album //专辑
        },
        {
          path:'singer',
          name:'singer',
          component:Singer //歌手
        },
        {
          path:'single',
          name:'single',
          component:Single //单曲
        },
        {
          path:'songList',
          name:'songList',
          component:songList //歌单
        },
      ]
    },
    {
      path:'/particulars',
      name:'particulars',
      component:Particulars, //歌曲详情页面
      meta:{
        type:'part'
      }
    },
    {
      path:'/login',
      name:'login',
      component:login //登录页面
    },
    {
      path:'/dj', //电台
      name:'dj',
      component:Dj
    },
    {
      path:'/red', //每日推荐
      name:'red',
      component:Red
    },
    {
      path:'/rank', //排行榜
      name:'rank',
      component:Rank
    },
    {
      path:'/sl', //歌单
      name:'sl',
      component:Sl
    },
    {
      path:'/advertisement',  //广告
      name:'advertisement',
      component:advertisement
    },
    {
      path:'/songBox',  //歌单，专辑，电台节目，歌手详情
      name:'songBox',
      component:songBox
    }
  ]
})
