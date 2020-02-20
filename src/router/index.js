import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



//footer
import MusicG from '../pages/musicG'
import Recommend from '../pages/recommend'
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


export default new Router({
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
      path:"/recommend",
      name:"recommend",
      component:Recommend //推荐页面
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
    }
  ]
})
