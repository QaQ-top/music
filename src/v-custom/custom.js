import Vue from 'vue';

//input获取焦点
Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
        // 聚焦元素
        el.focus()
        }
})

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

