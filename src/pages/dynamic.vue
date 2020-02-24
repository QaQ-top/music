<template>
    <div>
        <top-nav txt='歌手'>
            <atte-choi slot="cun" txt_1='精选' txt_2='关注' @chengar='breha'>

            </atte-choi>
            <span class="icon iconfont icon-tubiaozhizuomoban" slot="icon"></span>
        </top-nav>
        <div class="switchs"
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        >
            <div v-if="switchs">
                <watch-slides @esid='visit' @created='Obtain'>

                </watch-slides>
                <div v-for="(item, index) in singerList" :key="index" class="blurb">
                    <img :src="item.img1v1Url" alt="">
                    <span>
                        {{item.name}}
                    </span>
                    <!-- <div>
                        <span class="iconfont icon-heart" v-if="!item.followed"></span>
                        <span class="iconfont icon-heart-fill" v-if="item.followed"></span>
                    </div> -->
                </div>
            </div>
            <div v-if="!switchs" @click="logStatus">
                <div v-for="(item, index) in likeList" :key="index" class="blurb">
                    <img :src="item.img1v1Url" alt="">
                    <span>
                        {{item.name}}
                    </span>
                    <!-- <div>
                        <span class="iconfont icon-heart" v-if="!item.followed"></span>
                        <span class="iconfont icon-heart-fill" v-if="item.followed"></span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import atteChoi from '../components/attention_choiceness'
import watchSlides from '../components/watchSlides';
import {mapState} from 'vuex'
/**
 * 弹框
 */
import { MessageBox } from 'mint-ui';

export default {
    name:"dynamic",
    data () {
        return {
            nr:"动态",
            switchs:true,
            arr:[],
            singerList:[],
            likeList:[],
            cat:null,
            offset:1,
            loading:true,
            load:true,
            messBox:false
        }
    },
    computed:{
        ...mapState(['cookie'])
    },
    components: {
        topNav,atteChoi,watchSlides
    },
    methods: {
        visit(id){
            this.cat = id;
            this.$request.artist(this.cat).then(res=>{
                this.singerList = res.artists;
            });
        },
        breha(bol){
            this.switchs = bol;
           
            if(!bol){
                let isLogin = this.cookieKey().includes('MUSIC_U')
                if(isLogin){
                    this.$request.sublist().then(res=>{
                        this.likeList = res.data;
                    })
                }else{
                    if(this.messBox) return
                    MessageBox.confirm('您还没有登录，是否前往登录？').then(action => {
                        this.$router.push({
                            path:'/login'
                        })
                    })
                    this.messBox = true;
                }
                
            }
        },
        Obtain(id){ //监听子组件数据加载后
            this.cat = id;
            this.$request.artist(this.cat).then(res=>{
                this.singerList = res.artists;
            });
        },
        loadMore() {
            if(!this.load) return
            this.offset++;
            this.loading = true;
            // console.log(this.offset)
            this.$request.artist(this.cat,this.offset).then(res=>{
                this.loading = false;
                for(let i of this.singerList){
                    let index = res.artists.findIndex(item=>item.name===i.name);
                    if(index>=0){
                        res.artists.splice(index,1);
                    }
                }
                this.singerList.push(...res.artists);
            });
        },
        logStatus(){
            this.$request.logStatus().then(res=>{
                console.log(res)
            });
        }
    },
    activated(){
        this.load = true;
    },
    deactivated(){
        this.load = false;
    }
    
}
</script>

<style>
    .switchs {
        width: 96%;
        margin: 0 auto;
    }
    .blurb{
        display: flex;
        padding: 1rem 0 1rem 0;
        justify-content: left;
        align-items: center;
    }
    .blurb img{
        width: 15%;
        border-radius: 50%;
        margin-right: 2rem;
    }
</style>