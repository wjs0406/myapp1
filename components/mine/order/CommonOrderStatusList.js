import React from 'react';
import {
  FlatList,
  View,
  NativeModules,
  findNodeHandle,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonLayout from '../../base/CommonLayout';
import CommonUtils from '../../../utils/CommonUtils';
import MineOrderStatusItemLayout from './MineOrderStatusItemLayout';
import MineFooterLayout from '../MineFooterLayout';
import MineBottomButtonLayout from '../MineBottomButtonLayout';
import * as MineApi from '../../../api/mine/MineApi';

export default class CommonOrderStatusList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getDeatilsData();
  }

  getDeatilsData = () => {
    this.commonLayout.showLoadingView();
    MineApi.orderActivRequest(global.userId, this.props.orderId)
      .then(response => {
        if (response.length > 0) {
          this.commonLayout.showContentView();
        } else {
          this.commonLayout.showEmptyView();
        }
        this.setState({
          data: response,
        });
      })
      .catch(() => {
        this.commonLayout.showErrorView();
      });
  };

  renderItem = item => {
    const objectData = {
      topColor: CommonUtils.themeColor,
      middleColor: '#00000000',
      bottomColor: CommonUtils.themeColor,
    };
    if (item.index === 0) {
      objectData.topColor = '#0000000';
      objectData.middleColor = CommonUtils.themeColor;
    }
    if (item.index === this.state.data.length - 1) {
      objectData.bottomColor = '#00000000';
    }
    return (
      <MineOrderStatusItemLayout
        title={item.item.name}
        time={item.item.create_time}
        details={
          item.item.memo
        }
        statusStyle={objectData}
      />
    );
  };

  renderFoot = () => (
    <MineFooterLayout
      details={
        '注意： \n1. 此页面只展示订单流程，一切均以实体票为准， 本平台不对此订单流程做任何担保；\n2. 入您的订单已中奖，请您及时核对实体票；\n3. 入订单状态显示逾期或撤单，请及时联系店主询 问原因并查看投注金额是否已成功返还到可用余 额中。'
      }
    />
  );

  renderContent = () => (
    <View>
      <FlatList
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index + item + ''}
        ListFooterComponent={() => this.renderFoot()}
      />
      <MineBottomButtonLayout
        leftName={'在线沟通'}
        rightName={'联系客服'}
        ref={ref => {
          this.bottonButton = ref;
        }}
        leftOnPress={() => {
          // 在线沟通
          NativeModules.MessageManager.pushViewController(findNodeHandle(this.bottonButton));
        }}
        rightOnPress={() => {
          // 联系客服
          if (global.serviceTel != null) {
            const openUrl = `tel:${global.serviceTel}`;
            Linking.openURL(openUrl);
          }
        }}
      />
    </View>
  );

  render() {
    return (
      <CommonLayout
        ref={ref => {
          this.commonLayout = ref;
        }}
        contentView={() => this.renderContent()}
        clickToReload={() => {
          this.commonLayout.showLoadingView();
          this.getDeatilsData();
        }}
      />
    );
  }
}

CommonOrderStatusList.propTypes = {
  orderId: PropTypes.string,
};
CommonOrderStatusList.defaultProps = {
  orderId: '',
};
