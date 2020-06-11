<template>
    <div>
        <my-prev-nav :tabRoutePath ='routePath'>
            <div slot='prev_center' class="name">
                <span>关注的专辑</span>
            </div>
            <span slot='prev_right' class="" >
            </span>
        </my-prev-nav>
        <div v-for="(item, index) in arr" :key="index" class="ab" @click="dist(item.id)">
            <div class="abImg">
                <img v-lazy='item.picUrl'>
            </div>
            <div class="abTxt">
                <p class="dit">{{item.name}}</p>
                <p class="corLi">{{item.artists[0].name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import myPrevNav from '../components/back_prev';
import { MessageBox  } from 'mint-ui';

export default {
    name:'gab',
    data() {
        return {
            routePath:'/mine',
            arr:[],
            isKui:false
        }
    },
    components:{
        myPrevNav
    },
    methods:{
        dist(id){
            this.$router.push({
                name:'songBox',
                params:{
                    id,
                    targetType:10,
                    path:this.$route.path,
                }
            })
        },
    },
    activated(){
        let loginDate = window.localStorage.getItem('login') //app 无法使用cookie 只能使用本地缓存 在登陆的时候记住时间 然后每次判断今天于上次登陆的差是否超过15天
        let key = 1296000000 > Date.parse(new Date()) - Date.parse(loginDate)
        if(key){ //判断用户是否登录
            this.$request.gAlbum().then(res=>{
                this.arr.length = 0;
                this.arr.push(...res.data);
                this.isKui = true;
            })
        }else{
            MessageBox.alert('您还没有登录~').then(action => {
                // window.history.back()
            })
        }
    }
}
</script>

<style scoped>
.name {
    display: block;
    width: 70%;
    text-align: left;
    font-size: 1.7rem;
}
.ab{
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    height: 8rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.abImg{
    width: 6rem;
    height: 6rem;
    margin-right: 1rem;
}
.abImg>img{
    width: 100%;
    height: 100%;
    border-radius: 1rem;
}
.abTxt{
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
}
.dit{
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.corLi{
    font-size: 1rem;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    color: rgb(190, 190, 190);
    text-overflow: ellipsis;
}
</style>