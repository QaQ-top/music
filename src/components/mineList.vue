<template>
    <div>
       <div class="list">
           <div>
               <div class="icon">
                   <span class="iconfont icon-jinrituijian"></span>
               </div>
               <p>
                   我的电台
               </p>
           </div>
           <div>
               <div class="icon">
                   <span class="iconfont icon-yinle2"></span>
               </div>
               <p>
                   我的收藏
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