<template>
    <div class="box">
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>歌单</span>
            </div>
            <span slot='prev_right'>
            </span>
        </my-prev-nav>
        <div class="switchs"
        :infinite-scroll-disabled='true'
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        >
          <div class="list">
            <song-list-type :arr='arr' @esName='viet' @transmission='creat'>
            </song-list-type>
            <div v-for="(item, index) in playlist" :key="index" class="playlist">
              <img v-lazy='item.coverImgUrl'>
              <div class="txt">
                <p>{{item.name}}</p>
                <div>
                  <span class="iconfont icon-z"></span>
                  <span>{{item.playCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../../components/back_prev';
import songListType from '../../components/songLsitType'
export default {
    name:'red',
    data(){
        return {
            routePath:null,
            arr:[],
            name:'',
            lasttime:'',
            playlist:[],
            loading:true,
            load:true,
        }
    },
    components:{
        myPrevNav,songListType
    },
    methods:{
      viet(name){ //点击 执行的函数
        this.name = name
        this.$request.playlist(name).then(res=>{
          if(res.code = 200){
            this.lasttime = res.lasttime;
            this.playlist = res.playlists;
            console.log(res)
          }
        })
      },
      creat(name){ //数据传递成功后 执行的函数
        this.name = name
        this.$request.playlist(name).then(res=>{
          if(res.code = 200){
            this.lasttime = res.lasttime;
            this.playlist = res.playlists;
          }
        })
      },
      loadMore() {
            if(!this.load) return
            this.loading = true;
            this.$request.playlist(this.name,this.lasttime).then(res=>{
              if(res.code = 200&&!res.hasOwnProperty('msg')){
                this.lasttime = res.lasttime;
                this.loading = false;
                for(let i of this.playlist){
                    let index = res.playlists.findIndex(item=>item.name===i.name);
                    if(index>=0){
                        res.playlists.splice(index,1);
                    }
                }
                this.playlist.push(...res.playlists);
              }
            });
        },
    },
    created(){
        this.routePath = this.$route.query.routePath;
        this.$request.songCatList().then(res=>{
          this.arr = res.tags
        })
    },
    activated(){
        this.load = true;
    },
    deactivated(){
        this.load = false;
    }
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
    }
    .list{
      width: 96%;
      margin: 0 auto
    }
    .playlist{
      text-align:left;
      width: 100%;
      height: 7rem;
      display: flex;
      justify-content: left;
      padding: 1rem 0 1rem 0
    }
    .playlist img{
      width: 7rem;
      height: 100%;
      border-radius: 1rem;
      margin-right: 1rem;
    }
    .txt{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .txt>p{
      font-size: 1.5rem;
      font-weight: bold;
    }
    .txt>div{
      display: flex;
      align-items: center;
      font-size: 1rem;
      color: #888;
    }
    .icon-z{
      font-weight: bold;
    }
</style>