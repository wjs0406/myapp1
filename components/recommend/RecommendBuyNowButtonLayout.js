import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';


export default class RecommendBuyNowButtonLayout extends Component {
  render() {
    const { upText, bottomText, style, clickBuyNowFunc } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            height: 44,
            width: CommonUtils.ceilWidth(200),
            backgroundColor: CommonUtils.themeColor,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center'
          },
          { ...style }
        ]}
        onPress={() => {
          clickBuyNowFunc();
        }}
      >
        <Text style={{ color: 'white', fontSize: 15 }}>
          {upText}
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 5 }}>
          {bottomText}
        </Text>
      </TouchableOpacity>
    );
  }
}

RecommendBuyNowButtonLayout.propTypes = {
  upText: PropTypes.string,
  bottomText: PropTypes.string,
  style: PropTypes.object,
  clickBuyNowFunc: PropTypes.func,
};

RecommendBuyNowButtonLayout.defaultProps = {
  upText: '',
  bottomText: '',
  style: {},
  clickBuyNowFunc: () => {},
};
