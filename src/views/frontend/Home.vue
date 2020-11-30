<template>
  <div class="main">
    <div class="back" ref="backImg"></div>
    <div class="containers">
      <!-- 头部部分 -->
      <v-header></v-header>
      <v-rotation-img></v-rotation-img>
      <!-- 路由 -->
      <router-view></router-view>
      <div class="content-body"></div>
      <!-- <div class="loop-img">
        
      </div> -->
    </div>
    <div class="stars">
      <div
        v-for="(item, index) in starsCount"
        :key="index"
        ref="star"
        class="star"
      ></div>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "../../../public/back.jpg";
import Header from "@/views/frontend/Header";
import RotationImg from "@/components/RotationImg";
export default {
  data() {
    return {
      backgroundImgUrl: BackgroundImg,
    };
  },
  components: {
    "v-header": Header,
    "v-rotation-img": RotationImg,
  },
  mounted() {
    this.setBackImg();
  },
  methods: {
    setBackImg() {
      let backImg = this.$refs.backImg.style;
      backImg.backgroundImage = "url(" + this.backgroundImgUrl + ")";
      backImg.backgroundSize = "cover";
      backImg.backgroundRepeat = "no-repeat";
      backImg.backgroundAttachment = "fixed";
    },
    // HTML星星背景方法
    starsBackgroundFun() {
      let _this = this;
      let starArr = this.$refs.star;
      // 遍历添加样式
      starArr.forEach((item) => {
        var sf = 0.2 + Math.random() * 1;
        var thisDistance = _this.distance + Math.random() * 300;
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${
          Math.random() * 360
        }deg) rotateX(${Math.random() * -50}deg) scale(${sf},${sf})`;
        item.style.borderRadius = "50%";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  .back {
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: coverZoom linear infinite 60s;
  }
  .containers {
    width: 101%;
    height: 101%;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(8, 170, 235, 0.6),
      rgba(243, 100, 4, 0.8)
    );
    .content-body {
      .body-img {
        height: 350px;
        .img-loop {
          height: 350px;
          // background-color: aqua;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  /* 星星样式 */
  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotateStar 300s infinite linear;
  }
  .star {
    width: 2px;
    height: 2px;
    background: #f7f7b6;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    border-radius: 50%;
  }
}

@keyframes coverZoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.24);
  }
}

@-moz-keyframes coverZoom {
  0%,
  100% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(1.24);
  }
}

@-webkit-keyframes coverZoom {
  0%,
  100% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.24);
  }
}

/* 星星动画 */
@keyframes rotateStar {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

@-webkit-keyframes rotateStar {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

@-moz-keyframes rotateStar {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
</style>
