<template>
    <div class="slides">
        <swiper :options="swiperOption" ref="wtSlideSwiper">
            <swiper-slide v-for="(item, index) in arr" :key="index" >
                <div @touchstart="startDev" @touchmove='move' @touchend="visit(item.id)" :class="{color:id===item.id,vis:true}">
                    {{item.type}}
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
    name:'slide',
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
            arr:[],
            moveing:false,
            strat:null,
            id:5001
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
                    window.scrollTo({
                        top:0,
                        behavior:'instant'
                    })
                    this.id = id
                    this.$emit('esid',id)
                }
            }else{
                this.moveing = false
            }
            
        }
    },
    created(){
        this.arr = this.singerType;
        this.$emit('created',this.id)
    }
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
    }
    .color{
        font-size: 1.5rem;
        line-height: 3rem;
        background-color: #3e9cff;
        border-radius: 2rem;
        color:white;
    }
</style>