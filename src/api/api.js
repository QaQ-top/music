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

// axios.defaults.baseURL = '/music' //npm run dev  启动后使用代理后的没问题
//为什么npm run build后不能使用了，显示跨域

axios.defaults.baseURL = 'http://39.108.182.125:3000' //npm run dev  启动后使用代理后 显示跨域
//为什么npm run build可用使用


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
const searchMH  =  (key) => get(`/search?keywords=${key}&type=1`)

//热门推荐
const heat = () => get(`/search/hot/detail`)

//单曲
//limit : 返回数量 , 默认为 30 offset
const single  = (keywords,num) =>{
    // console.log(keywords)
    let keyWord = {
        keywords,
        type:1,
        limit:16,
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
   let check = await get('/check/music',keyWord)
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
    ci
}