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

<style scoped>
    .search-nav{
        width: 100%;
        height: 6.3rem;
        padding:0.3rem;
        box-sizing: border-box;
        display: flex;
        position: fixed;
        top: 6rem;
        z-index: 1;
        background: rgb(252,252,252);
        box-shadow: 0 5px 7px -10px #000
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
    .font-color{
        color:#007aff;
    }
</style>