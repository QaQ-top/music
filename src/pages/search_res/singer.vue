<template>
    <div>
        <div v-for="(item, index) in singerList" :key="index" class="blurb">
            <img :src="item.img1v1Url" alt="">
                <span>
                    {{item.name}}
                </span>
            <div>
                <span class="iconfont icon-heart" v-if="!item.followed"></span>
                <span class="iconfont icon-heart-fill" v-if="item.followed"></span>
            </div>
        </div>        
    </div>
</template>

<script>

export default {
    name:'singer',
    data() {
        return {
            singerList:[]
        }
    },
    methods:{
        
    },
    mounted(){
       this.$request.singer(this.$store.state.searchVal,0).then(res=>{
            this.singerList = res.result.artists
        })
    }
}
</script>

<style scoped>
    .blurb{
        width: 96%;
        margin: 0 auto;
        display: flex;
        padding: 1rem 0 1rem 0;
        justify-content: left;
        align-items: center;
        position: relative;
    }
    .blurb img{
        width: 15%;
        border-radius: 50%;
        margin-right: 2rem;
    }
    .blurb>div{
        position: absolute;
        right: 1rem;
    }
    .blurb .iconfont{
        color: red;
    }
</style>