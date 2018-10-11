<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" :loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import API from "../../api/api_user";
import { bus } from "../../bus.js";

export default {
  data() {
    return {
      loading: false,
      form: {
        userName: "",
        phone: "",
        nickName: '',
        email: ""
      },
      PersonInfo: {}
    };
  },
  created() {
    this.PersonInfo = JSON.parse(window.localStorage.getItem("access-user"));
    console.log(this.PersonInfo);
    this.form.userName = this.PersonInfo.userName;
    this.form.nickName = this.PersonInfo.nickName;
    this.form.phone = this.PersonInfo.phone;
    this.form.email = this.PersonInfo.email;
  },
  methods: {
    // 处理修改个人信息方法
    handleSaveProfile() {
      let that = this;
      that.loading = true;
      let args = {
        userName: that.form.userName,
        phone: that.form.phone,
        email: that.form.email,
        nickName: that.form.nickName,
        instanceId: 0,
        tenantId: 0
      };
      API.changeProfile(`/api/user/v1/user/${that.PersonInfo.id}`, args)
        .then(
          function(result) {
            that.loading = false;
            console.log(result);
            if (result && result.resultCode == 0) {
              //修改成功
              alert("修改成功");
              // 修改成功需要重新获取个人信息
              window.localStorage.removeItem("access-user");
              API.search(
                `/api/user/v1/user/${that.PersonInfo.id}?filter=`
              ).then(function(result) {
                console.log(result.data);
                localStorage.setItem(
                  "access-user",
                  JSON.stringify(result.data)
                );
              });
            } else {
              that.$message.error({
                showClose: true,
                message: result.resultMsg,
                duration: 2000
              });
            }
          },
          function(err) {
            console.log(err);
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
          that.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
    }
  }
};
</script>
