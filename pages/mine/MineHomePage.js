import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import TabBarItem from '../../components/base/TabBarItem';
import BaseStatusBarLayout from '../../components/base/BaseStatusBarLayout';
import MineHeadLayout from '../../components/mine/MineHeadLayout';
import MineAccountDetailsLayout from '../../components/mine/MineAccountDetailsLayout';
import MineFuncItemLayout from '../../components/mine/MineFuncItemLayout';
import * as MineApi from '../../api/mine/MineApi';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import CommonUtils from '../../utils/CommonUtils';
import Toast from 'teaset/components/Toast/Toast';

const mineSel = require('../../image/mine/Tabbar_ic_MineSel.png');
const mineNor = require('../../image/mine/Tabbar_ic_MineNor.png');

const navigationNameArr = ['MineAccountPage', 'MineOrderPage', 'MineRewardRecordPage', 'MineRealNamePage'];
const nameArr = ['账户明细', '我的订单', '中奖纪录', '实名认证'];

export default class MineHomePage extends Component {
  static navigationOptions() {
    return {
      header: null,
      headerModel: 'float',
      tabBarLabel: '我的',
      tabBarIcon: ({ focused }) => (
        <TabBarItem
          focused={focused}
          normalImage={mineNor}
          selectedImage={mineSel}
        />
      ),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      userInfoData: {}
    };
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

  componentWillMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.getUserInfo();
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  // 获取用户信息
  getUserInfo() {
    // this.commonProgress.show();
    global.storage
      .load({
        key: global.loginKey
      })
      .then(ret => {
        MineApi.personInfoRequest(ret.id)
          .then(response => {
            // this.commonProgress.hidden();
            this.setState({
              userInfoData: response,
            });
          })
          .catch(error => {
            // this.commonProgress.hidden();
            global.showErrorMessage();
          });
      })
      .catch(() => '');
  }

  // 判断当天是否已经提现
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
        // 如果绑定了银行卡,先判断是不是当天已经提现过了
        this.isTodayCanMakeCash(userInfoData, response);
      })
      .catch(error => {
        // 如果没有绑定银行卡,跳转到绑定银行卡页面
        if (error.code === 201) {
          this.props.navigation.navigate('MineDrawMoneyPage', {
            userInfo: userInfoData,
          });
        } else {
          global.showErrorMessage(error);
        }
      });
  }

  render() {
    const { userInfoData } = this.state;
    return (
      <BaseStatusBarLayout
        navigation={this.props.navigation}
        style={{ backgroundColor: '#fafafb' }}
        statusBar={{ backgroundColor: '#00000000', translucent: true }}
      >
        <MineHeadLayout
          nameId={global.dealEmptyWord(userInfoData.login_name, '暂无')}
          nickName={global.dealEmptyWord(userInfoData.nike_name, '暂无')}
          phone={global.dealEmptyWord(userInfoData.mobile, '暂无')}
          onPress={() => {
            this.props.navigation.navigate('MineBaseMessagePage', {
              userInfo: userInfoData,
            });
          }}
          headerSource={`http://${global.dealEmptyWord(userInfoData.photo_url, '7xrfe5.com1.z0.glb.clouddn.com/0.jpg')}`}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: -15,
          }}
        >
          <MineAccountDetailsLayout
            onPress={() => {
              this.props.navigation.navigate('MineChargPage', {
                userInfo: userInfoData,
              });
            }}
            // 提现申请
            depositOnPress={() => {
              // 正常流程是先进性网络请求看是否有银行卡信息
              if (userInfoData.real_name == null) {
                Toast.info('请先进行实名认证');
                return;
              }
              this.getUserBingdingCardInfo(userInfoData);
            }}
            freezeMoney={parseFloat(global.dealEmptyWord(userInfoData.freezing_amount, '0.00'))}
            balanceMoney={parseFloat(global.dealEmptyWord(userInfoData.balance, '0.00'))}
          />
          <MineFuncItemLayout
            onPress={index => {
              this.props.navigation.navigate(navigationNameArr[index], {
                title: nameArr[index],
                userInfo: userInfoData,
              });
            }}
          />
        </ScrollView>
        {this.renderProgress()}
      </BaseStatusBarLayout>
    );
  }
}
