import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const accountIcon = require('../../image/mine/MineAccount.png');
const orderIcon = require('../../image/mine/MineOrder.png');
const billIcon = require('../../image/mine/MineBill.png');
const realIcon = require('../../image/mine/MineRealName.png');

const dataArr = [
  { title: '账户明细', icon: accountIcon },
  { title: '我的订单', icon: orderIcon },
  { title: '中奖纪录', icon: billIcon },
  { title: '实名认证', icon: realIcon },
];

export default class MineFuncItemLayout extends React.PureComponent {
  renderChildren = () => {
    const arr = dataArr.map((item, index) => {
      const temp = [];
      temp.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.onPress(index);
          }}
          key={item.title}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={item.icon}
            style={{
              width: 48,
              height: 48
            }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#010D2D',
              marginTop: 6
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>,
      );
      return temp;
    });
    return arr;
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: 104,
          marginLeft: 15,
          marginRight: 15,
          marginTop: 5,
          borderRadius: 2,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {this.renderChildren()}
      </View>
    );
  }
}

MineFuncItemLayout.propTypes = {
  onPress: PropTypes.func,
};

MineFuncItemLayout.defaultProps = {
  onPress: () => {
    // 点击提交
  },
};
