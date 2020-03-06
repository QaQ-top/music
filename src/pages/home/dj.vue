<template>
    <div class="box">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>电台</span>
            </div>
            <span slot='prev_right'>
            </span>
        </my-prev-nav>
        
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev'
export default {
    name:'red',
    data(){
        return {
            routePath:null,
        }
    },
    computed:{
        
    },
    components:{
        myPrevNav
    },
    created(){
        this.routePath = this.$route.query.routePath;
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
    }
</style>