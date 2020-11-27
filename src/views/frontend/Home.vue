<template>
  <div class="main">
    <div class="back" ref="BackImg"></div>
    <div class="containers">
      <!-- 头部部分 -->
      <div class="content-head">
        <div class="head-left">
          <router-link to="/">
            <Icon type="md-menu" size="40" color="#404040" />
          </router-link>
        </div>
        <div class="head-right">
          <router-link to="/login">
            <Icon type="md-cafe" size="40" color="#404040" />
          </router-link>
        </div>
      </div>
      <!-- 路由 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import backgroundImg from "../../../public/back.jpg";
export default {
  data() {
    return {
      BackImg: backgroundImg
    };
  },
  mounted() {
    this.setBackImg();
  },
  methods: {
    setBackImg() {
      // console.log('执行')
      let backImg = this.$refs.BackImg.style;
      backImg.backgroundImage = "url(" + this.BackImg + ")";
      backImg.backgroundSize = "cover";
      backImg.backgroundRepeat = "no-repeat";
      backImg.backgroundAttachment = "fixed";
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
    .content-head {
      width: 100%;
      height: 35px;
      background-color: rgba(18, 18, 18, 0.1);
      .head-left {
        position: absolute;
        left: 20px;
      }
      .head-right {
        position: absolute;
        right: 20px;
      }
    }
    .content-head:hover {
      background-color: rgba(18, 18, 18, 0.2);
    }
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
