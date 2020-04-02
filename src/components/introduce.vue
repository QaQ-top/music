<template>
    <div class="int">
        <div class="headr">
            <div class="back">
                <img :src="mag.songImg" alt="">
            </div>
            <div class="introduce">
                <div class="intrImg">
                    <img v-lazy="mag.songImg" class="lazy">
                    <div class="playCount">
                        <i></i>
                        <span>{{mag.playCount}}</span>
                    </div>
                </div>

                <div class="intrTxt">
                    <p>{{mag.songName}}</p>
                    <div class="user" v-if="strc!==str&&mag.userName">
                        <img v-lazy="mag.userImg" class="lazy">
                        <span>{{mag.userName}}</span>
                    </div>
                    <div class="more" :class="{moreBack:mag.more}" v-if="mag.type!=='电台'&&mag.type!=='我喜欢'&&mag.handle!=='del'">
                        <span v-if="!mag.more" @touchstart="startDev" @touchend="like(1)">收藏</span>
                        <span v-if="mag.more"  @touchstart="startDev" @touchend="like(2)">已收藏</span>
                    </div>
                    <div class="description">
                        {{mag.description}}
                    </div>
                </div>
            </div>
        </div>
        <div class="songList" v-if="hedr">
            <mt-cell 
                :class="{isBule:item.id===audio.id}"
                :title="item.name" 
                :label="`${item.artists.map(item=>item.artistsName).join(' / ')}`" 
                v-for="(item, index) in arr" 
                :key="index"
                @touchstart.native="startTime" @touchend.native='end(item.id,index)'
            >
            <div class="checkbox" v-if='mag.handle==="del"&&dels' :class="{checkedTrueDel:checkArr.includes(item.id)&&mag.handle==='del',del:mag.handle==='del'}" @touchstart.stop='addCheckArr(item.id)'>

            </div>
            <div class="checkbox" v-if='mag.handle!=="del"&&dels' :class="{checkedTrueAdd:checkArr.includes(item.id)&&mag.handle!=='del',add:mag.handle!=='del'}" @touchstart.stop='addCheckArr(item.id)'>

            </div>
            </mt-cell>
        </div>
        <div class="songList" v-if="!hedr">
            <div class="none">
                没有任何歌曲~
            </div>
        </div>
        <div v-if='mag.handle==="del"&&dels' class="btn">
            <div class="cal" @click="quit">退出编辑</div>
            <div class="btnDel" @click="allDel">删除歌曲</div>
        </div>
        <div v-if='mag.handle!=="del"&&dels' class="btn">
            <div class="cal" @click="quit">退出编辑</div>
            <div class="btnAdd" @click="allAdd">加入歌单</div>
        </div>
        <div v-if="mag.handle==='del'" class="handlers" @click="hadr">
            编辑
        </div>
        <div v-if="ishandlers" class="songBox" @touchmove.prevent @mousewheel.prevent>
            <div class="baclr">
                <div class="iocn iconfont icon-jiantou-zuo-cuxiantiao" @click="noHadr">
                
                </div>
                <span>编辑歌单</span>
            </div>
            <div class="handlers" @click='update'>
                保存
            </div>
            <div class="boxTer">
                <span>
                    名称
                </span>
                <div>
                    <input type="text" v-model="name" placeholder="请输入歌单标题" class="inp">
                </div>
            </div>
            <div class="boxTer">
                <span>
                    描述
                </span>
                <div>
                    <input type="text" v-model="desc" placeholder="请输入歌单简介" class="inp">
                </div>
            </div>
            <div class="delLis" @click="delList">
                删除歌单
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import {MessageBox} from 'mint-ui'
export default {
    name:'intr',
    data() {
        return {
            arr:[],
            hedr:true,
            str:'',
            startTiem:0,
            setTiem:null,
            dels:false,
            checkArr:[],
            strat:null,
            ishandlers:false,
            name:'',
            desc:''
        }
    },
    computed:{
        ...mapState(['audio','songListData']),
        strc(){
            return this.mag.userName.charCodeAt()
        }
    },
    methods:{
        ...mapActions(['newSrc','del']),
        hadr(){
            this.ishandlers = true
        },
        noHadr(){
            this.ishandlers = false
        },
        update(){
            if(!this.name&&!this.desc){

            }else{
                MessageBox.confirm('更该歌单信息吗？').then(res=>{
                    this.$request.songListUpdate(this.mag.id,this.name,this.desc).then(res=>{
                        console.log(res)
                        if(res.code===200){
                            this.ishandlers = false
                            MessageBox('提示','跟新成功');
                            window.history.back()
                        }
                    })
                })
            }
        },
        delList(){
            MessageBox.confirm('确定要删除歌单吗？').then(res=>{
                    this.$request.songListDel(this.mag.id).then(res=>{
                    console.log(res)
                    if(res.code===200){
                        MessageBox('提示','删除成功');
                        window.history.back()
                    }
                })
            })
        },
        quit(){
            this.dels = false;
            this.checkArr.length = 0;
        },
        allAdd(){
            if(this.checkArr.length===0) return
            this.$store.state.isSongBox = true;
            this.songListData.songId.length = 0;
            this.songListData.songId.push(...this.checkArr);
            this.checkArr.length = 0;
            this.dels = false;
        },
        allDel(){
            if(this.checkArr.length===0) return;
            this.songListData.listId = this.mag.id;
            this.songListData.songId.length = 0;
            this.songListData.songId.push(...this.checkArr);
            this.del()
            if(this.checkArr.length === this.arr.length){
                this.checkArr.length = 0;
                this.dels = false;
                window.history.back()
            }else{
                this.checkArr.length = 0;
                this.dels = false;
            }
        },
        song(id,index){ //点击触发
            this.$store.state.audio.arr.length = 0;
            this.$store.state.audio.arr.push(...this.arr)
            this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
        },
        like(num){
            let date = new Date()
            if(date-this.strat<200){
                this.$emit('isLike',num)
            }
        },
        startDev(){
            this.strat = new Date()
        },
        startTime(){
            this.strat = new Date()
            this.setTiem = setTimeout(() => {
                this.dels = true;
            }, 1500);
        },
        end(id,index){
            clearTimeout(this.setTiem);
            let date = new Date();
            if(date-this.strat<200){
                this.song(id,index)
            }
        },
        addCheckArr(id){
            if(this.checkArr.includes(id)){
                let index = this.checkArr.findIndex(i=>i===id);
                this.checkArr.splice(index,1);
            }else{
                this.checkArr.push(id);
            }
        }
    },
    props:['mag'],
    watch:{
        'mag':{
            handler:function (to,from){
                if(to.tracks.length>0){
                    this.SongArray(this.mag.tracks,this.arr)
                    this.hedr = true
                }else{
                    this.hedr = false
                }
            },
            deep:true
        }
    },
    created(){
        this.str = this.Str.charCodeAt()
        
    }
    // deactivated() {
    //     this.arr.length = 0;
    // },
}
</script>

<style scoped>
    .headr{
        width: 100%;
        height: 25rem;
        position: relative;
    }
    .back{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 7;
    }
    .back img{
        width: 100%;
        height: 100%;
        filter: blur(50px);
    }
    .introduce{
        text-align: left;
        width: 100%;
        height: 100%;
        padding: 2%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 8;
    }
    .intrImg{
        width: 15rem;
        height: 15rem;
        position: relative;
        font-size: 0px;
    }
    .intrImg img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }
    .playCount{
        position: absolute;
        right: 5px;
        top: 0.5rem;
        font-size: 1rem;
        color: white;
    }
    .intrTxt img{
        width: 4rem;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    .intrTxt{
        width: 65%;
        height: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .intrTxt>p{
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.2rem;
        font-weight: bold;
    }
    .description{
        width: 50%;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .songList{
        position: sticky;
        width: 96%;
        height: 100%;
        padding: 2% 2% 10% 2%;
        background-color: white;
        z-index: 9;
        border-radius: 2rem;
    }

.int >>> .mint-cell-text{
    font-size: 1.7rem;
    font-weight: bold; 
    text-align: left;
    display: block;
    overflow: hidden;
    width: 32rem;
    height: 1.9rem;
    line-height: 1.9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
 }
 .int >>> .mint-cell{
     padding: 0.25rem 0;
     height: 6.5rem;
 }
 .int >>> .mint-cell-label{
    font-size: 1.3rem;
    margin: 0;
    text-align: left;
    display: block;
    overflow: hidden;
    width: 32rem;
    height: 2rem;
    line-height: 2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
 }
 .int  >>>.icon-diandiandianshu{
     font-size: 2.5rem;
 }
 .int  .isBule{
    color: rgb(64,158,255)!important;
 }
 .int .isBule >>> .mint-cell-label{
     color: rgb(64,158,255)!important;
 }
 .int .isBule >>> .mint-cell-value{
     color: rgb(64,158,255)!important;
 }
 .none{
     height: 30rem;
     font-size: 2rem;
     font-weight: bold;
     line-height: 10rem;
 }
 .more{
    width: 6rem;
    height: 2.5rem;
    background-color: rgb(83, 101, 119);
    display: flex;
    justify-content: center;
    align-content: center;
    color: #fff;
    border-radius: 3rem;
 }
.more>span{
    font-size: 1.5rem;
 }
.moreBack{
    background-color: white;
    color:  rgb(83, 101, 119);
 }
 .add{
    border: 0.2rem solid rgb(64,158,255);
 }
 .del{
    border: 0.2rem solid rgb(241, 71, 65);
 }
.checkbox{
    box-sizing: border-box;
    background-color: rgb(250, 250, 250);
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    position: relative;
}
.checkbox::after{
    transition: all ease-in-out 0.25s;
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 0;
    width: 0;
    margin-left: 0rem;
    margin-top: 0rem;
    position: absolute;
    opacity: 0;
    left: 50%;
    top: 50%;
}
.checkedTrueAdd::after{
    content: '';
    display: flex;
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    left: 50%;
    top: 50%;
    background-color: rgb(64,158,255);
    height:1rem;
    width: 1rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;

}
.checkedTrueDel::after{
    content: '';
    display: flex;
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    left: 50%;
    top: 50%;
    background-color: rgb(241, 71, 65);
    height:1rem;
    width: 1rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
}
.btn{
    width: 100%;
    box-sizing: border-box;
    padding: 2%;
    height: 6.5rem;
    position: fixed;
    bottom: 0;
    z-index: 101;
    background-color: white;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0.7rem 1rem 0.05rem #000;
}
.btn div{
    width: 36%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.5rem;
}
.cal{
    background-color: white;
    border: 1px solid rgb(64,158,255);
    font-size: 2rem;
    color: rgb(64,158,255);
}
.btnDel{
    background-color: rgb(241, 71, 65);
    border: 1px solid rgb(241, 71, 65);
    font-size: 2rem;
    color:  rgb(255, 255, 255);
}
.btnAdd{
    background-color: rgb(64,158,255);
    border: 1px solid rgb(64,158,255);
    font-size: 2rem;
    color: rgb(255, 255, 255);
}
.handlers{
    height: 6rem;
    width: 6rem;
    line-height: 6rem;
    font-size: 1.7rem;
    position:fixed;
    right:2rem;
    top:0;
    z-index: 1000;
}
.songBox{
    overflow: scroll;
    position: fixed;
    z-index: 1001;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background-color: white;
    box-sizing: border-box;
}
.icon-jiantou-zuo-cuxiantiao {
    margin: 0 1.7rem;
    font-size: 4rem;
    color: rgb(0, 0, 0);
}
.baclr{
    width: 100%;
    height: 6rem;
    display: flex;
    font-size: 1.7rem;
    justify-content: left;
    align-items: center;
    border-bottom: 1rem solid rgb(243, 243, 243);
}
.boxTer{
    width: 100%;
    height: 6rem;
    box-sizing: border-box;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(243, 243, 243);
}
.delLis{
    width: 70%;
    height: 5rem;
    margin: 4rem auto;
    color: white;
    background-color: rgb(247, 62, 62);
    font-size: 2rem;
    line-height: 5rem;
    border-radius: 5rem;
}

    
    .inp{
        width: 70%;
        height: 100%;
        border: none;
        outline: none;
    }
    .inp::placeholder{
        color:rgb(212, 212, 212);
    }
</style>