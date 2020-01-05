<template>
    <div>
        <div class="search-nav">
            <router-link to="/search/single" tag="div" active-class="font-color">
                <p>{{single}}</p>
            </router-link>
            <router-link to="/search/singer" tag="div" active-class="font-color">
                <p>{{singer}}</p>
            </router-link>
            <router-link to="/search/album" tag="div" active-class="font-color">
                <p>{{album}}</p>
            </router-link>
            <router-link to="/search/songList" tag="div" active-class="font-color">
                <p>{{songList}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'searchRouter',
    data () {
        return {
        
        }
    },
    props:['single','singer','album','songList']
}

</script>

<style>
    .search-nav{
        width: 100%;
        height: 4.3rem;
        padding:0.3rem;
        box-sizing: border-box;
        display: flex;
        position: fixed;
        top: 4rem;
        background: white;
        border-top:1px solid rgb(241, 240, 240);
        border-bottom:1px solid rgb(241, 240, 240);
    }
    .search-nav>div{
        flex:1;
        text-align:center;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        font-size: 2rem;
    }
</style>