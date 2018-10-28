import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonList from '../../base/CommonList';
import MineAccountSectionItem from '../MineAccountSectionItem';
import MineAccountItemLayout from '../MineAccountItemLayout';
import { getMyOrderList } from '../../../api/mine/MineApi';

export default class CommonOrderList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.statusMap = { 1: '待付款', 2: '已付款', 3: '待出票', 4: '待开奖', 5: '未中奖', 6: '已中奖', 7: '已退款', 8: '已锁定' };
    this.sellerStatus = { 1: '店主未处理', 2: '店主已处理', 3: '店主已处理', 4: '店主已处理', 5: '店主已处理', 6: '店主已处理', 7: '店主已处理', 8: '店主已处理' };
  }

  requestData = params => {
    this.commonList.refreshList(params);
  };

  renderItem = (item) => (
    <TouchableOpacity
      style={{ marginTop: 5 }}
      onPress={() => {
        this.props.navigation.navigate('MineOrderDeatilsPage', {
          orderId: item.item.id,
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
        time={item.item.pay_time}
        detailsStirng={this.sellerStatus[item.item.status]}
        money={parseFloat(global.dealEmptyWord(item.item.price, '0.00'))}
        singleShow
      />
    </TouchableOpacity>
  );

  render() {
    const { itemType } = this.props;
    return (
      <CommonList
        ref={ref => {
          this.commonList = ref;
        }}
        renderItem={this.renderItem}
        getListApi={getMyOrderList}
        params={{
          member_id: global.userId,
          status: itemType
        }}
      />
    );
  }
}
CommonOrderList.propTypes = {
  itemType: PropTypes.string,
};

CommonOrderList.defaultProps = {
  itemType: '全部', // 用作进行网络请求判断
};
