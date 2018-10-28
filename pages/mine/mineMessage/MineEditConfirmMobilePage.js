import React from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'teaset';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineAccountSectionItem from '../../../components/mine/MineAccountSectionItem';
import MineCommonEditLayout from '../../../components/mine/baseMessage/MineCommonEditLayout';
import MineBottomButtonLayout from '../../../components/mine/MineBottomButtonLayout';
import CommonUtils from '../../../utils/CommonUtils';
import * as MineApi from '../../../api/mine/MineApi';
import CommonProgressLayout from '../../../components/base/CommonProgressLayout';

export default class MineEditConfirmMobilePage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    const { userInfo } = props.navigation.state.params;

    this.inputName = '';
    this.secontInputText = '';
    // this.genderMap = { 女士: 2, 男士: 2 };
    // 基本信息
    // this.genderStr = '女士';
    // if (userInfo.gender === 1) {
    //   this.genderStr = '男士';
    // }
    this.genderStr = userInfo.gender;
    this.qqNum = userInfo.qq;
    this.email = userInfo.email;
    this.province = userInfo.province;
    this.city = userInfo.city;

    this.genderStrTes = userInfo.gender;
    this.qqNumTes = userInfo.qq;
    this.emailTes = userInfo.email;
    this.provinceTes = userInfo.province;
    this.cityTes = userInfo.city;


    this.state = {
      bottomHeight: 0,
    };
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

  // 修改昵称
  modifyNickName() {
   this.commonProgress.show();
    MineApi.updateNickNameRequest(this.props.navigation.state.params.id, this.inputName)
      .then(() => {
        this.commonProgress.hidden();
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack(this.inputName);
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 修改登录名
  modifyLoginName() {
    this.commonProgress.show();
    MineApi.updateLoginNameRequest(
      this.props.navigation.state.params.id,
      this.inputName,
      this.secontInputText
    )
      .then(response => {
        this.commonProgress.hidden();
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack(this.inputName);
      })
      .catch(error => {
        this.commonProgress.hidden();
      });
  }

  // 修改密码
  modifyPassword() {
    const { params } = this.props.navigation.state;
    this.commonProgress.show();
    MineApi.updatePassword(params.id, params.login_name, this.inputName)
      .then(() => {
        this.commonProgress.hidden();
        Toast.info('修改成功');
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 修改手机号
  modifyMobileRequest() {
    const { params } = this.props.navigation.state;
    this.commonProgress.show();
    MineApi.updataMobileRequest(params.userInfo.id, this.inputName, this.veriId, this.verifCode)
      .then(() => {
        this.commonProgress.hidden();
        Toast.info('修改成功');
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack(this.inputName);
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 更新详细信息
  modifyUserDetailInfo() {

    const { params } = this.props.navigation.state;
    this.commonProgress.show();
    MineApi.updateUserDetailInfo(
      params.userInfo.id,
      this.genderStr,
      this.qqNum,
      this.email,
      this.province,
      this.city,
    )
      .then(() => {
        this.commonProgress.hidden();
        Toast.info('修改成功');
        this.props.navigation.goBack();
        this.props.navigation.state.params.userDetailCallBack(
          this.genderStr,
          this.province,
          this.city,
          this.qqNum,
          this.email
        );
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 点击确认按钮
  clickConfirmButton() {
    const { navigation } = this.props;
    const { userInfo } = this.props.navigation.state.params;
    if (navigation.state.params.title === '昵称') {
      if (this.inputName === '') {
        Toast.info('请输入昵称');
        return;
      }
      if (this.inputName.length > 10) {
        Toast.info('昵称过长');
        return;
      }
      this.modifyNickName();
    } else if (navigation.state.params.title === '用户名') {
      if (this.inputName === '') {
        Toast.info('请输入用户名');
        return;
      }
      if (this.secontInputText === '') {
        Toast.info('请输入密码');
        return;
      }
      this.modifyLoginName();
    } else if (navigation.state.params.title === '密码') {
      if (this.inputName === '') {
        Toast.info('请输入密码');
        return;
      }
      if (this.secontInputText === '') {
        Toast.info('请确认您的密码');
        return;
      }
      if (this.inputName !== this.secontInputText) {
        Toast.info('两次密码输入不一致');
        return;
      }
      this.modifyPassword();
    } else if (navigation.state.params.title === '手机号码' && navigation.state.params.type === '下一步') {
      if (this.inputName === '') {
        Toast.info('请输入验证码');
        return;
      }
      if (this.inputName !== this.verifCode) {
        Toast.info('验证码输入不正确');
        return;
      }
      this.props.navigation.navigate('MineEditMessagePage', {
        title: '手机号码',
        type: '确认',
        userInfo: this.props.navigation.state.params.userInfo,
        callBack: (text) => {
          this.props.navigation.goBack();
          this.props.navigation.state.params.callBack(text);
        }
      });
    } else if (navigation.state.params.title === '手机号码' && navigation.state.params.type === '确认') {
      if (this.inputName === '') {
        Toast.info('请输入手机号');
        return
      }
      if (this.secontInputText === '') {
        Toast.info('请输入验证码');
        return;
      }
      if (this.secontInputText !== this.verifCode) {
        Toast.info('验证码输入不正确');
        return;
      }
      this.modifyMobileRequest();
    } else if (navigation.state.params.title === '基本资料') {
      if (this.inputName !== '') {
        this.qqNum = this.inputName;
      }
      if (this.secontInputText !== '') {
        this.email = this.secontInputText;
      }
      console.log(this.genderStr, this.province, this.city, this.qqNum, this.email);
      console.log(this.genderStrTes, this.provinceTes, this.cityTes, this.qqNumTes, this.emailTes);
      if (this.genderStr === this.genderStrTes && this.province === this.provinceTes && this.city === this.cityTes && this.qqNum === this.qqNumTes && this.email === this.emailTes) {
        Toast.info('请输入修改信息');
        return;
      }
      this.modifyUserDetailInfo();
    }
  }

  renderItem = item => (
    <MineAccountSectionItem
      time={item.item.title}
      statusString={item.item.details}
      timeStyle={{ color: '#010D2D' }}
      style={{ elevation: 0, marginBottom: 0, height: 44 }}
    />
  );

  render() {
    
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: `修改${this.props.navigation.state.params.title}`,
          hasLeft: true,
        }}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          onKeyboardWillShow={frames => {
            if (CommonUtils.ios) {
              this.setState({
                bottomHeight: frames.endCoordinates.height,
              });
            }
          }}
          onKeyboardWillHide={() => {
            if (CommonUtils.ios) {
              this.setState({
                bottomHeight: 0,
              });
            }
          }}
          extraScrollHeight={80}
        >
          <MineCommonEditLayout
            type={this.props.navigation.state.params.title}
            footerType={this.props.navigation.state.params.type}
            loginName={this.props.navigation.state.params.login_name}
            mobile={this.props.navigation.state.params.mobile}
            userInfo={this.props.navigation.state.params.userInfo}
            // 传递性别
            passGenderFunc={(text) => {
              console.log(text);
              if (text === '女士') {
                this.genderStr = 2;
              } else if (text === '男士') {
                this.genderStr = 1;
              } else {
                this.genderStr = 0;
              }
            }}
            // 传递省份
            passProvinceFunc={(text) => {
              this.province = text;
            }}
            // 传递城市
            passCityFunc={(text) => {
              this.city = text;
            }}
            // {...this.props}
            mainInputConfig={{
              mainInputChangeFunc: (text) => {
                this.inputName = text;
              },
              // 点击获取验证码按钮
              clickGetTestifyCodeFunc: () => {
                // 原手机号获取验证码
                if (this.props.navigation.state.params.mobile === '') {
                  Toast.info('没有手机号');
                  return null;
                }
                return this.props.navigation.state.params.mobile;
              },
              getCodeFunc: (code, id) => {
                this.verifCode = code;
                this.veriId = id;
              }
            }}
            secondInputConfig={{
              mainInputChangeFunc: (text) => {
                this.secontInputText = text;
              },
              // 点击获取验证码按钮
              clickGetTestifyCodeFunc: () => {
                // 输入新手机号获取验证码
                if (this.props.navigation.state.params.title === '手机号码' && this.props.navigation.state.params.type === '确认') {
                  if (this.inputName === '') {
                    Toast.info('请输入手机号');
                    return null;
                  }
                  if (!CommonUtils.checkPhoneNumer(this.inputName)) {
                    Toast.info('手机号输入不正确');
                    return null;
                  }
                  return this.inputName;
                }
              },
              getCodeFunc: (code, id) => {
                this.verifCode = code;
                this.veriId = id;
              },
            }}
          />
        </KeyboardAwareScrollView>
        <MineBottomButtonLayout
          showSingle
          rightOnPress={() => {
            // 网络请求写在这里
            this.clickConfirmButton();
          }}
          rightName={this.props.navigation.state.params.type}
          style={{
            position: 'absolute',
            bottom: this.state.bottomHeight,
          }}
        />
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}