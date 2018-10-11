<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">管理员登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item>
          <el-button  style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">还没账号，点击去注册</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import API from "../api/api_user";
import { bus } from "../bus.js";

export default {
  data() {
    return {
      loading: false,
      account: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleLogin() {
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            instanceId: 0,
            loginType: 1,
            password: that.account.pwd,
            userName: that.account.username
          };
          console.log(loginParams);
          API.login(loginParams)
            .then(
              function(result) {
                that.loading = false;
                console.log(result);
                if (result.resultCode == 0) {
                  // 登录成功
                  alert(result.resultMsg);
                  // 获取个人信息
                  console.log(result.data.userId);
                  bus.$emit("userId", result.data.userId);
                  API.search(
                    `/api/user/v1/user/${result.data.userId}?filter=`
                  ).then(function(result) {
                    console.log(result.data);
                    localStorage.setItem(
                      "access-user",
                      JSON.stringify(result.data)
                    );
                    that.$router.push({ path: "/" });
                  });
                } else {
                  alert(result.resultMsg);
                }
              },
              function(err) {
                that.loading = false;
                if (err.response) {
                  console.log(err.response.data);
                  that.$message.error({
                    showClose: true,
                    message: err.response.data.resultMsg,
                    duration: 2000
                  });
                } else if (err.request) {
                  console.log(err.request);
                } else {
                  console.log("err", err.message);
                }
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
            });
        }
      });
    },
    // 处理注册
    handleRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
<style>
body {
  background: #dfe9fb;
}
</style>
<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
