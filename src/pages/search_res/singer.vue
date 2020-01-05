<template>
    <div>
        
    </div>
</template>

<script>

export default {
    name:'singer',
    data() {
        return {
            
        }
    },
    methods:{
        
    },
    mounted(){
       this.$ajax.singer(this.$store.state.searchVal,0).then(res=>{
            console.log(res.result.artists)
        })
    }
}
</script>

<style>

</style>