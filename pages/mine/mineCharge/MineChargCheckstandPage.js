import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineFooterLayout from '../../../components/mine/MineFooterLayout';
import MineCheckstandHead from '../../../components/mine/mineCharge/MineCheckstandHead';
import LoginInputLayout from '../../../components/login/LoginInputLayout';
import CommonUtils from '../../../utils/CommonUtils';
import MineBottomButtonLayout from '../../../components/mine/MineBottomButtonLayout';

export default class MineChargCheckstandPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      bottomHeight: -100,
      viewBottom: 0,
    };
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '收银台',
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
                bottomHeight: -100,
              });
            }
          }}
          extraScrollHeight={80}
        >
          <MineCheckstandHead
            merchantsName={'付款给北京博乐互动科技有限公司'}
            money={2488.0}
            goodsName={'易宝支付3180731113602689918'}
            orderName={'3180731113602689918'}
            onPress={() => {
              // 可用银行列表
              this.props.navigation.navigate('MineBankPage', {
                callBack: () => {
                  setTimeout(() => {
                    this.props.navigation.navigate('MineChargePayPage');
                  }, 1000);
                }
              });
            }}
          />
          <LoginInputLayout
            {...{
              titleDefaultValue: '卡号',
              inputPlaceHolderStr: '请输入银行卡卡号',
            }}
            style={{ marginTop: 10, backgroundColor: 'white', height: 70 }}
            onFouce={() => {
              if (!CommonUtils.ios) {
                this.setState({
                  bottomHeight: 0,
                  viewBottom: -100,
                });
              }
            }}
            onBlur={() => {
              if (!CommonUtils.ios) {
                this.setState({
                  bottomHeight: -100,
                  viewBottom: 0,
                });
              }
            }}
          />
        </KeyboardAwareScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: this.state.viewBottom,
            width: CommonUtils.width
          }}
        >
          <MineFooterLayout
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            details={
              '本服务由易宝支付(yeepay.com)提供 \n易宝支付客服电话：4001-500-800 \n易宝支付客服公众号：易宝支付'
            }
            textStyle={{
              color: '#697289',
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}
          />
        </View>
        <MineBottomButtonLayout
          showSingle
          rightOnPress={() => {}}
          rightName={'下一步'}
          style={{
            position: 'absolute',
            bottom: this.state.bottomHeight,
          }}
        />
      </BaseToolbarLayout>
    );
  }
}
