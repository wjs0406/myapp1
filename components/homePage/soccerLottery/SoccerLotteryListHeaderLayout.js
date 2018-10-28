import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 50,
    backgroundColor: 'rgb(246,247,248)'
  },
  contentBackStyle: {
    marginTop: 10,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colorBlockStyle: {
    marginLeft: CommonUtils.ceilWidth(15),
    width: 4,
    height: 16,
    backgroundColor: 'rgb(1,13,45)',
  },
  textStyle: {
    marginLeft: CommonUtils.ceilWidth(20),
    fontSize: 15,
    color: 'rgb(1,13,45)'
  }
});

const grayUp = require('../../../image/homePage/Home_ic_openGrayUp.png');
const grayDown = require('../../../image/homePage/Home_ic_openGrayDown.png');

export default class SoccerLotteryListHeaderLayout extends Component {
  renderText() {
    const { renderText, titleStr } = this.props;
    if (renderText != null) {
      return renderText;
    }
    return (
      <Text style={styles.textStyle} numberOfLines={1}>
        {titleStr}
      </Text>
    );
  }

  renderContent() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.colorBlockStyle} />
        {this.renderText()}
      </View>
    );
  }

  renderButtonContent() {
    const { isShowClearText, isDown } = this.props;
    if (isShowClearText) {
      return (
        <Text style={{ fontSize: 12, color: 'rgb(231,56,55)' }}>
          清空
        </Text>
      );
    }
    let iconImage = grayUp;
    if (!isDown) {
      iconImage = grayDown;
    }
    return (
      <Image source={iconImage} style={{ height: 22, width: 22 }} />
    );
  }


  renderButtonImage() {
    const { clickUpOrDownFunc, isShowArrow } = this.props;
    if (!isShowArrow) {
      return null;
    }
    return (
      <TouchableOpacity
        style={{
          paddingLeft: CommonUtils.ceilWidth(15),
          paddingRight: CommonUtils.ceilWidth(15)
        }}
        onPress={() => {
          clickUpOrDownFunc();
        }}
      >
        {this.renderButtonContent()}
      </TouchableOpacity>
    );
  }


  render() {
    const { isShowTopMargin, height } = this.props;
    let topMargin = 10;
    if (!isShowTopMargin) {
      topMargin = 0;
    }
    return (
      <View style={[styles.container, { height }]}>
        <View style={[styles.contentBackStyle, { marginTop: topMargin }]}>
          {this.renderContent()}
          {this.renderButtonImage()}
        </View>
      </View>
    );
  }
}

SoccerLotteryListHeaderLayout.propTypes = {
  titleStr: PropTypes.string,
  clickUpOrDownFunc: PropTypes.func,
  isDown: PropTypes.bool,
  isShowTopMargin: PropTypes.bool, // 是否显示上部间隔
  isShowArrow: PropTypes.bool, // 是否显示下拉箭头
  isShowClearText: PropTypes.bool, // 是否显示清空按钮
  height: PropTypes.number,
  renderText: PropTypes.object,
};

SoccerLotteryListHeaderLayout.defaultProps = {
  titleStr: '',
  clickUpOrDownFunc: () => {},
  isDown: true,
  isShowTopMargin: true,
  isShowArrow: true,
  isShowClearText: false,
  height: 50,
  renderText: null,
};
