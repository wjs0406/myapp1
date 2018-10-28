import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BaseStatusBarLayout from './BaseStatusBarLayout';
import CommonToolBar from './CommonToolBar';
// import CommonUtils from '../utils/CommonUtils';

export default class BaseToolbarLayout extends Component {
  getStatusBarStyle = () => {
    if (this.props.theme === 'light') {
      return {
        backgroundColor: '#000000',
        translucent: false,
        barStyle: 'default'
      };
    }
    return {
      backgroundColor: '#00000000',
      translucent: true,
      barStyle: 'light-content'
    };
  };

  render() {
    return (
      <BaseStatusBarLayout
        style={this.props.style}
        navigation={this.props.navigation}
        statusBar={this.getStatusBarStyle()}
      >
        <CommonToolBar
          title={this.props.title}
          onLeftPress={() => {
            if (this.props.leftPress != null) {
              this.props.leftPress();
            } else {
              this.props.navigation.goBack();
            }
          }}
          {...this.props.toolbarConfig}
        />
        {/* <View style={{ height: 8 }} /> */}
        {this.props.children}
      </BaseStatusBarLayout>
    );
  }
}

BaseToolbarLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  style: PropTypes.object,
  title: PropTypes.string,
  toolbarConfig: PropTypes.object,
  leftPress: PropTypes.func,
};

BaseToolbarLayout.defaultProps = {
  theme: 'dark',
  style: {},
  title: '',
  toolbarConfig: {},
  leftPress: null,
};
