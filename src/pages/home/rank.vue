<template>
    <div class="rank">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>排行榜</span>
            </div>
            <span slot='prev_right'>
            </span>
        </my-prev-nav>
        <rank-type @idx='obtain' :id='idx'>

        </rank-type>
        
        <div class="song">
            <mt-cell 
                :class="{isBule:item.id===getAudioData.id}"
                :title="item.name" 
                :label="`${item.artists.map(item=>item.artistsName).join(' / ')} - ${item.album.albumName}`" 
                v-for="(item, index) in arr" 
                :key="index" 
                @touchstart.native="startTime"  @touchmove.native='move' @touchend.native='end(item.id,index)'
            >
                <div class="checkbox" v-if='dels' :class="{checkedTrueAdd:checkArr.includes(item.id),add:true}" @touchstart.stop='addCheckArr(item.id)'>

                </div>
            </mt-cell>
        </div>
        <div class="btn" v-if="dels">
            <div class="cal" @click="quit">退出编辑</div>
            <div class="btnAdd" @click="allAdd">加入歌单</div>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev';
import rankType from '../../components/rankType';
import {mapGetters,mapActions} from 'vuex'
export default {
    name:'rank',
    data(){
        return {
            routePath:null,
            idx:0,
            arr:[],
            clickIndex:-1,
            setTiem:null,
	        dels:false,
           	checkArr:[],
            strat:null,
            moveing:false,
        }
    },
    computed:{
        ...mapGetters(['getAudioData'])
    },
    components:{
        myPrevNav,
        rankType
    },
    methods: {
        obtain(id){
            if(id===this.idx) return;
            this.arr.length = 0;
            this.$request.rankType(id).then(res=>{
                this.SongArray(res.playlist.tracks,this.arr)
            })
            this.idx = id;
        },
        ...mapActions(['newSrc']),
        song(id,index){ //点击触发
            this.$store.state.audio.arr.length = 0
            this.$store.state.audio.arr.push(...this.arr)
            this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
        },
         quit(){
            this.dels = false;
            this.checkArr.length = 0;
        },
        allAdd(){
            if(this.checkArr.length===0) return
            this.$store.state.isSongBox = true;
             this.$store.state.songListData.songId.length = 0;
            this.$store.state.songListData.songId.push(...this.checkArr);
            this.checkArr.length = 0;
            this.dels = false;
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
        move(){
            this.moveing = true;
        },
        end(id,index){
            clearTimeout(this.setTiem);
            let date = new Date();
            if(date-this.strat<200&&!this.moveing){
                this.song(id,index)
            }else{
                this.moveing = false
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
    created(){
        this.$request.rankType(this.idx).then(res=>{
            this.SongArray(res.playlist.tracks,this.arr)
        })
        this.routePath = this.$route.query.routePath;
    },
    activated(){
        let params = this.$route.params
        if(params.id){
            this.idx = params.id
            this.arr.length = 0;
            this.$request.rankType(this.idx).then(res=>{
                this.SongArray(res.playlist.tracks,this.arr)
            })
            this.routePath = '/musicG';
        }
    },
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.7rem;
    }
    .rank >>> .mint-cell-text{
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
 .rank >>> .mint-cell{
     padding: 0.25rem 0;
     height: 6.5rem;
 }
 .rank >>> .mint-cell-label{
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
 .rank  >>>.icon-diandiandianshu{
     font-size: 2.5rem;
 }
 .rank  .isBule{
    color: rgb(64,158,255)!important;
 }
 .rank .isBule >>> .mint-cell-label{
     color: rgb(64,158,255)!important;
 }
 .rank .isBule >>> .mint-cell-value{
     color: rgb(64,158,255)!important;
 }
 .song{
     padding-top: 7rem;
 }
 .add{
    border: 0.2rem solid rgb(64,158,255);
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
    border-radius:  6.5rem;
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
</style>