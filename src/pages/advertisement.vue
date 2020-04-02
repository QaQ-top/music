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
            活动与直播正在努力开发中！
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev';
import { MessageBox } from 'mint-ui';
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
    created(){
    },
    activated() {
        MessageBox.alert('活动与直播正在努力开发中~').then(action => {
            window.history.back();
        });
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