<template>
    <div>
        <my-prev-nav class="search" :tabRoutePath='routePath'>
            <div slot="prev_center">
                <span class="iocn iconfont icon-iconfonticonfontsousuo1 search_icon"></span>
                <input type="text" v-model="keyword" placeholder="搜索音乐、歌手、歌单" ref="inpKeyWord" v-focus/>
                <span class="iocn iconfont icon-yduicuowukongxin" v-if='isX' @click='inpNull'></span>
            </div>
        </my-prev-nav>

        <!-- 'single','singer','album','songList' -->

        <search-router single='单曲' singer='歌手' album='专辑' songList='歌单' v-if='isSearch'>
        </search-router>
        <router-view v-if='isSearch'></router-view>
        <coll txt='历史记录' v-if="!isSearch">
            <div slot="dom">
                
            </div>
        </coll>

        <coll txt='热门推荐' v-if="!isSearch">
            <div slot="dom" class="heat_box">
                <mt-cell :title="item.name" :label="item.content" v-for="(item, index) in heatTG" :key="index" @click.native="search(item.name)">
                    <div>{{item.heat}}</div>
                    <div slot="icon">{{index+1}}</div>
                </mt-cell>
            </div>
        </coll>

        <div class="search_result" v-if="ismohu">
            <!-- song single album singer songList MV lyric FM video -->
            <div v-for="(item, index) in searchData" :key="index" @click="search(item.name)">
                <span class="icon iconfont icon-iconfonticonfontsousuo1 sousuo_img"></span>
                <span class="sousuo_text">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>


<script>
import myPrevNav from '../components/back_prev'
import coll from '../components/coll'
import {mapActions} from 'vuex'
import searchRouter from '../components/search_router'
export default {
    name:'search',
    data () {
        return {
            keyword:null,
            searchData:[],
            isSearch:false, //路由默认不显示 默认热门推荐是否显示
            heatTG:[],
            routePath:null,
            isX:false ,//搜索框 一键清空 是否显示
            ismohu:false //显示模糊搜索列表
        }
    },
    methods: {
        inpNull(){
            this.keyword='' //搜索框 一键清空;
            this.$store.state.searchVal = null;
        },
        search(key){
             this.isSearch = true;
             this.$store.state.searchVal = key; //将点击的cell的name存入vuex
             this.keyword = key;
             this.ismohu = false; //隐藏模糊搜索列表
             this.$router.push('/search/single')
        }
    },
    watch:{
        async keyword(){
            // this.$store.state.searchKey = null;
            if((this.keyword===''||this.keyword===' ')){
                this.ismohu = false; //显示模糊搜索列表
                this.isX = false; //隐藏一键删除
                this.isSearch = false; //关闭二级路由
                this.searchData = [];
                return
            }else{
                this.isX = true //显示一键删除
                if(this.keyword===this.$store.state.searchVal){
                    this.ismohu = false; //隐藏模糊搜索列表
                    return
                }
                this.ismohu = true; //隐藏模糊搜索列表
                let data = await this.$ajax.searchMH(this.keyword) //api 模糊搜索 input 内的值发生改变的时候 触发
                var arr = []; 
                data.result.songs.map(item=>{
                    arr.push({
                        name:item.name,
                        id:item.id
                    })
                });
                this.searchData = [...arr]
            }
        }
    },
    mounted() {
        this.$ajax.heat().then(res=>{  //热门推荐
            var arr = []; 
            res.data.map(item=>{
                arr.push({
                    name:item.searchWord,
                    heat:item.score,
                    content:item.content
                })
            });
            this.heatTG = [...arr]
        }),
        this.routePath = this.$store.state.route //接收mysearch组件传递过来的routeName
    },
    components: {
        coll,myPrevNav,searchRouter
    },
    activated() {

        
    }
}
</script>

<style>
    .search>div{
        width: 80%;
        height: 2rem;
        background: white;
        border-radius:2rem;
        display:flex;
        align-items: center;
    }
    .search input{
        width:80%;
        border: none;
        outline: none;
        height: 2rem;
    }
    .search_icon{
        font-size: 2rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .search_result{
        width: 100%;
        position:fixed;
        top:4rem;
        background: white;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 4rem;
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
        font-size:2.5rem;
        margin-left: 1rem;
    }
    .sousuo_text{
        font-size:2rem;
    }
    .heat_box{
        width: 100%;
        background:rgb(252,252,252);
        margin-top:1rem;
        padding-bottom:48px
    }
    .heat_box .mint-cell-wrapper{
        background: rgb(252,252,252);
        padding: 0;
    }
    .heat_box .mint-cell-value{
        font-size: 1.7rem;
        margin-right: 10px
    }
    .heat_box .mint-cell-text{
        display: inline-block;
        width: 100%;
        font-size: 2rem;
        text-align: left;
    }
    .heat_box .mint-cell-label{
        text-align: left;
        font-size: 10px
    }
    .heat_box .mint-cell-title{
        box-sizing: border-box;
        padding-left: 3rem;
        position: relative;
    }
    .heat_box .mint-cell-title div{
        position: absolute;
        left: 0;
        width:3rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
    }
</style>