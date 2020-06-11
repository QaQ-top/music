<template>
  <div>
        <div class="swit">
            <h3 @touchstart="startDev" @touchend="newly" :class="{switColor:!txt}">
                创建歌单 {{newBuilb.length}}
            </h3>
            <h3 @touchstart="startDev" @touchend="collection" :class="{switColor:txt}">
                收藏歌单 {{collEction.length}}
            </h3>
        </div>
        <div class="con">
            <div v-if="txt">
                <div v-if="!isnewBuilbCon" class="none">
                    暂无创建歌单
                    <div class="circle">
                        <span  alt="" class="iconfont icon-plus-circle"></span>
                        <div>
                            <h3>创建歌单</h3>
                        </div>
                    </div>
                </div>
                <div v-if="isnewBuilbCon" class="builb">
                    <div v-for="(item, index) in newBuilb" :key="index" @touchstart="startDev" @touchmove='move' @touchend="detailsDel(item.id)">
                        <img v-lazy="item.coverImgUrl" class="lazy">
                        <div>
                            <h3>{{item.name}}</h3>
                            <p>{{item.trackCount}} 首</p>
                        </div>
                    </div>
                    <div class="circle" @click="addList">
                        <span  alt="" class="iconfont icon-plus-circle"></span>
                        <div>
                            <h3>创建歌单</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!txt">
                <div v-if="!iscollEctionCon" class="none">
                    暂无收藏歌单
                </div>
                <div v-if="iscollEctionCon" class="collection">
                    <div v-for="(item, index) in collEction" :key="index" @touchstart="startDev" @touchend="details(item.id)">
                        <img v-lazy="item.coverImgUrl" class="lazy">
                        <div>
                            <h3>{{item.name}}</h3>
                            <p>{{item.trackCount}} 首</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <transition name="addList">
          <div class="addList" v-if="add">
            <div class="count">
                    <h3>新建歌单</h3>
                    <div class="input">
                        <input type="text" v-focus v-model="listName" placeholder="请输入歌单标题">
                        <span>
                            {{listName.length}} / 40
                        </span>
                    </div>
                    <div class="choice">
                        <div @click="noAdd">取消</div>
                        <div :class="{color:!listName}" @click="listAdd">提交</div>
                    </div>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name:'mySongList',
    data(){
        return {
            txt:true,
            isnewBuilbCon:null,
            iscollEctionCon:null,
            strat:null,
            add:false,
            listName:'',
            moveing:false,
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
        startDev(){
            this.strat = new Date()
        },
        newly () {
            let date = new Date()
            if(date-this.strat<200){
              	this.txt = true;
            }
            
        },
        collection () {
            let date = new Date()
            if(date-this.strat<200){
              	this.txt = false;
            }
        },
        move(){
            this.moveing = true;
        },
        detailsDel(id){
            let date = new Date()
            if(date-this.strat<200&&!this.moveing){
              	this.$router.push({
                    name:'songBox',
                    params:{
                        id,
                        targetType:1000,
                        path:this.$route.path,
                        hendle:'del'
                    }
                })
            }else{
                this.moveing = false
            }
            
        },
        details(id){
            let date = new Date()
            if(date-this.strat<200&&!this.moveing){
              	this.$router.push({
                    name:'songBox',
                    params:{
                        id,
                        targetType:1000,
                        path:this.$route.path,
                    }
                })
            }else{
                this.moveing = false
            }
            
        },
        noAdd(){
            this.add = false 
        },
        listAdd(){
            if(this.listName){
                this.$request.songListAdd(this.listName).then(res=>{
                    if(res.code === 200){
                        this.add = false;
                        this.listName = ''
                        MessageBox('提示','添加成功')
                    }
                })
            }
        },
        addList(){
           this.add = true 
        }
    },
    activated(){
        let loacl = window.localStorage;
        let user = JSON.parse(loacl.getItem('user'));
        if(!user) return
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
    *{
        font-size: 1.4rem;
        text-align: left;
    }
    .swit{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 96%;
        margin: 0 auto;
        margin-top: 2rem;
    }
    .con{
        font-size: 1.2rem;
    }
    .swit h3 {
        font-size: 2rem;
        line-height: 2rem;
        margin-right: 1rem;
    }
    .con h3{
        font-size: 1.8rem;
        line-height: 4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
        height: 8rem;
        margin-top: 1rem;
        display: flex;
        justify-content: left;
        text-align: left;
    }
    .builb>div>img{
        width:8rem;
        border-radius: 1rem;
    }
    .builb>div>div{
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: left;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .collection>div{
        width: 45%;
        height: 8rem;
        display: flex;
        justify-content: left;
        margin-top: 1rem;
    }
    .collection>div>img{
        width:8rem;
        border-radius: 1rem;
    }
    .collection>div>div{
        margin-left: 1rem;
        width:60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: left;
        overflow: hidden;
        text-overflow: ellipsis
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
    .none{
        width: 96%;
        margin: 0 auto;
        line-height: 5rem;
        color: rgb(104, 104, 104);
    }
    .addList{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background-color: rgba(0, 0, 0, 0.459);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
    }
    .count{
        width: 90%;
        height: 25%;
        background-color: white;
        box-sizing: border-box;
        padding: 4%;
        border-radius: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }
    .count>h3{
        font-size: 2rem;
        width: 100%;
        text-align: left;
    }
    .input{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-color: rgb(212, 212, 212);
    }
    .input>input{
        width: 70%;
        height: 100%;
        border: none;
        outline: none;
    }
    .input>input::placeholder{
        color:rgb(212, 212, 212);
    }
    .choice{
        width: 90%;
        display: flex;
        justify-content:flex-end;
    }
    .choice div{
        color: #3e9cff;
        font-size: 1.7rem;
        font-weight: bold;
        margin-left: 5rem;
    }
    .choice .color{
        color: #3e9bff91;
    }
    .addList-leave{
        transition: all 0.35s;
        opacity: 1;
    }
    .addList-leave-active{
        transition: all 0.35s;
        opacity: 0.5;

    }
    .addList-leave-to{
        transition: all 0.35s;
        opacity: 0;
    }
</style>