import React, { Component } from 'react';
import { Toast } from 'teaset';
import { SectionList, View, Alert } from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import MineAccountDetailsLayout from '../../components/mine/MineAccountDetailsLayout';
import CommonLayout from '../../components/base/CommonLayout';
import MineAccountItemLayout from '../../components/mine/MineAccountItemLayout';
import CommonUtils from '../../utils/CommonUtils';
import MineAccountSectionItem from '../../components/mine/MineAccountSectionItem';
import MineSectionFootLayout from '../../components/mine/MineSectionFootLayout';
import ScoccerLotteryClickBetPopLayout from '../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout';
import MixPassSearchLayout from '../../components/homePage/soccerLottery/mixPass/MixPassSearchLayout';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';

import * as MineApi from '../../api/mine/MineApi';

const searchImage = require('../../image/homePage/Home_ic_shaixuan.png');

export default class MineAccountPage extends Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.totalData = [];
    this.state = {
      data: [],
      clickBetPopisVisiable: false,
    };
    this.searchType = '可用余额';
  }

  componentDidMount() {
    // this.commonLayout.showContentView();
    this.getData();
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

  isTodayCanMakeCash(userInfoData, bankInfo) {
    MineApi.getIsTodayCanMakeCashRequest(global.userId)
      .then(() => {
        this.props.navigation.navigate('MineDrawMoneyConfirmPage', {
          balance: userInfoData.balance,
          bankInfo,
          callBack: () => {}
        });
      })
      .catch(error => {
        if (error.code === 501) {
          Toast.info('今日已提现，请明日再申请');
        } else {
          global.showErrorMessage(error);
        }
      });
  }

  // 获取用户绑定银行卡信息
  getUserBingdingCardInfo(userInfoData) {
    MineApi.getBindingCardRequest(global.userId)
      .then(response => {
        this.isTodayCanMakeCash(userInfoData, response);
      })
      .catch(error => {
        if (error.code === 201) {
          this.props.navigation.navigate('MineDrawMoneyPage', {
            userInfo: userInfoData,
          });
        } else {
          global.showErrorMessage(error);
        }
      });
  }

  // 网络请求
  getData() {
    let type = '1';
    if (this.searchType === '冻结资金') {
      type = '2';
    }
    this.commonLayout.showLoadingView();
    MineApi.accountDetailRequest(global.userId, type)
      .then((response) => {
        if (response.length > 0) {
          this.commonLayout.showContentView();
        } else {
          this.commonLayout.showEmptyView();
        }
        const dataArr = [];
        for (let i = 0; i < response.length; i += 1) {
          let ifContain = false;
          const dataTemp = response[i];
          const dataSplit = dataTemp.create_time.split('-');
          for (let j = 0; j < dataArr.length; j += 1) {
            const data1 = dataArr[j];
            for (let k = 0; k < data1.data.length; k += 1) {
              const data2 = data1.data[k];
              const data2Split = data2.create_time.split('-');
              // console.log(data2Split[1]);
              if (dataSplit[0] === data2Split[0] && dataSplit[1] === data2Split[1]) {
                data1.data.push(dataTemp);
                ifContain = true;
                let earnMoney = parseFloat(data1.earn);
                let minusMoney = parseFloat(data1.minus);
                if (parseFloat(dataTemp.amount) < 0) {
                  minusMoney += parseFloat(dataTemp.amount) * -1;
                } else {
                  earnMoney += parseFloat(dataTemp.amount);
                }
                data1.earn = `${earnMoney.toFixed(2)}`;
                data1.minus = `${minusMoney.toFixed(2)}`;
                break;
              }
            }
          }
          if (ifContain === false) {
            let earnMoney = '0.00';
            let minusMoney = '0.00';
            if (parseFloat(dataTemp.amount) < 0) {
              minusMoney = `${parseFloat(dataTemp.amount) * -1}`;
            } else {
              earnMoney = dataTemp.amount;
            }
            const dic = {
              time: `${dataSplit[0]}年${dataSplit[1]}月`,
              earn: earnMoney,
              minus: minusMoney,
              data: [dataTemp],
            };
            dataArr.push(dic);
          }
        }
        this.totalData = dataArr;
        if (this.totalData.length > 2) {
          this.setState({
            data: [this.totalData[0], this.totalData[1]],
          });
        } else {
          this.setState({
            data: dataArr,
          });
        }
      })
      .catch(error => {
        this.commonLayout.showErrorView();
      });
  }

  renderItem = item => {
    return (
      <MineAccountItemLayout
        time={item.item.create_time}
        detailsStirng={item.item.memo}
        money={parseFloat(item.item.amount)}
        balanceMoney={parseFloat(item.item.balance)}
      />
    );
  };

  renderSectionHeader = item => {
    return (
      <MineAccountSectionItem
        time={item.section.time}
        spendingStirng={`支出${item.section.minus} 收入${item.section.earn}`}
      />
    );
  };

  renderSectionFooter = () => {
    let isHasMore = true;
    if (this.totalData.length <= 2) {
      isHasMore = false;
    }
    return (
      <MineSectionFootLayout
        getMoreOnPress={() => {

        }}
        isHasMore={isHasMore}
      />
    );
  }

  // 混合过关搜索
  renderSearchButton() {
    const { clickBetPopisVisiable } = this.state;
    return (
      <MixPassSearchLayout
        clickConfirmFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable
          });
          this.getData();
        }}
        chooseLeagues={this.searchType}
        clickCancleFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable
          });
        }}
        titlesArr={['可用余额', '冻结资金']}
        isShowOddSearch={false}
        headerTitle="筛选"
        isMutiSelected={false}
        clickButtonFunc={(title) => {
          this.searchType = title;
        }}
        isShowClear={false}
      />
    );
  }

  renderSearchPop() {
    const popContent = () => this.renderSearchButton();
    const { clickBetPopisVisiable } = this.state;
    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={clickBetPopisVisiable}
        headerTitle={'筛选'}
        clickBlackBackFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable,
          });
        }}
        isAvarge
        renderContentFunc={popContent}
      />
    );
  }

  renderContent = () => (
    <SectionList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={info => this.renderItem(info)}
      sections={this.state.data}
      keyExtractor={(item, index) => index}
      renderSectionHeader={info => this.renderSectionHeader(info)}
      refreshing={false}
      style={{
        width: CommonUtils.width,
        marginTop: 10,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#FAFAFb' }} />}
      ListFooterComponent={this.renderSectionFooter()}
    />
  );

  render() {
    const { clickBetPopisVisiable } = this.state;
    const { userInfo } = this.props.navigation.state.params;
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '账户明细',
          hasLeft: true,
          hasRight: true,
          leftTitle: '我的',
          rightImage: searchImage,
          onRightPress: () => {
            this.setState({
              clickBetPopisVisiable: !clickBetPopisVisiable,
            });
          }
        }}
      >
        <MineAccountDetailsLayout
          // 点击充值
          onPress={() => {
            this.props.navigation.navigate('MineChargPage', {
              userInfo,
            });
          }}
          // 点击提现
          depositOnPress={() => {
            // 正常流程是先进性网络请求看是否有银行卡信息
            if (userInfo.real_name == null) {
              Toast.info('请先进行实名认证');
              return;
            }
            this.getUserBingdingCardInfo(userInfo);
          }}
          freezeMoney={parseFloat(global.dealEmptyWord(userInfo.freezing_amount, '0.00'))}
          balanceMoney={parseFloat(global.dealEmptyWord(userInfo.balance, '0.00'))}
          style={{
            marginTop: 10,
          }}
        />
        <CommonLayout
          ref={ref => {
            this.commonLayout = ref;
          }}
          contentView={() => this.renderContent()}
          clickToReload={() => {
            this.commonLayout.showLoadingView();
            // 请求网络
            this.getData();
          }}
        />
        { this.renderSearchPop() }
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
