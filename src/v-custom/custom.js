import Vue from 'vue';

//input获取焦点
Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
        // 聚焦元素
        el.focus()
        }
})


//处理歌曲详情
Vue.prototype.SongArray = (array,variable) =>{
        if(array){
                let arr = [];
                array.map(item=>{  //遍历数组里的歌曲
                        let artists = []
                        item.artists.map(art=>{
                            artists.push({ //将某一首歌曲的歌手名与歌手id提取放入artists
                            artistsName : art.name,
                            artistsId : art.id
                            })
                        }),
                        arr.push({ //将某一首歌曲id 歌曲名称 专辑名 专辑id 歌手名 歌手id push入arr中
                        name:item.name, //歌曲名称 
                        id:item.id,  //歌曲id
                        artists, //歌曲的歌手名与歌手id
                        album:{
                            albumId:item.album.id, // 专辑id
                            albumName:item.album.name // 专辑名
                        }
                        })
                })
                variable.push(...arr)
        }else{
                throw new Error('第一个参数不是数组类型，无法处理')
        }
}

Vue.prototype.singerType = [
        {
                type:'入驻歌手',
                id:5001
        },
        {
                type:'华语男歌手',  
                id:1001
        },
        {
                type:'华语女歌手',   
                id:1002
        },
        {
                type:'华语组合/乐队',   
                id:1003
        },
        {
                type:'欧美男歌手',   
                id:2001
        },
        {
                type:'欧美女歌手',  
                id:2002
        },
        {
                type:'欧美组合/乐队',  
                id:2003
        },
        {
                type:'日本男歌手',   
                id:6001
        },
        {
                type:'日本女歌手', 
                id:6002
        },
        {
                type:'日本组合/乐队',  
                id:6003
        },
        {
                type:'韩国男歌手',  
                id:7001
        },
        {
                type:'韩国女歌手',  
                id:7002
        },
        {
                type:'韩国组合/乐队',  
                id:7003
        },
        {
                type:'其他男歌手',  
                id:4001
        },
        {
                type:'其他女歌手',  
                id:4002
        },
        {
                type:'其他组合/乐队',  
                id:4003
        },
]