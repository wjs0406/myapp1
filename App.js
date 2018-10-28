/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ToastAndroid, BackHandler } from 'react-native';

import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
// import HomePage from './pages/homePage/HomePage';
import TabBar from './components/base/TabBar';
// import MatchPointHomePage from './pages/matchPoint/MatchPointHomePage';
// import RecommendHomePage from './pages/recommend/RecommendHomePage';
// import MineHomePage from './pages/mine/MineHomePage';
// import SoccerLotteryPage from './pages/homePage/SoccerLotteryPage';
// import MineAccountPage from './pages/mine/MineAccountPage';
// import LoginPage from './pages/login/LoginPage';
// import RegisterPage from './pages/login/RegisterPage';
// import InvitationPage from './pages/login/InvitationPage';
// import MineOrderDeatilsPage from './pages/mine/MineOrderDeatilsPage';
// import MineOrderPage from './pages/mine/MineOrderPage';
// import MineRealNamePage from './pages/mine/MineRealNamePage';
// import SoccerLotteryAllPlaypage from './pages/homePage/SoccerLotteryAllPlaypage';
// import MineBaseMessagePage from './pages/mine/mineMessage/MineBaseMessagePage';
// import ChooseNineAndWlPage from './pages/homePage/ChooseNineAndWlPage';
// import ConfirmToPayLotteryPage from './pages/homePage/ConfirmToPayLotteryPage';
// import MineEditMessagePage from './pages/mine/mineMessage/MineEditMessagePage';
// import MineChargPage from './pages/mine/mineCharge/MineChargPage';
// import MineChargCheckstandPage from './pages/mine/mineCharge/MineChargCheckstandPage';
// import MineBankPage from './pages/mine/mineCharge/MineBankPage';
// import MineChargePayPage from './pages/mine/mineCharge/MineChargePayPage';
// import OddOptimiePage from './pages/homePage/OddOptimiePage';
// import BasketBallLotteryPage from './pages/homePage/BasketBallLotteryPage';
// import MineDrawMoneyPage from './pages/mine/mineCharge/MineDrawMoneyPage';
// import MineDrawMoneyConfirmPage from './pages/mine/mineCharge/MineDrawMoneyConfirmPage';
// import SplashPage from './pages/splashPage/SplashPage';
// import MessagePage from './pages/message/MessagePage';
// import MessageChatPage from './pages/message/MessageChatPage';
// import RecommendDetailPage from './pages/recommend/RecommendDetailPage';
// import RecommendSearchPage from './pages/recommend/RecommendSearchPage';
// import MatchPointDetailPage from './pages/matchPoint/MatchPointDetailPage';
// import UsernameSetPage from './pages/login/UsernameSetPage';
// import UserApprovementPage from './pages/login/UserApprovementPage';
// import MineRewardRecordPage from './pages/mine/MineRewardRecordPage';
// import ScrollDetailPage from './pages/homePage/ScrollDetailPage';
// import MineEditConfirmMobilePage from './pages/mine/mineMessage/MineEditConfirmMobilePage';

import SevenLottery from './pages/lotto/SevenLottery';
import SevenDetail from './pages/lotto/SevenDetail';
import HappyLottery from './pages/lotto/HappyLottery';
import HappyDetail from './pages/lotto/HappyDetail';
import SevenOrderDetails from './pages/lotto/SevenOrderDetails';


import './utils/StorageUtils';


import CommonUtils from './utils/CommonUtils';

// const commonTabConfig = initialRouteName => ({
//   tabBarComponent: TabBar,
//   tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
//   swipeEnabled: false, // 是否允许在标签之间进行滑动。
//   animationEnabled: false, // 是否在更改标签时显示动画。
//   lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
//   initialRouteName, // 设置默认的页面组件
//   backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
//   tabBarOptions: {
//     header: null,
//     // iOS属性
//     activeTintColor: '#443355', // label和icon的前景色 活跃状态下（选中）。
//     inactiveTintColor: '#CDC0FF', // label和icon的前景色 不活跃状态下(未选中)。

//     activeBackgroundColor: 'white', // label和icon的背景色 活跃状态下（选中） 。
//     inactiveBackgroundColor: 'white', // label和icon的背景色 不活跃状态下（未选中）。

//     showLabel: true, // 是否显示label，默认开启。
//     style: { height: 48, backgroundColor: 'white' }, // tabbar的样式。
//     labelStyle: CommonUtils.ios
//       ? { fontSize: 10, marginBottom: 5, fontWeight: 'bold' }
//       : { fontSize: 10, marginTop: 5, fontWeight: 'bold' }, // label的样式。
//     iconStyle: CommonUtils.ios
//       ? { width: 24, height: 24, marginBottom: 0 }
//       : { width: 24, height: 24, marginBottom: -4 },
//     // tabStyle: {
//     //   backgroundColor: 'rgb(230,69,51)'
//     // },
//     // 安卓属性
//     // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
//     // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
//     showIcon: true, // 是否显示图标，默认关闭。
//     // showLabel:true, //是否显示label，默认开启。
//     // style:{}, // tabbar的样式。
//     // labelStyle:{}, // label的样式。
//     upperCaseLabel: false // 是否使标签大写，默认为true。
//     // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
//     // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
//     // scrollEnabled:true, // 是否启用可滚动选项卡。
//     // tabStyle:{}, // tab的样式。
//     // indicatorStyle:{}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
//     // labelStyle:{}, // label的样式。
//     // iconStyle:{}, // 图标的样式。
//   }
// });

const HomeTab = TabNavigator(
  {
    SevenLottery: {
      screen: SevenLottery
    },
    // MatchPointHomePage: {
    //   screen: MatchPointHomePage
    // },
    // RecommendHomePage: {
    //   screen: RecommendHomePage
    // },
    // MessagePage: {
    //   screen: SevenLottery,
    // },
    // MineHomePage: {
    //   screen: MineHomePage
    // },
  },
  // commonTabConfig('SevenLottery')
);


const AppStack = StackNavigator(
  {
    SevenLottery: { screen: SevenLottery },
    HappyLottery: { screen: HappyLottery },
    SevenDetail: { screen: SevenDetail },
    HappyDetail: { screen: HappyDetail },
    SevenOrderDetails: { screen: SevenOrderDetails },
    // SplashPage: { screen: SplashPage }, // 启动页
    // LoginPage: { screen: LoginPage }, // 登录页
    // RegisterPage: { screen: RegisterPage }, // 注册页
    // InvitationPage: { screen: InvitationPage }, // 邀请码
    // HomeTab: { screen: HomeTab }, // 主页
    // SoccerLotteryPage: { screen: SoccerLotteryPage }, // 竞彩足球
    // MineAccountPage: { screen: MineAccountPage }, // 账户明细
    // MineOrderDeatilsPage: { screen: MineOrderDeatilsPage }, // 我的订单详情
    // MineOrderPage: { screen: MineOrderPage }, // 我的订单
    // MineRealNamePage: { screen: MineRealNamePage }, // 实名认证
    // SoccerLotteryAllPlaypage: { screen: SoccerLotteryAllPlaypage }, // 足彩全部玩法
    // MineBaseMessagePage: { screen: MineBaseMessagePage }, // 个人基本信息
    // ChooseNineAndWlPage: { screen: ChooseNineAndWlPage }, // 胜负彩/任选9页面
    // ConfirmToPayLotteryPage: { screen: ConfirmToPayLotteryPage }, // 确认方案页面
    // MineEditMessagePage: { screen: MineEditMessagePage }, // 编辑个人信息(包括昵称,用户ID,密码)
    // MineChargPage: { screen: MineChargPage }, // 充值
    // MineChargCheckstandPage: { screen: MineChargCheckstandPage }, // 收银台
    // MineBankPage: { screen: MineBankPage }, // 可用银行列表
    // MineChargePayPage: { screen: MineChargePayPage }, // 银行充值付款页面
    // OddOptimiePage: { screen: OddOptimiePage }, // 奖金优化
    // BasketBallLotteryPage: { screen: BasketBallLotteryPage }, // 竞彩篮球
    // MineDrawMoneyPage: { screen: MineDrawMoneyPage }, // 提款账户设置
    // MineDrawMoneyConfirmPage: { screen: MineDrawMoneyConfirmPage }, // 确认提款
    // MessageChatPage: { screen: MessageChatPage }, // 聊天
    // RecommendDetailPage: { screen: RecommendDetailPage }, // 推荐详情
    // RecommendSearchPage: { screen: RecommendSearchPage }, // 推荐搜索
    // MatchPointDetailPage: { screen: MatchPointDetailPage }, // 比分详情
    // UsernameSetPage: { screen: UsernameSetPage }, // 设置用户名
    // UserApprovementPage: { screen: UserApprovementPage }, // 用户协议
    // MineRewardRecordPage: { screen: MineRewardRecordPage }, // 中奖纪录
    // ScrollDetailPage: { screen: ScrollDetailPage }, // 咨询详情,
    // MineEditConfirmMobilePage: { screen: MineEditConfirmMobilePage }, // 修改手机号确认
     
  },
  {
    navigationOptions: {
      gesturesEnabled: false
    },
    mode: 'card',
    headerMode: 'none',
  }
);

const navigateOnce = (getStateForAction) => (action, state) => { const { type, routeName } = action; return (state && type === NavigationActions.NAVIGATE && routeName === state.routes[state.routes.length - 1].routeName) ? null : getStateForAction(action, state); };
AppStack.router.getStateForAction = navigateOnce(AppStack.router.getStateForAction);


export default class App extends Component {
  lastBackPressed = 0;

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    this.lastBackPressed = 0;
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    const now = new Date().getTime();
    if (now - this.lastBackPressed < 2500) {
      return false;
    }
    this.lastBackPressed = now;
    ToastAndroid.show('再点击一次退出应用', ToastAndroid.SHORT);
    return true;
  };

  render() {
    return <AppStack />;
  }
}
