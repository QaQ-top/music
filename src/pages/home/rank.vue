<template>
    <div class="rank">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>排行榜</span>
            </div>
            <span slot='prev_right'>
            </span>
        </my-prev-nav>
        <rank-type @idx='obtain'>

        </rank-type>
        
        <div class="song">
            <mt-cell 
                :class="{isBule:item.id===getAudioData.id}"
                :title="item.name" 
                :label="`${item.artists.map(item=>item.artistsName).join(' / ')} - ${item.album.albumName}`" 
                v-for="(item, index) in arr" 
                :key="index" 
                @click.native="song(item.id,index)"
            >
                <span class="icon iconfont icon-diandiandianshu"></span>
            </mt-cell>
        </div>
        
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev';
import rankType from '../../components/rankType';
import {mapGetters,mapActions} from 'vuex'
export default {
    name:'red',
    data(){
        return {
            routePath:null,
            idx:0,
            arr:[],
            clickIndex:-1,
        }
    },
    computed:{
        ...mapGetters(['getAudioData'])
    },
    components:{
        myPrevNav,
        rankType
    },
    methods: {
        obtain(id){
            if(id===this.idx) return;
            this.arr = []
            this.$request.rankType(id).then(res=>{
                this.SongArray(res.playlist.tracks,this.arr)
            })
            this.idx = id;
        },
        ...mapActions(['newSrc']),
        song(id,index){ //点击触发
            this.$store.state.audio.arr = this.arr;
            this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
        }
    },
    created(){
        this.$request.rankType(this.idx).then(res=>{
            this.SongArray(res.playlist.tracks,this.arr)
        })
        this.routePath = this.$route.query.routePath;
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
    .rank >>> .mint-cell-text{
    font-size: 1.7rem;
    font-weight: bold; 
    text-align: left;
    display: block;
    overflow: hidden;
    width: 32rem;
    height: 1.9rem;
    line-height: 1.9rem;
    white-space: nowrap;
 }
 .rank >>> .mint-cell{
     padding: 0.25rem 0;
     height: 6.5rem;
 }
 .rank >>> .mint-cell-label{
    font-size: 1.3rem;
    margin: 0;
    text-align: left;
    display: block;
    overflow: hidden;
    width: 32rem;
    height: 2rem;
    line-height: 2rem;
    white-space: nowrap;
 }
 .rank  >>>.icon-diandiandianshu{
     font-size: 2.5rem;
 }
 .rank  .isBule{
    color: rgb(64,158,255)!important;
 }
 .rank .isBule >>> .mint-cell-label{
     color: rgb(64,158,255)!important;
 }
 .rank .isBule >>> .mint-cell-value{
     color: rgb(64,158,255)!important;
 }
 .song{
     padding-top: 7rem;
 }
</style>