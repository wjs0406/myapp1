import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import CommonLayout from '../../base/CommonLayout';
import MineAccountSectionItem from '../MineAccountSectionItem';
import MineOrderDetailsHeadLayout from './MineOrderDetailsHeadLayout';
import CommonUtils from '../../../utils/CommonUtils';
import MineDetailsItemLayout from './MineDetailsItemLayout';
import MineItemHeadLayout from '../MineItemHeadLayout';
import * as MineApi from '../../../api/mine/MineApi';
import CommonProgressLayout from '../../base/CommonProgressLayout';

export default class CommonOrderDetailsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.lotteryList = [];
    this.sellerStatus = { 1: '店主未处理', 2: '店主已处理', 3: '店主已处理', 4: '店主已处理', 5: '店主已处理', 6: '店主已处理', 7: '店主已处理', 8: '店主已处理' };
    this.statusMap = { 1: '待付款', 2: '已付款', 3: '待出票', 4: '待开奖', 5: '未中奖', 6: '已中奖', 7: '已退款', 8: '已锁定' };
    // 计算中奖金额
    this.bonesMoney = 0;
    if (props.orderModel.bonus_price !== '' && props.orderModel.bonus_price != null) {
      this.bonesMoney = parseFloat((props.orderModel.bonus_price)).toFixed(2);
    }

    this.state = {
      data: [],
      rewardDistance: '0.00~0.00',
      orderModel: props.orderModel,
    };
  }

  componentDidMount() {
    this.orderDetailRequest();
    this.commonLayout.showContentView();
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

  // 计算奖金范围
  getRewardDistance(orderList) {
    const matchsArr = [];
    for (let i = 0; i < orderList.length; i += 1) {
      if (orderList[i].infor == null
          || orderList[i].infor.odds == null
          || orderList[i].infor.odds === ''
      ) {
        this.setState({
          rewardDistance: '0.00~0.00'
        });
        return;
      }
      matchsArr.push(orderList[i].infor);
    }
    const matchOddsArr = [];
    for (let j = 0; j < matchsArr.length; j += 1) {
      const match = matchsArr[j];
      let ifCOntain = false;
      for (let k = 0; k < matchOddsArr.length; k += 1) {
        const arr = matchOddsArr[k];
        if (arr[0].field_no === match.field_no) {
          arr.push(match);
          ifCOntain = true;
        }
      }
      if (ifCOntain === false) {
        matchOddsArr.push([match]);
      }
    }
    // 赔率排序
    for (let l = 0; l < matchOddsArr.length; l += 1) {
      const arrTemp = matchOddsArr[l];
      for (let m = 0; m < arrTemp.length - 1; m += 1) {
        for (let n = 0; n < arrTemp.length - 1 - m; n += 1) {
          if (parseFloat(arrTemp[n].odds) > parseFloat(arrTemp[n + 1].odds)) {
            const temp = arrTemp[n];
            arrTemp[n] = arrTemp[n + 1];
            arrTemp[n + 1] = temp;
          }
        }
      }
    }

    let minOdd = 1;
    let maxOdd = 1;
    for (let p = 0; p < matchOddsArr.length; p += 1) {
      const arr = matchOddsArr[p];
      if (arr.length > 0) {
        minOdd *= parseFloat(arr[0].odds);
        maxOdd *= parseFloat(arr[arr.length - 1].odds);
      }
    }
    const { orderModel } = this.props;
    const minMoney = (parseFloat(orderModel.price) * minOdd).toFixed(2);
    const maxMoney = (parseFloat(orderModel.price) * maxOdd).toFixed(2);

    this.setState({
      rewardDistance: `${minMoney}~${maxMoney}`,
    });
  }

  // 拆分玩法字段
  getOddsKey(key, odds, playType) {
    if (key == null || key === '') {
      return '暂无';
    }
    const pointArr = key.split('');
    let title = '';
    if (playType === 'sf') { // 胜负
      if (key === 'win' || key === 'sf3') {
        title = '胜';
      } else if (key === 'lose' || key === 'sf0') {
        title = '负';
      } else {
        title = '平';
      }
    } else if (playType === 'rq' || playType === 'rf') { // 让球胜平负
      if (key === 'rq0' || key === 'lose') {
        title = '让负';
      } else if (title === 'rq1') {
        title = '让平';
      } else {
        title = '让负';
      }
    } else if (pointArr[0] === 's' && pointArr[1] !== 'f') { // 比分
      if (pointArr.length === 3) {
        switch (pointArr[1]) {
          case 'w':
            title = '胜其他';
            break;
          case 'd':
            title = '平其他';
            break;
          default:
            title = '负其他';
            break;
        }
      } else {
        title = `${pointArr[2]}:${pointArr[3]}`;
      }
    } else if (pointArr[0] === 't') { // 进球
      if (pointArr[1] === '7') {
        title = '7+球';
      } else {
        title = `${pointArr[1]}球`;
      }
    } else if (pointArr[0] === 'h') { // 半全场
      let firstStr = '';
      let secondStr = '';
      const strMap = { 3: '胜', 0: '负', 1: '平' };
      firstStr = strMap[pointArr[2]];
      secondStr = strMap[pointArr[3]];
      title = firstStr + secondStr;
    } else if (pointArr[0] === 'w' || pointArr[0] === 'L') { // 篮球分差
      if (pointArr[0] === 'w') {
        title = '主胜';
        const pointTemp = key.split('w');
        const nextTemp = pointTemp[1].split('_');
        if (nextTemp[0] === '26') {
          title = '主胜(26+)';
        } else {
          title = `主胜(${nextTemp[0]}-${nextTemp[1]})`;
        }
      } else {
        title = '客胜';
        const pointTemp = key.split('L');
        const nextTemp = pointTemp[1].split('_');
        if (nextTemp[0] === '26') {
          title = '客胜(26+)';
        } else {
          title = `客胜(${nextTemp[0]}-${nextTemp[1]})`;
        }
      }
    } else if (pointArr[0] === 'o') { // 篮球大小分
      title = '大分';
    } else {
      title = '小分';
    }
    if (odds == null || odds === '') {
      return title;
    }
    return `${title} [${odds}]`;
  }

  // 网络请求
  orderDetailRequest() {
    this.commonLayout.showLoadingView();
    MineApi.orderDetailRequest(global.userId, this.props.orderID)
      .then(response => {
        if (response.orderList.length > 0) {
          this.commonLayout.showContentView();
        } else {
          this.commonLayout.showEmptyView();
        }
        this.commonProgress.hidden();
        this.getRewardDistance(response.orderList);
        this.lotteryList = response.orderList;
        this.setState({
          data: ['1', '1', '1'],
          orderModel: response.orderList
        });
      })
      .catch(error => {
        this.commonLayout.showErrorView();
      });
  }

  getDeatilsData = () => {};

  renderSeparato = () => (
    <View style={{ height: 5, backgroundColor: '#FAFAFb' }} />
  );

  // 获取投注内容
  getBuyContentText(dic) {
    // 投注内容,逗号分割成数组
    let contentText = '';
    const nameArr = dic.name.split(',');
    const valueArr = dic.value.split(',');
    const oddsArr = dic.odds.split(',');
    for (let i = 0; i < nameArr.length; i += 1) {
      if (i === 0) {
        contentText = this.getOddsKey(valueArr[i], oddsArr[i], nameArr[i]);
      } else {
        contentText = `${contentText}, ${this.getOddsKey(valueArr[i], oddsArr[i], nameArr[i])}`;
      }
    }
    return contentText;
  }

  // 绑定数据时, 待优化共同组件部分
  renderItem = item => {
    const arr = [];
    const { orderModel } = this.props;
    if (item.index === 0) {
      arr.push(
        <MineAccountSectionItem
          style={{ marginTop: 10 }}
          time={orderModel.lottery_name}
          timeStyle={{ color: '#010D2D' }}
          spendingStirng={this.statusMap[orderModel.status]}
          textStyle={{ color: CommonUtils.themeColor, fontSize: 12 }}
        />,
      );
      arr.push(
        <MineDetailsItemLayout
          detailsArr={[
            { title: '订单号码', details: orderModel.order_no },
            { title: '订单金额', details: `${orderModel.price}元` },
            { title: '中奖金额', details: `${this.bonesMoney}元` },
            { title: '投注信息', details: `${this.state.orderModel[0].num_note}注${orderModel.multiple}倍` },
            { title: '支付时间', details: orderModel.pay_time },
          ]}
        />,
      );
    } else if (item.index === 1) {
      arr.push(
        <MineAccountSectionItem
          style={{ marginTop: 10 }}
          time={'订单方案'}
          timeStyle={{ color: '#010D2D' }}
          timeDetailsStyle={{ color: 'rgba(1,13,45,0.6)', fontSize: 12 }}
          timeDetailsString={'(赔率以实际出票为准)'}
        />,
      );
      if (this.lotteryList[0].infor == null) {
        return null;
      }
      for (let i = 0; i < this.lotteryList[0].infor.length; i += 1) {
        const dic = this.lotteryList[0].infor[i];
        const matchInfo = this.lotteryList[0];
        if (dic == null) {
          break;
        }
        let resultStr = '未开出';
        if (matchInfo.bonus_price == null) {
          resultStr = '未开出';
        } else if (matchInfo.bonus_price > 0) {
          resultStr = '中奖';
        } else if (matchInfo.bonus_price <= 0) {
          resultStr = '未中奖';
        }
        let gallStr = '无';
        if (dic.gall === '1') {
          gallStr = '有';
        }
        arr.push(
          <View>
            <MineItemHeadLayout time={`${dic.field_no} | ${dic.field_time}`} />
            <View style={{ flex: 1, height: 1, backgroundColor: '#fafafb' }} />
            <MineDetailsItemLayout
              detailsArr={[
                { title: '主队客队', details: `${dic.home_name}VS${dic.away_name}` },
                { title: '投注内容', details: `${this.getBuyContentText(dic)}` },
                { title: '彩果', details: resultStr },
                { title: '胆', details: gallStr },
              ]}
            />
          </View>,
        );
      }
    } else {
      const detailsArr = [];
      if (this.lotteryList[0].infor == null) {
        return null;
      }
      for (let i = 0; i < this.lotteryList[0].infor.length; i += 1) {
        const dic = this.lotteryList[0].infor[i];
        if (dic == null) {
          return null;
        }
        const dic1 = {
          // title: '场次',
          // details: `${dic.field_no} | ${dic.home_name} | ${this.getBuyContentText(dic)}`,
          title: dic.field_no,
          details: `${dic.home_name}`,
          detailValue: this.getBuyContentText(dic),
          type: '1'
        };
        detailsArr.push(dic1);
      }
      detailsArr.push(
        { title: '投注信息', details: `${this.state.orderModel[0].num_note}注${orderModel.multiple}倍` },
        { title: '出票状态', details: this.sellerStatus[orderModel.status] },
        { title: '金额', details: `${orderModel.price}元` },
        { title: '奖金', details: `${this.bonesMoney}元` },
      );
      arr.push(
        <View>
          <MineAccountSectionItem
            style={{ marginTop: 10 }}
            time={'出票详情'}
            timeStyle={{ color: '#010D2D' }}
            timeDetailsStyle={{ color: 'rgba(1,13,45,0.6)', fontSize: 12 }}
            timeDetailsString={'共1条明细'}
          />
          <MineDetailsItemLayout
            detailsArr={detailsArr}
          />
        </View>,
      );
    }
    return arr;
  };

  renderContent = () => (
    <View style={{ flex: 1, paddingBottom: 5 }}>
      {/* <MineOrderDetailsHeadLayout ticketScope={this.state.rewardDistance} /> */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index + item + ''}
        ItemSeparatorComponent={this.renderSeparato}
      />
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CommonLayout
          ref={ref => {
            this.commonLayout = ref;
          }}
          contentView={() => this.renderContent()}
          clickToReload={() => {
            this.commonLayout.showLoadingView();
            this.orderDetailRequest();
          }}
        />
        {this.renderProgress()}
      </View>

    );
  }
}

CommonOrderDetailsList.propTypes = {
  orderID: PropTypes.string,
  orderModel: PropTypes.object,
};

CommonOrderDetailsList.defaultProps = {
  orderID: '',
  orderModel: {},
};
