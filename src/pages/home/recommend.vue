<template>
    <div class="box">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>每日推荐</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div class="imgBox">
            <img v-lazy="imgBack">
        </div>
        <div class="songBox">
            <div v-for="(item, index) in song.details" :key="index" class="song">
                <img v-lazy="item.album.blurPicUrl">
                <div class="txt">
                    <p>{{item.name}}</p>
                    <p>{{item.artists[0].name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev'
export default {
    name:'red',
    data(){
        return {
            song:{
                data:[],
                details:[],
            },
            routePath:null,
            imgBack:'',
        }
    },
    computed:{
        
    },
    components:{
        myPrevNav
    },
    created(){
        this.routePath = this.$route.query.routePath;
        this.$request.redSong().then(res=>{
            this.SongArray(res.recommend,this.song.data)
            this.song.details = res.recommend;
            console.log(res.recommend)
            this.imgBack = this.song.details[0].album.blurPicUrl;
        })
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .box{
        height: 100%;
        
    }
    .song{
        width: 96%;
        height: 7rem;
        margin: 0 auto;
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 0.5rem 0 0.5rem 0;
        position: relative;
        z-index: 10;

    }
    .song img{
        width: 7rem;
        border-radius: 1rem;
        margin-right: 1rem;
        height: 100%;
    }
    .songBox{
        width: 100%;
        box-sizing: border-box;
        padding: 2rem 0 0 0;
        border-radius: 2rem 2rem 0 0;
        margin-top:-30rem;
        background-color: white;
    }
    .imgBox img{
        width: 100%;
        position: relative;
        z-index: -1;
    }
    .name{
        display: block;
        width: 70%;
        text-align: left;
    }
    .txt{
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:flex-start;
    }
    .txt>p:nth-child(1){
        font-size: 1.5rem;
        font-weight: bold;
    }
    .txt>p:nth-child(2){
        font-size: 1rem;
        color: #888;
    }
</style>