<template>
    <div class="login">
        <div class="iocn iconfont icon-jiantou-zuo-cuxiantiao" @click="fh">

        </div>
        <div class="loginCon">
            <div class="input">
                <input type="text" v-model="username" class="inpt" placeholder="请输入账号">
            </div>
            <div class="input">
                <input type="password" v-model="password" class="inpt" placeholder="请输入密码">
            </div>
            <div class="btn" @click="login">
                登录
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        login(){
            this.$request.login(this.username,this.password).then(res=>{
                console.log(res);
                console.log(Date.parse(new Date()))
                if(res.code===200){
                    let local = window.localStorage;
                    let str = JSON.stringify({
                        name:res.profile.nickname, //用户信息
                        userId:res.profile.userId, //用户id
                        avatarUrl:res.profile.avatarUrl, //用户头像
                        bgUrl:res.profile.backgroundUrl, //用户背景
                        token:res.token  //token
                    })
                    local.setItem('user',str)
                }
            })
        },
        fh(){
            window.history.back()
        }
    },
}
</script>

<style scoped>
    .login{
        width: 100%;
        height: 100%;
        position:fixed;
        background-color: #3e9cff;
        top:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loginCon{
        width: 70%;
        height:30%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .inpt{
        width: 100%;
        height: 3.5rem;
        background-color: transparent;
        outline: none;
        color: white;
        border:none;
        font-size: 2rem;
    }
    .input{
        width: 100%;
        height: 3.5rem;
        border-bottom: 1px white solid
    }
    .btn{
        width: 100%;
        height: 3.5rem;
        background-color: white;
        color: #3e9cff;
        border-radius: 3.5rem;
        font-size: 2rem;
        line-height: 3.5rem;
    }
    .inpt::placeholder{
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.5)
    }
    .icon-jiantou-zuo-cuxiantiao{
        font-size: 4rem;
        color: white;
        position: absolute;
        top:0.5rem;
        left: 1rem;
    }
</style>