<template>
  <div class="content-head">
    <div class="head-box">
      <!-- <div v-for="(item, i) in menus" :key="i">{{ item }}</div> -->
      <div class="head-logo">
        <router-link to="/"
          ><img src="../../assets/logo.png" alt="logo"
        /></router-link>
      </div>
      <div class="head-name">
        <router-link to="/">
          <span>JiasPage</span>
        </router-link>
      </div>
      <div class="head-search">搜索框</div>
    </div>
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
    width: 70%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    justify-items: center;
    align-items: center;
    // background-color: aqua;
    .head-logo {
      width: 50px;
      height: 50px;
      justify-self: end;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .head-name {
      span {
        font-size: 32px;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        text-align: center;
        color: #eee;
        justify-self: start;
        text-decoration: none;
      }
    }
  }
}
</style>