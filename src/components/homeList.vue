<template>
    <div>
       <div class="list">
           <router-link :to="{name:'red',query:{routePath:this.$route.path}}" tag="div">
               <div class="icon">
                   <span class="iconfont icon-jinrituijian"></span>
               </div>
               <p>
                   每日推荐
               </p>
           </router-link>
           <router-link :to="{name:'sl',query:{routePath:this.$route.path}}" tag="div">
               <div class="icon">
                   <span class="iconfont icon-yinle2"></span>
               </div>
               <p>
                   歌单
               </p>
           </router-link>
           <router-link :to="{name:'rank',query:{routePath:this.$route.path}}" tag="div">
               <div class="icon">
                   <span class="iconfont icon-xingxiaoxiaoguo"></span>
               </div>
               <p>
                   排行榜
               </p>
           </router-link>
           <router-link :to="{name:'dj',query:{routePath:this.$route.path}}" tag="div">
               <div class="icon">
                   <span class="iconfont icon-diantai"></span>
               </div>
               <p>
                   电台
               </p>
           </router-link>
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
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #007aff;
        line-height: 4rem;
        color:white;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .icon>span{
        font-size: 2.5rem;
        line-height: 5rem;
    }
    .list p{
        font-size: 1.5rem;
        line-height: 2rem;
        margin-top: 1rem;
    }
</style>