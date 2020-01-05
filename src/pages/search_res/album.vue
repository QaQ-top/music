<template>
    <div>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'album',
    data() {
        return {
            
        }
    },
    methods:{

    },
    mounted(){
        this.$ajax.album(this.$store.state.searchVal,0).then(res=>{
            console.log(res.result.albums)
        })
        
    }
}
</script>

<style>

</style>