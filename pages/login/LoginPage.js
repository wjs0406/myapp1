import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'teaset';
import CommonTabView from '../../components/base/CommonTabView';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import LogingInputAvoidKeyboardLayout from '../../components/login/LogingInputAvoidKeyboardLayout';
import * as LoginApi from '../../api/login/loginApi';

const styles = StyleSheet.create({
  englishWordTextStyle: {
    fontSize: 45,
    fontFamily: 'DIN Condensed',
    color: 'rgba(1,13,45,0.1)',
    textAlign: 'center',
    flex: 1,
  }
});

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    // 手机号登录
    this.nationNum = '+86';
    this.mobileNum = '';
    this.verifCode = '';
    this.inputVerifCode = null;
    this.veriId = '';
    // 用户名密码登录
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

  // 用户名密码登录网络请求
  usernameLoginRequest() {
    this.commonProgress.show();
    LoginApi.usernameLoginRequest(this.username, this.password)
      .then((response) => {
        this.commonProgress.hidden();
        global.userInfo = response;
        global.storage.save({
          key: global.loginKey,
          data: response
        });
        this.jumpToHomeTab();
      })
      .catch((error) => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 获取验证码
  getVertifyCode() {
    this.commonProgress.show();
    LoginApi.loginGetVertifyCodeRequest(`${this.nationNum}${this.mobileNum}`)
      .then(response => {
        this.commonProgress.hidden();
        this.verifCode = response.verif_code;
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 手机号登录
  mobileLogin() {
    this.commonProgress.show();
    LoginApi.mobileLoginRequest(`${this.nationNum}${this.mobileNum}`, this.inputVerifCode, this.veriId)
      .then(response => {
        this.commonProgress.hidden();
        global.userInfo = response;
        global.storage.save({
          key: global.loginKey,
          data: response
        });
        this.jumpToHomeTab();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
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
          marginTop: 56,
          flexDirection: 'row',
        }}
      >
        <Text style={styles.englishWordTextStyle}>
          PHONE
        </Text>
        <Text style={styles.englishWordTextStyle}>
          USERNAME
        </Text>
      </View>
    );
  }

  // tab
  renderTabs() {
    const topMargin = (CommonUtils.Platform === 'IOS' ? -40 : -30);
    return (
      <CommonTabView
        style={{ marginTop: topMargin, paddingBottom: 0, backgroundColor: 'transparent' }}
        underLineWidth={32}
        onChangeTab={(i) => {
          Keyboard.dismiss();
        }}
        textStyle={{
          fontSize: 24,
        }}
        children={[
          <View style={{ flex: 1 }} tabLabel="手机号登录">
            {this.renderInputTexts()}
          </View>,
          <View style={{ flex: 1 }} tabLabel="用户名登录">
            {this.renderuserNameLogin()}
          </View>
        ]}
      />
    );
  }

  // 手机号登录
  renderInputTexts() {
    const { navigation } = this.props;
    return (
      <LogingInputAvoidKeyboardLayout
        firstInputProps={{
          titleDefaultValue: '+86',
          titleEditable: true,
          inputPlaceHolderStr: '请输入您的手机号',
          // 国家编号
          titleInputChangeFunc: (text) => {
            this.nationNum = text;
          },
          // 手机号
          mainInputChangeFunc: (text) => {
            this.mobileNum = text;
          },
          mainKeyboardType: 'numeric',
        }}
        secondInputProps={{
          titleDefaultValue: '验证码',
          inputPlaceHolderStr: '请输入验证码',
          style: {
            marginTop: 15,
          },
          isShowTestfy: true,
          // 验证码
          mainInputChangeFunc: (text) => {
            this.inputVerifCode = text;
          },
          // 点击获取验证码按钮
          clickGetTestifyCodeFunc: () => {
            if (this.nationNum === '' || this.mobileNum === '') {
              Toast.info('请输入区号和手机号');
              return null;
            }
            if (!CommonUtils.checkPhoneNumer(`${this.nationNum}${this.mobileNum}`)) {
              Toast.info('手机号输入不正确');
              return null;
            }
            return `${this.nationNum}${this.mobileNum}`;
          },
          // 验证码类型(登录还是注册)
          verCodeType: 'login',
          getCodeFunc: (code, id) => {
            this.verifCode = code;
            this.veriId = id;
          }
        }}
        jumpToRegisterFunc={() => {
          navigation.navigate('RegisterPage');
        }}
        // 手机验证码登录
        loginFunc={() => {
          if (this.nationNum === '' || this.mobileNum === '') {
            Toast.info('请输入区号和手机号');
            return;
          }
          if (this.inputVerifCode == null) {
            Toast.info('请输入验证码');
            return;
          }
          if (this.inputVerifCode !== this.verifCode) {
            Toast.info('验证码输入不正确');
            return;
          }
          this.mobileLogin();
        }}

      />
    );
  }

  // 用户名登录
  renderuserNameLogin() {
    return (
      <LogingInputAvoidKeyboardLayout
        jumpToRegisterFunc={() => {
          this.props.navigation.navigate('RegisterPage');
        }}
        firstInputProps={{
          titleDefaultValue: '用户名',
          inputPlaceHolderStr: '请输入您的用户名',
          mainInputChangeFunc: (text) => {
            // 用户名
            this.username = text;
          }
        }}
        secondInputProps={{
          titleDefaultValue: '密码',
          inputPlaceHolderStr: '请输入您的密码',
          style: {
            marginTop: 15,
          },
          mainInputChangeFunc: (text) => {
            this.password = text;
          },
          isSecru: true,
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

          this.usernameLoginRequest();
        }}
      />
    );
  }


  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <StatusBar
          backgroundColor="#000000"
          translucent={false}
          barStyle="default"
        />
        {this.renderBackEnglishWord()}
        {this.renderTabs()}
        {this.renderProgress()}
      </View>
    );
  }
}
