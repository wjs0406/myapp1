import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import MineAccountSectionItem from '../../components/mine/MineAccountSectionItem';
import MineAccountItemLayout from '../../components/mine/MineAccountItemLayout';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonList from '../../components/base/CommonList';
import * as MineApi from '../../api/mine/MineApi';

export default class MineRewardRecordPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.statusMap = { 1: '待开奖', 2: '未中奖', 3: '已中奖', 4: '已出票', 5: '申请退款', 6: '已退款' };
    this.sellerStatus = { 1: '店主未处理', 2: '店主已处理', 3: '店主已处理', 4: '店主已处理', 5: '店主已处理', 6: '店主已处理' };
  }

  componentDidMount() {
    // this.lotteryAllList.commonList.commonLayout.showContentView();
  }

  renderItem = (item) => (
    <TouchableOpacity
      style={{ marginTop: 5 }}
      onPress={() => {
        this.props.navigation.navigate('MineOrderDeatilsPage', {
          orderId: item.item.order_id,
          orderModel: item.item,
        });
      }}
      activeOpacity={0.8}
    >
      <MineAccountSectionItem
        time={item.item.lottery_name}
        statusString={this.statusMap[item.item.status]}
        timeStyle={{ color: '#010D2D' }}
      />
      <MineAccountItemLayout
        time={item.item.create_time}
        detailsStirng={this.sellerStatus[item.item.status]}
        money={parseFloat(global.dealEmptyWord(item.item.bonus_price, '0.00'))}
        singleShow
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: this.props.navigation.state.params.title,
          hasLeft: true,
          leftTitle: '我的',
        }}
      >
        <CommonList
          ref={ref => {
            this.commonList = ref;
          }}
          isPullUpLoad={false}
          renderItem={this.renderItem}
          getListApi={() => MineApi.rewardRecordRequest(global.userId)
            .then(response => new Promise(resolve => {
              resolve(response);
            }))
          }
        />
      </BaseToolbarLayout>
    );
  }
}
