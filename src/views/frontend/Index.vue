<template>
  <div class="main">
    <!-- <div class="background" ref="backImg"></div> -->
    <div ref="contMain" class="containers">
      <div ref="moon" class="moon"></div>
      <div class="cloud">
        <img src="../../assets/img/cloud.png">
      </div>
      <div class="div-foot">
        <div class="foot-gif">
          <img src="../../assets/img/lm.gif">
        </div>
      </div>
      <div class="stars">
        <div
          v-for="(item, index) in starsCount"
          :key="index"
          ref="star"
          class="star"
        ></div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      starsCount: 100, // 星星数量
      distance: 800, // 间距
      screenWidth: document.body.clientWidth
    }
  },
  components: {},
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
    }
    this.starPosition()
    this.riseMoon()
  },
  watch: {
    screenWidth() {
      if (this.screenWidth < 480) {
        this.starsCount = 50
      } else {
        this.starsCount = 100
      }
      this.starPosition()
    }
  },
  methods: {
    // HTML星星背景方法
    starsBackgroundFun() {
      let _this = this
      let starArr = this.$refs.star
      // 遍历添加样式
      starArr.forEach((item) => {
        let sf = 0.2 + Math.random() * 1
        let thisDistance = _this.distance + Math.random() * 300
        item.style.transformOrigin = `0 0 ${thisDistance}px`
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${
          Math.random() * 360
        }deg) rotateX(${Math.random() * -50}deg) scale(${sf},${sf})`
        item.style.borderRadius = '50%'
      })
    },
    starPosition() {
      const starArea = this.$refs.contMain
      for (let i = 0; i < this.starsCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')
        starArea.appendChild(star)
      }
      const stars = document.querySelectorAll('.star')
      for (let i = 0; i < this.starsCount; i++) {
        let left = Math.floor(Math.random() * window.innerWidth)
        let top = Math.floor((Math.random() * window.innerHeight) / 1.5)
        stars[i].style.left = left + 'px'
        stars[i].style.top = top + 'px'
        stars[i].style.animationDelay = Math.floor(Math.random().toFixed(1) * i) + 's'
      }
    },
    riseMoon() {
      const rect = this.$refs.moon
      let radian = 30
      let step = window.innerWidth / 35
      let animate = (opt) => {
         let cos = Math.cos((opt.radian * Math.PI) / 180) //邻边比斜边,60度的话等于1/2
        let sin = Math.sin((opt.radian * Math.PI) / 180) //对边比斜边,30度的话等于1/2
        let left = opt.rect.offsetLeft
        // let top = opt.rect.offsetTop
        if (opt.radian > 0) {
          left += opt.step
          opt.radian -= 1 //角度递减1
          let a = left - opt.initLeft
          let c = a / cos
          let b = sin * c
          opt.rect.style.left = opt.initLeft + a + 'px'
          opt.rect.style.top = opt.initTop - b + 'px'
          setTimeout(() => {
            animate(opt)
          }, 10)
        } else {
          opt.rect.style.left = left + opt.step + 'px'
          opt.rect.style.top = opt.initTop + 'px'
        }
      }
      animate({
        step: step,
        rect: rect,
        radian: radian,
        initTop: rect.offsetTop,
        initLeft: rect.offsetLeft,
      })
      // console.log(rect.offsetRight)
      if (rect.offsetLeft > window.innerWidth - 150) {
        rect.style.left = 50 + 'px'
        rect.style.top = 150 + 'px'
      }
    },
  },
}
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
    position: relative;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      #1b2947,
      #2b3152,
      #3b385d,
      #4c4067,
      #5d4771
    );
    // background: linear-gradient(
    //   0deg,
    //   rgba(8, 170, 235, 0.6),
    //   rgba(243, 100, 4, 0.8)
    // );
    .cloud {
      position: absolute;
      width: 20%;
      height: 10%;
      top: 50px;
      left: 50px;
      animation: coludMove 300s linear infinite;
    }
    // 月亮样式
    .moon {
      position: absolute;
      top: 150px;
      left: 50px;
      // right: 50px;
      width: 60px;
      height: 60px;
      background-color: #ffeaa7;
      border-radius: 50%;
      box-shadow: 0 0 20px #ffeaa7;
    }
    .div-foot {
      height: 50px;
      width: 100%;
      position: absolute;
      bottom: 0px;
      .foot-gif {
        width: 50%;
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        border-bottom: 2px solid #A0856B;
        img {
          height: 100%;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
        }
      }
    }
    /* 星星样式 */
    // .stars {
    //   transform: perspective(500px);
    //   transform-style: preserve-3d;
    //   position: relative;
    //   top: 60%;
    //   left: 80%;
    //   perspective-origin: 50% 100%;
    //   animation: rotateStar 200s infinite linear;
    //   .star {
    //     width: 2px;
    //     height: 2px;
    //     background: #eee;
    //     position: absolute;
    //     top: 20%;
    //     left: 0;
    //     backface-visibility: hidden;
    //     border-radius: 50%;
    //   }
    // }
    .star {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0.2;
      border: 2px solid transparent;
      border-bottom: 4px solid #fff;
      animation: blingbling 3s linear infinite, starMove 50s linear infinite;
    }
    .star::before {
      content: '';
      position: absolute;
      top: 4px;
      left: -2px;
      border: 2px solid transparent;
      border-top: 4px solid #fff;
    }
  }
}

// 月亮移动
@keyframes coludMove {
  0% {
    left: 10px;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 10px;
  }
}

@keyframes starMove {
  20% {
    opacity: 0.2;
    transform: translateX(20px);
  }
  100% {
    opacity: 0.2;
    transform: translateX(-20px);
  }
}

// 星星闪烁
@keyframes blingbling {
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}

</style>
