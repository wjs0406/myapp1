import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CommonUtils from '../../utils/CommonUtils';

const styles = StyleSheet.create({
  // 联系客服背景
  contactServerBackStyle: {
    marginTop: 30,
    flex: 1,
    height: 36,
    alignItems: 'center',
  },
  // 联系客服按钮
  contactServerButtonStyle: {
    width: CommonUtils.ceilWidth(200),
    height: 36,
    borderRadius: 18,
    backgroundColor: CommonUtils.themeColor,
    shadowColor: 'rgba(231, 56, 55, 0.4)',
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  // 联系客服文字
  contactServerTextStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default class CommonButtonLayout extends Component {
  render() {
    return (
      <View style={[styles.contactServerBackStyle, this.props.style]}>
        <TouchableOpacity
          onPress={() => {
            this.props.onPress();
          }}
          activeOpacity={0.8}
        >
          <View style={[styles.contactServerButtonStyle, this.props.buttonStyle]}>
            <Text style={styles.contactServerTextStyle}>
              {this.props.contextString}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CommonButtonLayout.propTypes = {
  contextString: PropTypes.string,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

CommonButtonLayout.defaultProps = {
  contextString: '',
  style: {},
  buttonStyle: {},
};
