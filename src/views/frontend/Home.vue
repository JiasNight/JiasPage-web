<template>
  <div class="contents">
    <!-- 头部部分 -->
    <v-Header></v-Header>
    <!-- 身体部分 -->
    <div class="content-body">
      <!-- 轮播图 -->
      <v-RotationImg></v-RotationImg>
      <Divider> 内容部分 </Divider>
      <!-- 音乐组件 -->
      <v-AudioPlayer></v-AudioPlayer>
    </div>
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
    overflow: hidden;
  }
  .content-body ::v-deep .ivu-divider-horizontal {
    width: 60%;
    min-width: 60%;
    margin: 20px auto;
  }
}
</style>
