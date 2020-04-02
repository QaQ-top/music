import axios from 'axios'
import qs from 'qs'

//加载弹框
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
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
        if(error.response&&error.response.hasOwnProperty('data')){
            if(error.response.data.message){
                MessageBox('提示', error.response.data.message);
            }else if(error.response.data.msg){
                MessageBox('提示', error.response.data.msg);
            }else{
                MessageBox('提示', '出现未知错误');
            }
        }else{
            MessageBox('提示', '网络超时');
        }
        return Promise.reject(error);
    }
);
//page=1
axios.defaults.timeout = 10000;
axios.defaults.withCredentials=true;//
// axios.defaults.baseURL = '/music' //npm run dev  

axios.defaults.baseURL = 'http://39.108.182.125:3000' //npm run dev  


const get = (url,data={})=>{
    return new Promise((resolve,reject)=>{
        axios
        .get(url,{
            params:data
        },{withCredentials:true})
        .then((response)=>{
            resolve(response.data)
        },
        // (err)=>{
        //     reject(err)
            
        // }
        )
    })
};

const post = (url,data) =>{
    return new Promise((resolve,reject)=>{
        axios
        .post(url,qs.stringify(data),{withCredentials:true})
        .then((response)=>{
            resolve(response.data)
        },
        // (err)=>{
        //     reject(err)
        // }
        )
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
    return get('/search/hot')
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

//电台 - 推荐
const djProgram = () => { //
    return get('/dj/recommend')
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
//收藏,取消收藏 歌手 t:操作,1 为收藏,其他为取消收藏
const subArtist = (id,t) =>{
    let keyWord = {
        id,
        t
    }
    return get('/artist/sub',keyWord)
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

// 收藏/取消收藏歌单
// 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单 t : 类型,1:收藏,2:取消收藏 
const subPlaylist = (id,t) =>{
    let keyWord = {
        id,
        t
    }
    return get('/playlist/subscribe',keyWord)
}

// 收藏/取消收藏专辑
// 说明 : 调用此接口,可收藏/取消收藏专辑  t : 1 为收藏,其他为取消收藏

const subAlbum = (id,t) =>{
    let keyWord = {
        id,
        t
    }
    return get('/album/sub',keyWord)
}
//对歌单添加或删除歌曲 op: 从歌单增加单曲为 add, 删除为 del pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
const add = (pid,tracks) =>{
    let keyWord = {
        tracks,
        pid,
        op:'add'
    }
    return get('/playlist/tracks',keyWord)
}
const del = (pid,tracks) =>{
    let keyWord = {
        tracks,
        pid,
        op:'del'
    }
    return get('/playlist/tracks',keyWord)
}

// 新建歌单
// 说明 : 调用此接口 , 传入歌单名字可新建歌单 必选参数 : name : 歌单名 
const songListAdd = (name) =>{
    let keyWord = {
        name
    }
    return post('/playlist/create',keyWord)
}

// 删除歌单
// 说明 : 调用此接口 , 传入歌单id可删除歌单 // 必选参数 : id : 歌单id  ?id=2947311456
const songListDel = (id) =>{
    let keyWord = {
        id
    }
    return post('/playlist/delete',keyWord)
}

// 更新歌单
 //参数: // id:歌单id name:歌单名字 desc:歌单描述
const songListUpdate = (id,name,desc) =>{
    let keyWord = {
        id,
        name,
        desc,
        tags:''
    }
    return post('/playlist/update',keyWord)
}

// 获取用户信息 
// 说明 : 登陆后调用此接口 , 可以获取用户信息
const getUser = () =>{
    return get('/user/subcount')
}

// 更新用户信息
// 说明 : 登陆后调用此接口 , 传入相关信息,可以更新用户信息

// 必选参数 :

// gender: 性别 0:保密 1:男性 2:女性

// birthday: 出生日期,时间戳 unix timestamp

// nickname: 用户昵称

// province: 省份id

// city: 城市id

// signature：用户签名
const setUser = (data) =>{
    let keyWord = {
        nickname:data.nickname,
        province:data.province,
        gender:data.gender,
        birthday:data.birthday,
        city:data.city,
        signature:data.signature,
    }
    return post('/user/update',keyWord)
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
    djDetails,
    artistSong,
    add,
    del,
    songListAdd,
    songListDel,
    songListUpdate,
    getUser,
    setUser
}

Vue.prototype.Type = [
    {
        type:10,
        name:'专辑',
        request:albumDetails,
        isLike:subAlbum,
    },
    {
        type:100,
        name:'歌手',
        request:artistSong,
        isLike:subArtist,
    },

    {
        type:1000,
        name:'歌单',
        request:songListDetails,
        isLike:subPlaylist,
    },
    {
        type:520,
        name:'我喜欢',
        request:songListDetails
    },
    {
        type:1009,
        name:'电台',
        request:djDetails
    }
]