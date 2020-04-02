<template>
    <div class="slides">
        <swiper :options="swiperOption" ref="slTypeSwiper">
            <swiper-slide v-for="(item, index) in arr" :key="index" >
                <div @touchstart="startDev" @touchmove='move' @touchend="visit(item.id)" :class="{color:id===item.id,vis:true}">
                    {{item.name}}
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
    name:'djType',
    data() {
        return {
            swiperOption: {
                slidesPerView:4.4,
                slidesPerColumn: 1,
                spaceBetween : 0.5, //空白
                freeMode : true, //free模式，slide会根据惯性滑动可能不止一格且不会贴合
                freeModeMomentum : true,
                freeModeMomentumRatio : 0.5,
            },
            strat:null,
            moveing:false,
            id:5001
        }
    },
    props:{
        arr:{
            default:[],
            type:Array
        }
    },
    watch:{
        arr:{
            handler:function (to,from) {
                this.id = to[0].id
                this.$emit('transmission',this.id);
            }
        }
    },
    methods:{
         startDev(){
            this.strat = new Date()
        },
        move(){
            this.moveing = true;
        },
        visit(id){
            let date = new Date()
            if(date-this.strat<200&&!this.moveing){
              	if(id !== this.id){
                    this.id = id
                    this.$emit('esName',id)
                }
            }else{
                this.moveing = false
            }
            
        }
    },
}
</script>

<style scoped>
    .slides{
        position: fixed;
        width: 96%;
        top:6rem;
        height:7rem;
        background-color:white;
    }
    .vis{
        font-size: 1.5rem;
        line-height: 3rem;
        margin:2rem 0 2rem 0;
        border-radius: 2rem;
    }
    .color{
        font-size: 1.5rem;
        line-height: 3rem;
        background-color: #3e9cff;
        border-radius: 2rem;
        color:white;
    }
</style>