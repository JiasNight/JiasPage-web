<template>
  <div class="main">
    <div class="background" ref="backImg"></div>
    <div class="containers">
      <router-view></router-view>
      <div class="stars">
        <div
          v-for="(item, index) in starsCount"
          :key="index"
          ref="star"
          class="star"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "../../../public/back.jpg";
export default {
  data() {
    return {
      starsCount: 800, // 星星数量
      distance: 800, // 间距
      backgroundImgUrl: BackgroundImg,
    };
  },
  components: {},
  mounted() {
    this.starsBackgroundFun();
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
  overflow: hidden;
  .background {
    width: 100%;
    height: 100%;
    animation: coverZoom linear infinite 60s;
    z-index: 1;
  }
  .containers {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(8, 170, 235, 0.6),
      rgba(243, 100, 4, 0.8)
    );
    /* 星星样式 */
    .stars {
      transform: perspective(500px);
      transform-style: preserve-3d;
      position: relative;
      top: 60%;
      left: 80%;
      perspective-origin: 50% 100%;
      animation: rotateStar 200s infinite linear;
      .star {
        width: 2px;
        height: 2px;
        background: #eee;
        position: absolute;
        top: 20%;
        left: 0;
        backface-visibility: hidden;
        border-radius: 50%;
      }
    }
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
</style>
