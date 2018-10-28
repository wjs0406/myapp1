import React from 'react';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonTabView from '../../components/base/CommonTabView';
import CommonOrderList from '../../components/mine/order/CommonOrderList';

export default class MineOrderPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  componentDidMount() {
    // this.lotteryAllList.commonList.commonLayout.showContentView();
  }

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
        <CommonTabView
          underLineWidth={32}
          onChangeTab={i => {}}
          isShowMuti
          style={{ paddingBottom: 5 }}
          children={[
            <CommonOrderList
              tabLabel="全部"
              itemType={'arr'}
              ref={ref => {
                this.lotteryAllList = ref;
              }}
              {...this.props}
            />,
            // <CommonOrderList
            //   tabLabel="待付款"
            //   itemType={'1'}
            //   ref={ref => {
            //     this.unlotteryList = ref;
            //   }}
            //   {...this.props}
            // />,
            // <CommonOrderList
            //   tabLabel="已付款"
            //   itemType={'2'}
            //   ref={ref => {
            //     this.lotteryedList = ref;
            //   }}
            //   {...this.props}
            // />,
            <CommonOrderList
              tabLabel="待出票"
              itemType={'3'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
            <CommonOrderList
              tabLabel="待开奖"
              itemType={'4'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
            <CommonOrderList
              tabLabel="未中奖"
              itemType={'5'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
            <CommonOrderList
              tabLabel="已中奖"
              itemType={'6'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
            <CommonOrderList
              tabLabel="已退款"
              itemType={'7'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
            <CommonOrderList
              tabLabel="已锁定"
              itemType={'8'}
              ref={ref => {
                this.ticketList = ref;
              }}
              {...this.props}
            />,
          ]}
        />
      </BaseToolbarLayout>
    );
  }
}
