import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import CommonUtils from '../../utils/CommonUtils';

export default class BaseStatusBarLayout extends Component {
  componentWillMount() {
    if (!CommonUtils.ios) {
      const { statusBar } = this.props;
      this._navListener = this.props.navigation.addListener('didFocus', () => {
        StatusBar.setBackgroundColor(statusBar.backgroundColor);
        StatusBar.setTranslucent(statusBar.translucent);
      });
    }
  }

  componentWillUnmount() {
    if (!CommonUtils.ios) {
      this._navListener.remove();
    }
  }

  render() {
    const { statusBar } = this.props;
    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fafafa'
          },
          this.props.style
        ]}
      >
        {CommonUtils.ios ? <StatusBar {...statusBar} /> : <StatusBar {...statusBar} />}
        {this.props.children}
      </View>
    );
  }
}

BaseStatusBarLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
  statusBar: PropTypes.object,
  style: PropTypes.object
};

BaseStatusBarLayout.defaultProps = {
  statusBar: { backgroundColor: '#000000', translucent: true, barStyle: 'light-content' },
  style: {}
};
