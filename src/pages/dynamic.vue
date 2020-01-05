<template>
    <div>
        <top-nav txt='动态'>
            <atte-choi slot="cun" txt_1='精选' txt_2='关注'></atte-choi>
            <span class="icon iconfont icon-tianjiahaoyou" slot="icon"></span>
        </top-nav>
    </div>
</template>

<script>
import topNav from '../components/top_nav'
import atteChoi from '../components/attention_choiceness'
export default {
    name:"dynamic",
    data () {
        return {
            nr:"动态"
        }
    },
    components: {
        topNav,atteChoi
    }
}
</script>

<style>
    
</style>