<template>
  <div class="list">
      <div v-for="(item, index) in type" :key="index" @touchstart="startDev" @touchend="idx(item.idx)" :class="{back:item.idx===id}">
          {{item.name}}
      </div>
  </div>
</template>

<script>
export default {
    name:'rankType',
    data() {
        return {
            strat:null,
            type:[
                {
                    name:'新歌榜',
                    idx:0
                },
                {
                    name:'热歌榜',
                    idx:1
                },
                {
                    name:'原创歌曲榜',
                    idx:2
                },
                {
                    name:'飙升榜',
                    idx:3
                },
                {
                    name:'电音榜',
                    idx:4
                },
            ]
        }
    },
    props:['id'],
    methods:{
        startDev(){
            this.strat = new Date()
        },
        idx(id){
            let date = new Date()
            if(date-this.strat<200){
              	this.$emit('idx',id)
            }
            
        }
    }
}
</script>

<style scoped>
    .list{
        width: 96%;
        margin: 0 auto;
        position: fixed;
        top: 6rem;
        left: 2%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 999;
        background-color: white;
    }
    .list>div{
        width:18%;
        height: 3rem;
        border-radius: 3rem;
        font-size: 1.5rem;
        line-height: 3.2rem;
        margin: 2rem 0 2rem 0;
    }
    .back{
        background-color: #3e9cff;
        color: white;
    }
</style>