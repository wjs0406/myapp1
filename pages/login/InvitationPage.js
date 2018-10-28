import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import LogingInputAvoidKeyboardLayout from '../../components/login/LogingInputAvoidKeyboardLayout';
import Toast from '../../node_modules/teaset/components/Toast/Toast';
import * as loginApi from '../../api/login/loginApi';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';

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

export default class InvitationPage extends Component {
  constructor(props) {
    super(props);
    this.invitationCode = '';
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
          INVITATION
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 邀请码文字
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
          邀请码
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  // 验证邀请码
  testifyInvitationCode() {
    this.commonProgress.show();
    loginApi.veriChannelCodeRequest(this.props.navigation.state.params.mId, this.invitationCode)
      .then(() => {
        this.commonProgress.hidden();
        global.userInfo = {
          id: this.props.navigation.state.params.mId,
          phone_no: this.props.navigation.state.params.mobile,
        };
        global.storage.save({
          key: global.loginKey,
          data: {
            id: this.props.navigation.state.params.mId,
            phone_no: this.props.navigation.state.params.mobile,
          }
        });
        this.props.navigation.navigate('UsernameSetPage', {
          mId: this.props.navigation.state.params.mId
        });
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
        isShowSecondInput={false}
        firstInputProps={{
          titleDefaultValue: '邀请码',
          titleEditable: false,
          inputPlaceHolderStr: '请输入您的邀请码',
          // 邀请码
          mainInputChangeFunc: (text) => {
            this.invitationCode = text;
          },
          mainKeyboardType: 'numeric',
        }}
        jumpToRegisterFunc={() => {
          navigation.navigate('RegisterPage');
        }}
        loginFunc={() => {
          if (this.invitationCode === '') {
            Toast.info('请输入邀请码');
            return;
          }
          this.testifyInvitationCode();
        }}
        isShowRegisterButton={false}
        loginBUttonTitle="下一步"
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
