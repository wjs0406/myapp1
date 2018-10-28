import React from 'react';
import { View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineFooterLayout from '../../../components/mine/MineFooterLayout';
import CommonUtils from '../../../utils/CommonUtils';
import * as MineApi from '../../../api/mine/MineApi';
import MineBottomButtonLayout from '../../../components/mine/MineBottomButtonLayout';
import MineAccountSectionItem from '../../../components/mine/MineAccountSectionItem';
import MineDrawMoneyLayout from '../../../components/mine/mineCharge/MineDrawMoneyLayout';
import Toast from 'teaset/components/Toast/Toast';

export default class MineDrawMoneyConfirmPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.textString = '';
    this.minMakeCash = '0';
    this.state = {
      bottomHeight: -100,
      serviceCharge: 0.00
    };
  }

  componentDidMount() {
    this.getServiceCharge();
    this.getMinMakeCashMoney();
  }

  // 获取提现手续费
  getServiceCharge() {
    MineApi.serviceChargeRequest()
      .then(response => {
        this.setState({
          serviceCharge: parseFloat(response.value)
        });
      })
      .catch(error => {

      });
  }

  // 获取最小提现金额
  getMinMakeCashMoney() {
    MineApi.getMinMakeCashMoneyRequest()
      .then(response => {
        this.minMakeCash = response.withdrawMin;
      })
      .catch();
  }

  // 余额提现
  accountMakeCash(money) {
    const { bankInfo } = this.props.navigation.state.params;
    MineApi.accountMakeCashRequest(global.userId, money, bankInfo.id)
      .then(response => {
        Toast.success('提现成功');
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack();
      })
      .catch(error => {
        global.showErrorMessage(error);
      });
  }

  render() {
    const { bankInfo } = this.props.navigation.state.params;
    // 可提现金额
    const totalMoney = parseFloat(this.props.navigation.state.params.balance);
    const canMoney = (totalMoney - totalMoney * this.state.serviceCharge).toFixed(2);
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
            time={'您的可提款金额：'}
            timeStyle={{ color: '#010D2D' }}
            timeDetailsString={`${canMoney}元`}
            timeDetailsStyle={{ color: CommonUtils.themeColor }}
            style={{
              marginTop: 10,
            }}
          />
          <View style={{ height: 15, width: CommonUtils.width, backgroundColor: 'white' }} />
          <MineDrawMoneyLayout
            title={'提款到'}
            details={`${bankInfo.bank_name} ${bankInfo.card_number.substr(-4)}`}
            style={{ height: 40 }}
          />
          <MineDrawMoneyLayout
            style={{ height: 70 }}
            title={'提款金额'}
            type={2}
            inputPlaceHolderStr={'0'}
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
              '* 温馨提示：每日仅能提款一次 \n* 提款银行卡需为储蓄卡，禁止信用卡套现、盗号、盗刷等行为，一经确认，将终止该账户的使用，交予法律程序处理'
            }
            style={{
              marginTop: 15
            }}
          />
        </KeyboardAwareScrollView>
        <MineBottomButtonLayout
          showSingle
          rightOnPress={() => {
            if (this.textString == null || this.textString === '') {
              Toast.info('请输入提现金额');
              return;
            }
            if (parseFloat(this.textString) > canMoney) {
              Toast.info('可提现金额不足');
              return;
            }
            if (parseFloat(this.textString) < parseFloat(this.minMakeCash)) {
              Toast.info(`最小提现金额为${this.minMakeCash}元`);
              return;
            }
            this.accountMakeCash(this.textString);
          }}
          rightName={'确认'}
          style={{
            position: 'absolute',
            bottom: this.state.bottomHeight,
          }}
        />
      </BaseToolbarLayout>
    );
  }
}
