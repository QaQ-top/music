<template>
    <div>
        <top-nav txt='音乐'>
            <my-search slot="cun" txt='搜索'></my-search>
            <span class="icon iconfont icon-yinle1" slot="icon"></span>
        </top-nav>

        <my-banner  :bannerArray='bannerArray'>
        </my-banner>

        <home-list>
            
        </home-list>

        <my-swiper-grid 
        :imgArray='dailySongSheet' 
        :row='1' :column='3.2' 
        :bet='10'
        columnType='推荐歌单'
        >
        </my-swiper-grid>

        <recommend-new-song 
        :imgArray='recommendNewSong' 
        :row='1' :column='3.2' 
        :bet='10'
        columnType='推荐新歌'
        >

        </recommend-new-song>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import myBanner from '../components/banner'
import mySwiperGrid from '../components/swiperGrid'
import homeList from '../components/homeList'
import recommendNewSong from '../components/recommendNewSong'
export default {
    name:"musicG",
    data () {
        return {
            nr:"音乐馆",
            bannerArray:[],
            dailySongSheet:[],//推荐歌单
            recommendNewSong:[],//推荐新歌
        }
    },
    components: {
        topNav,
        mySearch,
        myBanner,
        mySwiperGrid,
        homeList,
        recommendNewSong
    },
    beforeMount(){
        this.$request.banner().then(res=>{
            this.bannerArray = res.banners;
        });
        this.$request.personalized().then(res=>{
            this.dailySongSheet = res.result
        })
        this.$request.recommendNewSong().then(res=>{
            console.log(res)
            this.recommendNewSong;
        })
    },
    mounted(){
        
    }
}
</script>

<style>

</style>