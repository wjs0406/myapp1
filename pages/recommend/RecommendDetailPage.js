import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Alert,

} from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import RecommendDetailHeaderLayout from '../../components/recommend/RecommendDetailHeaderLayout';
import RecommendBuyNowButtonLayout from '../../components/recommend/RecommendBuyNowButtonLayout';
import CommonLayout from '../../components/base/CommonLayout';
import RecommendListCellLayout from '../../components/recommend/RecommendListCellLayout';
import RecommendDetailCellLayout from '../../components/recommend/RecommendDetailCellLayout';
import BeforePayConfirmPopLayout from '../../components/homePage/soccerLottery/oddsOptimize/BeforePayConfirmPopLayout';
import ScoccerLotteryClickBetPopLayout from '../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout';
import * as RecommendApi from '../../api/recommend/RecommendApi';
import * as MineApi from '../../api/mine/MineApi.js';
import Toast from 'teaset/components/Toast/Toast';

const styles = StyleSheet.create({
  contentBackStyle: {
    position: 'relative',
    top: -15,
    marginLeft: CommonUtils.ceilWidth(15),
    marginRight: CommonUtils.ceilWidth(15),
    flex: 1,
    alignItems: 'center',
    paddingBottom: CommonUtils.ceilHeight(20),
  }
});

export default class RecommendDetailPage extends Component {
  constructor(props) {
    super(props);

    this.balance = '0.00';
    for (let i = 0; i < props.navigation.state.params.dataModel.play_name.length; i += 1) {
      const match = props.navigation.state.params.dataModel.play_name[i];
      const choosArr = match.rq.isSelect.split(',');
      match.htChoose = choosArr;
    }
    this.state = {
      popVisiable: false,
      dataArr: [
        {
          value: 1,
          data: props.navigation.state.params.dataModel.play_name,
        }
      ]
    };
  }

  componentWillMount() {
    this.getBalance();
  }

  componentDidMount() {
    this.commonLayout.showContentView();
  }

  // 获取账户余额
  getBalance() {
    // this.commonProgress.show();
    global.storage
      .load({
        key: global.loginKey
      })
      .then(ret => {
        MineApi.personInfoRequest(ret.id)
          .then(response => {
            this.balance = response.balance;
          })
          .catch(error => {
            global.showErrorMessage(error);
          });
      })
      .catch(() => '');
  }


  // 推荐下单
  buyLotteryRequest(money, muti) {
    const obj = { match: this.uploadArr };
    const jsonStr = JSON.stringify(obj);
    const { popVisiable } = this.state;
    RecommendApi.buyRecommendRequest(
      global.userId,
      this.props.navigation.state.params.dataModel.id,
      money,
      muti,
      jsonStr
    )
      .then(response => {
        Toast.success('支付成功');
        this.props.navigation.goBack();
        this.setState({
          popVisiable: !popVisiable,
        });
      })
      .catch(error => {
        this.setState({
          popVisiable: !popVisiable,
        });
        global.showErrorMessage(error);
      });
  }

  // 添加上传数据
  updateUploadArr(type, match, odds, value, field_time) {
    this.uploadArr.push({
      field_no: match.ID,
      name: type,
      odds,
      value,
      home_name: match.Home,
      away_name: match.Away,
      field_time,
    });
  }

  // 遍历选择数据
  calculateBonues() {
    const { dataArr } = this.state;
    this.uploadArr = [];
    for (let i = 0; i < dataArr[0].data.length; i += 1) {
      const match = dataArr[0].data[i];
      for (let j = 0; j < match.htChoose.length; j += 1) {
        const key = match.htChoose[j];
        if (match.rq != null && match.rq[key] != null) {
          this.updateUploadArr('rq', match, match.rq[key], key, match.MatchTime);
        } else if (match.sf != null && match.sf[key] != null) {
          this.updateUploadArr('sf', match, match.sf[key], key, match.MatchTime);
        } else if (match.bqc != null && match.bqc[key] != null) {
          this.updateUploadArr('bqc', match, match.bqc[key], key, match.MatchTime);
        } else if (match.jq != null && match.jq[key] != null) {
          this.updateUploadArr('jq', match, match.jq[key], key, match.MatchTime);
        } else if (match.bf != null && match.bf[key] != null) {
          this.updateUploadArr('bf', match, match.bf[key], key, match.MatchTime);
        } else if (key === 'rfwin') {
          this.updateUploadArr('rf', match, match.rf.win, 'win', match.MatchTime);
        } else if (key === 'rflose') {
          this.updateUploadArr('rf', match, match.rf.lose, 'lose', match.MatchTime);
        } else if (match.fc != null && match.fc[key] != null) {
          this.updateUploadArr('fc', match, match.fc[key], key, match.MatchTime);
        } else if (match.zf != null && match.zf[key] != null) {
          this.updateUploadArr('zf', match, match.zf[key], key, match.MatchTime);
        }
      }
    }
  }

  renderUpIntroText() {
    const { dataModel } = this.props.navigation.state.params;
    return (
      <View
        style={{
          backgroundColor: CommonUtils.themeColor,
          height: 84,
          paddingLeft: CommonUtils.ceilWidth(15),
          paddingRight: CommonUtils.ceilWidth(15),
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 18,
          }}
          numberOfLines={3}
        >
          {dataModel.memo}
        </Text>
      </View>
    );
  }

  // cell
  renderListItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
        }}
      >
        <RecommendDetailCellLayout
          headerTitle={`${item.item.league} | ${item.item.ID}`}
          homeName={item.item.Home}
          awayName={item.item.Away}
          pointStr={'0:0'}
          itemConfig={{
            rqData: item.item.rq,
            isShowAllPlay: false,
            chooseRqArr: item.item.htChoose,
            isCanClicked: false
          }}
        />
      </TouchableOpacity>
    );
  }

  // sectionList
  renderSectionList() {
    return (
      <SectionList
        style={{
          flex: 1,
          width: CommonUtils.width,
          paddingLeft: CommonUtils.ceilWidth(15),
          paddingRight: CommonUtils.ceilWidth(15),
        }}
        renderItem={info => this.renderListItem(info)}
        sections={this.state.dataArr}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }


  renderContent() {
    const { popVisiable } = this.state;
    return (
      <View style={styles.contentBackStyle}>
        <RecommendDetailHeaderLayout
          moneyStr={this.props.navigation.state.params.dataModel.price}
        />
        {/* <CommonList
          ref={ref => {
            this.CommonList = ref;
          }}
          itemSparator={
            <View style={{ height: 5, backgroundColor: 'rgb(248,249,250)' }} />
          }
          renderItem={() => this.renderItem()}
          isFristRefresh={false}
        /> */}
        <CommonLayout

          ref={ref => {
            this.commonLayout = ref;
          }}
          contentView={() => this.renderSectionList()}
        />
        <View style={{ height: 10 }} />
        <RecommendBuyNowButtonLayout
          upText="立即购买"
          bottomText="截止07-19 23:55"
          clickBuyNowFunc={() => {
            this.calculateBonues();
            this.setState({
              popVisiable: !popVisiable
            });
          }}
        />
      </View>
    );
  }

  // 弹窗内容
  renderPopContent() {
    const { dataModel } = this.props.navigation.state.params;
    const { popVisiable } = this.state;
    return (
      <BeforePayConfirmPopLayout
        balanceMoney={this.balance}
        needPayMoney={parseFloat(dataModel.price)}
        // 点击再看看
        clickCancleFunc={() => {
          this.setState({
            popVisiable: !popVisiable,
          });
        }}
        // 点击去支付
        clickConfimFunc={(muti) => {
          // muti倍数
          this.buyLotteryRequest(`${(parseFloat(dataModel.price) * muti).toFixed(2)}`, `${muti}`);
        }}
      />
    );
  }

  // 弹窗
  renderPopView() {
    const { popVisiable } = this.state;
    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={popVisiable}
        headerTitle="立即购买(CNY)"
        clickBlackBackFunc={() => {
          this.setState({
            popVisiable: !popVisiable,
          });
        }}
        renderContentFunc={() => this.renderPopContent()}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          title: '推荐详情',
          hasLeft: true,
          leftTitle: '推荐'
        }}
      >
        {this.renderUpIntroText()}
        {this.renderContent()}
        {this.renderPopView()}
      </BaseToolbarLayout>
    );
  }
}
