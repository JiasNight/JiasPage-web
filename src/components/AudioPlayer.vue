<template>
  <div class="content-audio">
    <div class="audio-box">
      <!-- 歌曲图像 -->
      <div class="audio-img">
        <img src="../assets/img/moon.png" alt="" />
      </div>
      <!-- 歌曲当前时间 -->
      <span class="audio-time">00:00</span>
      <!-- 歌曲进度条 -->
      <Slider class="audio-slider"></Slider>
      <!-- 歌曲总时间 -->
      <span class="audio-allTime">04:31</span>
      <!-- 上一曲按钮 -->
      <Button class="audio-prev" type="ghost" shape="circle" icon="ios-skip-backward" /></Button>
      <!-- 暂停按钮 -->
      <Button class="audio-stop" type="ghost" shape="circle" icon="md-play" /></Button>
      <!-- 下一曲按钮 -->
      <Button class="audio-next" type="ghost" shape="circle" icon="ios-skip-forward" /></Button>
      <!-- 播放列表按钮 -->
      <Button class="audio-list" type="ghost" shape="circle" icon="md-list" /></Button>
      <!-- 改变播放模式按钮 -->
      <Tooltip class="audio-loop"  content="循环" placement="top">
        <Button type="ghost" shape="circle" icon="md-sync" /></Button>
      </Tooltip>
      <!-- 音量按钮 -->
      <Button class="audio-volume" type="ghost" shape="circle" icon="md-volume-up" /></Button>
      <!-- 音量滑块 -->
      <Slider class="audio-volume-slider"></Slider>
    </div>
    <audio
      @canplay="getDuration"
      @timeupdate="updateTime"
      @error="error"
      @ended="end"
      src=""
      ref="audio"
    ></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    // 初始化加载音乐到音乐列表中
    // this.initMusicLists();
    // this.isShowAudio = this.$store.state.isShowAudio;
  },
  methods: {
    // ...mapActions([
    //   'initMusicLists'
    // ]),
    // 初始化加载音乐信息
    initMusicLists() {
      this.$axios
        .get("testMusic.json")
        .then((res) => {
          this.$store.dispatch("addMusicLists", res.data);
          // console.log('执行了')
          // return res.data
        })
        .catch((error) => {
          console.log("获取音乐列表错误！" + error);
          return error;
        });
    },
    error() {
      this.audioReady = true;
    },
    end() {
      if (this.playMode === 1) {
        console.log("顺序播放");
        // console.log(this.currentIndex)
      } else if (this.playMode === 2) {
        console.log("随机播放");
      } else if (this.playMode === 0) {
        console.log("单曲循环");
        this.audioLoop();
      }
    },
    // 循环播放函数loop
    audioLoop() {
      this.$refs.audio.currentTime = 0;
      setTimeout(this.onPlay(), 2000);
    },
    getDuration() {
      // 歌曲全部时长
      this.totalTime = this.TimeFormat(this.$refs.audio.duration);
    },
    updateTime(e) {
      // 当前时间
      this.currentTime = this.TimeFormat(e.target.currentTime);
    },
    // 用于将时间戳转换成所需时间格式
    TimeFormat(timeStamp) {
      // |0向下取整
      timeStamp = timeStamp | 0;
      // 取余得到分钟
      let minute = (timeStamp / 60) | 0;
      // 取余得秒
      let second = timeStamp % 60;
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    // 播放
    onPlay() {
      this.$refs.audio.volume = this.volume / 100;
      this.imgClass = "avatar-img";
      this.isPlayIcon = "iconfont icon-pause";
      this.playing = true;
      this.$refs.audio.play();
      this.audioLyric = "audio-lyric audio-lyric-move";
      this.isShowAudio = true;
    },
    // 暂停
    onPause() {
      this.$refs.audio.pause();
      this.imgClass = "";
      this.isPlayIcon = "iconfont icon-play";
      this.playing = false;
      this.audioLyric = "audio-lyric";
    },
    // 暂停与播放
    musicPlayOrStop() {
      if (this.playing) {
        // 播放中,点击则为暂停
        this.onPause();
      } else {
        // 暂停中,点击则为播放
        this.onPlay();
      }
    },
    // 列表改变歌曲播放
    changeMusicPlay(id) {
      let info = this.$store.state.currentMusicInfo;
      let musicList = this.$store.state.currentMusicLists;
      musicList.forEach((item) => {
        if (id === item.id) {
          info = item;
          this.$store.commit("setMusicInfo", info);
        }
        setTimeout(this.onPlay(), 500);
      });
    },
    // 上一曲
    musicPrev() {
      let info = this.$store.state.currentMusicInfo;
      let array = this.$store.state.currentMusicLists;
      let arrLen = this.$store.state.currentMusicLists.length;
      let currentIndex = null;
      if (this.playMode === 1) {
        array.forEach(function (item, index) {
          if (info.id === item.id) {
            currentIndex = index;
          }
        });
        currentIndex = currentIndex === 0 ? arrLen - 1 : currentIndex - 1;
        info = array[currentIndex];
        this.$store.commit("setMusicInfo", info);
      } else if (this.playMode === 2) {
        // 随机播放上一曲
        currentIndex = Math.round(Math.random() * (arrLen - 1));
        info = array[currentIndex];
        this.$store.commit("setMusicInfo", info);
      }
    },
    // 下一曲
    musicNext() {
      let info = this.$store.state.currentMusicInfo;
      let array = this.$store.state.currentMusicLists;
      let arrLen = this.$store.state.currentMusicLists.length;
      let currentIndex = null;
      if (this.playMode === 1) {
        array.forEach(function (item, index) {
          if (info.id === item.id) {
            currentIndex = index;
          }
        });
        currentIndex =
          currentIndex === arrLen - 1 ? (currentIndex = 0) : currentIndex + 1;
        info = array[currentIndex];
        this.$store.commit("setMusicInfo", info);
      } else if (this.playMode === 2) {
        // 随机播放下一曲
        currentIndex = Math.round(Math.random() * (arrLen - 1));
        info = array[currentIndex];
        this.$store.commit("setMusicInfo", info);
      }
    },
    // 是否显示播放列表按钮点击事件
    isMusicLists() {
      if (this.musicListShow) {
        this.musicListShow = false;
        this.isMusicListsIcon = "iconfont icon-liebiao";
      } else {
        this.musicListShow = true;
        this.isMusicListsIcon = "iconfont icon-liebiaolist46";
      }
    },
    // 改变播放顺序按钮点击事件
    changeMusicMode() {
      this.playMode += 1;
      if (this.playMode === 1) {
        this.isModeListIcon = "iconfont icon-liebiaoshunxu";
        this.playModeString = "顺序播放";
      } else if (this.playMode === 2) {
        this.isModeListIcon = "iconfont icon-suiji";
        this.playModeString = "随机播放";
      } else if (this.playMode === 3) {
        this.isModeListIcon = "iconfont icon-danquxunhuan";
        this.playModeString = "单曲循环";
        this.playMode = 0;
      }
    },
    // 显示音量横线
    ShowVolume() {
      if (this.showVolume) {
        this.showVolume = false;
      } else {
        this.showVolume = true;
      }
    },
    noShowVolume() {
      setTimeout(() => {
        this.showVolume = false;
      }, 10000);
    },
    // 音量改变
    volumeChange() {
      if (this.volume === 0) {
        this.volumeIcon = "iconfont icon-jingyin";
        this.$refs.audio.volume = 0;
      } else {
        this.volumeIcon = "iconfont icon-yinliang";
        this.$refs.audio.volume = this.volume / 100;
      }
    },
    // 改变进度条播放
    onProgressBarChange(percent) {
      percent = this.percentage_value;
      this.$refs.audio.currentTime =
        this.$refs.audio.duration * (percent / 100); // 拖拽占比
      if (!this.playing) {
        // 非播放状态，拖拽后播放，改变播放状态
        this.onPlay();
      }
    },
    // 锁定播放组件按钮
    isAudioLock() {
      if (this.isShowAudio) {
        this.isShowAudio = false;
        console.log(this.isShowAudio);
      }
    },
  },
  watch: {
    // musicInfo (newSong) {
    // console.log(newSong.id)
    // let oldSong = this.$store.state.currentMusicInfo
    // if (newSong.id !== oldSong.id) {
    //   console.log('改变了')
    //   setTimeout(this.onPlay(), 500)
    // }
    // }
  },
};
</script>

<style lang="scss" scoped>
.content-audio {
  width: 80%;
  height: 62px;
  background-color: rgba(41, 42, 45, 0.8);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 50px;
  z-index: 10;
  .audio-box {
    width: calc(100% - 60px);
    height: 60px;
    // background-color: cadetblue;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: 80px 60px auto 45px 45px 45px 45px 45px 45px 45px;
    grid-template-areas: "img getTime slider allTime prev stop next list loop volume";
    .audio-img,
    .audio-time,
    .audio-slider,
    .audio-allTime,
    .audio-prev,
    .audio-stop,
    .audio-next,
    .audio-list,
    .audio-loop,
    .audio-volume {
      place-self: center;
    }
    .audio-img {
      width: 50px;
      height: 50px;
      grid-area: img;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .audio-time {
      color: cornsilk;
      grid-area: getTime;
    }
    .audio-slider {
      width: 100%;
      grid-area: slider;
    }
    .audio-allTime {
      color: cornsilk;
      grid-area: allTime;
    }
    .audio-prev {
      grid-area: prev;
    }
    .audio-stop {
      grid-area: stop;
    }
    .audio-next {
      grid-area: next;
    }
    .audio-loop {
      grid-area: loop;
    }
    .audio-volume {
      grid-area: volume;
    }
    .audio-volume-slider {
      grid-area: volume;
      transform: rotate(-90deg);
      align-self: center;
      position: relative;
      bottom: calc(100% - 20px);
    }
  }
}
</style>
