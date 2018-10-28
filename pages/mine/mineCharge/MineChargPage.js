import React from 'react';
import { FlatList, View } from 'react-native';
import XPay from 'react-native-puti-pay';
import UPPayControl from 'react-native-giti-unionpay';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineFooterLayout from '../../../components/mine/MineFooterLayout';
import MineChargeItem from '../../../components/mine/mineCharge/MineChargeItem';
import MineChargeHead from '../../../components/mine/mineCharge/MineChargeHead';
import MineChargeModal from '../../../components/mine/mineCharge/MineChargeModal';
import * as HomePageApi from '../../../api/homePage/HomePageApi';
import * as MineApi from '../../../api/mine/MineApi';
import Toast from 'teaset/components/Toast/Toast';

const yinlianIcon = require('../../../image/mine/yinlian.png');
const zhifubaoIcon = require('../../../image/mine/zhifubao.png');

export default class MineChargPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    XPay.setAlipayScheme('66LotteryAliPay');
    this.selIndex = 0;
    this.moneyNum = '100';
    this.state = {
      data: [
        { title: '银行卡充值', avatar: yinlianIcon },
        { title: '支付宝', avatar: zhifubaoIcon },
      ],
    };
  }

  getOrderInfo(type) {
    MineApi.payOrderRequest(global.userId, this.moneyNum, type)
      .then(response => {
        if (type === '1') {
          XPay.alipay(response, (res) => {
            if (res.resultStatus === '9000') {
              Toast.success('支付成功');
              this.props.navigation.goBack();
            }
          });
        } else {
          UPPayControl.pay(response, false).then((resp)=>{
            Toast.success('支付成功');
            this.props.navigation.goBack();
          }, (err) => {
            Toast.info('支付失败');
          });
        }
      })
      .catch(error => {

      });
  }

  renderItem = item => (
    <MineChargeItem
      title={item.item.title}
      onPress={() => {
        this.selIndex = item.index;
        global.storage
          .load({
            key: 'chargePop'
          })
          .then(ret => {
            if (ret === true) {
              this.mineChargeModal.setModalVisible(true);
            } else if (item.index === 0) {
              // 银联
              // this.props.navigation.navigate('MineChargCheckstandPage');
              this.getOrderInfo('2');
            } else {
              // 支付宝
              this.getOrderInfo('1');
            }
          })
          .catch(() => {
            this.mineChargeModal.setModalVisible(true);
          });
      }}
      imageUrl={item.item.avatar}
    />
  );

  renderSeparato = () => (
    <View style={{ height: 5, backgroundColor: '#FAFAFb' }} />
  );

  renderHeader = () => (
    <MineChargeHead
      onPress={(num) => {
        this.money = String(num);
      }}
      passInputValue={(num) => {
        this.money = num;
      }}
    />
  );

  renderFooter = () => (
    <MineFooterLayout
      style={{ marginTop: 15 }}
      details={'预存款须知：\n1. 本站仅提供彩票站的技术服务支持，不对彩民向 彩站的预存资金进行担保与监督，如出现资金问 题，与本平台无关； \n2. 为了尽可能防范套现和洗钱，充值金额至少60% 须用于消费(例如：充值100元，其中至少须有60 元必须用作投注金)。'}
    />
  );

  renderModal = () => (
    <MineChargeModal
      onPress={() => {
        if (this.selIndex === 0) {
          // 银联
          this.getOrderInfo('2');
        } else {
          this.getOrderInfo('1');
        }
      }}
      ref={ref => {
        this.mineChargeModal = ref;
      }}
    />
  );

  // 支付宝测试
  aliPayRequest() {
    HomePageApi.aliPayRequest('20180821110121725822', '0.01')
      .then(response => {
        XPay.alipay(response,(res)=>console.log(res));
      })
      .catch();
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '充值',
          hasLeft: true,
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index + item + ''}
          ItemSeparatorComponent={this.renderSeparato}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
        {this.renderModal()}
      </BaseToolbarLayout>
    );
  }
}
