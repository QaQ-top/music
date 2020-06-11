<template>
    <div>
        <div class="single"
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
            <mt-cell 
            :class="{isBule:item.id===getAudioData.id}"
            :title="item.name" 
            :label="`${item.artists.map(item=>item.artistsName).join(' / ')} - ${item.album.albumName}`" 
            v-for="(item, index) in arr" 
            :key="index" 
            @touchstart.native="startTime" @touchmove.native='move' @touchend.native='end(item.id,index)'>
                <div class="checkbox" v-if='dels' :class="{checkedTrueAdd:checkArr.includes(item.id),add:true}" @touchstart.stop='addCheckArr(item.id)'>
                </div>
            </mt-cell>
            <div class="btn" v-if="dels">
                <div class="cal" @click="quit">退出编辑</div>
                <div class="btnAdd" @click="allAdd">加入歌单</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
    name:'single',
    data() {
        return {
            arr:[],
            offset:1,
            clickIndex:-1,
            loading:false,
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
    methods:{
        ...mapActions(['newSrc']),
        loadMore() {
            this.offset++;
            this.loading = true;
            this.$request.single(this.$store.state.searchVal,this.offset).then(res=>{
                this.loading = false;
                if(res.result.hasOwnProperty('songs')){
                    let repetition = this.arr.some((i,n,arr)=>{
                        return i.id===res.result.songs[res.result.songs.length-1].id
                    });
                    let arr = [res.result.songs[res.result.songs.length-1]]
                    if(arr&&!repetition){
                        this.SongArray(arr,this.arr)
                    }else{
                        
                    }
                }
            })
        },
        song(id,index){ //点击触发
            if(!id) return
            this.getAudioData.arr = this.arr;
            this.newSrc({
                id,
                album:{
                    albumId : this.arr[index].album.albumId, //将点击的歌曲专辑id 存入audio详情
                    albumName : this.arr[index].album.albumName //将点击的歌曲专辑名称 存入audio详情
                }
            })
        },
        move(){
            this.moveing = true;
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
        this.$request.single(this.$store.state.searchVal,this.offset).then(res=>{
            if(res.result.hasOwnProperty('songs')){
                this.SongArray(res.result.songs,this.arr)
            }else{
                this.arr.push({
                    name:'没有找到该歌曲',
                    album:{
                        albumName:''
                    },
                    artists:[],
                    id:''
                })
            }
        })
    },
}

</script>

<style scoped>
 .single >>> .mint-cell-text{
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
 .single >>> .mint-cell{
     padding: 0.25rem 0;
     height: 6.5rem;
 }
 .single >>> .mint-cell-label{
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
 .single  >>>.icon-diandiandianshu{
     font-size: 2.5rem;
 }
 .single  .isBule{
    color: rgb(64,158,255)!important;
 }
 .single .isBule >>> .mint-cell-label{
     color: rgb(64,158,255)!important;
 }
 .single .isBule >>> .mint-cell-value{
     color: rgb(64,158,255)!important;
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
</style>