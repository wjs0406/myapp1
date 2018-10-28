import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';

const backPadding = CommonUtils.width >= 375 ? 15 : 0;
const textPadding = CommonUtils.width >= 375 ? 20 : 13;

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: CommonUtils.themeColor,
    justifyContent: 'center',
  },
  contentBackStyle: {
    paddingLeft: CommonUtils.ceilWidth(backPadding),
    paddingRight: CommonUtils.ceilWidth(backPadding),
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  leftButtonBackStyle: {
   // width: CommonUtils.ceilWidth(72),
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: CommonUtils.ceilWidth(textPadding),
    paddingRight: CommonUtils.ceilWidth(textPadding),
  }
});

export default class SoccerLotteryBottomLayout extends Component {
  renderLeftButton() {
    const { isShowLeft } = this.props;
    if (!isShowLeft) {
      return (
        <View style={{ width: CommonUtils.ceilWidth(72), height: 30 }} />
      );
    }
    return (
      <TouchableOpacity
        style={[styles.leftButtonBackStyle, { marginLeft: CommonUtils.ceilWidth(5) }]}
        onPress={() => {
          this.props.clearAllFunc();
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>
          清空
        </Text>
      </TouchableOpacity>
    );
  }

  renderTipText() {
    if (this.props.isShowTip === false) {
      return null;
    }
    return (
      <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 5 }}>
        {this.props.tipText}
      </Text>
    );
  }

  renderMiddleContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, color: 'rgb(255,218,0)' }}>
            {this.props.limitText}
          </Text>
        </View>
        {this.renderTipText()}
      </View>
    );
  }

  renderRightButton() {
    const { confirmFunc, rightTitle } = this.props;
    return (
      <TouchableOpacity
        style={[styles.leftButtonBackStyle, { backgroundColor: 'white', borderWidth: 0 }]}
        onPress={() => {
          confirmFunc();
        }}
      >
        <Text style={{ color: CommonUtils.themeColor, fontSize: 12, fontWeight: 'bold' }}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentBackStyle}>
          {this.renderLeftButton()}
          {this.renderMiddleContent()}
          {this.renderRightButton()}
        </View>
      </View>
    );
  }
}

SoccerLotteryBottomLayout.propTypes = {
  confirmFunc: PropTypes.func,
  clearAllFunc: PropTypes.func,
  rightTitle: PropTypes.string,
  isShowLeft: PropTypes.bool,
  limitText: PropTypes.string,
  tipText: PropTypes.string,
  isShowTip: PropTypes.bool,
};

SoccerLotteryBottomLayout.defaultProps = {
  confirmFunc: () => {},
  clearAllFunc: () => {},
  rightTitle: '确定',
  isShowLeft: true,
  limitText: '',
  tipText: '页面赔率仅供参考，请以出票为准',
  isShowTip: true,
};
