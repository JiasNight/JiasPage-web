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
        <router-link to="/userlist"> <span>分类作品</span></router-link>
      </div>
      <div class="head-about">
        <router-link to="/login"> <span>信息动态</span></router-link>
      </div>
      <div class="head-about">
        <router-link to="/admin"> <span>个人主页</span></router-link>
      </div>
      <div class="head-about" v-if="$store.getters.userName === null">
        <router-link to="/login"> <span>登录</span></router-link> |
        <router-link to="/signup"> <span>注册</span></router-link>
      </div>
      <div class="head-about" v-else>
        <Avatar>{{$store.getters.userName}}</Avatar>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div :class="maskStyle" @click="closeByMask()"></div>
    <!-- 弹出抽屉 -->
    <div class="head-menus" ref="menusList">
      <!-- 搜索框 -->
      <div class="head-sm-search">
        <Form ref="formSearch">
          <FormItem prop="user">
            <Input search suffix="ios-search" placeholder="输入搜索" />
          </FormItem>
        </Form>
      </div>
      <div class="head-sm-public">
        <router-link to="/userlist"> <span>分类作品</span></router-link>
      </div>
      <div class="head-sm-public">
        <router-link to="/login"> <span>信息动态</span></span></router-link>
      </div>
      <div class="head-sm-public">
        <router-link to="/public"> <span>个人主页</span></router-link>
      </div>
      <div class="head-sm-public">
        <router-link to="/login"> <span>联系作者</span></router-link>
      </div>
      <div class="head-sm-info" v-if="$store.getters.userName === null">
        <ButtonGroup shape="circle">
          <Button type="primary" @click="menuSignIn()"> 登录 </Button>
          <Button type="primary" @click="menuSignUp()"> 注册 </Button>
        </ButtonGroup>
      </div>
      <div class="head-sm-info" v-else>
        <Avatar>{{$store.getters.userName}}</Avatar>
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
      maskShow: false,
    };
  },
  computed: {
    maskStyle() {
      return { "mask-style": this.maskShow };
    },
  },
  methods: {
    // 显示菜单
    showMenus() {
      this.$refs.menusList.style.transition = "0.5s";
      if (this.isMenuShow) {
        this.maskShow = false;
        this.$refs.menusList.style.transform = "translate(0)";
        this.mdmenu = "md-menu";
        this.isMenuShow = false;
      } else {
        this.maskShow = true;
        this.$refs.menusList.style.transform =
          "translate(0, calc(100% + 50px))";
        this.mdmenu = "md-list";
        this.isMenuShow = true;
      }
    },
    menuSignIn() {
      this.$router.push("/login");
    },
    menuSignUp() {
      this.$router.push("/signup");
    },
    closeByMask() {
      this.showMenus();
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
  .head-menus {
    width: 100%;
    height: 500px;
    position: fixed;
    bottom: 100%;
    background: linear-gradient(0deg, rgb(32, 108, 145), rgb(176, 93, 36));
    z-index: 5;
    display: none;
    .head-sm-search {
      width: 70%;
      margin: 10px auto 0 auto;
    }
    .head-sm-search ::v-deep .ivu-input {
      border-radius: 20px;
      opacity: 0.6;
    }
    .head-sm-public {
      width: 70%;
      height: 30px;
      background-color: #a0938a;
      margin: 10px auto;
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
    .head-sm-public:hover {
      background-color: rgb(223, 173, 108);
    }
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
  .content-head {
    height: 50px;
    position: relative;
    background-color: rgba(18, 18, 18, 0.1);
    .head-right {
      display: block;
    }
    .head-box {
      width: 200px;
      .head-search {
        display: none;
      }
      .head-about {
        display: none;
      }
    }
    .mask-style {
      position: fixed;
      top: 60px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.5s;
    }
    .head-menus {
      display: block;
      .head-sm-public {
        margin: 50px auto;
        span:hover {
          color: #eee;
        }
      }
      .head-sm-info {
        width: 70%;
        margin: 0 auto;
      }
      .head-sm-info ::v-deep .ivu-btn-group {
        width: 100%;
      }
      .head-sm-info ::v-deep .ivu-btn {
        width: 50%;
      }
    }
  }
}

// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
  .content-head {
    height: 50px;
    position: relative;
    background-color: rgba(18, 18, 18, 0.1);
    .head-right {
      display: block;
    }
    .head-box {
      width: 200px;
      .head-search {
        display: none;
      }
      .head-about {
        display: none;
      }
    }
    .mask-style {
      position: fixed;
      top: 60px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.5s;
    }
    .head-menus {
      display: block;
      .head-sm-search {
        margin: 20px auto 0 auto;
      }
      .head-sm-public {
        margin: 50px auto;
        span:hover {
          color: #eee;
        }
      }
      .head-sm-info {
        width: 70%;
        margin: 0 auto;
      }
      .head-sm-info ::v-deep .ivu-btn-group {
        width: 100%;
      }
      .head-sm-info ::v-deep .ivu-btn {
        width: 50%;
      }
    }
  }
}

// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
  .content-head {
    height: 50px;
    position: relative;
    background-color: rgba(18, 18, 18, 0.1);
    .head-right {
      display: block;
    }
    .head-box {
      width: 200px;
      .head-search {
        display: none;
      }
      .head-about {
        display: none;
      }
    }
    .mask-style {
      position: fixed;
      top: 60px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.5s;
    }
    .head-menus {
      display: block;
      .head-sm-search {
        margin: 20px auto 0 auto;
      }
      .head-sm-public {
        margin: 50px auto;
        span:hover {
          color: #eee;
        }
      }
      .head-sm-info {
        width: 70%;
        margin: 0 auto;
      }
      .head-sm-info ::v-deep .ivu-btn-group {
        width: 100%;
      }
      .head-sm-info ::v-deep .ivu-btn {
        width: 50%;
      }
    }
  }
}

// 大屏幕
@media (min-width: 1200px) {
}

// 超大屏幕
@media (min-width: 1600px) {
  .content-head {
    .head-box {
      width: 1250px;
    }
  }
}
</style>