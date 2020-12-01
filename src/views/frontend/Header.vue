<template>
  <div class="content-head">
    <div class="head-box">
      <div v-for="(item, i) in menus" :key="i">{{ item }}</div>
    </div>
    <!-- <div class="head-left">
      <router-link to="/">
        <Icon type="md-menu" size="50" color="#404040" />
      </router-link>
    </div>
    <div class="head-right">
      <router-link to="/login">
        <Icon type="md-cafe" size="50" color="#404040" />
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: 10,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-head {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  border-bottom: 1px #eee solid;
  background-color: rgba(18, 18, 18, 0.1);
  .head-box {
    width: 80%;
    height: 100%;
    position: absolute;
    // background-color: aqua;
    left: 50%;
    transform: translate(-50%);
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
  // .head-left {
  //   position: absolute;
  //   left: 20px;
  // }
  // .head-right {
  //   position: absolute;
  //   right: 20px;
  // }
}
</style>