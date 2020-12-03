<template>
  <div class="content-head">
    <div class="head-right">
      <Icon :type="mdmenu" size="40" @click="showMenus()" />
    </div>
    <div class="head-box">
      <!-- <div v-for="(item, i) in menus" :key="i">{{ item }}</div> -->
      <!-- logo -->
      <div class="head-logo">
        <router-link to="/"
          ><img src="../../assets/logo.png" alt="logo"
        /></router-link>
      </div>
      <!-- 网页标题 -->
      <div class="head-name">
        <router-link to="/">
          <span>JiasPage</span>
        </router-link>
      </div>
      <!-- 搜索框 -->
      <div class="head-search">
        <Form ref="formSearch">
          <FormItem prop="user">
            <Input search suffix="ios-search" placeholder="输入搜索" />
          </FormItem>
        </Form>
      </div>
      <div class="head-about">
        <router-link to="/login"> <span>关于</span></router-link>
      </div>
      <div class="head-about">
        <router-link to="/login"> <span>关于</span></router-link>
      </div>
      <div class="head-about">
        <router-link to="/login"> <span>关于</span></router-link>
      </div>
      <div class="head-about">
        <router-link to="/login"> <span>关于</span></router-link>
      </div>
    </div>
    <div class="head-menus" ref="menusList">
      <!-- 搜索框 -->
      <div class="head-sm-search">
        <Form ref="formSearch">
          <FormItem prop="user">
            <Input search suffix="ios-search" placeholder="输入搜索" />
          </FormItem>
        </Form>
      </div>
      <div class="head-sm-about">
        <router-link to="/login"> <span>关于</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: 10,
      isMenuShow: false,
      mdmenu: "md-menu",
    };
  },
  methods: {
    // 显示菜单
    showMenus() {
      this.$refs.menusList.style.transition = "0.5s";
      if (this.isMenuShow) {
        this.$refs.menusList.style.transform = "translate(0)";
        this.mdmenu = "md-menu";
        this.isMenuShow = false;
      } else {
        this.$refs.menusList.style.transform =
          "translate(0, calc(100% + 50px))";
        this.mdmenu = "md-list";
        this.isMenuShow = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-head {
  width: 100%;
  height: 60px;
  border-bottom: 1px #eee solid;
  .head-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    display: none;
  }
  .head-box {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    place-items: center;
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
    .head-search {
      grid-column-start: 3;
      grid-column-end: 6;
      place-self: center;
    }
    .head-search ::v-deep .ivu-form-item {
      border-radius: 10%;
      position: relative;
      top: 15px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .head-search ::v-deep .ivu-input {
      border-radius: 20px;
      opacity: 0.6;
    }
    .head-search ::v-deep .ivu-input:hover {
      opacity: 0.9;
    }
    .head-about {
      position: relative;
    }
    .head-about span {
      font-size: 17px;
      color: #c0baba;
      transition: 0.3s;
    }
    .head-about span:hover {
      color: azure;
    }
    .head-about span::after {
      width: 5px;
      height: 5px;
      display: none;
      content: "";
      background: #00abd9;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .head-about span:hover::after {
      display: block;
    }
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
  .content-head {
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 1px #eee solid;
    background-color: rgba(18, 18, 18, 0.1);
    .head-right {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
      cursor: pointer;
      display: block;
    }
    .head-box {
      width: 200px;
      height: 100%;
      margin: 0 auto;
      .head-logo {
        width: 50px;
        height: 50px;
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
        }
      }
      .head-search {
        grid-column-start: 3;
        grid-column-end: 6;
        place-self: center;
        display: none;
      }
      .head-search ::v-deep .ivu-form-item {
        border-radius: 10%;
        position: relative;
        top: 15px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .head-search ::v-deep .ivu-input {
        border-radius: 20px;
        opacity: 0.6;
      }
      .head-search ::v-deep .ivu-input:hover {
        opacity: 0.9;
      }
      .head-about {
        position: relative;
        display: none;
      }
      .head-about span {
        font-size: 17px;
        color: #c0baba;
        transition: 0.3s;
      }
      .head-about span:hover {
        color: azure;
      }
      .head-about span::after {
        width: 5px;
        height: 5px;
        display: none;
        content: "";
        background: #00abd9;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .head-about span:hover::after {
        display: block;
      }
    }
    .head-menus {
      width: 100%;
      height: 70%;
      position: fixed;
      bottom: 100%;
      background: linear-gradient(0deg, rgb(32, 108, 145), rgb(176, 93, 36));
      z-index: 5;
      .head-sm-search {
        width: 70%;
        margin: 10px auto 0 auto;
      }
      .head-sm-search ::v-deep .ivu-input {
        border-radius: 20px;
        opacity: 0.6;
      }
      .head-sm-about {
        width: 70%;
        height: 30px;
        background-color: #a0938a;
        margin: 0 auto;
        border-radius: 5px;
        span {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          font-size: 18px;
          color: black;
          text-align: center;
          line-height: 30px;
        }
      }
      .head-sm-about:hover {
        background-color: rgb(223, 173, 108);
      }
    }
  }
}

// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
}

// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
}

// 大屏幕
@media (min-width: 1200px) {
}

// 超大屏幕
@media (min-width: 1600px) {
}
</style>