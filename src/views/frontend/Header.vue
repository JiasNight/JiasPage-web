<template>
  <div class="content-head">
    <div class="head-left">
      <router-link to="/">
        <Icon type="md-menu" size="50" color="#404040" />
      </router-link>
    </div>
    <div class="head-right">
      <router-link to="/login">
        <Icon type="md-cafe" size="50" color="#404040" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content-head {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  background-color: rgba(18, 18, 18, 0.1);
  .head-left {
    position: absolute;
    left: 20px;
  }
  .head-right {
    position: absolute;
    right: 20px;
  }
}
</style>