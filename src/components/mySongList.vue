<template>
  <div>
        <div class="swit">
            <h3 @click="newly" :class="{switColor:!txt}">
                创建歌单 {{newBuilb.length}}
            </h3>
            <h3 @click="collection" :class="{switColor:txt}">
                收藏歌单 {{collEction.length}}
            </h3>
        </div>
        <div class="con">
            <div v-if="txt">
                <div v-if="!isnewBuilbCon">
                    暂无创建歌单
                </div>
                <div v-if="isnewBuilbCon" class="builb">
                    <div v-for="(item, index) in newBuilb" :key="index">
                        <img :src="item.coverImgUrl" alt="">
                        <div>
                            <h3>{{item.name}}</h3>
                            <p>{{item.trackCount}} 首</p>
                        </div>
                    </div>
                    <div class="circle">
                        <span  alt="" class="iconfont icon-plus-circle"></span>
                        <div>
                            <h3>创建歌单</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!txt">
                <div v-if="!iscollEctionCon">
                    暂无收藏歌单
                </div>
                <div v-if="iscollEctionCon" class="collection">
                    <div v-for="(item, index) in collEction" :key="index">
                        <img :src="item.coverImgUrl" alt="">
                        <div>
                            <h3>{{item.name}}</h3>
                            <p>{{item.trackCount}} 首</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'mySongList',
    data(){
        return {
            txt:true,
            isnewBuilbCon:null,
            iscollEctionCon:null,
        };
    },
    props:{
        newBuilb:{
            default:[]
        },
        collEction:{
            default:[]
        }
    },
    computed:{
        
    },
    methods:{
        newly () {
            this.txt = true;
        },
        collection () {
            this.txt = false;
        }
    },
    activated(){
        let loacl = window.localStorage;
        let user = JSON.parse(loacl.getItem('user'));
        this.img = user.avatarUrl
        if(user.name){
            this.isnewBuilbCon = true
            this.iscollEctionCon = true
            
        }else{
            this.isnewBuilbCon = false;
            this.iscollEctionCon = false
        }
    }

}
</script>

<style scoped>
    .swit{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 96%;
        margin: 0 auto;
        margin-top: 2rem;
    }
    .con{
        font-size: 1rem;
    }
    .swit h3 {
        font-size: 1.6rem;
        line-height: 2rem;
        margin-right: 1rem;
    }
    .con h3{
        font-size: 1rem;
        line-height: 1rem;
        white-space: nowrap;
    }
    .switColor{
        color: rgb(172, 172, 172)
    }
    .collection,.builb{
        width: 96%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .builb>div{
        width: 45%;
        margin-top: 1rem;
        display: flex;
        justify-content: left;
    }
    .builb>div>img{
        width:40%;
        border-radius: 0.5rem;
    }
    .builb>div>div{
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: left;
        overflow: hidden;
    }
    .collection>div{
        width: 45%;
        display: flex;
        justify-content: left;
        margin-top: 1rem;
    }
    .collection>div>img{
        width:40%;
        border-radius: 0.5rem;
    }
    .collection>div>div{
        margin-left: 1rem;
        width:60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: left;
        overflow: hidden;
    }
    .circle{
        height: 6rem;
        display: flex;
        align-items: center;
    }
    .circle,.icon-plus-circle{
        font-size: 5rem;
        color: rgb(175, 175, 175);
    }
</style>