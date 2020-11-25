<template>
  <div class="container">
    <div class="main-content" ref="contBack">
      <div class="content-head">
        <div class="head-left">
          <router-link to="/">
            <Icon type="md-menu" size="40" color="#404040" />
          </router-link>
        </div>
        <div class="head-right">
          <router-link to="/">
            <Icon type="md-cafe" size="40" color="#404040" />
          </router-link>
        </div>
      </div>
      <div class="content-box">
        <!-- 标题 -->
        <div class="login-head">
          <router-link to="/">
            <span class="lgoin-title">J I A S</span>
          </router-link>
          <router-link to="/signup">
            <span class="is-account">没有账户？</span>
          </router-link>
        </div>
        <div class="login-box">
          <!-- 登录表单 -->
          <Form class="login-style" :model="loginFormData" :rules="loginRules">
            <FormItem prop="userName">
              <Input
                type="text"
                prefix="ios-contact-outline"
                size="large"
                clearable
                v-model="loginFormData.userName"
                placeholder="Username"
              >
              </Input>
            </FormItem>
            <FormItem prop="userPasswd">
              <Input
                type="password"
                prefix="ios-lock-outline"
                size="large"
                password
                v-model="loginFormData.userPasswd"
                placeholder="Password"
              >
              </Input>
            </FormItem>
            <FormItem prop="identifyCode">
              <Input
                class="ver-code-input"
                type="text"
                prefix="ios-barcode-outline"
                size="large"
                clearable
                v-model="loginFormData.identifyCode"
                placeholder="Sidentify"
              >
              </Input>
              <!-- 验证码 -->
              <v-identifyCode
                class="ver-code"
                :identifyCode="identifyCode"
                @click.native="makeCode()"
              ></v-identifyCode>
            </FormItem>
            <Checkbox class="remember-check" v-model="isRemember"
              >记住密码</Checkbox
            >
            <a href="#" class="forget-passwd">忘记密码？</a>
            <FormItem>
              <Button
                type="primary"
                shape="circle"
                long
                size="large"
                @click="signInBtn(loginFormData)"
                >登录</Button
              >
            </FormItem>
          </Form>
          <div class="login-other">
            <Divider>第三方登录</Divider>
            <ul>
              <a href="https://gitee.com/auth/github">
                <Tooltip content="使用github登录" placement="bottom-end">
                  <li><Icon type="logo-github" size="30" color="#000000" /></li>
                </Tooltip>
              </a>
              <a href="https://gitee.com/auth/github">
                <Tooltip content="使用github登录" placement="bottom-end">
                  <li><Icon type="logo-apple" size="30" color="#000000" /></li>
                </Tooltip>
              </a>
              <a href="https://gitee.com/auth/github">
                <Tooltip content="使用github登录" placement="bottom-end">
                  <li>
                    <Icon type="logo-linkedin" size="30" color="#000000" />
                  </li>
                </Tooltip>
              </a>
              <a href="https://gitee.com/auth/github">
                <Tooltip content="使用github登录" placement="bottom-end">
                  <li><Icon type="logo-tux" size="30" color="#000000" /></li>
                </Tooltip>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IdentifyCode from "@/components/IdentifyCode";
export default {
  data() {
    const identifyCodeCheck = (rule, value, callback) => {
      console.log("value:" + value);
      if (value === "") {
        callback(new Error("请输入验证码!"));
      } else if (value !== this.identifyCode) {
        callback(new Error("验证码输入错误!"));
        // callback(new Error(value));
      } else {
        callback();
      }
    };
    return {
      isRemember: false, // 是否记住密码
      identifyCode: "",
      loginFormData: {
        userName: "",
        userPasswd: "",
        identifyCode: "",
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入登录用户名！", trigger: "blur" },
        ],
        userPasswd: [
          { required: true, message: "请输入用户密码！", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "用户密码最短为6",
            trigger: "blur",
          },
        ],
        identifyCode: [
          {
            required: true,
            validator: identifyCodeCheck,
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    "v-identifyCode": IdentifyCode,
  },
  mounted() {
    // 读取cookie里的用户名和密码
    this.getCookie();
    // 验证码生成
    this.makeCode();
  },
  methods: {
    // 设置cookie
    setCookie(name, pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      document.cookie =
        "userName=" + name + ";path=/;expires=" + exdate.toLocaleString();
      document.cookie =
        "userPasswd=" + pwd + ";path=/;expires=" + exdate.toLocaleString();
    },
    // 获取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == "userName") {
            // 保存到保存数据的地方
            this.loginFormData.userName = arr2[1];
          } else if (arr2[0] == "userPasswd") {
            this.loginFormData.userPasswd = arr2[1];
          }
        }
      }
    },
    // 删除cookie
    clearCookie() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    },
    //生成验证码
    makeCode() {
      this.identifyCode = "";
      for (let i = 0; i < 4; i++) {
        let identifyCodes = "0123456789abcdefjhijklinopqrsduvwxyz";
        this.identifyCode +=
          identifyCodes[
            Math.floor(Math.random() * (identifyCodes.length - 0) + 0)
          ];
      }
      console.log(this.identifyCode);
    },
    // 登录按钮
    signInBtn(loginFormData) {
      if (this.isRemember) {
        this.setCookie(loginFormData.userName, loginFormData.userPasswd, 7);
      } else {
        this.clearCookie();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
    position: fixed;
    // background: linear-gradient(
    //   0deg,
    //   rgba(8, 170, 235, 0.5),
    //   rgba(243, 100, 4, 0.6)
    // );
    .content-head {
      width: 100%;
      height: 40px;
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
    .content-head:hover {
      background-color: rgba(18, 18, 18, 0.2);
    }
    .content-box {
      width: 320px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -75%);
      .login-head {
        text-align: center;
        .lgoin-title {
          font-size: 65px;
          font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
            "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
            "WenQuanYi Micro Hei", sansserif;
          font-weight: bolder;
          color: #515a6e;
        }
        .lgoin-title:hover {
          color: #515a6e;
        }
        .is-account {
          position: absolute;
          right: 20px;
          top: 100px;
          color: cornsilk;
        }
        .is-account:hover {
          color: #00a2e8;
        }
      }
      .login-box {
        width: 100%;
        position: relative;
        top: 40px;
        // 使用::v-deep修改控制iview默认样式
        .login-style ::v-deep .ivu-form-item {
          height: 50px;
        }
        .login-style ::v-deep .ivu-input {
          border-radius: 25px;
          background-color: #fbfbfb;
          opacity: 0.9;
        }
        .login-style ::v-deep .ivu-btn {
          position: absolute;
          top: 35px;
        }
        .login-style .ver-code-input {
          width: 180px;
          display: inline-block;
        }
        .login-style .ver-code {
          float: right;
          margin-right: 10px;
          cursor: pointer;
        }
        .remember-check {
          position: absolute;
          left: 20px;
        }
        .forget-passwd {
          position: absolute;
          right: 10px;
          color: #595959;
        }
        .forget-passwd:hover {
          color: #c9cccf;
        }
        // 第三方登录
        .login-other {
          width: 90%;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 10%);
          // background-color: chartreuse;
          ul {
            list-style: none;
            li {
              width: 30px;
              height: 30px;
              float: left;
              margin-left: 35px;
              // background-color: chartreuse;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>