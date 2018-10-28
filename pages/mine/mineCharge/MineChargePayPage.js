import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineFooterLayout from '../../../components/mine/MineFooterLayout';
import MineCheckstandHead from '../../../components/mine/mineCharge/MineCheckstandHead';
import LoginInputLayout from '../../../components/login/LoginInputLayout';
import CommonUtils from '../../../utils/CommonUtils';
import MineChargeItem from '../../../components/mine/mineCharge/MineChargeItem';
import CommonButtonLayout from '../../../components/base/CommonButtonLayout';
import MineAccountSectionItem from '../../../components/mine/MineAccountSectionItem';
import MineChargeAgreement from '../../../components/mine/mineCharge/MineChargeAgreement';

const yinlianIcon = require('../../../image/mine/yinlian.png');

export default class MineChargePayPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
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
          extraScrollHeight={80}
        >
          <MineCheckstandHead
            merchantsName={'付款给北京博乐互动科技有限公司'}
            money={2488.0}
            goodsName={'易宝支付3180731113602689918'}
            orderName={'3180731113602689918'}
            onPress={() => {
              // 可用银行列表
              this.props.navigation.navigate('MineBankPage');
            }}
          />
          <View style={{ width: CommonUtils.width, height: 10 }} />
          <MineChargeItem
            title={'建设银行'}
            details={'\n尾号9306 | 储蓄卡'}
            imageUrl={yinlianIcon}
            onPress={() => {}}
          />
          <MineAccountSectionItem
            style={{ marginTop: 10, height: 44, marginBottom: CommonUtils.ios ? 0 : 1 }}
            time={'姓名'}
            spendingStirng={'*臣'}
            textStyle={{ textAlign: 'left', flex: 1 }}
          />
          <MineAccountSectionItem
            style={{ height: 44, elevation: 0 }}
            time={'身份证号'}
            spendingStirng={'23062**********057'}
            textStyle={{ textAlign: 'left', flex: 1 }}
          />
          <View style={{ marginTop: 10, backgroundColor: 'white' }}>
            <LoginInputLayout
              {...{
                titleDefaultValue: '手机号',
                inputPlaceHolderStr: '银行预留手机号',
              }}
              style={{ marginTop: 15, backgroundColor: 'white', height: 40 }}
            />
            <LoginInputLayout
              {...{
                titleDefaultValue: '验证码',
                inputPlaceHolderStr: '短信验证码',
                isShowTestfy: true,
                // 验证码
                mainInputChangeFunc: text => {},
              }}
              style={{
                marginTop: 15,
                backgroundColor: 'white',
                height: 40,
                marginBottom: 15,
              }}
            />
          </View>
          <MineChargeAgreement
            details={'限额提示：5000元/笔；10000元/日；100000元/月\n具体限额以银行卡参考为准'}
            onPress={(value) => {
              // false 选中

            }}
          />
          <CommonButtonLayout
            onPress={() => {
            }}
            contextString={'确认支付'}
          />
          <MineFooterLayout
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
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
        </KeyboardAwareScrollView>
      </BaseToolbarLayout>
    );
  }
}
