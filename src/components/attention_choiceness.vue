<template>
    <div class="_ke">
        <div class="atteChoi">
            <span @click="isleft()">{{txt_1}}</span>
            <span @click="isright()">{{txt_2}}</span>
            <div :class="{di_back_left:left,di_back_right:right}" class="di_back"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'atteChoi',
    data () {
        return {
            left:true,
            right:false
        }
    },
    props:['txt_1','txt_2'],
    methods: {
        isleft(){
            this.left = true;
            this.right = false;
            this.$emit('chengar',this.left)
        },
        isright(){
            this.left = false;
            this.right = true;
            this.$emit('chengar',this.left)
        }
    },
}
</script>

<style>
    ._ke{
        width: 15rem;
        display: flex;
        justify-content: center;
    }
    .atteChoi{
        width: 20rem;
        height: 2rem;
        background:rgb(235,235,235);
        display: flex;
        justify-content:space-around;
        align-items: center;
        position: relative;
        border-radius: 2rem;
    }
    .atteChoi span{
        flex: 1;
        font-size: 1.4rem;
        height: 100%;
        line-height: 2rem;
        position: relative;
        z-index: 2;
    }
    .di_back{
        transition: all ease 0.2s
    }
    .di_back_left{
        background: white;
        width: 50%;
        height: 100%;
        position: absolute;
        left:0;
        z-index: 1;
        border-radius: 2rem;
    }
    .di_back_right{
        background: white;
        width: 50%;
        height: 100%;
        position: absolute;
        left:50%;
        z-index: 1;
        border-radius: 2rem;
    }
</style>