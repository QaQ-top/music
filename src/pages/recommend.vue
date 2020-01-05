<template>
    <div>
        <top-nav txt='推荐'>
            <my-search txt='搜索' slot="cun"></my-search>
            <span class="icon iconfont icon-yinle1" slot="icon"></span>
        </top-nav>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
export default {
    name:"recommend",
    data () {
        return {
            nr:"推荐"
        }
    },
    components: {
        topNav,mySearch
    }
}
</script>

<style>
    
</style>