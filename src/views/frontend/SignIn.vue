<template>
  <div class="signin-box">
    <!-- 标题 -->
    <div class="signin-head">
      <router-link to="/">
        <div class="signin-picture">
          <img :src="signinPicture">
        </div>
      </router-link>
      <p class="signin-title">J I A S</p>
      <router-link to="/signup">
        <span class="is-account">没有账户？</span>
      </router-link>
    </div>
    <div class="signin-form">
      <!-- 登录表单 -->
      <Form
        ref="formData"
        class="signin-style"
        :model="loginFormData"
        :rules="loginRules"
      >
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
        <FormItem prop="userPassword">
          <Input
            type="password"
            prefix="ios-lock-outline"
            size="large"
            password
            v-model="loginFormData.userPassword"
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
            ref="signInBtn"
            class="signin-btn"
            shape="circle"
            long
            ghost
            size="large"
            @click="signInBtn(loginFormData)"
            >登录</Button
          >
        </FormItem>
      </Form>
      <div class="signin-other">
        <Divider>第三方登录</Divider>
        <div class="other-div">
          <a href="https://gitee.com/auth/github">
            <Tooltip content="使用github登录" placement="bottom-end">
              <Icon type="logo-github" size="30" color="#000000" />
            </Tooltip>
          </a>
          <a href="https://gitee.com/auth/github">
            <Tooltip content="使用github登录" placement="bottom-end">
              <Icon type="logo-apple" size="30" color="#000000" />
            </Tooltip>
          </a>
          <a href="https://gitee.com/auth/github">
            <Tooltip content="使用github登录" placement="bottom-end">
              <Icon type="logo-linkedin" size="30" color="#000000" />
            </Tooltip>
          </a>
          <a href="https://gitee.com/auth/github">
            <Tooltip content="使用github登录" placement="bottom-end">
              <Icon type="logo-tux" size="30" color="#000000" />
            </Tooltip>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IdentifyCode from '@/components/IdentifyCode'
export default {
  data() {
    const identifyCodeCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码!'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码输入错误!'))
      } else {
        callback()
      }
    }
    return {
      signinPicture: require('../../../public/logo.png'),
      isRemember: false, // 是否记住密码
      identifyCode: '',
      loginFormData: {
        userName: '',
        userPassword: '',
        identifyCode: '',
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入登录用户名！', trigger: 'blur' },
        ],
        userPassword: [
          { required: true, message: '请输入用户密码！', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '用户密码最短为6',
            trigger: 'blur',
          },
        ],
        identifyCode: [
          {
            required: true,
            validator: identifyCodeCheck,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: {
    'v-identifyCode': IdentifyCode,
  },
  mounted() {
    // 读取cookie里的用户名和密码
    this.getCookie()
    // 验证码生成
    this.makeCode()
  },
  methods: {
    // 设置cookie
    setCookie(name, pwd, exdays) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
      document.cookie =
        'userName=' + name + ';path=/;expires=' + exdate.toLocaleString()
      document.cookie =
        'userPassword=' + pwd + ';path=/;expires=' + exdate.toLocaleString()
    },
    // 获取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == 'userName') {
            // 保存到保存数据的地方
            this.loginFormData.userName = arr2[1]
          } else if (arr2[0] == 'userPassword') {
            this.loginFormData.userPassword = arr2[1]
          }
        }
      }
    },
    // 删除cookie
    clearCookie() {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    //生成验证码
    makeCode() {
      this.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        // let identifyCodes = "0123456789abcdefjhijklinopqrsduvwxyz";
        let identifyCodes = '0123456789'
        this.identifyCode +=
          identifyCodes[
            Math.floor(Math.random() * (identifyCodes.length - 0) + 0)
          ]
      }
      // console.log(this.identifyCode);
    },
    // 登录按钮
    signInBtn(loginFormData) {
      let btn = this.$refs.signInBtn
      let signInBtn = document.querySelector('.signin-btn')
      let x = btn.clientX - btn.target.offsetLeft
      let y = btn.clientY - btn.target.offsetTop
      let ripples = document.createElement('clickspan')
      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'
      signInBtn.appendChild(ripples)
      setTimeout(() => {
        ripples.remove()
      }, 1000)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.isRemember) {
            this.setCookie(loginFormData.userName, loginFormData.userPassword, 7)
          } else {
            this.clearCookie()
          }
          this.$axios({
            url: '/user/signIn',
            method: 'post',
            params: {
              userName: loginFormData.userName,
              userPassword: loginFormData.userPassword,
            },
          }).then((res) => {
            if (res.data.code === 200) {
              // localStorage.setItem('userName', loginFormData.userName)
              // this.$store.commit('saveUserName', loginFormData.userName)
              this.$Message.info('登录成功')
              this.$router.push('/')
            } else {
              this.$Message.info(res.data.message)
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.signin-box {
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
  .signin-head {
    width: 100%;
    height: 170px;
    position: relative;
    text-align: center;
    .signin-picture {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%); 
      border-radius: 50%;
      border: 1px solid #515a6e;
      img {
        width: 100%;
      }
    }
    .signin-title {
      position: absolute;
      top: 110px;
      left: 50%;
      transform: translate(-50%); 
      font-size: 20px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sansserif;
      font-weight: bolder;
      color: #515a6e;
    }
    .signin-title:hover {
      color: #515a6e;
    }
    .is-account {
      position: absolute;
      right: 10px;
      bottom: 0px;
      color: cornsilk;
    }
    .is-account:hover {
      color: #00a2e8;
    }
  }
  .signin-form {
    width: 100%;
    position: relative;
    top: 10px;
    // 使用::v-deep修改控制iview默认样式
    .signin-style ::v-deep .ivu-form-item {
      height: 50px;
    }
    .signin-style ::v-deep .ivu-input {
      border-radius: 25px;
      background-color: #fbfbfb;
      opacity: 0.9;
    }
    .signin-style ::v-deep .ivu-btn {
      position: absolute;
      top: 35px;
    }
    .signin-style .ver-code-input {
      width: 160px;
      display: inline-block;
    }
    .signin-style .ver-code {
      float: right;
      margin-right: 10px;
      cursor: pointer;
    }
    .remember-check {
      position: absolute;
      margin-top: 10px;
      left: 20px;
    }
    .forget-passwd {
      position: absolute;
      margin-top: 10px;
      right: 10px;
      color: #595959;
    }
    .forget-passwd:hover {
      color: #c9cccf;
    }
    .signin-style ::v-deep .signin-btn {
      margin-top: 20px;
      border: none;
      overflow: hidden;
      background: linear-gradient(90deg, #755bea, #ff72c0);
      clickspan {
        position: absolute;
        background: #fff;
        right: -100%;
        top: -100%;
        pointer-events: none;
        border-radius: 50%;
        animation: clickBtnAnimation 1s linear infinite;
      }
    }
    // 第三方登录
    .signin-other {
      width: 90%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      .other-div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        justify-items: center;
        a {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}

@keyframes clickBtnAnimation {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 1000px;
    height: 1000px;
    opacity: 0;
  }
}
</style>