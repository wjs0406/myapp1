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
} from 'react-native';
import { Carousel } from 'antd-mobile-rn';

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

export default class ScrollDetailPage extends Component {
  // 导航栏
  renderHeader() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {this.props.navigation.state.params.title}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          renderContentFunc: this.renderHeader(),
          hasLeft: true,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              width: CommonUtils.width,
              height: CommonUtils.height / 3
            }}
            source={{ uri: `${CommonUtils.apiUrl}/${this.props.navigation.state.params.photo}`}}
          />
          <Text
            style={{
              width: CommonUtils.width - 30,
              fontSize: 15,
              marginTop: 10,
            }}
          >
            {this.props.navigation.state.params.content}
          </Text>
        </ScrollView>

      </BaseToolbarLayout>
    );
  }
}
