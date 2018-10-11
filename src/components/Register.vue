<template>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">管理员注册</h3>
		<el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
		<el-form-item prop="repwd">
      <el-input type="password" v-model="account.repwd" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item>
         <el-input type="text" v-model="account.verifyCode" auto-complete="off" placeholder="验证码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item>
          <img :src="imgData" alt="" @click.prevent="refreshVerify">
        </el-form-item>
      </el-col>

    </el-row>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">注册</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item>
          <el-button  style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">已有账号，去登录</el-button>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>
<script>
import API from "../api/api_user";
export default {
  data() {
    return {
      loading: false,
      imgData: "",
      account: {
        username: "",
        pwd: "",
        repwd: "",
        uniqueid: "",
        verifyCode: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repwd: [{ required: true, message: "请输入确认密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  created() {
    this._getVerifyCode();
  },
  methods: {
    // 刷新验证码
    refreshVerify() {
      this._getVerifyCode();
    },
    // 获取验证码
    _getVerifyCode() {
      var that = this;
      API.getVerifyCode().then(function(result) {
        if (result.resultCode == 0) {
          that.imgData = `data:image/jpeg;base64,${result.data.image}`;
          that.account.uniqueid = result.data.uniqueId;
        } else {
          alert(result.resultMsg);
        }
      });
    },
    handleLogin() {
      // 跳转到登陆界面
      this.$router.push({ path: "/login" });
    },
    handleRegister() {
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        // 验证是否数据合法
        if (valid) {
          this.loading = true;
          let registerParams = {
            instanceId: 0,
            tenantId: 0,
            userName: that.account.username,
            password: that.account.pwd,
            confirmPassword: that.account.repwd,
            uniqueId: that.account.uniqueid,
            // 验证码
            verifyCode: that.account.verifyCode,
            registerType: 4
          };
          console.log(registerParams);
          API.register(registerParams)
            .then(
              function(result) {
                that.loading = false;
                console.log("zhucechengong" + result);
                if (result.resultCode == 0) {
                  // 注册成功
                  console.log(result);
                  alert("注册成功");
                  that.$router.push({ path: "/login" });
                } else {
                  // 注册失败
                  console.log("注册失败");
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
              console.log(error);
            });
        }
      });
    }
  }
};
</script>
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
  background: -o-linear-gradient(top, #ace, #00c1de); /* Opera 11.10+ */
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

