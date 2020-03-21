import axios from 'axios'
import qs from 'qs'

//加载弹框
import { Indicator } from 'mint-ui';
import Vue from 'vue';

axios.interceptors.request.use( //请求前
    function (config) {
        let arr = [
            '/song/detail',
            '/song/url',
            '/check/music',
            '/search'
        ]
        if(arr.includes(config.url)){
        }else{
            Indicator.open({
                text: '',
                spinnerType: 'snake'
            });
        }
        return config;
    },
    function (error) {  
    // 对请求错误做些什么
    return Promise.reject(error);
    }
);


axios.interceptors.response.use( //响应前
    function (response) {
        Indicator.close();
        return response;
    }, 
    function (error) {
    // 对响应错误做点什么
        Indicator.close();
        return Promise.reject(error);
    }
);
//page=1
axios.defaults.timeout = 10000;
axios.defaults.withCredentials=true;//让ajax携带cookie
// axios.defaults.baseURL = '/music' //npm run dev  启动后使用代理后的没问题
//为什么npm run build后不能使用了，显示跨域

axios.defaults.baseURL = 'http://39.108.182.125:3000' //npm run dev  启动后使用代理后 显示跨域
// //为什么npm run build可用使用


const get = (url,data={})=>{
    return new Promise((resolve,reject)=>{
        axios
        .get(url,{
            params:data
        },{withCredentials:true})
        .then((response)=>{
            resolve(response.data)
        },
        (err)=>{
            reject(err)
            
        })
    })
};

const post = (url,data) =>{
    return new Promise((resolve,reject)=>{
        axios
        .post(url,qs.stringify(data),{withCredentials:true})
        .then((response)=>{
            resolve(response.data)
        },
        (err)=>{
            reject(err)
        })
    })
}

//模糊搜索
const searchMH  =  (key) => {
    let keywords = {
        'keywords':key,
        'type':1
    }
   return get(`/search`,keywords)
}

//热门推荐
const heat = () => get(`/search/hot/detail`)

//单曲
//limit : 返回数量 , 默认为 30 offset
const single  = (keywords,num,limit=16) =>{
    // console.log(keywords)
    let keyWord = {
        keywords,
        type:1,
        limit,
        offset:num
    }
    return get('/search',keyWord) ///song/detail
}

//歌曲详情信息
const songDetail = (songId) => {
    return get('/song/detail',{
        ids:songId
    })
}


//专辑
const album = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:10,
        limit:8,
        offset:num
    }
   return get('/search',keyWord)
}

//歌手
const singer = (keywords,num)=>{
    let keyWord = {
        keywords,
        type:100,
        limit:8,
        offset:num
    }
    return get('/search',keyWord)
}
//歌单
const songList = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1000,
        limit:8,
        offset:num
    }
    return get('/search',keyWord)
}
//MV
const MV = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1004,
        limit:6,
        offset:num
    }
    return get('/search',keyWord)
}
//歌词 
const lyric = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1006,
        limit:8,
        offset:num
    }
    return get('/search',keyWord)
}
//电台,
const FM = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1009,
        limit:8,
        offset:num
    }
    return get('/search',keyWord)
}
//视频,
const video = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1014,
        limit:6,
        offset:num
    }
    return get('/search',keyWord)
}
 //通过id搜索歌曲
 const song = async (id) =>{
    let keyWord = {
        id,
        type:'mp3'
    }
   let check = await post('/check/music',keyWord)
   if(check.success){
        return get('/song/url',keyWord)
   }
};

//歌词
const ci = (id) => {
    let keyWord = {
        id
    };
    return get('/lyric',keyWord);
}


/**
   * 热搜
   */
  const  HotSearchKey = ()=>{
    return fetchGet('/search/hot')
 }


// 0: pc

// 1: android

// 2: iphone

// 3: ipad
//首页轮播图
const banner = () =>{
    let keyWord = {
        type:1
    };
    return get('/banner',keyWord)
}
//推荐歌单
const personalized = () => {
    let keyWord = {
        limit: 8
    };
    return get('/personalized',keyWord)
}
//推荐新音乐
const recommendNewSong = () => {
    return get('/personalized/newsong')
}

// 排行榜
//"2": 网易原创歌曲榜,

//"3": 云音乐飙升榜,

//"4": 云音乐电音榜,
const rankingList = (num) => {
    let keyWord = {
        idx:num
    };
    return get('/top/list',keyWord)
}





//电台 - 推荐类型
const category = () => { ///personalized/djprogram
    return get('dj/category/recommend')
}

//电台 - 推荐电台
const djProgram = () => { //
    return get('/personalized/djprogram')
}

//热门电台
const hotDj = () =>{
    let keyWord = {
        limit:16,
        offset:1
    }
    return get('/dj/hot',keyWord)
}

//电台分类
const djType = () =>{
    return get('/dj/catelist')
}

//电台分类推荐
const djs = (type) =>{
    let keyWord = {
        type
    }
    return get('/dj/recommend/type',keyWord)
}
// 电台详情
const djDetails = (rid) =>{
    let keyWord = {
        rid
    }
    return get('/dj/program',keyWord)
}





//手机登录 /login/cellphone?phone=xxx&password=yyy
const login = (username,pwd) => {
    let keyWord ={
        phone : username,
        password : pwd
    }
    return post('/login/cellphone',keyWord)
}
// 退出登录
const logout = () => {
    return get('/logout')
}


// 获取用户歌单
const usePlaylist = (id)=>{
    let keyWord = {
        uid:id
    };
    return get('/user/playlist',keyWord)
}



//获取歌手
const artist = (cat,offset=1) =>{
    let keyWord = {
        limit:16,
        offset,
        cat
    }
    return get('/artist/list',keyWord)
}

//歌手歌曲
const artistSong = (id) =>{
    let keyWord = {
        id
    }
    return get('/artists',keyWord)
}


// 查看登录状态
const logStatus = () => {
    return get('/login/status')
}
//刷新登录
const refresh = (timestamp,token) =>{
    return get('/login/refresh')
}

//收藏的歌手列表
const sublist = (timestamp,token) =>{
    return get('/artist/sublist')
}

//每日推荐歌曲
const redSong = ()=>{
    return get('/recommend/songs')
}

//歌单分类
const songCatList = ()=>{
    return get('/playlist/hot')
}

//获取精品歌单
const playlist = (cat,before=null)=>{
    let keyWord = {
        cat,
        before,
        limit:10
    }
    return get('/top/playlist/highquality',keyWord)
}

//
const songListDetails = (id) =>{
    let keyWord = {
        id
    }
    return get('/playlist/detail',keyWord)
}

//排行榜
const rankType = (idx) =>{
    let keyWord = {
        idx,
    }
    return get('/top/list',keyWord)
}

//获取专辑内容
const albumDetails = (id) =>{
    let keyWord = {
        id
    }
    return get('album',keyWord)
}

//获取 mv 数据
const mvDetails = (mvid) =>{
    let keyWord = {
        mvid
    }
    return get('/mv/detail',keyWord)
}

//mv 地址
const mvUrl = (id) =>{
    let keyWord = {
        id
    }
    return get('/mv/url',keyWord)
}

export default {
    get,
    post,
    searchMH,
    heat, 
    song,
    single,
    album,
    singer,
    songList,
    MV,
    lyric,
    FM,
    video,
    song,
    songDetail,
    ci,
    banner,
    personalized,
    recommendNewSong,
    rankingList,
    djProgram,
    category,
    hotDj,
    login,
    logout,
    HotSearchKey,
    usePlaylist,
    artist,
    logStatus,
    refresh,
    sublist,
    redSong,
    songCatList,
    playlist,
    rankType,
    djType,
    djs,
    albumDetails,
    songListDetails,
    mvDetails,
    mvUrl,
    djDetails,
    artistSong
}

Vue.prototype.Type = [
    {
        type:10,
        name:'专辑',
        request:albumDetails
    },
    {
        type:100,
        name:'歌手',
        request:artistSong
    },
    {
        type:1000,
        name:'歌单',
        request:songListDetails
    },
    {
        type:1009,
        name:'电台',
        request:djDetails
    }
]