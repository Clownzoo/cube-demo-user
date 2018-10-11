/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  //注册
  register: params => {
    return API.POST('/api/identity/v2/user', params)
  },
  //登陆
  login: params => {
    return API.POST('/api/identity/v2/user/token', params)
  },
  //查询个人信息
  search: (path, params) => {
    return API.GET(path, params)
  },
  //获取验证码
  getVerifyCode: (params) => {
    return API.POST('/api/identity/v2/captcha', params)
  },
  //修改个人信息
  changeProfile: (path, params) => {
    return API.PUT(path, params)
  },
}
