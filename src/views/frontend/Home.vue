<template>
  <div class="contents">
    <!-- 头部部分 -->
    <v-header></v-header>
    <!-- 轮播图 -->
    <v-rotation-img></v-rotation-img>
    <!-- <Divider></Divider> -->
    <div class="content-body"></div>
  </div>
</template>

<script>
import Header from "@/views/frontend/Header";
import RotationImg from "@/components/RotationImg";
export default {
  data() {
    return {};
  },
  components: {
    "v-header": Header,
    "v-rotation-img": RotationImg,
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
