import { Dimensions, Platform, StatusBar } from 'react-native';

const isDebug = true;

const CommonUtils = {
  isDebug,
  version: '0.1',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  ios: Platform.OS === 'ios',
  isIPhoneX: Dimensions.get('window').height === 812 && Platform.OS === 'ios',
  Platform: Platform.OS === 'android' ? 'Android' : 'IOS',
  apiUrl: isDebug
    ? 'http://lottery.xiaohuaikeji.cn'
    : 'http://lottery.xiaohuaikeji.cn',
  ceilHeight: value => (value / 667.0) * Dimensions.get('window').height,
  ceilWidth: value => (value / 375.0) * Dimensions.get('window').width,
  getStatusBarHeight: () => {
    let statusHeight = 0;
    if (CommonUtils.ios) {
      if (CommonUtils.isIPhoneX) {
        statusHeight = 44;
      } else {
        statusHeight = 20;
      }
    } else if (Platform.Version > 19) {
      statusHeight = StatusBar.currentHeight;
    }
    return statusHeight;
  },
  getToolBarHeight: () => {
    let barHeight = 52;
    if (CommonUtils.ios && CommonUtils.isIPhoneX) {
      barHeight = 96;
    }
    return barHeight;
  },
  themeColor: '#E73837',
  navigationColor: '#E73837',
  // 验证邮箱
  checkEmail(value) {
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
        value
      )
    ) {
      return true;
    }
    return false;
  },

  // 验证身份证号
  checkIdNum(value) {
    if (
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
      value
    )
    ) {
      return true;
    }
    return false;
  },

  // 验证电话号
  checkPhoneNumer(value) {
    // 大陆手机号
    if (
      /^((\+86)|(86))?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(
        value
      )
    ) {
      return true;
    }
    // 香港手机号
    if (
      /^((\+852)|(00852))?(6|9)[0-9]{7}$/.test(
        value
      )
    ) {
      return true;
    }
    // 澳门手机号
    if (
      /^((\+853)|(00853))?(6|9)[0-9]{7}$/.test(
        value
      )
    ) {
      return true;
    }
    return false;
  },
  // 获取用户信息
  getUserInfo() {
    global.storage
      .load({
        key: global.loginKey
      })
      .then(ret => ret)
      .catch(() => '');
  }
};

export default CommonUtils;
