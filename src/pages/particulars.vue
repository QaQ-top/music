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
import { mapGetters } from 'vuex';
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
    computed:{
        ...mapGetters(['getAudioData'])
    },
    components:{
        myPrevNav
    },
    mounted() {
        
    },
    activated(){
        this.routePath = this.$route.params.routePath;
        if(this.getAudioData.type==='new'){
            console.log(this.getAudioData.type)
            this.getAudioData.type = 'used'
            
        }  
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