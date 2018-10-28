import { Linking, RefreshControl } from 'react-native';
import React from 'react';
import { NavigationActions } from 'react-navigation';

// 拨打电话
export function phoneCall(number) {
  const openUrl = `tel:${number}`;
  return Linking.openURL(openUrl);
}
// 打开通知界面
export function jumpSetup() {
  const openUrl =
    'App-Prefs:root=org.reactjs.native.example.WisdomParkDongDong&path=NOTIFICATIONS_ID';
  return Linking.openURL(openUrl);
}
// 打开通知相册界面
export function jumpSetupPhoto() {
  const openUrl =
    'App-Prefs:root=org.reactjs.native.example.WisdomParkDongDong&path=Photos';
  return Linking.openURL(openUrl);
}

// 验证电话号
export function checkPhoneNumer(value) {
  if (
    /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(
      value
    )
  ) {
    return true;
  }
  return false;
}

// 验证邮箱
export function checkEmail(value) {
  if (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
    return true;
  }
  return false;
}
// 密码要至少保证6位，其中包含一个字母，一个数字!
export function checkInputpassWord(value) {
  if (/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(value)) {
    return true;
  }
  return false;
}

// 刷新
export function showRefresh(isRefreshing, onRefresh) {
  const refresh = (
    <RefreshControl
      onRefresh={() => onRefresh}
      refreshing={isRefreshing}
      colors={['rgb(245,196,62)']}
      tintColor={'rgb(245,196,62)'}
      title="正在刷新,请等候"
      titleColor="rgb(245,196,62)"
      progressBackgroundColor="white"
    />
  );
  return refresh;
}

// 获取token
export function getToken() {
  global.storage
    .load({
      key: global.loginKey
    })
    .then(ret => ret.token)
    .catch(() => '');
}

// 强制退出,token过期
export function forcedLogionOut(navigation) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })]
  });
  navigation.dispatch(resetAction);
}
