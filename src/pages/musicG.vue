<template>
    <div>
        <top-nav txt='音乐'>
            <my-search slot="cun" txt='搜索'></my-search>
            <span class="icon iconfont icon-yinle1" slot="icon"></span>
        </top-nav>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
export default {
    name:"musicG",
    data () {
        return {
            nr:"音乐馆"
        }
    },
    components: {
        topNav,mySearch
    }
}
</script>

<style>

</style>