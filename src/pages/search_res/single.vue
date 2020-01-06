<template>
    <div>
        <div class="single"
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
            <mt-cell 
            :class="{isBule:index===clickIndex}"
            :title="item.name" 
            :label="`${item.artists.map(item=>item.artistsName).join(' / ')} - ${item.album.albumName}`" 
            v-for="(item, index) in arr" 
            :key="index" 
            @click.native="song(item.id,index)">
                    <span class="icon iconfont icon-diandiandianshu"></span>
            </mt-cell>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name:'single',
    data() {
        return {
            arr:[],
            offset:0,
            clickIndex:-1
        }
    },
    computed:{
        ...mapGetters(['getAudioData'])
    },
    methods:{
        ...mapActions(['newSrc']),
        loadMore() {
        this.offset++;
        this.loading = true;
        this.$request.single(this.$store.state.searchVal,this.offset).then(res=>{
            this.loading = false;
            let arr = [];
            res.result.songs.map(item=>{
                let artists = []
                item.artists.map(art=>{
                    artists.push({
                        artistsName : art.name,
                        artistsId : art.id
                    })
                }),
                arr.push({
                    name:item.name,
                    id:item.id,
                    artists,
                    album:{
                        albumId:item.album.id,
                        albumName:item.album.name
                    }
                })
            })
            this.arr.push(...arr)
        })
        },
        song(id,index){ //点击触发
            this.clickIndex = index;
            this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
            
        }
    },
    mounted(){
        this.$request.single(this.$store.state.searchVal,this.offset).then(res=>{ //通过name获取歌曲
            let arr = [];
            // console.log(res)
            res.result.songs.map(item=>{  //遍历数组里的歌曲
                let artists = []
                item.artists.map(art=>{
                    artists.push({ //将某一首歌曲的歌手名与歌手id提取放入artists
                        artistsName : art.name,
                        artistsId : art.id
                    })
                }),
                arr.push({ //将某一首歌曲id 歌曲名称 专辑名 专辑id 歌手名 歌手id push入arr中
                    name:item.name, //歌曲名称 
                    id:item.id,  //歌曲id
                    artists, //歌曲的歌手名与歌手id
                    album:{
                        albumId:item.album.id, // 专辑id
                        albumName:item.album.name // 专辑名
                    }
                })
            })
            this.arr.push(...arr)
        })
    },
}

</script>

<style scoped>
 .single >>> .mint-cell-text{
    font-size: 2rem;
    font-weight: bold; 
    text-align: left;
    display: block;
    overflow: hidden;
    width: 25rem;
    white-space: nowrap;
 }
 .single >>> .mint-cell{
     padding: 0.25rem 0
 }
 .single >>> .mint-cell-label{
     text-align: left;
     display: block;
     overflow: hidden;
     width: 25rem;
     white-space:nowrap;
 }
 .single  >>>.icon-diandiandianshu{
     font-size: 2.5rem;
 }
 .single  .isBule{
    color: rgb(64,158,255)!important;
 }
 .single .isBule >>> .mint-cell-label{
     color: rgb(64,158,255)!important;
 }
 .single .isBule >>> .mint-cell-value{
     color: rgb(64,158,255)!important;
 }
</style>