import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Toast } from 'teaset';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import LogingInputAvoidKeyboardLayout from '../../components/login/LogingInputAvoidKeyboardLayout';
import * as LoginApi from '../../api/login/loginApi';

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

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.nationNum = '+86';
    this.mobileNum = '';
    this.verifCode = '';
    this.inputVerifCode = null;
    this.verid = '';
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
          PHONE
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 手机号注册文字
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
          手机号注册
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 注册绑定手机号
  registerMobile() {
    const { navigation } = this.props;
    this.commonProgress.show();
    LoginApi.resMobileBindingRequest(`${this.nationNum}${this.mobileNum}`, this.verid, this.verifCode)
      .then(response => {
        this.commonProgress.hidden();
        navigation.navigate('InvitationPage', {
          mId: response.memberId,
          mobile: `${this.nationNum}${this.mobileNum}`,
        });
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 手机号注册
  renderInputTexts() {
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
          inputPlaceHolderStr: '请输入您的验证码',
          style: {
            marginTop: 15,
          },
          isShowTestfy: true,
          commonProgress: this.commonProgress,
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
          // 获取验证码
          getCodeFunc: (code, id) => {
            this.verid = id;
            this.verifCode = code;
          }
        }}
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
          this.registerMobile();
        }}
        isShowRegisterButton={false}
        loginBUttonTitle="下一步"
        ifShowRegisTip
        // 点击用户服务协议
        clickUserApprovementFunc={() => {
          this.props.navigation.navigate('UserApprovementPage', {
            url: 'http://lottery.xiaohuaikeji.cn/memberAgreement/index.html'
          });
        }}
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
          leftImage: yellowBack
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
