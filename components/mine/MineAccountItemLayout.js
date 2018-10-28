import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';
import MineItemHeadLayout from './MineItemHeadLayout';

const styles = StyleSheet.create({
  detailsStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 40,
    paddingRight: 30,
    marginTop: 4,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#010D2D'
  },
  detailsTextStyle: {
    fontSize: 15,
    color: '#010D2D'
  }
});

export default class MineAccountItemLayout extends React.PureComponent {
  getColorForText = (value) => (
    value >= 0 ? CommonUtils.themeColor : '#1FDDD7'
  )

  getTextForValue = (value) => (
    value >= 0 && !this.props.singleShow ? `+${this.props.money.toFixed(2)}` : this.props.money.toFixed(2)
  )

  renderSingleView = () => (
    <View style={styles.detailsStyle}>
      <Text style={styles.detailsTextStyle}>账户余额</Text>
      <Text style={[styles.detailsTextStyle, { color: CommonUtils.themeColor }]}>
        {this.props.balanceMoney.toFixed(2)}
      </Text>
    </View>
  )

  getSingleCommponent = () => (
    this.props.singleShow ? null : this.renderSingleView()
  )

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <MineItemHeadLayout
          time={this.props.time}
        />
        <View style={{ flex: 1, height: 1, backgroundColor: '#fafafb' }} />
        <View style={{ marginBottom: 10, flex: 1, marginTop: 7 }}>
          <View style={styles.detailsStyle}>
            <View style={{ width: CommonUtils.width - 40 - 30 - 10 - 80 }}>
              <Text style={[styles.textStyle, { fontSize: 16 }]}>
                {this.props.detailsStirng}
                {/* 订单号123213213213213123213123213 */}
              </Text>
            </View>

            <Text style={[styles.textStyle, { color: this.getColorForText(this.props.money) }]}>
              {`${this.getTextForValue(this.props.money.toFixed(2))}元`}
            </Text>
          </View>
          {this.getSingleCommponent()}
        </View>
      </View>
    );
  }
}

MineAccountItemLayout.propTypes = {
  time: PropTypes.string,
  detailsStirng: PropTypes.string,
  money: PropTypes.number,
  balanceMoney: PropTypes.number,
  singleShow: PropTypes.bool,
};

MineAccountItemLayout.defaultProps = {
  time: '',
  detailsStirng: '',
  money: 0.00,
  balanceMoney: 0.00,
  singleShow: false, // 显示单行数据, false: 显示多行
};
