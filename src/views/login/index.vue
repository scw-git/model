<template>
  <div class="login-box-wrap">
    <div class="login-box">
      <div class="logo-item">
        <img src="~@/assets/img/login_logo_img.png" alt="" />
        <p class="text">模型管理平台</p>
      </div>
      <div class="login-form">
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
          <a-form-model-item prop="username">
            <a-input
              v-model="ruleForm.username"
              placeholder="请输入用户名"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password
              v-model="ruleForm.password"
              placeholder="请输入密码"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-button class="login-btn" type="primary" @click="submitForm"
              >登 录</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          /*eslint no-console:0 */
          this.$router.push({
            path: "/taskList"
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login-box-wrap {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("~@/assets/img/login_bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  .login-box {
    width: 500px;
    height: 500px;
    background: url("~@/assets/img/login_form_bg.png") no-repeat center center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -250px;
    margin-left: -250px;
    .logo-item {
      padding-top: 90px;
      text-align: center;
      img {
        display: inline-block;
        width: 70px;
      }
      .text {
        color: #062f41;
        font-size: 24px;
        padding: 5px 0;
      }
    }
    .login-form {
      width: 240px;
      margin: 0 auto;
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.login-form {
  .ant-form-item {
    margin-bottom: 7px;
  }
}
</style>
