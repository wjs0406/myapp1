import api from '../base';

// 用户名,密码登录
export function usernameLoginRequest(userName, password) {
  return api.post('/index.php/lottery/login/userNameLogin', {
    userName,
    password
  });
}

// 登录获取验证码
export function loginGetVertifyCodeRequest(mobile) {
  return api.post('/index.php/lottery/login/getVerification', {
    mobile
  });
}

// 注册获取验证码
export function registerGetVertifyCodeRequest(mobile) {
  return api.post('/index.php/lottery/register/getVerification', {
    mobile
  });
}

// 手机登录
export function mobileLoginRequest(mobile, verifCode, verifId) {
  return api.post('/index.php/lottery/login/mobileLogin', {
    mobile,
    verifCode,
    verifId
  });
}

// 注册绑定手机
export function resMobileBindingRequest(mobile, verifId, verifCode) {
  return api.post('/index.php/lottery/register/bindingPhone', {
    mobile,
    verifId,
    verifCode,
  });
}

// 彩店推荐码验证
export function veriChannelCodeRequest(member_id, channelCode) {
  return api.post('/index.php/lottery/register/verifiChannelCode', {
    member_id,
    channelCode,
  });
}

// 添加登录用户名,密码
export function addusernameRequest(member_id, username, password) {
  return api.post('/index.php/lottery/register/updateLoginInfo', {
    member_id,
    username,
    password
  });
}
