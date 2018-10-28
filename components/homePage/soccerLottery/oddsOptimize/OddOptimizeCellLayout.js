import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import OddOtmizeStepperLayout from './OddOtmizeStepperLayout';
import CommonUtils from '../../../../utils/CommonUtils';
import OddOprimizeCellBottomLayout from './OddOprimizeCellBottomLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upBackStyle: {
    padding: 15,
    flex: 1,
  },
  upTitleTextStyle: {
    color: 'rgba(1,13,45,0.6)',
    fontSize: 12,
    width: 55,
  },
  upContentTextStyle: {
    color: 'rgb(1,13,45)',
    fontSize: 12,
  },
  moreOrCloseBackStyle: {
    flex: 1,
    height: 32,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  moreOrCloseTextStyle: {
    color: CommonUtils.themeColor,
    fontFamily: 'DIN Condensed',
    fontSize: 17,

  },
});

export default class OddOptimizeCellLayout extends Component {
  constructor(props) {
    super(props);
    this.upTitlesArr = ['投注选项', '单注奖金', '注数', '奖金'];
  }

  // 投注选项
  renderBetOption() {
    const { betOptionArr } = this.props;
    const viewsArr = [];
    for (let i = 0; i < betOptionArr.length; i += 1) {
      viewsArr.push(
        <Text style={styles.upContentTextStyle}>
          {betOptionArr[i]}
        </Text>
      );
    }
    return viewsArr;
  }

  renderUpDetailContent(index) {
    const { singleBetMoney, rewardMoney } = this.props;
    if (index === 0) {
      return (
        <View style={{ marginLeft: 10, flex: 1 }}>
          {this.renderBetOption()}
        </View>
      );
    }
    if (index === 1) {
      return (
        <Text style={[styles.upContentTextStyle, { marginLeft: 10 }]}>
          {`${singleBetMoney}CNY`}
        </Text>
      );
    }
    if (index === 2) {
      return (
        <View style={{ marginLeft: 10, flex: 1 }}>
          <OddOtmizeStepperLayout />
        </View>
      );
    }
    if (index === 3) {
      return (
        <Text style={[styles.upContentTextStyle, { marginLeft: 10 }]}>
          <Text style={[styles.upContentTextStyle, { color: CommonUtils.themeColor }]}>
            {rewardMoney}
          </Text>
          CNY
        </Text>
      );
    }
    return null;
  }

  renderUpFourContent() {
    const viewsArr = [];
    
    for (let i = 0; i < 4; i += 1) {
      let align = 'flex-start';
      let bottom = 12;
      if (i === 2) {
        align = 'center';
      }
      if (i === 3) {
        bottom = 0;
      }
      viewsArr.push(
        <View style={{ flexDirection: 'row', paddingBottom: bottom, alignItems: align }}>
          <Text style={styles.upTitleTextStyle}>
            {this.upTitlesArr[i]}
          </Text>
          {this.renderUpDetailContent(i)}
        </View>
      );
    }
    return viewsArr;
  }

  // 上部内容
  renderUpContent() {
    return (
      <View style={styles.upBackStyle}>
        {this.renderUpFourContent()}
      </View>
    );
  }

  // more/close按钮
  renderOpenOrCloseButton() {
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const { isOpen, clickOpenOrCloseFunc } = this.props;
    let moreStr = 'more';
    let arrowStr = '↓';
    if (isOpen) {
      moreStr = 'close';
      arrowStr = '↑';
    }
    return (
      <TouchableOpacity
        style={styles.moreOrCloseBackStyle}
        onPress={() => {
          clickOpenOrCloseFunc();
        }}
      >
        <View style={{ backgroundColor: 'rgb(246,247,248)', height: 1 }} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[styles.moreOrCloseTextStyle, { fontSize: 16, marginTop: fontTopTemp }]}
          >
            {moreStr}
          </Text>
          <Text style={[styles.moreOrCloseTextStyle, { fontSize: 14 }]}>
            {arrowStr}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // 其他信息
  renderOtherInfo() {
    const { isOpen } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <OddOprimizeCellBottomLayout />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 5, backgroundColor: 'rgb(246,247,248)' }} />
        {this.renderUpContent()}
        {this.renderOtherInfo()}
        {this.renderOpenOrCloseButton()}
      </View>
    );
  }
}

OddOptimizeCellLayout.propTypes = {
  betOptionArr: PropTypes.arrayOf(PropTypes.string),
  singleBetMoney: PropTypes.string,
  rewardMoney: PropTypes.string,
  isOpen: PropTypes.bool,
  clickOpenOrCloseFunc: PropTypes.string,
};

OddOptimizeCellLayout.defaultProps = {
  betOptionArr: ['AIK索尔 | 胜(-1) | 1.75', '马里乌波尔 | 胜(1) | 1.75'],
  singleBetMoney: '8.32',
  rewardMoney: '8.32',
  isOpen: false,
  clickOpenOrCloseFunc: () => {},
};
