import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const lightBackIcon = require('../../image/homePage/Home_ic_back.png');
// const drakBackIcon = require('../image/HOME_ic_backWhite.png');

const lightTheme = {
  leftIcon: null,
  color: '#443355',
  backgroundColor: '#ffffff',
};

const drakTheme = {
  leftIcon: null,
  color: '#ffffff',
  backgroundColor: '#00000000',
};

export default class CommonToolBar extends Component {
  renderLeft = theme => {
    const { hasLeft, onLeftPress, leftTitle, leftImage } = this.props;
    if (hasLeft) {
      return (
        <TouchableOpacity onPress={() => onLeftPress()} activeOpacity={0.6}>
          <View
            style={{
              width: 56,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={leftImage} />
            {leftTitle !== '' ? <Text style={{ color: 'white', fontSize: 12 }}>{leftTitle}</Text> : null}
          </View>
        </TouchableOpacity>
      );
    }
    return <View style={{ width: 56, height: '100%' }} />;
  };

  renderRight = theme => {
    const { hasRight, onRightPress, customRight } = this.props;
    if (customRight != null) {
      return customRight();
    }
    if (hasRight) {
      return (
        <TouchableOpacity onPress={() => onRightPress()} activeOpacity={0.6}>
          <View
            style={{
              width: 56,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'blue'
            }}
          >
            {this.renderRightContent(theme)}
          </View>
        </TouchableOpacity>
      );
    }
    return <View style={{ width: 56, height: '100%' }} />;
  };

  renderRightContent = theme => {
    const { rightTitle, rightImage, rightTitleColor } = this.props;
    if (rightTitle === '') {
      return <Image source={rightImage} />;
    }
    let color = theme.color;
    if (rightTitleColor != null) {
      color = rightTitleColor;
    }
    return (
      <Text
        style={{
          fontSize: 12,
          color,
          fontWeight: 'bold',
        }}
      >
        {rightTitle}
      </Text>
    );
  };

  renderContent = () => {
    const { renderContentFunc, title, theme } = this.props;
    const themeNor = theme === 'light' ? lightTheme : drakTheme;
    if (renderContentFunc != null) {
      return renderContentFunc;
    }
    return (
      <Text
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: 'bold',
          color: themeNor.color,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    );
  };

  render() {
    const { theme, backColor } = this.props;
    const themeNor = theme === 'light' ? lightTheme : drakTheme;
     

    let statusBarHeight = 0;
    if (CommonUtils.ios) {
      statusBarHeight = CommonUtils.getStatusBarHeight();
    } else {
      statusBarHeight = CommonUtils.getStatusBarHeight();
    }

    let statusHeight = CommonUtils.getToolBarHeight() + statusBarHeight;
    let topPadding = statusBarHeight;
    if (theme === 'light') {
      topPadding = (CommonUtils.Platform === 'IOS' ? statusBarHeight : 0);
      statusHeight = (CommonUtils.Platform === 'IOS' ? CommonUtils.getToolBarHeight() + statusBarHeight : CommonUtils.getToolBarHeight());
    }

    return (
      <View
        style={[{
          height: statusHeight,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: backColor,
          paddingTop: topPadding,
          zIndex: 999
        }]}
      >
        {this.renderLeft(themeNor)}
        {this.renderContent()}
        {this.renderRight(themeNor)}
      </View>
    );
  }
}

CommonToolBar.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string,
  rightTitle: PropTypes.string,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
  hasLeft: PropTypes.bool,
  hasRight: PropTypes.bool,
  renderContentFunc: PropTypes.object,
  rightImage: PropTypes.string,
  leftTitle: PropTypes.string,
  backColor: PropTypes.string,
  customRight: PropTypes.func,
  leftImage: PropTypes.string,
  rightTitleColor: PropTypes.string,
};

CommonToolBar.defaultProps = {
  theme: 'dark',
  title: '',
  rightTitle: '',
  onLeftPress: () => {
    // 左按钮点击
  },
  onRightPress: () => {
    // 右按钮点击
  },
  hasLeft: true,
  hasRight: false,
  renderContentFunc: null,
  rightImage: '',
  leftTitle: '',
  backColor: CommonUtils.navigationColor,
  customRight: null,
  leftImage: lightBackIcon,
  rightTitleColor: null,
};
