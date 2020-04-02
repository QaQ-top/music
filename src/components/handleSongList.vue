<template>
  <div @touchmove.prevent @mousewheel.prevent>
       <transition name="handle">
      <div v-if="this.$store.state.isSongBox" class="songBox">
            <div class="iocn iconfont icon-jiantou-zuo-cuxiantiao" @touchend='isSongBox'>
            </div>
            <div class="builb">
                    <div v-for="(item, index) in this.$store.state.mySongList" :key="index" class="builblist" @click="listAdd(item.id)">
                        <img v-lazy="item.coverImgUrl" class="lazy">
                        <div>
                            <h3>{{item.name}}</h3>
                            <p>{{item.trackCount}} 首</p>
                        </div>
                    </div>
                </div>
        </div>
         </transition>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name:'handle',
    data() {
        return {

        }
    },
    computed:{
        ...mapState(['songListData'])
    },
    methods:{
        ...mapActions(['add']),
        listAdd(id){
            this.songListData.listId = id;
            this.add();
        },
        isSongBox(){
            setTimeout(() => {
                this.$store.state.isSongBox = false;
            }, 100);
        },
    }
}
</script>

<style scoped>
.songBox{
        overflow: scroll;
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        background-color: white;
    }
    .builb{
        width: 96%;
        margin: 5rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .builb>div{
        width: 45%;
        margin-top: 1rem;
        display: flex;
        justify-content: left;
        text-align: left;
    }
    .builb>div>img{
        width:35%;
        border-radius: 1rem;
    }
    .builb>div>div{
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: left;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .icon-jiantou-zuo-cuxiantiao{
        font-size: 4rem;
        color: rgb(0, 0, 0);
        position: absolute;
        top:0.5rem;
        left: 1rem;
    }
    .builblist h3{
        font-size: 1.8rem;
        line-height: 4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .builblist p{
        font-size: 1.2rem;
        line-height: 4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .circle h3,builb h3{
        font-size: 1.8rem;
        line-height: 4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>