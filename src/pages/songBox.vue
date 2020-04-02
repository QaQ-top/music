<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>{{title}}</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div class="songBox">
            <intr :mag='message' @isLike='like'>

            </intr>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev';
import intr from '../components/introduce';
import { MessageBox  } from 'mint-ui';
export default {
    name:'songBox',
    data(){
        return {
           routePath:'',
           title:'',
           message:{
                type:'',
                id:'',
                songName:'', //歌单名字
                songImg:'', //歌单封面
                userName:'',//创建人名字
                userImg:'', //创建人头像
                description:'', //歌单签名
                playCount:0, //播放量
                more:false,
                tracks:[] ,//歌单音乐
                subscribedCount:'', //收藏量
                hendle:''
           },
           params:{},
           mtd:{},

        }
    },
    components:{
        myPrevNav,intr
    },
    methods: {
        like(num){
            this.mtd.isLike(this.params.id,num).then(res=>{
                if(res.code===200){
                    switch (num) {
                        case 1:
                            MessageBox('提示', '收藏成功');
                            break;
                         case 2:
                            MessageBox('提示', '取消成功');
                            break;
                        default:
                            break;
                    }
                }
            })
        }
    },
    created() {
        this.params = this.$route.params;
        this.routePath= this.params.path
        if(this.params){
            this.mtd = this.Type.find(i=>this.params.targetType===i.type);
            this.title = this.mtd.name;
            this.mtd.request(this.params.id).then(res=>{
                switch (this.mtd.type) {
                    case 10: //专辑
                        let album = res.album
                        this.message.type = '专辑'
                        this.message.id = this.params.id;
                        this.message.songName = album.name;
                        this.message.songImg = album.picUrl;
                        this.message.description = album.description;
                        this.message.more = album.info.liked;
                        this.message.handle = this.params.hendle
                        this.message.tracks.push(...res.songs);
                        break;

                    case 100: //歌手
                        let artist = res.artist;
                        this.message.type = '歌手'
                        this.message.id = this.params.id;
                        this.message.songName = artist.name;
                        this.message.songImg = artist.picUrl;
                        this.message.description = artist.briefDesc;
                        this.message.more = artist.followed;
                        this.message.handle = this.params.hendle
                        this.message.tracks.push(...res.hotSongs);
                        break;

                    case 1000: //歌单
                        let playList = res.playlist
                        this.message.type = '歌单'
                        this.message.id = this.params.id;
                        this.message.songName = playList.name;
                        this.message.songImg = playList.coverImgUrl;
                        this.message.userName = playList.creator.nickname;
                        this.message.userImg = playList.creator.avatarUrl;
                        this.message.description = playList.description;
                        this.message.playCount = playList.playCount;
                        this.message.tracks.push(...playList.tracks);
                        this.message.more = playList.subscribed
                        this.message.handle = this.params.hendle

                        break;
                    case 520: //我喜欢
                        let key = this.cookieKey();//获取cookie所有的键 array类型
                        if(key.includes('MUSIC')){ //判断用户是否登录
                            let like = res.playlist
                            this.message.type = '我喜欢'
                            this.message.id = this.params.id;
                            this.message.songName = like.name;
                            this.message.songImg = like.coverImgUrl;
                            this.message.userName = like.creator.nickname;
                            this.message.userImg = like.creator.avatarUrl;
                            this.message.description = like.description;
                            this.message.playCount = like.playCount;
                            this.message.tracks.push(...like.tracks);
                            this.message.handle = this.params.hendle
                        }else{
                            if(this.messBox) return //判断用户是否第一次进入页面 false为没有进入过页面 true为已经进入过页面
                            MessageBox.confirm('您还没有登录，是否前往登录？').then(action => {
                                this.$router.push({
                                    path:'/login'
                                })
                            }).catch(err=>{
                                window.history.back()
                            })
                        }
                        

                        break;

                    case 1009: //电台
                        this.$request.get('/dj/detail',{rid:this.params.id}).then(ret=>{
                            let playList = ret.djRadio
                            this.message.type = '电台'
                            this.message.id = this.params.id;
                            this.message.songName = playList.name;
                            this.message.songImg = playList.picUrl;
                            this.message.description = playList.desc;
                            this.message.playCount = playList.subCount;
                            this.message.more = res.more;
                            this.message.handle = this.params.hendle
                            res.programs.map(i=>{
                                this.message.tracks.push({...i.mainSong})
                            })
                        })
                        
                        break;

                    default:
                        break;
                }
            })
        }
        
    }
}
</script>

<style scoped>
    .name{
        display: block;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
    .name {
        font-size: 1.7rem;
    }
</style>