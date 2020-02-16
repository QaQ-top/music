<template>
    <div>
        <div class="single"
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
            <mt-cell 
            :class="{isBule:index===getAudioData.index}"
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
            clickIndex:-1,
            loading:false
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
            this.SongArray(res.result.songs,this.arr)
        })
        },
        song(id,index){ //点击触发
            this.$store.state.audio.arr = this.arr;
            this.newSrc({
                id,
                index,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
        }
    },
    mounted(){
        this.$request.single(this.$store.state.searchVal,this.offset).then(res=>{
            this.SongArray(res.result.songs,this.arr)
        })
    },
}

</script>

<style scoped>
 .single >>> .mint-cell-text{
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
 .single >>> .mint-cell{
     padding: 0.25rem 0;
     height: 4.5rem;
 }
 .single >>> .mint-cell-label{
     font-size: 1.3rem;
     margin: 0;
     text-align: left;
     display: block;
     overflow: hidden;
     width: 32rem;
     height: 1.5rem;
     line-height: 1.5rem;
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