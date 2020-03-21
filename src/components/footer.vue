<template>
    <div>
        <div class="foot" v-if="isFoot">
            <router-link to="/musicG" tag="div" active-class="font-color">
                <p><span class=" iconfont icon-yinyue"></span></p>
                <p>{{musicG}}</p>
            </router-link>
            <router-link to="/recommend" tag="div" active-class="font-color">
                <p><span class="iconfont icon-jinrituijian"></span></p>
                <p>{{recom}}</p>
            </router-link>
            <router-link to="/dynamic" tag="div" active-class="font-color">
                <p><span class="iconfont icon-changge"></span></p>
                <p>{{dynamic}}</p>
            </router-link>
            <router-link to="/mine" tag="div" active-class="font-color">
                <p><span class="iconfont icon-wode1"></span></p>
                <p>{{mine}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'myFooter',
    data () {
        return {
            isFoot:true
        }
    },
    watch: {
        "$route":function () {
            let ret = ['musicG','recommend','dynamic','mine']
            this.isFoot = ret.includes(this.$route.name)
        }
    },
    props:['musicG','recom','dynamic','mine']
}
</script>

<style scoped>
    .foot{
        width: 100%;
        height: 6.3rem;
        padding:0.3rem;
        box-sizing: border-box;
        display: flex;
        position: fixed;
        bottom: 0;
        background: white;
        border-top:1px solid rgb(241, 240, 240);
        z-index: 1000;
        font-size: 1.2rem
    }
    .foot>div{
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .font-color{
        color:rgb(64,158,255)
    }
    .foot span{
        font-size: 2.2rem
    }
</style>