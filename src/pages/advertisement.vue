<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>活动详情</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div class="advertisement">
            活动已过期！
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev';
export default {
    name:'advertisement',
    data(){
        return {
           type:'',
           routePath:'/musicG',
        }
    },
    components:{
        myPrevNav
    },
    methods: {
        
    },
    activated() {
        console.log(this.$route.params)
        
    },
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
</style>