import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonUtils from '../../utils/CommonUtils';
import LoginInputLayout from './LoginInputLayout';

export default class LogingInputAvoidKeyboardLayout extends Component {
  renderSecondInput() {
    const { isShowSecondInput, secondInputProps } = this.props;
    if (isShowSecondInput) {
      return (
        <LoginInputLayout
          {...secondInputProps}
        />
      );
    }
    return null;
  }

  renderRegisterButton() {
    const {
      isShowRegisterButton,
      jumpToRegisterFunc,
      isShowTipInfo,
      ifShowRegisTip,
      clickUserApprovementFunc
    } = this.props;
    if (isShowRegisterButton) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => {
              jumpToRegisterFunc();
            }}
          >
            <Text style={{ color: CommonUtils.themeColor, fontSize: 12 }}>
              {'还没账号？去注册->'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isShowTipInfo) {
      return (
        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50 }}>
          <Text style={{ color: CommonUtils.themeColor, fontSize: 14 }}>
            {'注意：用户名只能修改一次，请谨慎填写。'}
          </Text>
          <Text style={{ color: CommonUtils.themeColor, fontSize: 14, marginTop: 5 }}>
            注意：建议密码应用字母数字组合，混合大小
          </Text>
        </View>
      );
    }

    if (ifShowRegisTip) {
      return (
        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50, flexDirection: 'row' }}>
          <Text style={{ color: 'rgb(105,114,137)', fontSize: 14 }}>
            注册即表示您已满18岁并同意《
          </Text>
          <TouchableOpacity
            onPress={() => {
              clickUserApprovementFunc();
            }}
          >
            <Text style={{ color: CommonUtils.themeColor, fontSize: 14 }}>
              用户服务协议
            </Text>
          </TouchableOpacity>
          <Text style={{ color: 'rgb(105,114,137)', fontSize: 14 }}>
            》
          </Text>
        </View>
      );
    }

    return <View style={{ marginTop: 50, height: 20 }} />;
  }

  render() {
    const { firstInputProps, loginFunc, loginBUttonTitle } = this.props;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll={false}
        bounces={false}
      >
        <View style={{ marginTop: CommonUtils.ceilHeight(43) }}>
          <LoginInputLayout
            {...firstInputProps}
          />
          {this.renderSecondInput()}
          {this.renderRegisterButton()}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: CommonUtils.themeColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: CommonUtils.ceilHeight(50),
            flex: 1,
            height: 40,
          }}
          onPress={() => {
            loginFunc();
          }}
        >
          <Text style={{ fontSize: 15, color: 'white' }}>
            {loginBUttonTitle}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

LogingInputAvoidKeyboardLayout.propTypes = {
  isShowSecondInput: PropTypes.bool,
  firstInputProps: PropTypes.object,
  secondInputProps: PropTypes.object,
  jumpToRegisterFunc: PropTypes.func,
  loginFunc: PropTypes.func,
  isShowRegisterButton: PropTypes.bool,
  loginBUttonTitle: PropTypes.string,
  isShowTipInfo: PropTypes.bool, // 是否显示提示信息(设置用户名)
  ifShowRegisTip: PropTypes.bool, // 注册提示
  clickUserApprovementFunc: PropTypes.func, // 点击用户协议
};

LogingInputAvoidKeyboardLayout.defaultProps = {
  isShowSecondInput: true,
  firstInputProps: {},
  secondInputProps: {},
  jumpToRegisterFunc: () => {},
  loginFunc: () => {},
  isShowRegisterButton: true,
  loginBUttonTitle: '登录',
  isShowTipInfo: false,
  ifShowRegisTip: false,
  clickUserApprovementFunc: () => {},
};
