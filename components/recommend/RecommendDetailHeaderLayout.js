import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: 999,
    backgroundColor: 'white',
    height: 74,
    width: CommonUtils.width - 2 * CommonUtils.ceilWidth(15)
  },
  upBackStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  }
});

export default class RecommendDetailHeaderLayout extends Component {
  renderUpContent() {
    return (
      <View style={styles.upBackStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgb(1,13,45)',
              width: 4,
              height: 16,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: 'rgb(1,13,45)',
              marginLeft: 10,
            }}
          >
            {this.props.recommNameStr}
          </Text>
        </View>
        <Text
          style={{
            color: CommonUtils.themeColor,
            fontSize: 12,
            marginRight: CommonUtils.ceilWidth(15)
          }}
        >
          {this.props.lotteryTypeNameStr}
        </Text>
      </View>
    );
  }

  renderBottomText() {
    return (
      <Text
        style={{
          marginLeft: CommonUtils.ceilWidth(15),
          fontSize: 12,
          color: 'rgba(1,13,45,0.6)',
          marginTop: 5,
        }}
      >
        本单金额
        <Text style={{ color: CommonUtils.themeColor }}>
          {this.props.moneyStr}
        </Text>
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderUpContent()}
        {this.renderBottomText()}
      </View>
    );
  }
}

RecommendDetailHeaderLayout.propTypes = {
  recommNameStr: PropTypes.string,
  lotteryTypeNameStr: PropTypes.string,
  moneyStr: PropTypes.string,

};

RecommendDetailHeaderLayout.defaultProps = {
  recommNameStr: '暂无',
  lotteryTypeNameStr: '竞彩足球',
  moneyStr: '0.00元',
};
