<template>
    <div class="prev">
        <span class="iocn iconfont icon-jiantou-zuo-cuxiantiao" @click="toTab()"></span>
        <slot name="prev_center"></slot>
        <slot name="prev_right"></slot>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'backPrev',
    data() {
        return {
            
        }
    },
    computed:{
        ...mapGetters(['getFooterRoute'])
    },
    props:['tabRoutePath'],  //父组件传递过来的routeName
    methods:{
        toTab(){
            this.$router.push({
                path:this.tabRoutePath
            })
        }
    }
}
</script>

<style>
    .prev{
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        top:0;
        background:rgb(252,252,252);
        z-index: 9999;

    }
    .icon-jiantou-zuo-cuxiantiao{
        font-size: 4.5rem;
    }
    
</style>