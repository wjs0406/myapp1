import api from '../base';

// 个人信息
export function personInfoRequest(member_id) {
  return api.post('/index.php/lottery/member/member_detail', {
    member_id
  });
}

// 更新昵称
export function updateNickNameRequest(member_id, nike_name) {
  return api.post('/index.php/lottery/member/updateNikeName', {
    member_id,
    nike_name
  });
}

// 修改用户ID
export function updateLoginNameRequest(member_id, username, password) {
  return api.post('/index.php/lottery/member/updateLoginInfo', {
    member_id,
    username,
    password
  });
}

// 修改密码
export function updatePassword(member_id, username, password) {
  return api.post('/index.php/lottery/member/updateLoginPassword', {
    member_id,
    username,
    password
  });
}

// 实名认证
export function realNameApproveRequest(member_id, realName, id_number) {
  return api.post('/index.php/lottery/member/member_realname_authentication', {
    member_id,
    realName,
    id_number
  });
}

// 更新用户头像
export function updateUserAvatarRequest(member_id, photo_path) {
  return api.post('/index.php/lottery/member/updateLoginPhoto', {
    member_id,
    photo_path
  });
}

// 更新手机号
export function updataMobileRequest(member_id, mobile, verifId, verifCode) {
  return api.post('/index.php/lottery/member/updateMobile', {
    member_id,
    mobile,
    verifId,
    verifCode
  });
}

// 更新手机号获取验证码
export function updateMobileGetVerRequest(mobile, member_id) {
  return api.post('/index.php/lottery/member/getVerification', {
    mobile,
    member_id
  });
}

// 获取省份接口
export function getProvinceRequest() {
  return api.get('/index.php/lottery/member/getProvince');
}

// 获取城市
export function getCityRequest(province_id) {
  return api.post('/index.php/lottery/member/getCity', {
    province_id
  });
}

// 修改用户详细信息
export function updateUserDetailInfo(
  member_id,
  gender,
  qq,
  email,
  province,
  city
) {
  return api.post('/index.php/lottery/member/updateMemberDetail', {
    member_id,
    gender,
    qq,
    email,
    province,
    city
  });
}

// 我的订单
export function getMyOrderList(pageNum, size, params = {}) {
  return api.post('/index.php/lottery/order/order_list', {
    ...params,
    pageNum,
    size
  });
}

// 中奖纪录
export function rewardRecordRequest(member_id) {
  return api.post('/index.php/lottery/order/order_bonus', {
    member_id
  });
}

// 银行卡绑定
export function bankCardBindingRequest(member_id, real_name, bank_no) {
  return api.post('/index.php/lottery/member/member_bank_authentication', {
    member_id,
    real_name,
    bank_no,
  });
}

// 上传图片
export function uploadImageRequest(uri) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  const fileUpload = { uri, type: 'multipart/form-data', name: 'image.jpg' };
  formData.append('imgPhoto', fileUpload);
  return api.post('/index.php/lottery/member/moveUploadFile', formData, config);
}

// 订单详情
export function orderDetailRequest(member_id, order_id) {
  return api.post('/index.php/lottery/order/order_detail', {
    member_id,
    order_id
  });
}

// 账户明细
export function accountDetailRequest(member_id, balance_type) {
  return api.post('/index.php/lottery/balance/balanceList', {
    member_id,
    balance_type
  });
}

// 订单动态
export function orderActivRequest(member_id, order_id) {
  return api.post('/index.php/lottery/order/order_dynamic', {
    member_id,
    order_id
  });
}

// 获取绑定银行卡信息
export function getBindingCardRequest(member_id) {
  return api.post('/index.php/lottery/member/getBank', {
    member_id
  });
}

// 提现手续费
export function serviceChargeRequest() {
  return api.get('/index.php/lottery/balance/getPresentation_fee');
}

// 余额提现
export function accountMakeCashRequest(member_id, balance, bank_card_id) {
  return api.post('/index.php/lottery/balance/enchashment_balance', {
    member_id,
    balance,
    bank_card_id,
    memo: ''
  });
}

// 检查更新接口
export function checkUpdate() {
  return api.get('/index.php/lottery/member/version_check');
}

// 充值支付
export function payOrderRequest(member_id, money, pay_type) {
  return api.post('/index.php/lottery/balance/recharge_balance', {
    member_id,
    money,
    pay_code: '',
    pay_type,
    memo: ''
  });
}

// 判断今日提现次数
export function getIsTodayCanMakeCashRequest(member_id) {
  return api.post('/index.php/lottery/Balance/enchashment_Apply', {
    member_id
  });
}

// 获取最小提现金额
export function getMinMakeCashMoneyRequest() {
  return api.post('/index.php/lottery/index/getSystemCfgs');
}
