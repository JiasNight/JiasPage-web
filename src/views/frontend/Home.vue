<template>
  <div class="contents">
    <!-- 头部部分 -->
    <v-Header></v-Header>
    <!-- 轮播图 -->
    <v-RotationImg></v-RotationImg>
    <!-- 音乐组件 -->
    <v-AudioPlayer></v-AudioPlayer>
    <div class="content-body"></div>
  </div>
</template>

<script>
import Header from "@/views/frontend/Header";
import RotationImg from "@/components/RotationImg";
import AudioPlayer from "@/components/AudioPlayer";
export default {
  data() {
    return {};
  },
  components: {
    "v-Header": Header,
    "v-RotationImg": RotationImg,
    "v-AudioPlayer": AudioPlayer,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.contents {
  width: 101%;
  height: 101%;
  position: fixed;
  top: 0;
  left: 0;
  .content-body {
    .body-img {
      height: 350px;
      .img-loop {
        height: 350px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
