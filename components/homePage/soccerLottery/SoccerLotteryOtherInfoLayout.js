import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CommonUtils from '../../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(1,13,45)',
  },
  titleTextStyle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)'
  },
  oddsSingleBackStyle: {
    height: 44,
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  historyBackStyle: {
    flex: 1,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  winLoseTextStyle: {
    fontSize: 12,
    color: 'white'
  }
});

export default class SoccerLotteryOtherInfoLayout extends Component {
  // 三个赔率方块
  renderThreeOddBlock() {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);
    for (let i = 0; i < 3; i += 1) {
      viewsArr.push(
        <View
          style={{
            marginLeft: CommonUtils.ceilWidth(4),
            flex: 1,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }}
        >
          <Text
            style={{
              fontFamily: 'DIN Condensed',
              fontSize: 18,
              color: 'white',
              marginTop: fontTopTemp,
            }}
          >
            22.6%
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              marginTop: fontTopTemp1,
            }}
          >
            胜
          </Text>
        </View>
      );
    }

    return viewsArr;
  }

  // 赔率
  renderOdds() {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 10 : 0);
    for (let i = 0; i < 2; i += 1) {
      let topMargin = 4;
      if (i === 0) {
        topMargin = 0;
      }
      viewsArr.push(
        <View style={[styles.oddsSingleBackStyle, { marginTop: topMargin }]}>
          <View
            style={{
              width: CommonUtils.ceilWidth(28),
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontFamily: 'DIN Condensed',
                marginTop: fontTopTemp,
              }}
            >
              0
            </Text>
          </View>
          {this.renderThreeOddBlock()}
        </View>
      );
    }

    return viewsArr;
  }

  // 投注比例
  renderProportion() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={styles.titleTextStyle}>
          投注比例
        </Text>
        <View style={{ flex: 1, paddingLeft: CommonUtils.ceilWidth(10) }}>
          {this.renderOdds()}
        </View>
      </View>
    );
  }

  // 历史交锋
  renderHistory() {
    return (
      <View style={styles.historyBackStyle}>
        <Text style={styles.titleTextStyle}>
          历史交锋
        </Text>
        <Text style={[styles.winLoseTextStyle, { marginLeft: CommonUtils.ceilWidth(10) }]}>
          胜0 | 平0 | 负0
        </Text>
      </View>
    );
  }

  // 历史战绩
  renderHistoryResult() {
    return (
      <View style={styles.historyBackStyle}>
        <Text style={styles.titleTextStyle}>
          历史战绩
        </Text>
        <Text
          style={[
            styles.winLoseTextStyle,
            {
              color: 'rgb(255,218,0)',
              marginLeft: CommonUtils.ceilWidth(10)
            }
          ]}
        >
          主队
        </Text>
        <Text style={[styles.winLoseTextStyle, { marginLeft: 2 }]}>
          胜0 | 平0 | 负0
        </Text>
        <Text
          style={[
            styles.winLoseTextStyle,
            {
              color: 'rgb(31,221,215)',
              marginLeft: CommonUtils.ceilWidth(10)
            }
          ]}
        >
          客队
        </Text>
        <Text style={[styles.winLoseTextStyle, { marginLeft: 2 }]}>
          胜0 | 平0 | 负0
        </Text>
      </View>
    );
  }

  // 平均赔率
  renderThreeway() {
    return (
      <View style={styles.historyBackStyle}>
        <Text style={styles.titleTextStyle}>
          平均赔率
        </Text>
        <Text style={[styles.winLoseTextStyle, { marginLeft: CommonUtils.ceilWidth(10) }]}>
          2.20 | 3.35 | 3.08
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, padding: CommonUtils.ceilWidth(15) }}>
          {this.renderProportion()}
          {this.renderHistory()}
          {this.renderHistoryResult()}
          {this.renderThreeway()}
        </View>
      </View>
    );
  }
}