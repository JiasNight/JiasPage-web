<template>
  <div class="containers">
    <div class="back" ref="backImg"></div>
    <div class="contents">
      <!-- 头部部分 -->
      <v-header></v-header>
      <!-- 轮播图 -->
      <v-rotation-img></v-rotation-img>
      <!-- <Divider></Divider> -->
      <div class="content-body"></div>
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
  },
};
</script>

<style lang="scss" scoped>
.containers {
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
  .contents {
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
