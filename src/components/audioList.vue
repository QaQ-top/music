<template>
    <div class="listBox">
        <span class="icon iconfont icon-tubiaozhizuomoban" @click="list"></span>
        <mt-popup
        v-model="visible"
        position="right"
        lockScroll="trun"
        >
        <div class="nav">
            歌曲列表
        </div>
        <div v-for="(item, index) in audio.arr" :key="index" class="list" :class="{isback:item.id===audio.id}" @touchstart.stop="startDev" @touchend.stop="newSrcDev(item)">
            {{item.name}}
        </div>
        </mt-popup>
    </div>
    
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return {
            visible:false,
            strat:null
        }
    },
    computed:{
        ...mapState(['audio'])
    },
    methods: {
        ...mapActions(['newSrc']),
        
        startDev(){
            this.strat = new Date()
        },
        list(){
            this.visible = true
        },
        newSrcDev(i){
            let date = new Date()
            if(date-this.strat<200){
               this.newSrc(i)
            }
            
        }
    },
}
</script>

<style scoped>
    span{
        font-size: 3.5rem;
        color: rgb(100, 100, 100);
    }
    .listBox >>> .mint-popup,.mint-popup-right {
        width:60%;
        height: 100%;
        background-color: rgb(250,250,250);
        overflow: scroll;
        z-index: 10000;
    }
    .nav{
        width: 100%;
        height: 6rem;
        font-size: 1.7rem;
        font-weight: bold;
        line-height: 4rem;
        text-align: left;
        box-sizing: border-box;
        padding: 1rem;
        box-shadow: 0 0 1rem -0.68rem #000;
        background-color: white;
        position: sticky;
        top: 0;
        right: 0;
    }
    .list{
        width: 100%;
        height: 5rem;
        box-sizing: border-box;
        font-size: 1.5rem;
        line-height: 3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 1rem;
        overflow: hidden;
        text-align: left;
        margin: 0.5rem 0;
        background-color: white;
    }
    .isback{
        color: white;
        background-color: rgb(68, 158, 255);
    }
</style>