<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="music_name">
                <span>{{musicName}}</span>
            </div>
            <span slot='prev_right' class="icon iconfont icon-diandiandianshu dian_part"></span>
        </my-prev-nav>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev'
export default {
    name:'particulars',
    data() {
        return {
            musicName:'歌名',
            routePath:''
        }
    },
    watch:{
        
    },
    components:{
        myPrevNav
    },
    mounted() {
        
    },
    activated(){
        this.routePath = this.$route.params.routePath
    }
}
</script>

<style>
    .music_name{
        width: 65%;
        text-align: left;
        padding-left: 1%;
        padding-right: 1%;
    }
    .dian_part{
        font-size: 4.1rem
    }
</style>