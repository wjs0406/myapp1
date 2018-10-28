import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const nextImage = require('../../image/matchPoint/Home_ic_next.png');
const noIcon = require('../../image/matchPoint/Group2.png');

const fontMargin = CommonUtils.Platform === 'IOS' ? 20 : 0;
const styles = StyleSheet.create({
  // 底部背景
  bottomBackStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // 球队背景
  teamBackStyle: {
    // paddingTop: 15,
    // paddingBottom: 0,
    // alignItems: 'center',
  },
  // 球队名
  teamNameStyle: {
    color: 'rgb(1,13,45)',
    fontSize: 20,
  },
  // 球队标志图片
  teamIconStyle: {
    width: 20,
    height: 30,
    marginTop: 6,
  },
});

export default class ImmeMatchPointLayout extends Component {
  // top
  renderTopView() {
    return (
      <View
        style={{
          flex: 1,
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: 'rgb(105,114,137)',
            fontSize: 14,
            marginLeft: 15,
          }}
        >
          { this.props.headerText }
        </Text>
        <Image style={{ width: 24, height: 24, marginRight: 15 }} source={nextImage} />
      </View>
    );
  }

  renderCardImages(yellow, red) {
    const viewsArr = [];
    if (yellow + red === 0) {
      viewsArr.push(
        <Image style={[styles.teamIconStyle]} source={noIcon} resizeMode="contain" />
      );
    } else {
      for (let i = 0; i < yellow + red; i += 1) {
        if (i >= yellow) {
          viewsArr.push(
            <View style={[styles.teamIconStyle, { backgroundColor: 'rgb(231,56,55)', marginRight: 5, }]} />
          );
        } else {
          viewsArr.push(
            <View style={[styles.teamIconStyle, { backgroundColor: 'rgb(255,218,0)', marginRight: 5, }]} />
          );
        }
      }
    }

    return viewsArr;
  }

  // 红黄牌
  renderCards(alignSelfs, type) {
    const { isShowCard } = this.props;
    if (!isShowCard) {
      return null;
    }
    let yellowNUm = this.props.homeYellowNum;
    let redNum = this.props.homeRedNum;
    if (type === 'away') {
      yellowNUm = this.props.awayYellowNUm;
      redNum = this.props.awayRedNum;
    }
    return (
      <View style={{ flex: 1, justifyContent: alignSelfs, flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 15 }}>
        {this.renderCardImages(yellowNUm, redNum)}
      </View>
    );
  }

  // bottom
  renderBottomView() {
    let topFont = 0;
    topFont = fontMargin;
    let pading = 0;
    if (this.props.isShowCard === false) {
      pading = 15;
    }
    return (
      <View>
        <View style={[styles.bottomBackStyle, { paddingBottom: pading, paddingTop: pading }]}>
          <View style={[styles.teamBackStyle, { marginLeft: 15, width: CommonUtils.ceilWidth(80) }]}>
            <Text style={styles.teamNameStyle} numberOfLines={10}>
              {this.props.homeName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 60,
              color: CommonUtils.themeColor,
              fontFamily: 'DIN Condensed',
              marginTop: topFont,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {this.props.matchPoint}
          </Text>

          <View style={[styles.teamBackStyle, { marginRight: 15, alignItems: 'flex-end', width: CommonUtils.ceilWidth(80) }]}>
            <Text style={[styles.teamNameStyle, { textAlign: 'right' }]}>
              {this.props.awayName}
            </Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 0 - fontMargin,
          paddingLeft: 15,
          paddingRight: 15,
        }}
        >
          {this.renderCards('flex-start', 'home')}
          {this.renderCards('flex-end', 'away')}
        </View>
      </View>

    );
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderTopView()}
        <View style={{ height: 2, flex: 1, backgroundColor: 'rgb(247,248,249)' }} />
        {this.renderBottomView()}
      </View>
    );
  }
}

ImmeMatchPointLayout.propTypes = {
  isShowCard: PropTypes.bool,
  headerText: PropTypes.string,
  homeName: PropTypes.string,
  awayName: PropTypes.string,
  matchPoint: PropTypes.string,
  homeYellowNum: PropTypes.number,
  homeRedNum: PropTypes.number,
  awayYellowNUm: PropTypes.number,
  awayRedNum: PropTypes.number,
};

ImmeMatchPointLayout.defaultProps = {
  isShowCard: true,
  headerText: '-',
  homeName: '-',
  awayName: '-',
  matchPoint: '- : -',
  homeYellowNum: 0,
  homeRedNum: 0,
  awayYellowNUm: 0,
  awayRedNum: 0,
};
