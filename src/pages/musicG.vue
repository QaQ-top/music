<template>
    <div>
        <top-nav txt='音遇'>
            <my-search slot="cun" txt='搜索'></my-search>
            <audio-list slot="icon">
            </audio-list>
        </top-nav>

        <my-banner  :bannerArray='bannerArray' @bannerDst='bannerDst'>
        </my-banner>

        <home-list>
            
        </home-list>

        <my-swiper-grid 
        :imgArray='dailySongSheet' 
        :row='1' :column='3.2' 
        :bet='15'
        columnType='推荐歌单'
        >
        </my-swiper-grid>

        <recommend-new-song 
        :imgArray='recommendNewSong' 
        :row='5' :column='1' 
        :bet='15'
        columnType='推荐新歌'
        >
        </recommend-new-song>

        <ranking-list
        :imgArray='rankingList' 
        :row='1' :column='1.05' 
        :bet='15'
        columnType='排行榜'
        :original='original'
        :soar='soar'
        :electricSound='electricSound'
        >
        </ranking-list>

        <dj-hot
        :imgArray='djhot' 
        :row='1' :column='3.2' 
        :bet='15'
        columnType='热门电台'
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
import djHot from '../components/djhot';
import audioList from '../components/audioList';
import {mapActions,mapState} from 'vuex'
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
            bannerArr:[]
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
        djHot,
        audioList
    },
    computed:{
        ...mapState(['audio'])
    },
    methods: {
        ...mapActions(['newSrc']),
        bannerDst(item){ 
            switch (item.targetType) {
                case 1:  //单曲
                    let songArr = [];
                    if(!this.bannerArr.length){  //判断 是否已经找到歌曲
                        for(let i of this.bannerArray){
                            if(i.targetType===1){
                                songArr.push(i.song)
                            }
                        }
                        this.SongArray(songArr,this.bannerArr); //找到banner所有单曲
                    }
                    this.audio.arr = [...this.bannerArr] //将banner 所有单曲整理成这个歌单
                    let arr = [];
                    this.SongArray([item.song],arr) //播放当前歌曲
                    this.newSrc(arr[0])
                    console.log('单曲')
                    break;

                case 10: //专辑
                    this.$router.push({
                        name:'songBox',
                        params:{
                            id:item.targetId,
                            targetType:item.targetType,
                            path:this.$route.path
                        }
                    })
                    console.log('专辑')
                    break;

                case 1000: //歌单
                    this.$router.push({
                        name:'songBox',
                        params:{
                            id:item.targetId,
                            targetType:item.targetType,
                            path:this.$route.path
                        }
                    })
                    console.log('歌单')
                    break;
                case 1004: //mv
                    // this.$router.push({
                    //     name:'bannerDst',
                    //     params:{
                    //         id:item.targetId,
                    //         type:item.targetType
                    //     }
                    // })
                    console.log('MV')
                    break;
            
                default:
                    if(item.url){ //广告活动
                        this.$router.push({
                            name:'advertisement',
                            params:{
                                id:item.targetId,
                                type:'url'
                            }
                        });
                         console.log('广告')
                    }
                    break;
            }
            
            
        }
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

<style scoped>

</style>