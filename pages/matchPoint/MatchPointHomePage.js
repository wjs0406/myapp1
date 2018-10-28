import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';

import TabBarItem from '../../components/base/TabBarItem';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonList from '../../components/base/CommonList';
import ImmeMatchPointLayout from '../../components/matchPoint/ImmeMatchPointLayout';
import CommonTabView from '../../components/base/CommonTabView';
import MatchPointTabsLayout from '../../components/matchPoint/MatchPointTabsLayout';

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  // 导航栏按钮背景
  headerButtonBackStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // 导航栏按钮
  headerButtonStyle: { 
    height: 44,
    justifyContent: 'center',
  },
  // tabline
  tabLineStyle: {
    height: 4,
    backgroundColor: 'rgb(255, 218, 0)',
    width: 32,
    marginLeft: CommonUtils.width / (3 * 2) - 32 / 2,
  },
  // tabTextStyle: {
  //   flex: 1,
  //   fontSize: 20,
  //   marginTop: 20,
  //   textAlign: 'center',
  //   color: 'rgb(1,13,45)'
  // }
});

const matchSel = require('../../image/matchPoint/tabbar_ic_fen.png');
const matchNor = require('../../image/matchPoint/Tabbar_ic_FenNor.png');

export default class MatchPointHomePage extends Component {
  static navigationOptions() {
    return {
      header: null,
      tabBarLabel: '比分',
      tabBarIcon: ({ focused }) => (
        <TabBarItem
          focused={focused}
          normalImage={matchNor}
          selectedImage={matchSel}
        />
      ),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollIndex: 0,
    };
  }

  componentDidMount() {

  }

  // 点击足球,篮球按钮
  clickHeaderButton(index) {
    this.setState({
      scrollIndex: index,
    });
    this.ScrollView.scrollTo({
      x: CommonUtils.width * index,
      y: 0,
      animated: true,
    });
  }

  // 导航栏
  renderHeader() {
    let footBallColor = 'white';
    let basketBallColor = 'white';
    const { scrollIndex } = this.state;
    if (scrollIndex === 0) {
      footBallColor = 'white';
      basketBallColor = 'rgba(255,255,255, 0.5)';
    } else {
      footBallColor = 'rgba(255,255,255, 0.5)';
      basketBallColor = 'white';
    }
    return (
      <View style={styles.headerButtonBackStyle}>
        <TouchableOpacity
          style={[
            { marginRight: CommonUtils.ceilWidth(50) },
            styles.headerButtonStyle,
          ]}
          onPress={() => {
            this.clickHeaderButton(0);
          }}
        >
          <Text style={[styles.headerTextStyle, { color: footBallColor }]}>
            足球
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { marginLeft: CommonUtils.ceilWidth(50) },
            styles.headerButtonStyle,
          ]}
          onPress={() => {
            this.clickHeaderButton(1);
          }}
        >
          <Text style={[styles.headerTextStyle, { color: basketBallColor }]}>
            篮球
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent() {
    return <View style={{ flex: 1, backgroundColor: 'red' }} />;
  }

  // '足球'页面
  renderFootballPags = () => (
    <MatchPointTabsLayout
      navigation={this.props.navigation}
    />
  );

  // '篮球'页面
  renderBasketBallPage() {
    return (
      <MatchPointTabsLayout
        typeLabel={'篮球'}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          renderContentFunc: this.renderHeader(),
          hasLeft: false,
        }}
      >
        <ScrollView
          ref={ref => {
            this.ScrollView = ref;
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {this.renderFootballPags()}
          {this.renderBasketBallPage()}
        </ScrollView>
      </BaseToolbarLayout>
    );
  }
}
