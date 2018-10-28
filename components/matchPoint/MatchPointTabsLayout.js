import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonTabView from '../base/CommonTabView';
import CommonList from '../base/CommonList';
import ImmeMatchPointLayout from './ImmeMatchPointLayout';
import { matchPointListRequest, basketBallPointListRequest } from '../../api/matchpoint/MatchPointApi';

const styles = StyleSheet.create({

});

export default class MatchPointTabsLayout extends Component {
  constructor(props) {
    super(props);
    this.stateMap = {
      0: '未开赛',
      1: '上半场',
      2: '中场',
      3: '下半场',
      4: '加时',
      '-1': '完场',
      '-10': '取消',
      '-11': '待定',
      '-12': '腰斩',
      '-13': '中断',
      '-14': '推迟',
    };
  }

  // '篮球'cell
  renderBasketBallItem(item) {
    // 联赛名
    const leagName = item.item.scoreData.split('^')[3];
    const simpleNameStr = leagName.split(',')[0];
    const headerStr = `${simpleNameStr} | ${item.item.scoreData.split('^')[6]}`;
    // 主队名
    const homeName = item.item.scoreData.split('^')[10];
    const simpleHomeNameStr = homeName.split(',')[0];
    // 客队名
    const awayName = item.item.scoreData.split('^')[12];
    const simpleAwayName = awayName.split(',')[0];
    // 主队得分
    const homePoint = item.item.scoreData.split('^')[15];
    // 客队得分
    const awayPoint = item.item.scoreData.split('^')[16];

    return (
      <ImmeMatchPointLayout
        isShowCard={false}
        headerText={headerStr}
        homeName={simpleHomeNameStr}
        awayName={simpleAwayName}
        matchPoint={`${homePoint} : ${awayPoint}`}
      />
    );
  }

  // '足球'cell
  renderImmdenetItem(item) {
    // headerText
    const leagusStr = item.item.league.split(',')[0];
    const timeStr = item.item.time;
    const stateStr = this.stateMap[item.item.state];
    const headerStr = `${leagusStr} | ${timeStr} | ${stateStr}`;
    // 主队客队名
    const homeName = item.item.home.split(',')[0];
    const awayName = item.item.away.split(',')[0];
    // 比分
    const homePoint = item.item.homeScore;
    const awayPoint = item.item.awayScore;
    // 主队红黄牌
    const homeYellow = parseInt(item.item.yellow1, 0);
    const homeRed = parseInt(item.item.red1, 0);
    // 客队红黄牌
    const awayYellow = parseInt(item.item.yellow2, 0);
    const awayRed = parseInt(item.item.red2, 0);
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MatchPointDetailPage', {
            dataModel: item.item
          });
        }}
      >
        <ImmeMatchPointLayout
          headerText={headerStr}
          homeName={homeName}
          awayName={awayName}
          matchPoint={`${homePoint} : ${awayPoint}`}
          homeYellowNum={homeYellow}
          homeRedNum={homeRed}
          awayYellowNUm={awayYellow}
          awayRedNum={awayRed}
        />
      </TouchableOpacity>
    );
  }

  // '篮球'页面
  renderBasketrBallPage(tabName) {
    let paramsType = 'arr';
    if (tabName === '完场') {
      paramsType = '-1';
    } else if (tabName === '赛程') {
      paramsType = '0';
    }
    return (
      <View tabLabel={tabName} style={{ flex: 1 }}>
        <View style={{ height: 10, backgroundColor: 'rgb(248,249,250)' }} />
        <CommonList
          getListApi={() => basketBallPointListRequest(paramsType)
            .then(response => new Promise(resolve => {
              resolve(response);
            })
            )
          }

          renderItem={(item) => this.renderBasketBallItem(item)}
          itemSparator={
            <View style={{ height: 5, backgroundColor: 'rgb(248,249,250)' }} />
          }
          isPullUpLoad={false}
        />
      </View>
    );
  }

  // '足球'页面
  renderImmdentPage(tabName, refFunc) {
    let paramsType = 'arr';
    if (tabName === '完场') {
      paramsType = '-1';
    } else if (tabName === '赛程') {
      paramsType = '0';
    }
    return (
      <View tabLabel={tabName} style={{ flex: 1 }}>
        <View style={{ height: 10, backgroundColor: 'rgb(248,249,250)' }} />
        <CommonList
          ref={ref => {
            refFunc(ref);
          }}
          getListApi={() => matchPointListRequest(paramsType)
            .then(response => new Promise(resolve => {
              resolve(response);
            })
            )
          }

          renderItem={(item) => this.renderImmdenetItem(item)}
          itemSparator={
            <View style={{ height: 5, backgroundColor: 'rgb(248,249,250)' }} />
          }
          isPullUpLoad={false}
        />
      </View>
    );
  }

  render() {
    if (this.props.typeLabel === '篮球') {
      return (
        <CommonTabView
          underLineWidth={32}
          children={[
            this.renderBasketrBallPage('即时'),
            this.renderBasketrBallPage('完场'),
            this.renderBasketrBallPage('赛程'),
          ]}
        />
      );
    }
    return (
      <CommonTabView
        underLineWidth={32}
        children={[
          this.renderImmdentPage('即时', (ref) => {
            this.immdList = ref;
          }),
          this.renderImmdentPage('完场', (ref) => {
            this.doneList = ref;
          }),
          this.renderImmdentPage('赛程', (ref) => {
            this.matchSchedList = ref;
          }),
        ]}
      />
    );
  }
}

MatchPointTabsLayout.propTypes = {
  typeLabel: PropTypes.string,
  navigation: PropTypes.object,
};

MatchPointTabsLayout.defaultProps = {
  typeLabel: '足球',
  navigation: null
};
