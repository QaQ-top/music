<template>
    <div>
        <h1 class="coll_h1">{{txt}}</h1>
        <slot name="dom"></slot>
    </div>
</template>

<script>
export default {
    naem:'coll',
    data () {
        return {
            
        }
    },
    props:['txt']
}
</script>

<style>
.coll_h1{
   text-align: left;
   width:96%;
   margin-left: 4%;
   font-size: 2rem;
   margin-top:1rem;
}
</style>