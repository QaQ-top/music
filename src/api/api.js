import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(function (config) {
  console.log("a")
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  console.log("b")
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
//page=1

const get = (url,data={})=>{
    return new Promise((resolve,reject)=>{
        axios
        .get(url,{
            params:data
        })
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
        .post(url,qs.stringify(data))
        .then((response)=>{
            resolve(response.data)
        },
        (err)=>{
            reject(err)
        })
    })
}

//模糊搜索
const searchMH  =  (key) => get(`/music/search?keywords=${key}&type=1`)

//热门推荐
const heat = () => get(`/music/search/hot/detail`)

//单曲
//limit : 返回数量 , 默认为 30 offset
const single  = (keywords,num) =>{
    // console.log(keywords)
    let keyWord = {
        keywords,
        type:1,
        limit:8,
        offset:num
    }
    return get('/music/search',keyWord) ///song/detail
}

//歌曲需求信息
const songDetail = (songId) => {
    return get('/music/song/detail',{
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
   return get('/music/search',keyWord)
}

//歌手
const singer = (keywords,num)=>{
    let keyWord = {
        keywords,
        type:100,
        limit:8,
        offset:num
    }
    return get('/music/search',keyWord)
}
//歌单
const songList = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1000,
        limit:8,
        offset:num
    }
    return get('/music/search',keyWord)
}
//MV
const MV = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1004,
        limit:6,
        offset:num
    }
    return get('/music/search',keyWord)
}
//歌词 
const lyric = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1006,
        limit:8,
        offset:num
    }
    return get('/music/search',keyWord)
}
//电台,
const FM = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1009,
        limit:8,
        offset:num
    }
    return get('/music/search',keyWord)
}
//视频,
const video = (keywords,num) =>{
    let keyWord = {
        keywords,
        type:1014,
        limit:6,
        offset:num
    }
    return get('/music/search',keyWord)
}
 //通过id搜索歌曲
 const song = async (id) =>{
    let keyWord = {
        id,
        type:'mp3'
    }
   let check = await get('/music/check/music',keyWord)
   if(check.success){
        return get('/music/song/url',keyWord)
   }
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
    songDetail
}