import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';
import * as loginApi from '../../api/login/loginApi';
import CommonProgressLayout from '../base/CommonProgressLayout';
import * as MineApi from '../../api/mine/MineApi';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBlockStyle: {
    width: 5,
    height: 16,
    marginLeft: 15,
    backgroundColor: 'rgb(1,13,45)',
  },
  mainInputBackView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    borderRadius: 20,
    marginLeft: CommonUtils.ceilWidth(15),
    flex: 1,
    marginRight: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  mainInputStyle: {
    fontSize: 12,
    color: 'rgb(1,13,45)',
    paddingBottom: 0,
    paddingTop: 0,
    flex: 1,
  }
});

export default class LoginInputLayout extends Component {
  constructor(props) {
    super(props);
    this.time = 60;
    this.ifCanclickTestify = true;
    this.state = {
      testifyStr: '获取验证码',
    };
  }

  componentWillUnmount() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
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

  // 计时器
  renderTimeCounter() {
    this.ifCanclickTestify = false;
    this.interval = setInterval(
      () => {
        if (this.time > 1) {
          this.time -= 1;
          this.setState({
            testifyStr: `${this.time}s后重新发送`,
          });
        } else {
          this.ifCanclickTestify = true;
          this.time = 60;
          this.setState({
            testifyStr: '获取验证码',
          });
          clearInterval(this.interval);
        }
      },
      1000,
    );
  }

  // 获取登录验证码
  getLoginRegisterCode(mobile) {
    this.commonProgress.show();
    loginApi.loginGetVertifyCodeRequest(mobile)
      .then(response => {
        this.commonProgress.hidden();
        this.props.getCodeFunc(response.verif_code, response.verifId);
        this.renderTimeCounter();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 获取注册验证码
  getRegisterVerCode(mobile) {
    this.commonProgress.show();
    loginApi.registerGetVertifyCodeRequest(mobile)
      .then(response => {
        this.commonProgress.hidden();
        this.props.getCodeFunc(response.verif_code, response.verifId);
        this.renderTimeCounter();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 获取更新验证码
  getUPdateVerif(mobile, member_id) {
    this.commonProgress.show();
    MineApi.updateMobileGetVerRequest(mobile, member_id)
      .then(response => {
        this.commonProgress.hidden();
        this.props.getCodeFunc(response.verif_code, response.verifId);
        this.renderTimeCounter();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  renderTestifyButton() {
    const { isShowTestfy, clickGetTestifyCodeFunc } = this.props;
    const { testifyStr } = this.state;
    if (isShowTestfy) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.ifCanclickTestify) {
            // 如果手机号验证失败不往下执行
              if (clickGetTestifyCodeFunc() == null) {
                return;
              }
              if (this.props.verCodeType === 'register') {
                this.getRegisterVerCode(clickGetTestifyCodeFunc());
              } else if (this.props.verCodeType === 'update') {
                this.getUPdateVerif(clickGetTestifyCodeFunc(), this.props.mId);
              } else {
                this.getLoginRegisterCode(clickGetTestifyCodeFunc());
              }
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 11, color: 'rgb(1,13,45)' }}>
            {testifyStr}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const {
      inputPlaceHolderStr,
      style,
      titleDefaultValue,
      titleEditable,
      titleInputChangeFunc,
      mainInputChangeFunc,
      titleKeyboardType,
      mainKeyboardType,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.colorBlockStyle, this.props.viewStyle]} />
        <TextInput
          style={[{
            marginLeft: 15,
            fontSize: 15,
            color: 'rgb(1,13,45)',
            width: CommonUtils.ceilWidth(80),
            paddingBottom: 0,
            paddingTop: 0,
          },
          this.props.valueInputStyle
          ]}
          defaultValue={titleDefaultValue}
          editable={titleEditable}
          onChangeText={(text) => {
            titleInputChangeFunc(text);
          }}
          keyboardType={titleKeyboardType}
        />
        <View style={styles.mainInputBackView}>
          <TextInput
            style={styles.mainInputStyle}
            placeholder={inputPlaceHolderStr}
            placeholderTextColor={'rgba(1,13,45,0.4)'}
            secureTextEntry={this.props.isSecru}
            onChangeText={(text) => {
              mainInputChangeFunc(text);
            }}
            defaultValue={this.props.mainDefaultValue}
            keyboardType={mainKeyboardType}
            onFocus={() => {
              this.props.onFouce();
            }}
            onBlur={() => {
              this.props.onBlur();
            }}
          />
          {this.renderTestifyButton()}
          {this.renderProgress()}
        </View>
      </View>
    );
  }
}

LoginInputLayout.propTypes = {
  inputPlaceHolderStr: PropTypes.string,
  isShowTestfy: PropTypes.bool,
  style: PropTypes.object,
  titleDefaultValue: PropTypes.string,
  titleEditable: PropTypes.bool,
  titleInputChangeFunc: PropTypes.func,
  mainInputChangeFunc: PropTypes.func,
  titleKeyboardType: PropTypes.string,
  mainKeyboardType: PropTypes.string,
  viewStyle: PropTypes.object,
  valueInputStyle: PropTypes.object,
  onFouce: PropTypes.func,
  onBlur: PropTypes.func,
  clickGetTestifyCodeFunc: PropTypes.func, // 点击获取验证码
  getCodeFunc: PropTypes.func, // 传递验证码
  verCodeType: PropTypes.string, // 验证码类型
  mId: PropTypes.string,
  isSecru: PropTypes.bool, // 是否星号
  mainDefaultValue: PropTypes.string, // 默认值
};

LoginInputLayout.defaultProps = {
  inputPlaceHolderStr: '',
  isShowTestfy: false,
  style: {},
  titleDefaultValue: '',
  titleEditable: false,
  titleInputChangeFunc: () => {},
  mainInputChangeFunc: () => {},
  titleKeyboardType: 'default',
  mainKeyboardType: 'default',
  viewStyle: {},
  valueInputStyle: {},
  onFouce: () => {
    // 获取焦点
  },
  onBlur: () => {
    // 失去焦点
  },
  clickGetTestifyCodeFunc: () => true,
  getCodeFunc: () => {},
  verCodeType: 'register',
  mId: '',
  isSecru: false,
  mainDefaultValue: '',
};
