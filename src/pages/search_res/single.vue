<template>
    <div>
        <div class="single"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
            <mt-cell 
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
        }
    },
    computed:{
        ...mapGetters(['getAudioData'])
    },
    methods:{
        ...mapActions(['play','getDuration']),
        loadMore() {
        console.log('fff')
        this.offset++;
        this.loading = true;
        this.$ajax.single(this.$store.state.searchVal,this.offset).then(res=>{
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
            this.getAudioData.albumId = this.arr[index].album.albumId; //将点击的歌曲专辑id 存入audio详情
            this.getAudioData.albumName = this.arr[index].album.albumName; //将点击的歌曲专辑名称 存入audio详情
            this.getAudioData.dom.addEventListener('canplay',()=>{  //对audio进行音频监听 当歌曲可播放时 自动播放
                this.play()
            })
            this.$ajax.song(id).then(res=>{ //通过歌曲id发送请求
                this.getAudioData.url = res.data[0].url; //将audio的src替换
            }).then(res=>{
                this.$ajax.songDetail(id).then(res=>{ //通过id 获取歌曲详情
                    this.getAudioData.img = res.songs[0].al.picUrl; //歌曲封面
                    this.getAudioData.title = res.songs[0].al.name //歌曲名称
                })
            })
        }
    },
    mounted(){
        this.$ajax.single(this.$store.state.searchVal,this.offset).then(res=>{ //通过name获取歌曲
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
    }
}
</script>

<style>
 .single .mint-cell-text{
    font-size: 2rem;
    font-weight: bold; 
    text-align: left;
    display: block;
    overflow: hidden;
    width: 25rem;
    white-space: nowrap;
 }
 .single .mint-cell{
     padding: 0.25rem 0
 }
 .single .mint-cell-label{
     text-align: left;
     display: block;
     overflow: hidden;
     width: 25rem;
     white-space:nowrap;
 }
 .single .mint-cell-value{
     font-size: 2rem;
 }
</style>