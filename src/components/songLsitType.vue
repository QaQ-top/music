<template>
    <div>
        <swiper :options="swiperOption" ref="slTypeSwiper">
            <swiper-slide v-for="(item, index) in arr" :key="index" >
                <div @click="visit(item.name)" :class="{color:name===item.name,vis:true}">
                    {{item.name}}
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
    name:'slType',
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
            name:5001
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
                this.name = to[0].name
                this.$emit('transmission',this.name);
            }
        }
    },
    methods:{
        visit(name){
            if(name !== this.name){
                this.name = name
                this.$emit('esName',name)
            }
        }
    },
}
</script>

<style scoped>
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