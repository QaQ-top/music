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
            isSollor:false
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
    },
    beforeDestroy() {
        console.log('fffaaa')
         console.log(this.isSollor)
        this.isSollor = true;
        console.log(this.isSollor)
    },
}
</script>

<style>

</style>