<template>
    <div>
        <div 
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
            <div v-for="(item, index) in list" :key="index" class="list" @click="details(item.id)">
                <img v-lazy='item.coverImgUrl'  class="lazy">

                <div class="txt">
                    <p>{{item.name}}</p>
                    <p>播放量：{{item.playCount}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'songList',
    data() {
        return {
            isSollor:false,
            list:[],
            offset:[]
        }
    },
    methods:{
        loadMore() {
            this.offset++;
            this.loading = true;
            this.$request.songList(this.$store.state.searchVal,this.offset).then(res=>{
                this.list.push(...res.result.playlists[res.result.playlists.length-1])
            })
        },
        details(id){
        this.$router.push({
          name:'songBox',
          params:{
            id,
            targetType:1000,
            path:this.$route.path
          }
        })
      }
    },
    created(){
        this.$request.songList(this.$store.state.searchVal,0).then(res=>{
            this.list = res.result.playlists
        })
    },
}
</script>

<style scoped>
.list{
        width: 96%;
        height: 8rem;
        margin: 0 auto;
        padding: 1rem 0 1rem 0;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .list>img{
        width: 8rem;
        height: 8rem;
        border-radius: 0.5rem;
    }
    .txt{
        margin-left: 1rem;
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .txt>p:nth-child(1){
        font-size: 1.7rem;
        text-align: left;
        font-weight: bold;
    }
    .txt>p:nth-child(2){
        font-size: 1rem;
        color: #888;
        text-align: left;
    }
</style>