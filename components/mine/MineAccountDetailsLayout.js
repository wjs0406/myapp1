import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';
import CommonButtonLayout from '../base/CommonButtonLayout';


const styles = StyleSheet.create({
  moneyStyle: {
    fontSize: 18,
    color: CommonUtils.themeColor,
    fontFamily: 'DIN Condensed',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsStyle: {
    fontSize: 12,
    color: 'rgba(1,13,45,0.6)'
  },
});

export default class MineAccountDetailsLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={[{
          backgroundColor: 'white',
          height: 148,
          marginLeft: 15,
          marginRight: 15,
          zIndex: 999,
          borderRadius: 2,
        },
        this.props.style
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15
          }}
        >
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => {
              this.props.depositOnPress();
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: '#010D2D',
                fontSize: 15,
                marginRight: 20,
                fontWeight: 'bold'
              }}
            >
              提现申请
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 1,
            marginTop: 12,
          }}
        >
          <View style={styles.viewStyle}>
            <Text style={styles.moneyStyle}>
              {this.props.balanceMoney.toFixed(2)}
            </Text>
            <Text
              style={styles.detailsStyle}
            >
              可用余额
            </Text>
          </View>
          <View style={styles.viewStyle}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(1,13,45,0.6)',
              }}
            >
             |
            </Text>
            <Text
              style={[styles.detailsStyle, { marginTop: CommonUtils.ios ? 12 : 4,
                fontFamily: 'DIN Condensed',
              }]}
            >
              CNY
            </Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.moneyStyle}>
              {this.props.freezeMoney.toFixed(2)}
            </Text>
            <Text
              style={styles.detailsStyle}
            >
              冻结资金
            </Text>
          </View>
        </View>
        <CommonButtonLayout
          style={{ marginTop: 13 }}
          contextString={'充值'}
          onPress={() => {
            this.props.onPress();
          }}
        />
      </View>
    );
  }
}

MineAccountDetailsLayout.propTypes = {
  onPress: PropTypes.func,
  depositOnPress: PropTypes.func,
  balanceMoney: PropTypes.number,
  freezeMoney: PropTypes.number,
  style: PropTypes.object,
};

MineAccountDetailsLayout.defaultProps = {
  onPress: () => {
    // 点击提交
  },
  depositOnPress: () => {
    // 申请提现
  },
  balanceMoney: 0.00,
  freezeMoney: 0.00,
  style: {},
};
