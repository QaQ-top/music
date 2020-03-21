<template>
    <div class="topNav">
        <h1>{{txt}}</h1>
        <slot name="cun"></slot>
        <slot name='icon'></slot>
    </div>
</template>

<script>
export default {
    name:'topNav',
    data () {
        return {
            
        }
    },
    props:{
        'txt':{
            defaukt:''
        }
    }
}
</script>

<style scoped>
.topNav{
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgb(252,252,252);
    position: fixed;
    top:0;
    z-index: 9999;
}
.topNav h1:nth-child(1){
    font-size: 2.5rem;
    color:#000
}
.topNav span:nth-child(3){
    font-size: 3.5rem;
    color: rgb(100, 100, 100);
}
</style>