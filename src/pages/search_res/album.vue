<template>
    <div>
        <div 
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
            <div v-for="(item, index) in list" :key="index" class="list">
                <img :src="item.picUrl" alt="">
                <div class="txt">
                    <p>{{item.name}}</p>
                    <p>{{item.artist.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'album',
    data() {
        return {
            list:[],
            offset:1
        }
    },
    methods:{
        loadMore() {
            this.offset++;
            this.loading = true;
            this.$request.album(this.$store.state.searchVal,this.offset).then(res=>{
                this.list.push(...res.result.albums)
            })
        },
        
    },
    mounted(){
        this.$request.album(this.$store.state.searchVal,0).then(res=>{
            this.list = res.result.albums
        })
        
    }
}
</script>

<style>
    .list{
        width: 96%;
        margin: 0 auto;
        padding: 1rem 0 1rem 0;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .list>img{
        width: 16%;
        border-radius: 0.5rem;
    }
    .txt{
        margin-left: 1rem;
    }
    .txt>p:nth-child(1){
        font-size: 1.5rem;
        text-align: left;
        font-weight: bold;
    }
    .txt>p:nth-child(2){
        font-size: 1rem;
        text-align: left;
    }
</style>