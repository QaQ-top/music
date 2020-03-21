<template>
    <div>
        <span class="icon iconfont icon-tubiaozhizuomoban" @click="list"></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        list(){
            console.log('list______________________')
        }
    },
}
</script>

<style scoped>
    span{
        font-size: 3.5rem;
        color: rgb(100, 100, 100);
    }
</style>