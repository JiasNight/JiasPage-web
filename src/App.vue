<template>
  <div class="main">
    <div class="back" ref="BackImg"></div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BackImg: require("./assets/img/back.jpg"),
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: coverZoom linear infinite 60s;
  }
  .container {
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
