import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import LogingInputAvoidKeyboardLayout from '../../components/login/LogingInputAvoidKeyboardLayout';
import * as loginApi from '../../api/login/loginApi';
import Toast from '../../node_modules/teaset/components/Toast/Toast';

const yellowBack = require('../../image/homePage/Home_ic_yellowBack.png');

const styles = StyleSheet.create({
  englishWordTextStyle: {
    fontSize: 48,
    fontFamily: 'DIN Condensed',
    color: 'rgba(1,13,45,0.1)',
    textAlign: 'center',
    flex: 1,
  }
});

export default class UsernameSetPage extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.password = '';
  }

  // 页面跳转
  jumpToHomeTab() {
    const { navigation } = this.props;
    const reserAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeTab' })]
    });
    navigation.dispatch(reserAction);
  }

  renderProgress() {
    return (
      <CommonProgressLayout
        ref={ref => {
          this.commonProgress = ref;
        }}
      />
    );
  }

  // 英文字母
  renderBackEnglishWord() {
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={styles.englishWordTextStyle}>
          USERNAME
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 设置用户名文字
  renderPhoneText() {
    const topMargin = (CommonUtils.Platform === 'IOS' ? -40 : -30);
    return (
      <View
        style={{
          marginTop: topMargin,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: 'rgb(1,13,45)',
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          用户名设置
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 设置用户名密码
  setUsernameRequest() {
    this.commonProgress.show();
    loginApi.addusernameRequest(
      this.props.navigation.state.params.mId,
      this.username,
      this.password
    )
      .then(() => {
        this.commonProgress.hidden();
        this.jumpToHomeTab();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 手机号注册
  renderInputTexts() {
    const { navigation } = this.props;
    return (
      <LogingInputAvoidKeyboardLayout
        firstInputProps={{
          titleDefaultValue: '用户名',
          inputPlaceHolderStr: '请输入您的用户名',
          // 用户名
          mainInputChangeFunc: (text) => {
            this.username = text;
          },
          mainKeyboardType: 'numeric',
        }}
        secondInputProps={{
          titleDefaultValue: '密码',
          inputPlaceHolderStr: '请输入您的密码',
          style: {
            marginTop: 15,
          },
          // 密码
          mainInputChangeFunc: (text) => {
            this.password = text;
          },
        }}
        loginFunc={() => {
          if (this.username === '') {
            Toast.info('请输入用户名');
            return;
          }
          if (this.password === '') {
            Toast.info('请输入密码');
            return;
          }
          this.setUsernameRequest();
        }}
        isShowRegisterButton={false}
        isShowTipInfo
        loginBUttonTitle="确定"
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          backColor: 'white',
          theme: 'light',
          leftImage: yellowBack,
          rightTitle: '跳过设置',
          hasRight: true,
          rightTitleColor: 'rgb(255,218,0)',
          onRightPress: () => {
            this.jumpToHomeTab();
          }
        }}
        theme="light"
      >
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          {this.renderBackEnglishWord()}
          {this.renderPhoneText()}
          {this.renderInputTexts()}
          {this.renderProgress()}
        </View>
      </BaseToolbarLayout>
    );
  }
}
