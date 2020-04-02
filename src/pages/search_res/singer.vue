<template>
    <div>
        <div v-for="(item, index) in singerList" :key="index" class="blurb" @click="details(item.id)">
            <img v-lazy='item.img1v1Url'  class="lazy">

                <span class="name">
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
        details(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:100,
                    path:this.$route.path
                }
            })
        }
    },
    created(){
       this.$request.singer(this.$store.state.searchVal,0).then(res=>{
            this.singerList = res.result.artists
        })
    }
}
</script>

<style scoped>
    .blurb{
        width: 96%;
        height: 8rem;
        margin: 0 auto;
        display: flex;
        padding: 1rem 0 1rem 0;
        justify-content: left;
        align-items: center;
        position: relative;
        font-size:1.7rem;
    }
    .blurb img{
        width: 8rem;
        height: 8rem;
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
    .name{
        white-space: nowrap;
    }
</style>