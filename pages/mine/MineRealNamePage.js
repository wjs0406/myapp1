import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseStatusBarLayout from '../../components/base/BaseStatusBarLayout';
import MineRealNameLayout from '../../components/mine/MineRealNameLayout';
import LoginInputLayout from '../../components/login/LoginInputLayout';
import MineBottomButtonLayout from '../../components/mine/MineBottomButtonLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import * as MineApi from '../../api/mine/MineApi';
import Toast from 'teaset/components/Toast/Toast';

export default class MineRealNamePage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.realName = '';
    this.card = '';
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

  // 实名认证接口
  realNameApprove() {
    this.commonProgress.show();
    MineApi.realNameApproveRequest(
      this.props.navigation.state.params.userInfo.id,
      this.realName,
      this.card
    )
      .then(() => {
        this.commonProgress.hidden();
        Toast.info('认证成功');
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }


  render() {
    return (
      <BaseStatusBarLayout
        navigation={this.props.navigation}
        style={{ backgroundColor: '#fafafb' }}
        statusBar={{ backgroundColor: '#00000000', translucent: true }}
      >
        <MineRealNameLayout {...this.props} />
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
          <LoginInputLayout
            {...{
              titleDefaultValue: '真实姓名',
              inputPlaceHolderStr: '输入您的真实姓名',
            }}
            style={{
              backgroundColor: 'white',
              height: 70,
            }}
            viewStyle={{ marginLeft: 0 }}
            valueInputStyle={{ width: 70 }}
            mainInputChangeFunc={text => {
              this.realName = text;
            }}
          />
          <View style={{ height: 1, flex: 1, backgroundColor: '#FAFAFB' }} />
          <LoginInputLayout
            {...{
              titleDefaultValue: '身份证号',
              inputPlaceHolderStr: '输入您的身份证号码',
            }}
            style={{
              backgroundColor: 'white',
              height: 70,
            }}
            viewStyle={{ marginLeft: 0 }}
            valueInputStyle={{ width: 70 }}
            mainInputChangeFunc={text => {
              this.card = text;
            }}
          />
        </KeyboardAwareScrollView>
        <MineBottomButtonLayout
          showSingle
          rightOnPress={() => {
            if (this.realName === '') {
              Toast.info('请输入真实姓名');
              return;
            }
            if (this.card === '') {
              Toast.info('请输入身份证号');
              return;
            }
            if (CommonUtils.checkIdNum(this.card) === false) {
              Toast.info('身份证号输入不正确');
              return;
            }
            this.realNameApprove();
          }}
          rightName={'确定'}
          style={{
            position: 'absolute',
            bottom: this.state.bottomHeight,
          }}
        />
        {this.renderProgress()}
      </BaseStatusBarLayout>
    );
  }
}
