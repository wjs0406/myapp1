import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';

const styles = StyleSheet.create({
  containsStyle: {
    flex: 1,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    height: CommonUtils.ios ? 190 : 200,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 12,
    color: 'rgba(1, 13, 45, 0.6)',
    textAlign: 'center',
    lineHeight: 18,
  },
  viewStyle: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class MineCheckstandHead extends React.PureComponent {
  render() {
    return (
      <View style={styles.containsStyle}>
        <Text style={[styles.titleStyle, { marginTop: 15 }]}>{this.props.merchantsName}</Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: CommonUtils.themeColor,
            fontFamily: 'DIN Condensed',
            marginTop: 10,
            textAlign: 'center',
          }}
        >
          {this.props.money.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'rgba(1, 13, 45, 0.6)',
            fontFamily: 'DIN Condensed',
            textAlign: 'center',
            marginTop: CommonUtils.ios ? -5 : 0
          }}
        >
          CNY
        </Text>
        <View style={[styles.viewStyle, { marginTop: 10 }]}>
          <Text style={styles.titleStyle}>商品名称</Text>
          <Text style={{ fontSize: 12, color: '#010D2D', textAlign: 'right' }}>{this.props.goodsName}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>订单编号</Text>
          <Text style={{ fontSize: 12, color: '#010D2D', textAlign: 'right' }}>{this.props.orderName}</Text>
        </View>
        <View style={{ backgroundColor: 'rgba(1, 13, 45, 0.05)', marginTop: 10, height: 1 }} />
        <TouchableOpacity
          onPress={() => {
            this.props.onPress();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 12, color: CommonUtils.themeColor }}>
            可用银行列表与限额
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
MineCheckstandHead.propTypes = {
  onPress: PropTypes.func,
  merchantsName: PropTypes.string,
  money: PropTypes.number,
  goodsName: PropTypes.string,
  orderName: PropTypes.string,
};

MineCheckstandHead.defaultProps = {
  onPress: () => {
    // 传值
  },
  merchantsName: '',
  money: 0.00,
  goodsName: '',
  orderName: '',
};
