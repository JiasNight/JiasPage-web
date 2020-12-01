<template>
  <div class="content-box">
    <div class="content-rotaimg">
      <div class="img-list" @mouseout="imgPlay" @mouseover="imgPause">
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
      </div>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      imgsList: [
        {
          src:
            "https://www.17sucai.com/preview/1232839/2019-08-12/js%E5%8E%9F%E7%94%9F%E5%AE%9E%E7%8E%B0%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%95%88%E6%9E%9C/images/1.jpg",
        },
        {
          src:
            "https://www.17sucai.com/preview/1232839/2019-08-12/js%E5%8E%9F%E7%94%9F%E5%AE%9E%E7%8E%B0%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%95%88%E6%9E%9C/images/2.jpg",
        },
        {
          src:
            "https://www.17sucai.com/preview/1232839/2019-08-12/js%E5%8E%9F%E7%94%9F%E5%AE%9E%E7%8E%B0%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%95%88%E6%9E%9C/images/3.jpg",
        },
        {
          src:
            "https://www.17sucai.com/preview/1232839/2019-08-12/js%E5%8E%9F%E7%94%9F%E5%AE%9E%E7%8E%B0%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%95%88%E6%9E%9C/images/4.jpg",
        },
        {
          src:
            "https://www.17sucai.com/preview/1232839/2019-08-12/js%E5%8E%9F%E7%94%9F%E5%AE%9E%E7%8E%B0%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%95%88%E6%9E%9C/images/1.jpg",
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
  height: 250px;
  position: relative;
  top: 60px;
  .content-rotaimg {
    width: 90%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    .img-list {
      height: 100%;
      li {
        width: 50%;
        height: 95%;
        position: absolute;
        left: 50%;
        list-style: none;
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
        transform: translate3d(-50%, 0, 0) scaleX(1) scaleY(1);
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
    }
  }
  .btn-dots {
    width: 15%;
    height: 2.5px;
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
      border-radius: 10%;
    }
  }
}

// 大屏幕
@media only screen and (min-width: 1600px) {
  .content-box {
    width: 100%;
    height: 320px;
    .img-list .btn-prev,
    .btn-next {
      font-size: 60px;
    }
  }
}

// 平板电脑和小屏电脑之间的分辨率
@media only screen and (min-width: 768px) and (max-width: 979px) {
  .content-box {
    height: 210px;
    .content-rotaimg {
      .img-list {
        li {
          width: 60%;
        }
        .btn-prev {
          left: 5%;
          font-size: 45px;
        }
        .btn-next {
          right: 5%;
          font-size: 45px;
        }
      }
    }
  }
}

// 横向放置的手机和竖向放置的平板之间的分辨率
@media only screen and (max-width: 767px) {
  .content-box {
    height: 200px;
    .content-rotaimg {
      .img-list {
        li {
          width: 70%;
        }
        .btn-prev {
          left: 5%;
          font-size: 40px;
        }
        .btn-next {
          right: 5%;
          font-size: 40px;
        }
      }
    }
  }
}

// 横向放置的手机及分辨率更小的设备
@media only screen and (max-width: 480px) {
  .content-box {
    height: 180px;
    .content-rotaimg {
      .img-list {
        li {
          width: 90%;
        }
        .btn-prev {
          left: 0px;
          font-size: 30px;
        }
        .btn-next {
          right: 0px;
          font-size: 30px;
        }
      }
    }
    .btn-dots {
      span {
        border-radius: 50%;
      }
    }
  }
}
</style>