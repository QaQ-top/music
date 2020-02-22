// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//渲染dom
import App from './App'


//路由
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

//单元格，可用作展示列表信息、链接或者表单等。
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

//无限滚动加载
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);




//swiper轮播图
import Swiper from 'vue-awesome-swiper'
// styles
import 'swiper/css/swiper.css'
Vue.use(Swiper)

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
