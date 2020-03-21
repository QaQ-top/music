<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>{{title}}</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div class="songBox">
            
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev';
export default {
    name:'songBox',
    data(){
        return {
           routePath:'/musicG',
           title:''
        }
    },
    components:{
        myPrevNav
    },
    methods: {
        
    },
    activated() {
        let params = this.$route.params;
        this.routePath = params.path
        if(params){
            let mtd = this.Type.find(i=>params.targetType===i.type);
            this.title = mtd.name;
            mtd.request(params.id).then(res=>{
                switch (mtd.type) {
                    case 10: //专辑
                        console.log(res)
                        break;

                    case 100: //歌手
                        console.log(res)
                        break;

                    case 1000: //歌单
                        console.log(res)
                        break;

                    case 1009: //电台
                        console.log(res)
                        break;

                    default:
                        break;
                }
            })
        }
        
    },
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
</style>