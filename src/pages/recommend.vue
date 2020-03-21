<template>
    <div>
        <top-nav txt='推荐'>
            <my-search txt='搜索' slot="cun"></my-search>
            <audio-list slot="icon">
            </audio-list>
        </top-nav>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import mySearch from '../components/mysearch'
import audioList from '../components/audioList'
export default {
    name:"recommend",
    data () {
        return {
            nr:"推荐"
        }
    },
    components: {
        topNav,mySearch,audioList
    }
}
</script>

<style scoped>
    
</style>