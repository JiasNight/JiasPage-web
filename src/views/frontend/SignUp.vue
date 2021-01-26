<template>
  <div class="signUp-box">
    <!-- 标题 -->
    <div class="signUp-head">
      <router-link to="/">
        <span class="signUp-title">J I A S</span>
      </router-link>
      <router-link to="/login">
        <span class="go-login">直接登录？</span>
      </router-link>
    </div>
    <div class="signUp-form">
      <!-- 注册表单 -->
      <Form
        ref="formData"
        class="signUp-style"
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
      if (value === "") {
        callback(new Error("请输入密码确认!"));
      } else if (value !== this.signUpFormData.userPasswd) {
        callback(new Error("密码确认错误!"));
      } else {
        callback();
      }
    };
    return {
      signUpFormData: {
        userName: "",
        userPasswd: "",
        againPasswd: "",
      },
      signUpRules: {
        userName: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
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
        againPasswd: [
          {
            required: true,
            validator: passwdAgainCheck,
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  mounted() {},
  methods: {
    // 注册按钮
    signUpBtn(signUpFormData) {
      console.log(signUpFormData)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$axios({
            // url: "http://49.233.217.34:8090/user/addUser",
            url: "/user/addUser",
            method: "post",
            params: {userName: signUpFormData.userName, userPasswd: signUpFormData.userPasswd}
          }).then((res) => {
              console.log(res.data);
              if (res.data.code === 200) {
                this.$Message.info("注册成功");
                this.$router.push('/')
              } else {
                this.$Message.info("注册失败");
              }
            });
        } else {
          console.log(signUpFormData);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.signUp-box {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
  .signUp-head {
    width: 100%;
    height: 100%;
    text-align: center;
    .signUp-title {
      font-size: 65px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sansserif;
      font-weight: bolder;
      color: #515a6e;
    }
    .signUp-title:hover {
      color: #515a6e;
    }
    .go-login {
      position: absolute;
      right: 10px;
      top: 100px;
      color: cornsilk;
    }
    .go-login:hover {
      color: #00a2e8;
    }
  }
  .signUp-form {
    width: 100%;
    position: relative;
    top: 40px;
    // 使用::v-deep修改控制iview默认样式
    .signUp-style ::v-deep .ivu-form-item {
      height: 50px;
    }
    .signUp-style ::v-deep .ivu-input {
      border-radius: 25px;
      background-color: #fbfbfb;
      opacity: 0.9;
    }
    .signUp-style ::v-deep .ivu-btn {
      position: absolute;
      top: 35px;
    }
  }
}
</style>