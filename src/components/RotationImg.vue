<template>
  <div class="content-box">
    <div class="box-pic">
      <ul class="img-list" @mouseout="imgPlay" @mouseover="imgPause">
        <li
          v-for="(imgs, index) in imgsList"
          :key="index"
          :class="setClass(index)"
          :style="setBGImg(imgs.src)"
        >
          <a href="#"><img :src="imgs.src" /></a>
        </li>
        <!-- 左右按钮 -->
        <a class="btn-prev" @click="prevBtn()" v-show="showBtn"
          ><Icon type="ios-arrow-back" color="#aaa"
        /></a>
        <a class="btn-next" @click="nextBtn()" v-show="showBtn"
          ><Icon type="ios-arrow-forward" color="#aaa"
        /></a>
      </ul>
      <!--下面的横线按钮-->
      <div class="btn-dots">
        <span
          v-for="(item, index) in dotsList"
          :key="index"
          :style="setActiveDot(index)"
          @mouseover="currentIndex = index"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgsList: [
        {
          src:
            "https://demosc.chinaz.net/Files/DownLoad/webjs1/201806/jiaoben5973/images/1.png",
        },
        {
          src:
            "https://demosc.chinaz.net/Files/DownLoad/webjs1/201806/jiaoben5973/images/2.png",
        },
        {
          src:
            "https://demosc.chinaz.net/Files/DownLoad/webjs1/201806/jiaoben5973/images/3.png",
        },
        {
          src:
            "https://demosc.chinaz.net/Files/DownLoad/webjs1/201806/jiaoben5973/images/4.png",
        },
        {
          src:
            "https://demosc.chinaz.net/Files/DownLoad/webjs1/201806/jiaoben5973/images/5.png",
        },
      ],
      currentIndex: 0,
      dotsList: 5,
      showBtn: false,
      timer: null,
    };
  },
  methods: {
    setClass(i) {
      let prev =
        this.currentIndex === this.dotsList - 1 ? 0 : this.currentIndex + 1;
      let next =
        this.currentIndex === 0 ? this.dotsList - 1 : this.currentIndex - 1;
      switch (i) {
        case this.currentIndex:
          return "active";
        case next:
          return "next";
        case prev:
          return "prev";
        default:
          return "";
      }
    },
    setBGImg(src) {
      return {
        backgroundImage: `url(${src})`,
      };
    },
    setActiveDot(index) {
      return index === this.currentIndex
        ? {
            backgroundColor: this.color,
          }
        : {
            backgroundColor: "#ccc",
          };
    },
    prevBtn() {
      this.currentIndex =
        this.currentIndex === 0 ? this.dotsList - 1 : this.currentIndex - 1;
    },
    nextBtn() {
      this.currentIndex = ++this.currentIndex % this.dotsList;
    },
    imgPause() {
      clearInterval(this.timer);
      this.showBtn = true;
    },
    imgPlay() {
      this.timer = setInterval(this.nextBtn, 8000);
      this.showBtn = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  width: 100%;
  height: 260px;
  position: relative;
  top: 10px;
  .box-pic {
    width: 90%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    ul li {
      width: 700px;
      height: 250px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      a img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-prev {
      position: absolute;
      left: 10%;
      top: 30%;
      z-index: 3;
      font-size: 50px;
    }
    .btn-next {
      position: absolute;
      right: 10%;
      top: 30%;
      z-index: 3;
      font-size: 50px;
    }
    .active {
      transform: translate3d(-50%, 0, 0) scaleY(1);
      transition: 0.5s;
      z-index: 2;
    }
    .prev {
      transform: translate3d(-80%, 0, -100px) scaleY(0.9);
      transition: 1s;
      opacity: 0.5;
      z-index: 1;
    }
    .next {
      transform: translate3d(-20%, 0, -100px) scaleY(0.9);
      transition: 1s;
      opacity: 0.5;
      z-index: 1;
    }
    .btn-dots {
      width: 80px;
      height: 8px;
      position: absolute;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 10px;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%);
      span {
        cursor: pointer;
        background-color: red;
        border-radius: 50%;
      }
    }
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
  .content-box {
    width: 100%;
    height: 190px;
    position: relative;
    top: 10px;
    .box-pic {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      ul li {
        width: 100%;
        height: 180px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        a img {
          width: 100%;
          height: 100%;
        }
      }
      .btn-prev {
        position: absolute;
        left: 10%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .btn-next {
        position: absolute;
        right: 10%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .active {
        transform: translate3d(-50%, 0, 0) scaleY(1);
        transition: 0.5s;
        z-index: 2;
      }
      .prev {
        transform: translate3d(0, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .next {
        transform: translate3d(0, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .btn-dots {
        width: 80px;
        height: 8px;
        position: absolute;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 10px;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%);
        span {
          cursor: pointer;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
}

// 横向放置的手机和竖向放置的平板之间的分辨率
@media (max-width: 767px) {
  .content-box {
    width: 100%;
    height: 210px;
    position: relative;
    top: 10px;
    .box-pic {
      width: 90%;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      ul li {
        width: 500px;
        height: 200px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        a img {
          width: 100%;
          height: 100%;
        }
      }
      .btn-prev {
        position: absolute;
        left: 2%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .btn-next {
        position: absolute;
        right: 2%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .active {
        transform: translate3d(-50%, 0, 0) scaleY(1);
        transition: 0.5s;
        z-index: 2;
      }
      .prev {
        transform: translate3d(-70%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .next {
        transform: translate3d(-30%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .btn-dots {
        width: 80px;
        height: 8px;
        position: absolute;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 10px;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%);
        span {
          cursor: pointer;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 979px) {
  .content-box {
    width: 100%;
    height: 220px;
    position: relative;
    top: 10px;
    .box-pic {
      width: 90%;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      ul li {
        width: 500px;
        height: 210px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        a img {
          width: 100%;
          height: 100%;
        }
      }
      .btn-prev {
        position: absolute;
        left: 3%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .btn-next {
        position: absolute;
        right: 3%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .active {
        transform: translate3d(-50%, 0, 0) scaleY(1);
        transition: 0.5s;
        z-index: 2;
      }
      .prev {
        transform: translate3d(-80%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .next {
        transform: translate3d(-20%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .btn-dots {
        width: 80px;
        height: 8px;
        position: absolute;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 10px;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%);
        span {
          cursor: pointer;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
}

// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 1200px) {
  .content-box {
    width: 100%;
    height: 260px;
    position: relative;
    top: 10px;
    .box-pic {
      width: 90%;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      ul li {
        width: 700px;
        height: 250px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        a img {
          width: 100%;
          height: 100%;
        }
      }
      .btn-prev {
        position: absolute;
        left: 10%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .btn-next {
        position: absolute;
        right: 10%;
        top: 30%;
        z-index: 3;
        font-size: 50px;
      }
      .active {
        transform: translate3d(-50%, 0, 0) scaleY(1);
        transition: 0.5s;
        z-index: 2;
      }
      .prev {
        transform: translate3d(-80%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .next {
        transform: translate3d(-20%, 0, -100px) scaleY(0.9);
        transition: 1s;
        opacity: 0.5;
        z-index: 1;
      }
      .btn-dots {
        width: 80px;
        height: 8px;
        position: absolute;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 10px;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%);
        span {
          cursor: pointer;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>