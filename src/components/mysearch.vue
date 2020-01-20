<template>
    <div class="mySearch" @click="search()">
        <span class="icon iconfont icon-iconfonticonfontsousuo1"></span>
        {{txt}}
    </div>
</template>

<script>
export default {
    name:'search',
    data () {
        return {
            
        }
    },
    props: ['txt'],
    methods: {
        search(){
            this.$router.push({
                name:"search"
            })
        }
    },
}
</script>

<style>
    .mySearch{
        font-size: 1.5rem;
        background: white;
        width:20rem;
        height: 2rem;
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