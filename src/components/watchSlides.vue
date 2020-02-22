<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in arr" :key="index" >
                <div @click="visit(item.id)" :class="{color:id===item.id,vis:true}">
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
            id:5001
        }
    },
    methods:{
        visit(id){
            if(id !== this.id){
                this.id = id
                this.$emit('esid',id)
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
    .vis{
        font-size: 1.5rem;
        line-height: 2rem;
        margin:2rem 0 2rem 0;
    }
    .color{
        font-size: 1.5rem;
        line-height: 2rem;
        background-color: #3e9cff;
        border-radius: 2rem;
        color:white;
    }
</style>