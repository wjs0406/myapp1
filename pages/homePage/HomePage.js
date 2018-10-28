import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  NativeModules,
  findNodeHandle,
  RefreshControl
} from 'react-native';
import { Carousel } from 'antd-mobile-rn';
import EZSwiper from 'react-native-ezswiper';

// import UPPayControl from 'react-native-giti-unionpay';

import TabBarItem from '../../components/base/TabBarItem';
import CommonLayout from '../../components/base/CommonLayout';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import HomePageChooseClickLayout from '../../components/homePage/HomePageChooseClickLayout';
import ScoccerLotteryClickBetPopLayout from '../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout';
// import MixPassSearchLayout from '../../components/homePage/soccerLottery/mixPass/MixPassSearchLayout';
import * as HomePageApi from '../../api/homePage/HomePageApi';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';

const xImage = require('../../image/homePage/Home_ic_X.png');
const popImage = require('../../image/homePage/img_getGold.png');

const styles = StyleSheet.create({
  // 公告
  annouceStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: CommonUtils.ceilHeight(210) - 44,
    zIndex: 1000,
    height: 44,
    width: CommonUtils.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 联系客服背景
  contactServerBackStyle: {
    marginTop: 30,
    flex: 1,
    height: 36,
    alignItems: 'center'
  },
  // 联系客服按钮
  contactServerButtonStyle: {
    width: CommonUtils.ceilWidth(200),
    height: 36,
    borderRadius: 18,
    backgroundColor: CommonUtils.themeColor,
    shadowColor: 'rgba(231,56,55,0.4)',
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    justifyContent: 'center',
    alignItems: 'center'
  },
  // 联系客服文字
  contactServerTextStyle: {
    fontSize: 15,
    color: 'white',
  },
  // 弹窗背景
  popContentBackStyle: {
    backgroundColor: 'white',
    width: 270,
    height: 270,
    borderRadius: 5
  }
});


const homeSel = require('../../image/homePage/Tabbar_ic_HomeNor.png');
const homeNor = require('../../image/homePage/Tabbar_ic_HomeSel.png');
const annoImage = require('../../image/homePage/img_anno.png');

export default class HomePage extends Component {
  static navigationOptions() {
    return {
      header: null,
      headerModel: 'float',
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => (
        <TabBarItem
          focused={focused}
          normalImage={homeNor}
          selectedImage={homeSel}
        />
      )
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      clickBetPopisVisiable: false,
      // 轮播图数据
      scrollData: [],
      // 公告
      noticeData: [],
      // 图标
      iconData: [],
      // 客服电话
      serTel: '',
      // 刷新
      isRefreshing: false,
    };

    global.storage
      .load({
        key: global.loginKey,
      })
      .then(ret => {
        global.userId = ret.id;
      })
      .catch(() => {
      });
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

  // 是否中奖
  isGetReward() {
    global.storage
      .load({
        key: global.loginKey,
      })
      .then(ret => {
        HomePageApi.isGetRewardRequest(ret.id)
          .then(response => {
            if (response.winningFlg === '2') {
              this.setState({
                clickBetPopisVisiable: true,
              });
            }
          })
          .catch(() => {

          });
      })
      .catch(() => {
      });
  }

  // 首页接口
  homePageRequest() {
    HomePageApi.homePageRequest()
      .then(response => {
        this.commonLayout.showContentView();
        // 排序
        for (let i = 0; i < response.lottery_type.length; i += 1) {
          for (let j = 0; j < response.lottery_type.length - 1 - i; j += 1) {
            if (parseInt(response.lottery_type[j].sort, 0) > parseInt(response.lottery_type[j + 1].sort, 0)) {
              const temp = response.lottery_type[j];
              response.lottery_type[j] = response.lottery_type[j + 1];
              response.lottery_type[j + 1] = temp;
            }
          }
        }
        this.setState({
          scrollData: response.consult,
          noticeData: response.notice,
          iconData: response.lottery_type,
          serTel: response.serviceTel,

        });
        setTimeout(() => {
          this.setState({
            isRefreshing: false,
          });
        }, 500);
        global.serviceTel = response.serviceTel;
      })
      .catch(error => {
        this.commonLayout.showErrorView();
        global.showErrorMessage(error);
        setTimeout(() => {
          this.setState({
            isRefreshing: false,
          });
        }, 500);
      });
  }

  componentDidMount() {
    // this.setState({
    //   clickBetPopisVisiable: true,
    // });
    // this.homePageRequest();
    this.homePageRequest();
    setTimeout(() => {
      this.isGetReward();
    }, 1000);
  }

  // 导航栏
  renderHeader() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          首页
        </Text>
      </View>
    );
  }

  // 轮播图
  renderSwip() {
    const viewArr = [];
    const { scrollData } = this.state;
    for (let i = 0; i < scrollData.length; i += 1) {
      const data = scrollData[i];
      viewArr.push(
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate('ScrollDetailPage', {
              title: data.title,
              photo: data.photo,
              content: data.content,
            });
          }}
        >
          <Image
            style={{
              backgroundColor: 'gray',
              width: CommonUtils.width,
              height: CommonUtils.ceilHeight(210)
            }}
            source={{ uri: `${CommonUtils.apiUrl}/${data.photo}` }}
          />
        </TouchableOpacity>

      );
    }
    return viewArr;
  }

  // 公告内容
  renderAnnoceText() {
    const viewArr = [];
    const { noticeData } = this.state;
    for (let i = 0; i < noticeData.length; i += 1) {
      viewArr.push(
        <View
          style={{
            height: 44,
            justifyContent: 'center',
            width: CommonUtils.width - 30 - 36 - 10
          }}
        >
          <Text style={{ fontSize: 12, color: 'white'}} numberOfLines={2}>
            {noticeData[i].value}
          </Text>
        </View>
      );
    }
    return viewArr;
  }

  // 公告
  renderAnnouce() {
    const { noticeData } = this.state;
    let isInfi = false;
    if (noticeData.length > 1) {
      isInfi = true;
    }
    return (
      <View
        style={styles.annouceStyle}
      >
        <Image style={{ width: 36, height: 36, marginLeft: 15 }} source={annoImage} />
        <View style={{ width: CommonUtils.width - 30 - 36 - 10, height: 44, marginLeft: 15 }}>
          <Carousel
            autoplay
            infinite={isInfi}
            autoplayInterval={3000}
            dots={false}
            vertical
          >
            {this.renderAnnoceText()}
            {/* {this.renderAnnoceText()} */}
          </Carousel>
        </View>

      </View>
    );
  }

  // 联系客服按钮
  renderContactServer() {
    if (this.state.serTel === '') {
      return null;
    }
    return (
      <View style={styles.contactServerBackStyle}>
        <TouchableOpacity
          style={styles.contactServerButtonStyle}
          onPress={() => {
            const openUrl = `tel:${this.state.serTel}`;
            Linking.openURL(openUrl);
          }}
        >
          <Text style={styles.contactServerTextStyle}>
            联系客服
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 弹窗内容
  renderPopContent() {
    const { clickBetPopisVisiable } = this.state;
    return (
      <TouchableOpacity style={styles.popContentBackStyle}>
        <View
          style={{
            height: 44,
            backgroundColor: CommonUtils.themeColor,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              textAlign: 'center',
              flex: 1,
              fontWeight: 'bold',
              marginLeft: 37,
            }}
          >
            您中奖了
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                clickBetPopisVisiable: !clickBetPopisVisiable,
              });
            }}
          >
            <Image style={{ width: 22, height: 22, marginRight: 15 }} source={xImage} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={{ width: 190, height: 190 }} source={popImage} />
          {/* <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: CommonUtils.themeColor, fontSize: 12 }}>
              {'> 查看详情 <'}
            </Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  }

  // 中奖小弹窗
  renderGetRewardPopLayout() {
    const { clickBetPopisVisiable } = this.state;
    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={clickBetPopisVisiable}
        clickBlackBackFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable,
          });
        }}
        renderContentFunc={() => this.renderPopContent()}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  }

  // 支付宝测试
  aliPayRequest() {
    HomePageApi.aliPayRequest('20180821110121725822', '0.01')
      .then(response => {
        XPay.alipay(response,(res)=>console.log(res));
      })
      .catch();
  }

  // 下拉刷新
  renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={() => {
          this.setState({
            isRefreshing: true,
          });
          this.homePageRequest();
          setTimeout(() => {
            this.isGetReward();
          }, 1000);
        }}
      />
    );
  }

  // 渲染内容
  renderContent() {
    const { navigation } = this.props;
    const { iconData } = this.state;
    return (
      <ScrollView
        style={{
          height: CommonUtils.ceilHeight(210),
          backgroundColor: 'rgb(250,250,251)',
          marginBottom: 48,
        }}
        refreshControl={
          this.renderRefreshControl()
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: 'gray', width: CommonUtils.width, height: CommonUtils.ceilHeight(210) }}>
            <EZSwiper style={{width: 200, height: 150, backgroundColor: 'white' }}
                      dataSource={['0', '1' , '2', '3']}
                      width={ 200 }
                      height={150 }
            />
        </View>

        {this.renderAnnouce()}
        <HomePageChooseClickLayout
          dataArr={iconData}
          ref={ref => {
            this.paheChoose = ref;
          }}
          // 点击'竞彩足球'等
          clickImageFunc={(name, id) => {
            // 竞彩足球
            if (name === '竞彩足球') {
              navigation.navigate('SoccerLotteryPage', {
                id,
                chooseTitle: '混合过关',
                ifCanClick: true,
                matchLimit: 2,
              });
            } else if (name === '胜负彩') { // 胜负彩
              navigation.navigate('ChooseNineAndWlPage', {
                title: '胜负彩',
                id,
                matchLimit: 14
              });
            } else if (name === '任选9') { // 任选9
              navigation.navigate('ChooseNineAndWlPage', {
                title: '任选9',
                matchLimit: 9,
                id
              });
            } else if (name === '竞彩篮球') { // 竞彩篮球
              navigation.navigate('BasketBallLotteryPage', {
                id,
                chooseTitle: '混合过关',
                ifCanClick: true,
                matchLimit: 2,
              });
            } else if (name === '竞足单关') {
              navigation.navigate('SoccerLotteryPage', {
                id: 2,
                chooseTitle: '单关',
                ifCanClick: false,
                matchLimit: 1,

              });
              // 支付宝测试
              // this.aliPayRequest();
            } else {
              navigation.navigate('BasketBallLotteryPage', {
                id: 1,
                chooseTitle: '单关',
                ifCanClick: false,
                matchLimit: 1,
              });
              // UPPayControl.pay('123', true).then((resp)=>{
              //   console.log("支付成功："+resp);
              // },(err)=>{
              //     console.log("支付失败:"+err);
              // });
            }
          }}
          // 在线沟通
          clickOnlineCommuFunc={() => {
            NativeModules.MessageManager.pushViewController(findNodeHandle(this.paheChoose));
          }}
        />
        {this.renderContactServer()}
      </ScrollView>
    );
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          renderContentFunc: this.renderHeader(),
          hasLeft: false,
        }}
      >
        <CommonLayout
          ref={ref => {
            this.commonLayout = ref;
          }}
          contentView={() => this.renderContent()}
        />
        {this.renderGetRewardPopLayout()}
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
