import Vuex from 'vuex'
import Vue from 'vue'
import router from '@/router'
import request from '@/api/api'


Vue.use(Vuex)

const state = {
    audio:{
        dom:null,//mounted加载完将audioDOM传入！
        url:"http://music.163.com/song/media/outer/url?id=1343819193.mp3",
        play:false, //false为暂停中  true为播放中
        duration:0, //音乐总时长
        currentTime:0, //音乐当前播放时长
        percent:0,  //占比 （100%）
        loop:false, //false为不循环  true循环
        muted:false, //false为不静音  true静音
        volume:50,  //音量大小调整
        title:'', //歌名
        id:'',//歌曲id
        img:'' , //歌曲图片
        albumName:'', //当前歌曲的专辑名Id
        albumId:'', //当前歌曲的专辑id,
        storage:false,
        type:''
    },
    //首页app的foot的四个路径
    footerRoute:[
        '/musicG',
        '/recommend',
        '/dynamic',
        '/mine'
      ],

    //储存精确搜索的值
    searchVal:'',

    //进入搜索页面时，储存点击前的页面路径
    route:'/musicG',
    
    //进入歌曲详情页面时，储存点击前一个页面路径
    previous:'',

    //keep
    cache:'search',

}

const getters = {
    getAudioData(state){
        return state.audio
    },
    getFooterRoute(state){
        return state.footerRoute
    },
    getCache(state){
        return state.cache
    },
    getSearchVal(state){
        return state.searchVal
    },
    getRoute(state){
        return state.route
    },
    getPrevious(state){
        return state.previous
    },
}
const actions = {
    //音乐
    getDuration({commit}){
        commit('getDuration')
    },
    play({commit}){
        commit('play')
    },
    pause({commit}){
        commit('pause')
    },
    AudioPlay({commit}){
        commit('AudioPlay')
    },
    time({commit}){
        commit('time')
    },
    muted({commit}){
        commit('muted')
    },
    slider({commit}){
        commit('slider')
    },
    isLoop({commit}){
        commit('isLoop')
    },
    volume({commit}){
        commit('volume')
    },

    //播放新歌曲
    newSrc({commit},data){
        commit('newSrc',data)
    },

    particulars({commit},routePath){
        commit('particulars',routePath)
    },
    //控制
    
    
    
    //single album singer songList MV lyric FM video
}

const mutations = {
    /*********************** Audio ****************************/
    getDuration (state) {  //canplay
        state.audio.duration = state.audio.dom.duration; //当浏览器能够开始播放指定的音频/视频时触发 获取总时间
        if(state.audio.storage){
            state.audio.dom.currentTime = state.audio.currentTime
            state.audio.storage = false;
        }
    },
    play(state){
        state.audio.dom.play();
        state.audio.play=true;
    },
    pause(state){
        state.audio.dom.pause();
        state.audio.play=false;
    },
    AudioPlay(state){  //播放|暂停
        if(state.audio.play){ //关
            state.audio.dom.pause();
            state.audio.play=false;
        }else{  //开
            state.audio.dom.play();
            state.audio.play=true;
        }
    },
    time(state){
        if(Boolean(state.audio.dom.duration)===Boolean(NaN)){
            state.audio.percent = 0;
        }else{
            state.audio.duration = state.audio.dom.duration; //总时间
            state.audio.currentTime = state.audio.dom.currentTime; //当前播放时间
            state.audio.percent = (state.audio.currentTime / state.audio.duration)*100//当前播放比例 `%`
        }
        if(state.audio.percent===100){  //播放完毕 关闭播放
            state.audio.dom.pause();
            state.audio.play=false;
            state.audio.percent=0;
        }
    },
    muted(state){
        state.audio.dom.muted = state.audio.muted //静音切换
     },
     slider(state){
        state.audio.dom.play();
        state.audio.play=true;
        state.audio.dom.currentTime = state.audio.duration*(state.audio.percent/ 100) //拖拽音乐跟进 并且播放 
    },
    isLoop(state){
        state.audio.loop = !state.audio.loop //是否循环播放
    },
    volume(state){
        state.audio.dom.volume = state.audio.volume / 100 //音量控制
    },

    //播放新的src
    // {
    //     id:'',
    //     album:{
    //         albumId : '', 
    //         albumName : '' 
    //     }
    // }
    newSrc(state,data){  //参数需要歌曲id 专辑id 专辑name
        let plays = ()=> {
            state.audio.dom.play();
            state.audio.play=true;
        }
        state.audio.albumId = data.album.albumId; //将点击的歌曲专辑id 存入audio详情
        state.audio.albumName = data.album.albumName; //将点击的歌曲专辑名称 存入audio详情
        state.audio.id = data.id //将歌曲id 存入audio详情
        request.song(data.id).then(res=>{ //通过歌曲id发送请求
            state.audio.type = 'new'
            state.audio.url = res.data[0].url; //将audio的src替换
            state.audio.dom.addEventListener('canplay',plays())
        }).then(res=>{
            request.songDetail(data.id).then(res=>{ //通过id 获取歌曲详情
                state.audio.img = res.songs[0].al.picUrl; //歌曲封面
                state.audio.title = res.songs[0].name //歌曲名称
                state.audio.dom.removeEventListener('canplay',plays())
            })
        })
    },

    particulars(state,routePath){
        router.push({
            name:'particulars',
            params:{
                routePath, //将当前路由名传递给要跳转的路由 用于返回上一页
            }
        })
    },

    /************************* 全局使用事件函数 ****************************/
    // prev(){ //上一个路由
    //     window.history.back()
    // },

   

    //type: 搜索类型；
    /**
    默认为 1 即单曲 , 
    取值意义 : 
    1: 单曲, 
    10: 专辑, 
    100: 歌手, 
    1000: 歌单, 
    1002: 用户, 
    1004: MV, 
    1006: 歌词, 
    1009: 电台,
    1014: 视频, 
    1018:综合
     **/
    
    
}



const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store