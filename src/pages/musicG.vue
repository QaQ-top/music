<template>
    <div>
        <top-nav txt='音乐'>
            <my-search slot="cun" txt='搜索'></my-search>
            <span class="icon iconfont icon-tubiaozhizuomoban" slot="icon"></span>
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
        :row='5' :column='1' 
        :bet='10'
        columnType='推荐新歌'
        >
        </recommend-new-song>

        <ranking-list
        :imgArray='rankingList' 
        :row='1' :column='1.05' 
        :bet='10'
        columnType='排行榜'
        :original='original'
        :soar='soar'
        :electricSound='electricSound'
        >
        </ranking-list>

        <dj-hot
        :imgArray='djhot' 
        :row='1' :column='3.2' 
        :bet='10'
        columnType='推荐电台'
        >
        </dj-hot>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import myBanner from '../components/banner'
import mySwiperGrid from '../components/swiperGrid'
import homeList from '../components/homeList'
import recommendNewSong from '../components/recommendNewSong'
import rankingList from '../components/rankingList';
import djHot from '../components/djhot'
export default {
    name:"musicG",
    data () {
        return {
            nr:"音乐馆",
            bannerArray:[],
            dailySongSheet:[],//推荐歌单
            recommendNewSong:[],//推荐新歌
            rankingList:[],//排行榜
            original:[],//原创
            soar:[],//飙升
            electricSound:[],//电音
            djhot:[], //推荐电台
        }
    },
    components: {
        topNav,
        mySearch,
        myBanner,
        mySwiperGrid,
        homeList,
        recommendNewSong,
        rankingList,
        djHot
    },
    created(){
        this.$request.banner().then(res=>{
            this.bannerArray = res.banners;
        });
        this.$request.personalized().then(res=>{
            this.dailySongSheet = res.result
        })
        this.$request.recommendNewSong().then(res=>{
            this.recommendNewSong = res.result;
        })
        // 排行榜
        //"2": 网易原创歌曲榜,
        //"3": 云音乐飙升榜,
        //"4": 云音乐电音榜,
        this.$request.rankingList(2).then(res=>{
            this.original = res.playlist.tracks.slice(0,3);
        })
        this.$request.rankingList(3).then(res=>{
            this.soar = res.playlist.tracks.slice(0,3);
        })
        this.$request.rankingList(4).then(res=>{
            this.electricSound = res.playlist.tracks.slice(0,3);
        })

        //热门电台
        this.$request.djProgram().then(res=>{
            this.djhot = res.result
        })
    },
    mounted(){
        
    }
}
</script>

<style>

</style>