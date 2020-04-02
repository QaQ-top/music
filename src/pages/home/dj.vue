<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>推荐电台</span>
            </div>
            <span slot='prev_right'>
            </span>
        </my-prev-nav>
        <div class="dj">
            <dj-list-type :arr='arr' @esName='viet' @transmission='creat'>

            </dj-list-type>

            <div class="clity">
                <div v-for="(item, index) in prci" :key="index" class="djDst" @touchstart="details(item.id)">
                    <img v-lazy='item.picUrl'  class="lazy">
                    <div class="txt">
                        <p>{{item.lastProgramName}}</p>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev';
import djListType from '../../components/djListType';

export default {
    name:'dj',
    data(){
        return {
            routePath:null,
            arr:[],
            prci:[]
        }
    },
    computed:{
        
    },
    components:{
        myPrevNav,
        djListType
    },
    methods: {
        viet(id){
            this.$request.djs(id).then(res=>{
                this.prci = res.djRadios
            })
        },
        creat(id){
            this.$request.djs(id).then(res=>{
                this.prci = res.djRadios
            })
        },
        details(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:1009,
                    path:this.$route.path
                }
            })
        }
    },
    created(){
        this.$request.djType().then(res=>{
            this.arr = res.categories
        })
        this.routePath = this.$route.query.routePath;
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .dj{
        width: 96%;
        margin: 0 auto;
    }
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.7rem;
    }
    .clity{
        padding-top: 7rem;
    }
    .djDst{
        height: 7rem;
        display:flex;
        justify-content: left;
        align-items: center;
        padding: 0.5rem 0 0.5rem 0;
    }
    .djDst>img{
        width: 7rem;
        height: 100%;
        border-radius: 1rem;
        margin-right: 1rem;
    }
    .txt{
        height: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .txt>p{
        font-size: 1.7rem;
        font-weight: bold;
    }
    .txt>span{
        font-size: 1rem;
        color: #888;
    }
</style>