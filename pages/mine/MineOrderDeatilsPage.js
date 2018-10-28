import React from 'react';
import { Text, Alert } from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonTabView from '../../components/base/CommonTabView';
import CommonOrderDetailsList from '../../components/mine/order/CommonOrderDetailsList';
import CommonOrderStatusList from '../../components/mine/order/CommonOrderStatusList';
import * as MineApi from '../../api/mine/MineApi';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';

export default class MineOrderDeatilsPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.statusMap = { 1: '待开奖', 2: '未中奖', 3: '已中奖', 4: '已出票', 5: '申请退款', 6: '已退款' };
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

  renderDetails = () => (
    <CommonOrderDetailsList
      tabLabel={'方案详情'}
      orderID={this.props.navigation.state.params.orderId}
      orderModel={this.props.navigation.state.params.orderModel}
    />
  );

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '我的订单',
          hasLeft: true,
          leftTitle: '我的',
        }}
      >
        <CommonTabView
          onChangeTab={i => {}}
          style={{ paddingBottom: 0 }}
          children={[
            this.renderDetails(),
            <CommonOrderStatusList
              tabLabel={'订单状态'}
              orderId={this.props.navigation.state.params.orderId}
            />,
          ]}
        />
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
