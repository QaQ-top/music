// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//路由守卫
router.beforeEach((to,fom, next) => {
  console.log('从哪个页面来？',fom)  // 从哪个页面来？
  console.log('到哪个页面去？',to)  // 到哪个页面去？
  next()
})
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

import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);


//字体图标fonts
import "./assets/fonts/iconfont.css"

//vuex
import store from './store/vuex';

//vue 自定义指令
import './v-custom/custom'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
