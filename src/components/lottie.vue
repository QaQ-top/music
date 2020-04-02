<template>
    <div class="bg" @touchmove.prevent @mousewheel.prevent>
        <lottie :options="defaultOptions" :height="Winwidth" :width="Winheight" v-on:animCreated="handleAnimation" class="lottieBox"/>
        <img src="../assets/img/界面.svg" alt="" class="logo">
        <h1 class="cross-bar-glitch" data-slice="20">
            <div class="glitch" style="--slice-count:20;">
                <span style="--i:1; animation-delay: 1062ms;">嗨，轻音 ~</span>
                <span style="--i:2; animation-delay: 945ms;">嗨，轻音 ~</span>
                <span style="--i:3; animation-delay: 977ms;">嗨，轻音 ~</span>
                <span style="--i:4; animation-delay: 929ms;">嗨，轻音 ~</span>
                <span style="--i:5; animation-delay: 1033ms;">嗨，轻音 ~</span>
                <span style="--i:6; animation-delay: 1089ms;"> 嗨，轻音 ~</span>
                <span style="--i:7; animation-delay: 937ms;">嗨，轻音 ~</span>
                <span style="--i:8; animation-delay: 999ms;">嗨，轻音 ~</span>
                <span style="--i:9; animation-delay: 967ms;">嗨，轻音 ~</span>
                <span style="--i:10; animation-delay: 945ms;">嗨，轻音 ~</span>
                <span style="--i:11; animation-delay: 934ms;">嗨，轻音 ~</span>
                <span style="--i:12; animation-delay: 1073ms;">嗨，轻音 ~</span>
                <span style="--i:13; animation-delay: 1048ms;">嗨，轻音 ~</span>
                <span style="--i:14; animation-delay: 1058ms;">嗨，轻音 ~</span>
                <span style="--i:15; animation-delay: 1083ms;">嗨，轻音 ~</span>
                <span style="--i:16; animation-delay: 907ms;">嗨，轻音 ~</span>
                <span style="--i:17; animation-delay: 1019ms;">嗨，轻音 ~</span>
                <span style="--i:18; animation-delay: 918ms;">嗨，轻音 ~</span>
                <span style="--i:19; animation-delay: 955ms;">嗨，轻音 ~</span>
                <span style="--i:20; animation-delay: 1050ms;">嗨，轻音 ~</span>
                <span style="--i:21;">嗨，轻音</span>
            </div>
            <div class="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </h1>
    </div>
</template>

<script>
import * as animationData from '../assets/json/bg.json'

export default {
    name:'myLottieBg',
    data() {
        return {
            defaultOptions: {animationData: animationData},
            animationSpeed: 1,
            anim:null,
            Winwidth:0,
            Winheight:0
        }
    },
    methods: {
        handleAnimation(anim) {
            this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }

    },
    mounted(){
        this.Winwidth = window.innerWidth;
        this.Winheight = window.innerHeight;
    }
}
</script>

<style scoped>
    .bg{
        background-color:#3e9cff;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
.lottieBox{
    position: absolute;
}
.logo{
    margin-top: 20%;
}
.cross-bar-glitch {
  position: relative;
  width: 100%;
  margin-bottom: 30%;
}
.cross-bar-glitch .bars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  overflow: hidden;
}
.cross-bar-glitch .bars .bar {
  width: 100%;
  -webkit-box-flex: 1;
          flex: 1;
  background: currentColor;
  border-radius: 50px;
  -webkit-animation: 0.6s cubic-bezier(0.4, 0.2, 0.175, 1) forwards;
          animation: 0.6s cubic-bezier(0.4, 0.2, 0.175, 1) forwards;
}
.cross-bar-glitch .bars .bar:nth-child(odd) {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
  -webkit-animation-name: slide-left;
          animation-name: slide-left;
}
.cross-bar-glitch .bars .bar:nth-child(even) {
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  -webkit-animation-name: slide-right;
          animation-name: slide-right;
}
.cross-bar-glitch .bars .bar:nth-child(1) {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.cross-bar-glitch .bars .bar:nth-child(2) {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}
.cross-bar-glitch .bars .bar:nth-child(3) {
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
}
.cross-bar-glitch .bars .bar:nth-child(4) {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.cross-bar-glitch .bars .bar:nth-child(5) {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.cross-bar-glitch .glitch {
  opacity: 0;
  -webkit-animation: reveal forwards 0.3s;
          animation: reveal forwards 0.3s;
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
.cross-bar-glitch .glitch span:not(:last-child) {
  --ratio: calc(100% / var(--slice-count));
  --top: calc(var(--ratio) * (var(--i) - 1));
  --bottom: calc(var(--ratio) * (var(--slice-count) - var(--i)));
  position: absolute;
  white-space: nowrap;
  -webkit-clip-path: inset(var(--top) 0 var(--bottom) 0);
          clip-path: inset(var(--top) 0 var(--bottom) 0);
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
}
.cross-bar-glitch .glitch span:nth-child(odd) {
  -webkit-animation-name: slide-from-left;
          animation-name: slide-from-left;
}
.cross-bar-glitch .glitch span:nth-child(even) {
  -webkit-animation-name: slide-from-right;
          animation-name: slide-from-right;
}
.cross-bar-glitch .glitch span:last-child {
  opacity: 0;
  -webkit-animation: reveal steps(1) forwards;
          animation: reveal steps(1) forwards;
  -webkit-animation-delay: 1.2s;
          animation-delay: 1.2s;
}

@-webkit-keyframes slide-from-left {
  from {
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%);
  }
  to {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}

@keyframes slide-from-left {
  from {
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%);
  }
  to {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@-webkit-keyframes slide-from-right {
  from {
    -webkit-transform: translateX(20%);
            transform: translateX(20%);
  }
  to {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@keyframes slide-from-right {
  from {
    -webkit-transform: translateX(20%);
            transform: translateX(20%);
  }
  to {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@-webkit-keyframes reveal {
  to {
    opacity: 1;
  }
}
@keyframes reveal {
  to {
    opacity: 1;
  }
}
@-webkit-keyframes slide-left {
  to {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
}
@keyframes slide-left {
  to {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
}
@-webkit-keyframes slide-right {
  to {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}
@keyframes slide-right {
  to {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}
h1 {
  font-size: 3rem;
  color: white;
}

</style>