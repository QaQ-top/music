<template>
    <div>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'songList',
    data() {
        return {
            
        }
    },
    methods:{
        ...mapActions([
            'song','songList' //歌单
        ]),
    },
    mounted(){
        this.$ajax.songList(this.$store.state.searchVal,0).then(res=>{
            console.log(res.result.playlists)
        })
    }
}
</script>

<style>

</style>