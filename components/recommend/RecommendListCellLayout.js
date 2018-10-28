import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';
import RecommendBuyNowButtonLayout from './RecommendBuyNowButtonLayout';

const icNext = require('../../image/matchPoint/Home_ic_next.png');

const fontMargin = CommonUtils.Platform === 'IOS' ? -5 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: CommonUtils.ceilWidth(15),
    paddingRight: CommonUtils.ceilWidth(15),
    backgroundColor: 'white',
  },
  headerBackStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContentBackStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  redTextStyle: {
    color: CommonUtils.themeColor,
    fontSize: 18,
    fontFamily: 'DIN Condensed'
  },
  grayTextStyle: {
    fontSize: 12,
    color: 'rgba(1,13,45,0.6)',
    marginTop: fontMargin,
  }

});

export default class RecommendListCellLayout extends Component {
  renderHeader() {
    return (
      <View style={styles.headerBackStyle}>
        <Text
          style={{
            fontSize: 15,
            color: 'rgb(1,13,45)',
            flex: 1
          }}
          numberOfLines={1}
        >
          {this.props.nameText}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'rgba(231,56,55,0.6)', fontSize: 12 }}>
            {this.props.lotteryTypeName}
          </Text>
          <Image style={{ width: 22, height: 22 }} source={icNext} />
        </View>
      </View>
    );
  }

  renderTextContent() {
    return (
      <Text
        style={{
          marginTop: 10,
          fontSize: 12,
          color: 'rgb(1,13,45)',
          flex: 1,
          fontWeight: 'bold'
        }}
        numberOfLines={2}
      >
        {this.props.detailText}
      </Text>
    );
  }

  // 底部左侧两个小块
  renderBottomLeftTwoBlock() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Text style={styles.redTextStyle}>
            {this.props.price}
          </Text>
          <Text style={styles.grayTextStyle}>
            单倍金额
          </Text>
        </View>
        {/* 小分割线 */}
        <View
          style={{
            width: 2,
            height: 18,
            backgroundColor: 'rgba(1,13,45,0.6)',
            alignSelf: 'flex-start',
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Text style={styles.redTextStyle}>
            {this.props.hotLeval}
          </Text>
          <Text style={styles.grayTextStyle}>
            下单人气
          </Text>
        </View>
      </View>
    );
  }

  renderBottonContent() {
    return (
      <View style={styles.bottomContentBackStyle}>
        {this.renderBottomLeftTwoBlock()}
        <RecommendBuyNowButtonLayout
          upText="一键下单"
          bottomText={this.props.endTime}
          clickBuyNowFunc={() => {
            this.props.buyOneClickFunc();
          }}
        />
      </View>

    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderTextContent()}
        {this.renderBottonContent()}
      </View>
    );
  }
}

RecommendListCellLayout.propTypes = {
  nameText: PropTypes.string,
  price: PropTypes.string,
  hotLeval: PropTypes.string,
  endTime: PropTypes.string,
  lotteryTypeName: PropTypes.string,
  detailText: PropTypes.string,
  buyOneClickFunc: PropTypes.func,
};

RecommendListCellLayout.defaultProps = {
  nameText: '-',
  price: '0.00',
  hotLeval: '0',
  endTime: '-',
  lotteryTypeName: '竞彩足球',
  detailText: '暂无',
  buyOneClickFunc: () => {},
};
