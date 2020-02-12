<template>
    <div>
       <div class="list">
           <div>
               <div class="icon">
                   <span class="iconfont icon-jinrituijian"></span>
               </div>
               <p>
                   每日推荐
               </p>
           </div>
           <div>
               <div class="icon">
                   <span class="iconfont icon-yinle2"></span>
               </div>
               <p>
                   歌单
               </p>
           </div>
           <div>
               <div class="icon">
                   <span class="iconfont icon-xingxiaoxiaoguo"></span>
               </div>
               <p>
                   排行榜
               </p>
           </div>
           <div>
               <div class="icon">
                   <span class="iconfont icon-diantai"></span>
               </div>
               <p>
                   电台
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
            
        }
    },
}
</script>

<style scoped>
    .list{
        width: 100%;
        box-sizing: border-box;
        padding: 4%;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .list>div{
        flex: 1;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .list .icon{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #007aff;
        line-height: 4rem;
        color:white;
    }
    .icon>span{
        font-size: 3rem;
    }
    .list p{
        font-size: 1.5rem;
        line-height: 2rem
    }
</style>