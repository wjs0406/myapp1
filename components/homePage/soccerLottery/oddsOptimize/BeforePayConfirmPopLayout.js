import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonUtils from '../../../../utils/CommonUtils';
import SoccerLotteryListHeaderLayout from '../SoccerLotteryListHeaderLayout';
import MineBottomButtonLayout from '../../../mine/MineBottomButtonLayout';
import OddOtmizeStepperLayout from './OddOtmizeStepperLayout';

const fontMargin = CommonUtils.Platform === 'IOS' ? -5 : 0;
const fontTop = CommonUtils.Platform === 'IOS' ? 8 : 0;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  // 全部按钮背景
  totalButtonsBackStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: 'white',
  },
  // 按钮背景
  buttonBackStyle: {
    height: 40,
    marginBottom: 5,
    width: (CommonUtils.width - 30 - 16) / 3,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 按钮文字
  buttonTextStyle: {
    fontSize: 15,
    color: 'rgb(105,114,137)',
  },
  upTwoBlockBackStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    flex: 1,
  },
  bottomTwoBlockBackStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  redTextStyle: {
    color: CommonUtils.themeColor,
    fontSize: 18,
    fontFamily: 'DIN Condensed',
  },
  grayTextStyle: {
    fontSize: 12,
    color: 'rgba(1,13,45,0.6)'
  },
  X20Style: {
    borderWidth: 1,
    borderColor: 'rgba(1,13,45,0.2)',
    height: 44,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  X20TextStyle: {
    color: CommonUtils.themeColor,
    fontSize: 18,
    fontFamily: 'DIN Condensed',
    marginTop: fontTop,
  },
});

export default class BeforePayConfirmPopLayout extends Component {
  constructor(props) {
    super(props);
    this.muti = 1;
    this.state = {
      bottomHeight: 0,
      chooseMuti: 1,
      payMoney: props.needPayMoney,
    };
  }

  renderMiddleUpContent() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.upTwoBlockBackStyle}>
          <Text style={styles.redTextStyle}>
            {this.props.balanceMoney}
          </Text>
          <Text style={[styles.grayTextStyle, { marginTop: fontMargin }]}>
            账户余额
          </Text>
        </View>
        <View style={{ width: 2, height: 18, backgroundColor: 'rgba(1,13,45,0.6)' }} />
        <View style={styles.upTwoBlockBackStyle}>
          <Text style={styles.redTextStyle}>
            {`${this.state.payMoney}`}
          </Text>
          <Text style={[styles.grayTextStyle, { marginTop: fontMargin }]}>
            需要支付
          </Text>
        </View>
      </View>
    );
  }

  renderMiddleBottomContent() {
    let backColor20 = 'white';
    let textColor20 = CommonUtils.themeColor;
    let borderColor20 = 'rgba(1,13,45,0.2)';

    let backColor50 = 'white';
    let textColor50 = CommonUtils.themeColor;
    let borderColor50 = 'rgba(1,13,45,0.2)';

    const { chooseMuti } = this.state;
    if (chooseMuti === 20) {
      backColor20 = CommonUtils.themeColor;
      textColor20 = 'white';
      borderColor20 = 'rgba(1,13,45,0.2)';
      backColor50 = 'white';
      textColor50 = CommonUtils.themeColor;
      borderColor50 = 'rgba(1,13,45,0.2)';
    } else if (chooseMuti === 50) {
      backColor50 = CommonUtils.themeColor;
      textColor50 = 'white';
      borderColor50 = 'rgba(1,13,45,0.2)';
      backColor20 = 'white';
      textColor20 = CommonUtils.themeColor;
      borderColor20 = 'rgba(1,13,45,0.2)';
    }

    const { needPayMoney } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            styles.upTwoBlockBackStyle,
            styles.bottomTwoBlockBackStyle
          ]}
        >
          <Text style={[styles.grayTextStyle, { marginRight: 10 }]}>
            买
          </Text>
          <OddOtmizeStepperLayout
            ref={(ref) => {
              this.stepper = ref;
            }}
            passValueFunc={(muti) => {
              this.muti = muti;
              this.setState({
                chooseMuti: 1,
                payMoney: (needPayMoney * muti).toFixed(2),
              });
            }}
          />
          <Text style={[styles.grayTextStyle, { marginLeft: 10 }]}>
            倍
          </Text>
        </View>
        <View
          style={[
            styles.upTwoBlockBackStyle,
            styles.bottomTwoBlockBackStyle,
            {
              paddingLeft: 15,
              paddingRight: 15,
            }
          ]}
        >
          <TouchableOpacity
            style={[styles.X20Style, { backgroundColor: backColor20, borderColor: borderColor20 }]}
            onPress={() => {
              this.stepper.setState({
                textValue: '1',
              });
              if (this.state.chooseMuti === 20) {
                this.muti = 1;
                this.setState({
                  chooseMuti: 1,
                  payMoney: (needPayMoney * 1).toFixed(2),
                });
              } else {
                this.muti = 20;
                this.setState({
                  chooseMuti: 20,
                  payMoney: (needPayMoney * 20).toFixed(2),
                });
              }
            }}
          >
            <Text style={[styles.X20TextStyle, { color: textColor20 }]}>
              20
              <Text style={{ fontSize: 15, color: textColor20 }}>
                x
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.X20Style, { marginLeft: 4, backgroundColor: backColor50, borderColor: borderColor50 }]}
            onPress={() => {
              this.stepper.setState({
                textValue: '1',
              });
              if (this.state.chooseMuti === 50) {
                this.muti = 1;
                this.setState({
                  chooseMuti: 1,
                  payMoney: (needPayMoney * 1).toFixed(2),
                });
              } else {
                this.muti = 50;
                this.setState({
                  chooseMuti: 50,
                  payMoney: (needPayMoney * 50).toFixed(2),
                });
              }
            }}
          >
            <Text style={[styles.X20TextStyle, { color: textColor50 }]}>
              50
              <Text style={{ fontSize: 15, color: textColor50 }}>
                x
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderMiddieContent() {
    return (
      <KeyboardAwareScrollView
        enableAutomaticScroll={false}
        onKeyboardWillShow={frames => {
          this.setState({
            bottomHeight: frames.endCoordinates.height,
          });
        }}
        onKeyboardWillHide={() => {
          this.setState({
            bottomHeight: 0,
          });
        }}
      >
        {this.renderMiddleUpContent()}
        {this.renderMiddleBottomContent()}
        <View style={{ height: 5, backgroundColor: 'rgb(246,247,248)' }} />
      </KeyboardAwareScrollView>
    );
  }


  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { paddingBottom: this.state.bottomHeight }]}
      >
        <SoccerLotteryListHeaderLayout
          titleStr="立即购买(CNY)"
          isShowTopMargin={false}
          isShowArrow={false}
        />
        <View style={{ height: 5, backgroundColor: 'rgb(246,247,248)' }} />
        {this.renderMiddieContent()}
        <MineBottomButtonLayout
          leftName="再看看"
          rightName="去支付"
          leftOnPress={() => {
            this.props.clickCancleFunc();
          }}
          rightOnPress={() => {
            this.props.clickConfimFunc(this.muti);
          }}
        />
      </TouchableOpacity>
    );
  }
}

BeforePayConfirmPopLayout.propTypes = {
  clickCancleFunc: PropTypes.func,
  clickConfimFunc: PropTypes.func,
  balanceMoney: PropTypes.string,
  needPayMoney: PropTypes.number,
};

BeforePayConfirmPopLayout.defaultProps = {
  clickCancleFunc: () => {},
  clickConfimFunc: () => {},
  balanceMoney: '0.00',
  needPayMoney: 0.00,
};
