<template>
    <div>
        <top-nav txt='音乐'>
            <my-search slot="cun" txt='搜索'></my-search>
            <span class="icon iconfont icon-yinle1" slot="icon"></span>
        </top-nav>

        <my-Swiper  :imgArray='[1,2,3]'>
        </my-Swiper>

        <my-swiper-grid :imgArray='[1,2,3,4,5]' :row='1' :column='1.2' :bet='10'>
        </my-swiper-grid>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import mySwiper from '../components/swiper'
import mySwiperGrid from '../components/swiperGrid'
export default {
    name:"musicG",
    data () {
        return {
            nr:"音乐馆"
        }
    },
    components: {
        topNav,
        mySearch,
        mySwiper,
        mySwiperGrid
    }
}
</script>

<style>

</style>