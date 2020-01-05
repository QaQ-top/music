<template>
    <div>
        <top-nav txt='我的'>
            <my-search txt='搜索' slot="cun"></my-search>
            <span class="icon iconfont icon-gengduo-tongyong" slot="icon"></span>
        </top-nav>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
export default {
    name:"mine",
    data () {
        return {
            nr:"我的"
        }
    },
    components: {
        topNav,mySearch
    }
}
</script>

<style>
    
</style>