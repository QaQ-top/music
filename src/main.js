// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//渲染dom
import App from './App'

//vuex
import store from './store/vuex';

//路由
import router from './router'

Vue.config.productionTip = false

//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// Router.afterEach(to,fom)

//axios
import request from './api/api'
Vue.prototype.$request = request

//字适应
import './assets/js/rem'


//MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//单元格，可用作展示列表信息、链接或者表单等。
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

//无限滚动加载
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

//图片懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);

import './assets/css/index.css'


//swiper轮播图
import Swiper from 'vue-awesome-swiper'
// styles
import 'swiper/css/swiper.css'
Vue.use(Swiper)

//字体图标fonts
import "./assets/fonts/iconfont.css"

//vue 自定义指令
import './v-custom/custom'

import lottie from 'vue-lottie';
import { set } from 'shelljs'
Vue.component('lottie', lottie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

//路由守卫
router.beforeEach((to,fom, next) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  store.state.scroll.set(fom.name,scrollTop)
  // console.log('从哪个页面来？',fom)  // 从哪个页面来？
  // console.log('到哪个页面去？',to)  // 到哪个页面去？
  next()
})