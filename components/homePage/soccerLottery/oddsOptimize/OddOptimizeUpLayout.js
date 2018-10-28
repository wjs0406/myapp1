import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import OddOtmizeStepperLayout from './OddOtmizeStepperLayout';
import CommonUtils from '../../../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  stepperBackStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 12,
    color: 'rgb(105,114,137)',
  },

});

export default class OddOptimizeUpLayout extends Component {
  renderStepperView() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.textStyle, { marginRight: 10 }]}>
          计划购买
        </Text>
        <OddOtmizeStepperLayout />
        <Text style={[styles.textStyle, { marginLeft: 10 }]}>
          元
        </Text>
      </View>
    );
  }

  renderInfoText() {
    return (
      <Text style={[styles.textStyle, { marginTop: 10 }]}>
        此处最小优化金额需≥
        <Text style={[styles.textStyle, { color: CommonUtils.themeColor }]}>
          2
        </Text>
        元
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderStepperView()}
        {this.renderInfoText()}
        <View style={{ height: 1, color: 'rgb(246,247,248)' }} />
      </View>
    );
  }
}
