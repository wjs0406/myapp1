import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';
import MixPassItemLayout from './mixPass/MixPassItemLayout';
import SoccerLotteryOtherInfoLayout from './SoccerLotteryOtherInfoLayout';
import WinOrLoseContentLayout from './winOrLose/WinOrLoseContentLayout';
import ConcedePointWOLLayout from './condecePointWinOrLose/ConcedePointWOLLayout';
import MixTwoChoseOneContentLayout from './mixTwoChooseOne/MixTwoChoseOneContentLayout';
import ExceptSingleContentLayout from './expectSingle/ExceptSingleContentLayout';
import ConfirmToPayCellItemLayout from './confirmToPay/ConfirmToPayCellItemLayout';
import SoccerLotteryListHeaderLayout from './SoccerLotteryListHeaderLayout';


const fontTop = (CommonUtils.Platform === 'IOS' ? 7 : 0);

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    backgroundColor: 'rgb(246,247,248)',
  },
  headerBackStyle: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white',
  },
  headerColorBlockStyle: {
    backgroundColor: CommonUtils.themeColor,
    width: 8,
    height: 4,
    marginLeft: CommonUtils.ceilWidth(15),
  },
  headerTextStyle: {
    marginLeft: CommonUtils.ceilWidth(17),
    fontSize: 14,
    color: 'rgb(105,114,137)'
  },
  teamNameBackStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  teanmNameTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(1,13,45)',
    width: CommonUtils.width / 2 - (CommonUtils.ceilWidth(50)),
  },
  vsTextStyle: {
    fontFamily: 'DIN Condensed',
    color: CommonUtils.themeColor,
    fontSize: 20,
    marginTop: fontTop,
  },
  moreOrCloseBackStyle: {
    flex: 1,
    height: 32,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  moreOrCloseTextStyle: {
    color: CommonUtils.themeColor,
    fontFamily: 'DIN Condensed',
    fontSize: 17,

  },
});


export default class SoccerLotteryCellLayout extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isRender === true) {
      return true;
    }
    return false;
  }

  // header
  renderCellHeader() {
    const { headerTitle, isShowHeader, isShowOtherHeader } = this.props;
    if (!isShowHeader) {
      return <View style={{ height: 5 }} />;
    }
    if (isShowOtherHeader) {
      return (
        <View>
          <View style={{ height: 5, backgroundColor: 'rgb(246,247,248)' }} />
          <SoccerLotteryListHeaderLayout
            isShowTopMargin={false}
            isShowArrow={false}
            titleStr={headerTitle}
            height={32}
          />
          <View style={{ height: 1, backgroundColor: 'rgb(246,247,248)' }} />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.headerBackStyle}>
          <View style={styles.headerColorBlockStyle} />
          <Text style={styles.headerTextStyle}>
            {headerTitle}
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: 'rgb(246,247,248)' }} />
      </View>

    );
  }

  // 篮球球队名上的小数字
  renderLittleNumber() {
    const { isShowLittleNumber } = this.props;
    if (!isShowLittleNumber) {
      return null;
    }
    let textColor = 'rgb(31,221,215)';
    if (parseFloat(this.props.littleNumber, 0) >= 0) {
      textColor = 'rgb(2,48,197)';
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            styles.teanmNameTextStyle,
            {
              fontSize: 10,
              marginRight: CommonUtils.ceilWidth(20),
              marginLeft: CommonUtils.ceilWidth(30),
              textAlign: 'right',
              color: textColor,
            }
          ]}
        >
          {this.props.littleNumber}
        </Text>
      </View>

    );
  }

  // 主队,客队名
  renderTeamName() {
    const { homeTeamName, customerTeamName } = this.props;
    return (
      <View style={styles.teamNameBackStyle}>
        {this.renderLittleNumber()}
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={[
              styles.teanmNameTextStyle,
              {
                marginRight: CommonUtils.ceilWidth(20),
                textAlign: 'right',
                marginLeft: CommonUtils.ceilWidth(30),
              }
            ]}
          >
            {homeTeamName}
          </Text>
          <Text style={styles.vsTextStyle}>
            VS
          </Text>
          <Text
            style={[styles.teanmNameTextStyle, { marginLeft: CommonUtils.ceilWidth(20), marginRight: CommonUtils.ceilWidth(30) }]}
          >
            {customerTeamName}
          </Text>
        </View>
      </View>
    );
  }

  // cell内容
  renderContent() {
    const { type, itemConfig } = this.props;
    switch (type) {
      case '混合过关':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );
      case '单关胜负':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );
      case '单关胜负篮球':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );

      case '确认方案单关胜负':
        return (
          <ConfirmToPayCellItemLayout
            {...itemConfig}
          />
        );
      case '确认方案单关胜负篮球':
        return (
          <ConfirmToPayCellItemLayout
            {...itemConfig}
          />
        );
      case '胜平负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '让分胜负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '胜负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案胜负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案胜负彩':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案任选9':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案让分胜负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '大小分':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案大小分':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '确认方案胜平负':
        return (
          <WinOrLoseContentLayout
            {...itemConfig}
          />
        );
      case '让球胜平负':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );
      case '确认方案让球胜平负':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );
      case '混投2选1':
        return (
          <MixTwoChoseOneContentLayout
            {...itemConfig}
          />
        );
      case '确认方案混投2选1':
        return (
          <MixTwoChoseOneContentLayout
            {...itemConfig}
          />
        );
      case '单关':
        return (
          <MixPassItemLayout
            {...itemConfig}
          />
        );
      case '确认方案混合过关':
        return (
          <ConfirmToPayCellItemLayout
            {...itemConfig}
          />
        );
      case '其他':
        return (
          <ConcedePointWOLLayout
            {...itemConfig}
          />
        );
      default:
        return (
          <ExceptSingleContentLayout
            {...itemConfig}
          />
        );
    }
  }

  // 其他信息(可收缩)
  renderOtherInfo() {
    const { isOpen } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <SoccerLotteryOtherInfoLayout />
    );
  }

  // more/close按钮
  renderOpenOrCloseButton() {
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const { isOpen, clickOpenOrCloseFunc, isShowMore } = this.props;
    if (!isShowMore) {
      return null;
    }
    let moreStr = 'more';
    let arrowStr = '↓';
    if (isOpen) {
      moreStr = 'close';
      arrowStr = '↑';
    }
    return (
      <TouchableOpacity
        style={styles.moreOrCloseBackStyle}
        onPress={() => {
          clickOpenOrCloseFunc();
        }}
      >
        <View style={{ backgroundColor: 'rgb(246,247,248)', height: 1 }} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[styles.moreOrCloseTextStyle, { fontSize: 16, marginTop: fontTopTemp }]}
          >
            {moreStr}
          </Text>
          <Text style={[styles.moreOrCloseTextStyle, { fontSize: 14 }]}>
            {arrowStr}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.ccontainer}>
        {this.renderCellHeader()}
        {this.renderTeamName()}
        {this.renderContent()}
        {this.renderOtherInfo()}
        {/* {this.renderOpenOrCloseButton()} */}
      </View>
    );
  }
}

SoccerLotteryCellLayout.propTypes = {
  headerTitle: PropTypes.string,
  type: PropTypes.string,
  itemConfig: PropTypes.object,
  homeTeamName: PropTypes.string,
  customerTeamName: PropTypes.string,
  isOpen: PropTypes.bool,
  clickOpenOrCloseFunc: PropTypes.string,
  isShowMore: PropTypes.bool,
  isShowHeader: PropTypes.bool,
  isShowOtherHeader: PropTypes.bool,
  isShowLittleNumber: PropTypes.bool,
  otherType: PropTypes.string,
  isSoccer: PropTypes.bool,
  littleNumber: PropTypes.string,
  isRender: PropTypes.bool,
};

SoccerLotteryCellLayout.defaultProps = {
  headerTitle: '',
  type: '混合过关',
  itemConfig: {},
  homeTeamName: '',
  customerTeamName: '',
  isOpen: false,
  clickOpenOrCloseFunc: () => {},
  isShowMore: true,
  isShowHeader: true,
  isShowOtherHeader: false,
  isShowLittleNumber: false,
  otherType: '比分',
  isSoccer: true,
  littleNumber: '0',
  isRender: true,
};
