<template>
    <div class="prev">
        <span class="iocn iconfont icon-jiantou-zuo-cuxiantiao" @touchstart="startDev" @touchend="toTab()"></span>
        <slot name="prev_center"></slot>
        <slot name="prev_right"></slot>
    </div>
</template>

<script>
export default {
    name:'backPrev',
    data() {
        return {
            strat:null
        }
    },
    props:['tabRoutePath'],  //父组件传递过来的routeName
    methods:{
        startDev(){
            this.strat = new Date()
        },
        toTab(){
            let date = new Date()
            if(date-this.strat<200){
              this.$router.push({
                path:this.tabRoutePath
            })	
            }
        }
    }
}
</script>

<style scoped>
    .prev{
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        top:0;
        background:rgb(252,252,252);
        z-index: 999;
        font-size: 2rem;

    }
    .icon-jiantou-zuo-cuxiantiao{
        font-size: 4rem;
    }
    
</style>