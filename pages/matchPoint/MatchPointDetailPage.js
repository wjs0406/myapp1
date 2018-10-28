import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import MatchPointDetailMinutsLayout from '../../components/matchPoint/MatchPointDetailMinutsLayout';
import * as MatchPointApi from '../../api/matchpoint/MatchPointApi';
import CommonLayout from '../../components/base/CommonLayout';

const styles = StyleSheet.create({
  imageBackStyle: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamNameStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vsTextStyle: {
    fontSize: 18,
    color: 'rgb(255,218,0)',

  },
  matchStatusTextStyle: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
  threeDataBlockBackStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
});

const zhuImage = require('../../image/matchPoint/Fen_img_zhu.png');
const keImage = require('../../image/matchPoint/Fen_img_ke.png');

export default class MatchPointDetailPage extends Component {
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

    this.state = {
      homeEventPoint: [0, 0, 0],
      awayEventPoint: [0, 0, 0],
      homeGoal: [],
      homeYellow: [],
      homeRed: [],
      awayGoal: [],
      awayYellow: [],
      awayRed: [],
    };
  }

  componentDidMount() {
    this.getMatchEvent();
  }

  // 获取比赛事件
  getMatchEvent() {
    // this.commonLayout.showLoadingView();
    MatchPointApi.matchEventRequest(this.props.navigation.state.params.dataModel.ID)
      .then(response => {
        const { item } = response.event;
        const homeGoal = [];
        const homeYellow = [];
        const homeRed = [];
        const awayGoal = [];
        const awayYellow = [];
        const awayRed = [];
        for (let i = 0; i < item.length; i += 1) {
          const event = item[i];
          const eventArr = event.split('^');
          // 主队进球
          if (eventArr[1] === '1') {
            if (eventArr[2] === '1') {
              homeGoal.push(eventArr);
            } else if (eventArr[2] === '2') {
              homeRed.push(eventArr);
            } else if (eventArr[2] === '3') {
              homeYellow.push(eventArr);
            }
          } else if (eventArr[2] === '1') {
            awayGoal.push(eventArr);
          } else if (eventArr[2] === '2') {
            awayRed.push(eventArr);
          } else if (eventArr[2] === '3') {
            awayYellow.push(eventArr);
          }
        }
        this.setState({
          homeEventPoint: [homeGoal.length, homeRed.length, homeYellow.length],
          awayEventPoint: [awayYellow.length, awayRed.length, awayGoal.length],
          homeGoal,
          homeRed,
          homeYellow,
          awayGoal,
          awayRed,
          awayYellow,
        });
        // this.commonLayout.showContentView();
      })
      .catch(error => {
        // this.commonLayout.showEmptyView();
      });
  }

  // 主客队名
  renderTeamName() {
    const { dataModel } = this.props.navigation.state.params;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ImageBackground style={styles.imageBackStyle} source={zhuImage}>
            <Text style={styles.teamNameStyle} numberOfLines={2}>
              {dataModel.home.split(',')[0]}
            </Text>
          </ImageBackground>
        </View>

        <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center' }}>
          <Text style={styles.vsTextStyle}>
            VS
          </Text>
          <Text style={styles.vsTextStyle}>
            {dataModel.time.split(' ')[0]}
          </Text>
          <Text style={styles.vsTextStyle}>
            {dataModel.time.split(' ')[1]}
          </Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <ImageBackground style={styles.imageBackStyle} source={keImage}>
            <Text style={styles.teamNameStyle} numberOfLines={2}>
              {dataModel.away.split(',')[0]}
            </Text>
          </ImageBackground>
        </View>
      </View>
    );
  }

  // 西1, 西2
  renderMatchStatus() {
    const { dataModel } = this.props.navigation.state.params;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.matchStatusTextStyle}>
          西1
        </Text>
        <Text style={styles.matchStatusTextStyle}>
          {this.stateMap[dataModel.state]}
        </Text>
        <Text style={styles.matchStatusTextStyle}>
          西2
        </Text>
      </View>
    );
  }

  // 3个数据小块
  renderThreeDataBlock(type) {
    const viewsArr = [];
    let titleArr = ['进球', '红牌', '黄牌'];
    if (type === 2) {
      titleArr = ['黄牌', '红牌', '进球'];
    }
    const { homeEventPoint, awayEventPoint } = this.state;
    let pointArr = homeEventPoint;
    if (type === 2) {
      pointArr = awayEventPoint;
    }
    for (let i = 0; i < 3; i += 1) {
      viewsArr.push(
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text
            style={{
              fontFamily: 'DIN Condensed',
              fontSize: 18,
              color: CommonUtils.themeColor
            }}
          >
            {`${pointArr[i]}`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(1,13,45,0.6)',
            }}
          >
            {titleArr[i]}
          </Text>
        </View>
      );
    }
    return viewsArr;
  }

  // 数据
  renderMatchData() {
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          position: 'relative',
          top: -15,
          zIndex: 1000,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 9,
            justifyContent: 'space-between',
            backgroundColor: 'white',
            height: 50
          }}
        >
          <View style={styles.threeDataBlockBackStyle}>
            {this.renderThreeDataBlock(1)}
          </View>
          <View style={{ width: 30, alignItems: 'center' }}>
            <View style={{ width: 1, height: 18, backgroundColor: 'rgba(1,13,45,0.6)' }} />
          </View>
          <View style={styles.threeDataBlockBackStyle}>
            {this.renderThreeDataBlock(2)}
          </View>
        </View>
        {this.renderMatchDetail()}

      </View>
    );
  }

  renderRedBack() {
    return (
      <View
        style={{
          marginTop: -20,
          height: 168 - CommonUtils.getToolBarHeight(),
          zIndex: 999,
          backgroundColor: CommonUtils.themeColor,
        }}
      >
        {this.renderTeamName()}
        {this.renderMatchStatus()}
      </View>
    );
  }

  renderMatchDetail() {
    const viewArr = [];
    // let awayGoal = [];
    const matchTime = ['0', '10’', '20’', '30’', '40’', '50’', '60’', '70’', '80’', '90’', '90’+'];
    for (let i = 0; i < 11; i += 1) {
      let color = 'white';
      if (i % 2 !== 0) {
        color = 'rgb(250,250,250)';
      }

      // const awayGoal = [];
      // for (let j = 0; j < this.state.awayGoal.length; j += 1) {
      //   const awayGoalMatch = this.state.awayGoal[j];
      //   if (parseInt(awayGoalMatch[3], 0) - i * 10 < 10) {
      //     awayGoal.push(awayGoalMatch);
      //   }
      // }

      viewArr.push(
        <MatchPointDetailMinutsLayout
          backColor={color}
          middleText={matchTime[i]}
          numberType={i * 10}
          homeGoal={this.state.homeGoal}
          homeYellow={this.state.homeYellow}
          homeRed={this.state.homeRed}
          awayGoal={this.state.awayGoal}
          awayYellow={this.state.awayYellow}
          awayRed={this.state.awayRed}
        />
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{
          // paddingLeft: 15,
          // paddingRight: 15,
          // // position: 'relative',
          // // top: -50,
          marginTop: 5,
        }}
      >
        {viewArr}
      </ScrollView>
    );
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        style={{ backgroundColor: '#fafafb' }}
        statusBar={{ backgroundColor: '#00000000', translucent: true }}
      >
        {this.renderRedBack()}
        {/* <CommonLayout
          ref={(ref) => {
            this.commonLayout = ref;
          }}
          contentView={() => {
            this.renderMatchData();
          }}
        /> */}
        {this.renderMatchData()}
      </BaseToolbarLayout>
    );
  }
}