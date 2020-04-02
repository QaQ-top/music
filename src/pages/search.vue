<template>
    <div :class="{searchBox:isSearch}">
        <my-prev-nav class="search" :tabRoutePath='routePath'>
            <div slot="prev_center">
                <span class="iocn iconfont icon-iconfonticonfontsousuo1 search_icon"></span>
                <input type="text" v-model="keyword" placeholder="搜索音乐、歌手、歌单" ref="inpKeyWord" v-focus @keydown="enter"/>
                <span class="iocn iconfont icon-yduicuowukongxin" v-if='isX' @click='inpNull'></span>
            </div>
        </my-prev-nav>

        <!-- 'single','singer','album','songList' -->

        <search-router single='单曲' singer='歌手' album='专辑' songList='歌单' v-if='isSearch'>
        </search-router>
        <router-view v-if='isSearch'></router-view>
        <coll txt='热门搜索' v-if="!isSearch">
            <div slot="dom" class="heat_boxs">
                 <div v-for="(item, index) in hotSearchKey" :key="index" @click="search(item.first,true)">
                     {{item.first}}
                </div>
            </div>
        </coll>

        <coll txt='热门推荐' v-if="!isSearch">
            <div slot="dom" class="heat_box">
                <mt-cell :title="item.name" :label="item.content" v-for="(item, index) in heatTG" :key="index" @click.native="search(item.name,true)">
                    <div>{{item.heat}}</div>
                    <div slot="icon">{{index+1}}</div>
                </mt-cell>
            </div>
        </coll>

        <div class="search_result" v-if="ismohu">
            <!-- song single album singer songList MV lyric FM video -->
            <div v-for="(item, index) in searchData" :key="index" @click="search(item.name,true)">
                <span class="icon iconfont icon-iconfonticonfontsousuo1 sousuo_img"></span>
                <span class="sousuo_text">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>


<script>
import myPrevNav from '../components/back_prev'
import coll from '../components/coll'
import { mapState,mapActions,mapGetters} from 'vuex'
import searchRouter from '../components/search_router'
export default {
    name:'search',
    //-------------------
    components: {
        coll,myPrevNav,searchRouter
    },
    //-------------------
    data () {
        return {
            keyword:null,
            searchData:[],
            isSearch:false, //路由默认不显示 默认热门推荐是否显示
            heatTG:[],
            routePath:null,
            isX:false ,//搜索框 一键清空 是否显示
            ismohu:false, //显示模糊搜索列表
            isHuo:false,
            hotSearchKey:[]
        }
    },
    //--------------------
    computed:{
        
    },
    //--------------------
    methods: {
        enter(ev){
            let e = ev||window.event
            if(e.key==='Enter'){
                this.search(this.keyword)
            }
        },
        inpNull(){
            this.isSearch = false;
            this.keyword='' //搜索框 一键清空;
            this.$store.state.searchVal = null;
        },
        search(key,booler=false){
             this.isHuo = booler
             this.isSearch = true;
             this.$store.state.searchVal = key; //将点击的cell的name存入vuex
             this.keyword = key;
             this.ismohu = false; //隐藏模糊搜索列表
             this.$router.push('/search/single')
        }
    },


    //--------------------------
    watch:{
        async keyword(){
            if(!this.keyword){
                this.ismohu = false; //隐藏模糊搜索列表
                this.isX = false; //隐藏一键删除
                this.searchData = [];
                this.isSearch = false;
                this.isHuo = false
                return
            }else{
                if(this.isHuo){
                    this.ismohu = false; //隐藏模糊搜索列表
                    this.isSearch = true;
                }else{
                    this.ismohu = true; //显示模糊搜索列表
                    this.isSearch = false; //关闭二级路由
                }
                this.isX = true //显示一键删除
                let data = await this.$request.searchMH(this.keyword) //api 模糊搜索 input 内的值发生改变的时候 触发
                var arr = []; 
                data.result.songs.map(item=>{
                    arr.push({
                        name:item.name,
                        id:item.id
                    })
                });
                this.searchData = [...arr]
                this.isHuo = false
            }
        }
    },
    //-------------------------
    created() {
        this.$request.heat().then(res=>{  //热门推荐
            var arr = []; 
            res.data.map(item=>{
                arr.push({
                    name:item.searchWord,
                    heat:item.score,
                    content:item.content
                })
            });
            this.heatTG = [...arr]
        })
        this.routePath = this.$store.state.search.path;

        this.$request.HotSearchKey().then(res=>{
            this.hotSearchKey.push(...res.result.hots);
        })
    }
    
}
</script>

<style scoped>
    .searchBox{
        padding-top:6.3rem;
    }
    .search>div{
        width: 80%;
        height: 3rem;
        background: white;
        border-radius:3rem;
        display:flex;
        align-items: center;
    }
    .search input{
        width:80%;
        border: none;
        outline: none;
        height: 3rem;
    }
    .search_icon{
        font-size: 2rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .search_result{
        width: 100%;
        position:fixed;
        top:6rem;
        background: white;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 12rem;
        overflow:scroll;
    }
    .search_result div{
        overflow: hidden;
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: left;
    }
    .sousuo_img{
        font-size:2rem;
        margin-left: 1rem;
    }
    .sousuo_text{
        font-size:1.6rem;
    }
    .heat_box{
        width: 100%;
        /* background:rgb(252,252,252); */
        margin-top:1rem;
        padding-bottom:48px
    }
    .heat_box >>> .mint-cell {
        height: 6rem;
        /* background: rgb(252,252,252); */
    }
    .heat_box >>> .mint-cell-wrapper{
        /* background: rgb(252,252,252); */
        padding: 0;
    }
    .heat_box >>> .mint-cell-value{
        font-size: 1.7rem;
        margin-right: 10px
    }
    .heat_box >>> .mint-cell-text{
        display: inline-block;
        width: 100%;
        font-size: 1.7rem;
        text-align: left;
    }
    .heat_box >>> .mint-cell-label{
        text-align: left;
        font-size: 1.3rem;
    }
    .heat_box >>> .mint-cell-title{
        font-size: 1.3rem;
        box-sizing: border-box;
        padding-left: 3rem;
        position: relative;
    }
    .heat_box >>> .mint-cell-title div{
        position: absolute;
        left: 0;
        width:3rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
    }
    .icon-yduicuowukongxin{
        font-size: 2rem
    }
    .heat_boxs{
        width: 96%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: center;
    }
    .heat_boxs>div{
        padding: 0.5rem 1rem;
        margin: .5rem;
        font-size: 1.2rem;
        border-radius: 2.2rem;
        background-color:rgb(250,250,250);

    }
</style>