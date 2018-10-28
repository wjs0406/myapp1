import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'teaset';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineFooterLayout from '../../../components/mine/MineFooterLayout';
import CommonUtils from '../../../utils/CommonUtils';
import MineBottomButtonLayout from '../../../components/mine/MineBottomButtonLayout';
import MineAccountSectionItem from '../../../components/mine/MineAccountSectionItem';
import MineDrawMoneyLayout from '../../../components/mine/mineCharge/MineDrawMoneyLayout';
import * as MineApi from '../../../api/mine/MineApi';
import CommonProgressLayout from '../../../components/base/CommonProgressLayout';


export default class MineDrawMoneyPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.textString = '';
    this.state = {
      bottomHeight: -100,
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

  bandingBankCard() {
    this.commonProgress.show();
    MineApi.bankCardBindingRequest(
      this.props.navigation.state.params.userInfo.id,
      this.props.navigation.state.params.userInfo.real_name,
      this.textString
    )
      .then((response) => {
        this.commonProgress.hidden();
        Toast.success('绑定成功');
        this.props.navigation.navigate('MineDrawMoneyConfirmPage', {
          balance: this.props.navigation.state.params.userInfo.balance,
          bankInfo: response,
          callBack: () => {
            this.props.navigation.goBack();
          }
        });
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
        // this.props.navigation.navigate('MineDrawMoneyConfirmPage');
      });
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '提款账户设置',
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
                bottomHeight: this.textString === '' ? -100 : 0,
              });
            }
          }}
          extraScrollHeight={80}
        >
          <MineAccountSectionItem
            time={'请填写银行卡信息'}
            timeStyle={{ color: '#010D2D' }}
            style={{
              marginTop: 10,
            }}
          />
          <View style={{ height: 15, width: CommonUtils.width, backgroundColor: 'white' }} />
          <MineDrawMoneyLayout
            title={'持卡人'}
            details={this.props.navigation.state.params.userInfo.real_name}
            style={{ height: 40 }}
          />
          <MineDrawMoneyLayout
            style={{ height: 70 }}
            title={'卡号'}
            type={1}
            inputPlaceHolderStr={'请输入您本人银行卡号'}
            onFouce={() => {
              if (!CommonUtils.ios) {
                this.setState({
                  bottomHeight: 0,
                });
              }
            }}
            onBlur={() => {
              if (!CommonUtils.ios) {
                this.setState({
                  bottomHeight: this.textString === '' ? -100 : 0,
                });
              }
            }}
            texthangeFunc={text => {
              this.textString = text;
            }}
          />
          <MineFooterLayout
            details={
              '*提款只支持储蓄卡'
            }
            style={{
              marginTop: 15
            }}
          />
        </KeyboardAwareScrollView>
        <MineBottomButtonLayout
          showSingle
          rightOnPress={() => {
            if (this.textString == null) {
              Toast.info('请输入银行卡号');
              return;
            }
            this.bandingBankCard();
          }}
          rightName={'下一步'}
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
