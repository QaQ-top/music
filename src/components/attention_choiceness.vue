<template>
    <div class="_ke">
        <div class="atteChoi">
            <span @touchstart="startDev" @touchend="denisleft">{{txt_1}}</span>
            <span @touchstart="startDev" @touchend="denisright">{{txt_2}}</span>
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
            right:false,
            strat:null
        }
    },
    props:['txt_1','txt_2'],
    methods: {
        startDev(){
            this.strat = new Date()
        },
        denisleft(){
            let date = new Date()
            if(date-this.strat<200){
                this.left = true;
                this.right = false;
                this.$emit('chengar',this.left)
            }
        },
        denisright(){
            let date = new Date()
            if(date-this.strat<200){
                this.left = false;
                this.right = true;
                this.$emit('chengar',this.left)
            }
        }
    },
}
</script>

<style scoped>
    ._ke{
        width: 15rem;
        display: flex;
        justify-content: center;
        border-left: 2.5rem;
        border-right: 2.5rem;
        border-color: transparent;
        border-style: solid;
    }
    .atteChoi{
        width: 20rem;
        height: 2.5rem;
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
        line-height: 2.5rem;
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