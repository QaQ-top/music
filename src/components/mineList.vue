<template>
    <div>
       <div class="list">
           <div @touchend="like" @touchstart="startDev">
               <div class="icon">
                   <span class="iconfont icon-aixin"></span>
               </div>
               <p>
                   我喜欢的音乐
               </p>
           </div>
           <div @touchend="abme" @touchstart="startDev">
               <div class="icon">
                   <span class="iconfont icon-yinle2"></span>
               </div>
               <p>
                  收藏专辑
               </p>
           </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:'homeList',
    data() {
        return {
            strat:null,
        }
    },
    methods:{
        startDev(){
            this.strat = new Date()
        },
        like(){
            let date = new Date()
            if(date-this.strat<200){
              	this.$emit('like')
            }
        },
        abme(){
            let date = new Date()
            if(date-this.strat<200){
              	this.$emit('abme')
            }
        }
    }
}
</script>

<style scoped>
    .list{
        width: 100%;
        box-sizing: border-box;
        padding: 4%;
        padding-top:7rem;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .list>div{
        width: 35%;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .icon>span{
        font-size: 3rem;
    }
    .list p{
        font-size: 1.5rem;
        line-height: 2rem
    }
</style>