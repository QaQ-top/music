<template>
    <div class="mySearch" @touchstart="startDev" @touchend="searchs">
        <span class="icon iconfont icon-iconfonticonfontsousuo1"></span>
        {{txt}}
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'search',
    data () {
        return {
            strat:null,
        }
    },
    computed:{
        ...mapState(['search'])
    },
    props: ['txt'],
    methods: {
        startDev(){
            this.strat = new Date()
        },
        searchs(){
            let date = new Date()
            if(date-this.strat<200){
              	this.search.path = this.$route.path
                this.$router.push({
                    name:"search",
                })
            }
        }
    },
}
</script>

<style scoped>
    .mySearch{
        font-size: 1.5rem;
        background: white;
        width:20rem;
        height: 2.5rem;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mySearch span:nth-child(1){
        margin-right: 0.5rem;
        vertical-align: middle;
    }
    .icon-iconfonticonfontsousuo1{
        font-size: 2rem
    }
</style>