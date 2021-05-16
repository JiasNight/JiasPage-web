<template>
  <div class="signup-box">
    <!-- 标题 -->
    <div class="signup-head">
      <router-link to="/">
        <div class="signup-picture">
          <img :src="signinPicture">
        </div>
      </router-link>
      <span class="signup-title">J I A S</span>
      <router-link to="/login">
        <span class="go-signin">直接登录？</span>
      </router-link>
    </div>
    <div class="signup-form">
      <!-- 注册表单 -->
      <Form
        ref="formData"
        class="signup-style"
        :model="signUpFormData"
        :rules="signUpRules"
      >
        <FormItem prop="userName">
          <Input
            type="text"
            prefix="ios-contact-outline"
            size="large"
            clearable
            v-model="signUpFormData.userName"
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
            v-model="signUpFormData.userPasswd"
            placeholder="Password"
          >
          </Input>
        </FormItem>
        <FormItem prop="againPasswd">
          <Input
            type="password"
            prefix="ios-lock-outline"
            size="large"
            password
            v-model="signUpFormData.againPasswd"
            placeholder="AgainPassword"
          >
          </Input>
        </FormItem>

        <FormItem>
          <Button
            ref="signUpBtn"
            class="signup-btn"
            type="primary"
            shape="circle"
            long
            size="large"
            @click="signUpBtn(signUpFormData)"
            >注册</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const passwdAgainCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码确认!'))
      } else if (value !== this.signUpFormData.userPasswd) {
        callback(new Error('密码确认错误!'))
      } else {
        callback()
      }
    }
    return {
      signinPicture: require('../../../public/logo.png'),
      signUpFormData: {
        userName: '',
        userPasswd: '',
        againPasswd: '',
      },
      signUpRules: {
        userName: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
        ],
        userPasswd: [
          { required: true, message: '请输入用户密码！', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '用户密码最短为6',
            trigger: 'blur',
          },
        ],
        againPasswd: [
          {
            required: true,
            validator: passwdAgainCheck,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: {},
  mounted() {},
  methods: {
    // 注册按钮
    signUpBtn(signUpFormData) {
      let btn = this.$refs.signUpBtn
      let signUpBtn = document.querySelector('.signup-btn')
      let x = btn.clientX - btn.target.offsetLeft
      let y = btn.clientY - btn.target.offsetTop
      let ripples = document.createElement('clickspan')
      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'
      signUpBtn.appendChild(ripples)
      setTimeout(() => {
        ripples.remove()
      }, 1000)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/user/addUser',
            method: 'post',
            params: {
              userName: signUpFormData.userName,
              userPasswd: signUpFormData.userPasswd,
            },
          }).then((res) => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.$Message.info('注册成功')
              this.$router.push('/')
            } else {
              this.$Message.info('注册失败')
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.signup-box {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
  .signup-head {
    width: 100%;
    height: 170px;
    position: relative;
    text-align: center;
    .signup-picture {
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
    .signup-title {
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
    .signup-title:hover {
      color: #515a6e;
    }
    .go-signin {
      position: absolute;
      right: 10px;
      bottom: 0px;
      color: cornsilk;
    }
    .go-signin:hover {
      color: #00a2e8;
    }
  }
  .signup-form {
    width: 100%;
    position: relative;
    top: 10px;
    // 使用::v-deep修改控制iview默认样式
    .signup-style ::v-deep .ivu-form-item {
      height: 50px;
    }
    .signup-style ::v-deep .ivu-input {
      border-radius: 25px;
      background-color: #fbfbfb;
      opacity: 0.9;
    }
    .signup-style ::v-deep .ivu-btn {
      position: absolute;
      top: 35px;
    }
    .signup-style ::v-deep .signup-btn {
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