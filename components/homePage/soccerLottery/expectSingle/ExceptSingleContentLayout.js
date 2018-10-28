import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    paddingLeft: CommonUtils.ceilWidth(30),
    paddingRight: CommonUtils.ceilWidth(30),
    paddingBottom: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  blockBackView: {
    borderWidth: 1,
    borderColor: 'rgba(1,13,45,0.2)',
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bladderBackStyle: {
    marginLeft: 4,
    width: CommonUtils.ceilWidth(28),
    borderColor: 'rgba(1,13,45,0.2)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bladderTextStyle: {
    color: 'rgb(1,13,45)',
    fontSize: 12,
  },
});

export default class ExceptSingleContentLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danMatch: props.matchData,
    };
  }

  renderBetButton() {
    const { clickBetFunc, matchData } = this.props;

    let buttonTitle = '';
    const { chooseArr } = this.props;
    let backColor = 'white';
    let textColor = 'rgba(1,13,45, 0.6)';
    let borderColor = 'rgba(1,13,45, 0.2)';
    for (let i = 0; i < chooseArr.length; i += 1) {
      // 拆分比分
      const pointArr = chooseArr[i].split('');
      let title = '';
      let dic = {};
      if (pointArr[0] === 's' && pointArr[1] !== 'f') { // 比分
        dic = matchData.bf;
        if (pointArr.length === 3) {
          switch (pointArr[1]) {
            case 'w':
              title = '胜其他';
              break;
            case 'd':
              title = '平其他';
              break;
            default:
              title = '负其他';
              break;
          }
        } else {
          title = `${pointArr[2]}:${pointArr[3]}`;
        }
      } else if (pointArr[0] === 't') { // 进球
        dic = matchData.jq;
        if (pointArr[1] === '7') {
          title = '7+球';
        } else {
          title = `${pointArr[1]}球`;
        }
      } else if (pointArr[0] === 'h') { // 半全场
        dic = matchData.bqc;
        let firstStr = '';
        let secondStr = '';
        const strMap = { 3: '胜', 0: '负', 1: '平' };
        firstStr = strMap[pointArr[2]];
        secondStr = strMap[pointArr[3]];
        title = firstStr + secondStr;
      } else if (pointArr[0] === 'w' || pointArr[0] === 'L') { // 篮球分差
        dic = matchData.fc;
        if (pointArr[0] === 'w') {
          title = '主胜';
          const pointTemp = chooseArr[i].split('w');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '主胜(26+)';
          } else {
            title = `主胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        } else {
          title = '客胜';
          const pointTemp = chooseArr[i].split('L');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '客胜(26+)';
          } else {
            title = `客胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        }
      } else { // 篮球大小分
        dic = matchData.zf;
        if (pointArr[0] === 'o') {
          title = '大分';
        } else {
          title = '小分';
        }
      }
      buttonTitle = `${buttonTitle} ${title} [${dic[chooseArr[i]]}]`;
    }

    if (buttonTitle === '') {
      buttonTitle = '点击投注';
    } else {
      backColor = CommonUtils.themeColor;
      borderColor = CommonUtils.themeColor;
      textColor = 'white';
    }
    return (
      <TouchableOpacity
        style={[styles.blockBackView, { backgroundColor: backColor, borderColor }]}
        onPress={() => {
          clickBetFunc();
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: textColor,
          }}
          numberOfLines={2}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  }

  renderBlader() {
    if (this.props.isShowDan === false) {
      return null;
    }
    const { danMatch } = this.state;
    let backColor = 'white';
    let borderColor = 'rgba(1,13,45,0.2)';
    let textColor = 'rgb(1,13,45)';
    if (danMatch.isDan === true) {
      backColor = CommonUtils.themeColor;
      borderColor = CommonUtils.themeColor;
      textColor = 'white';
    }
    return (
      <TouchableOpacity
        style={[styles.bladderBackStyle, { backgroundColor: backColor, borderColor }]}
        onPress={() => {
          if (danMatch.isDan == null) {
            danMatch.isDan = true;
          } else {
            danMatch.isDan = !danMatch.isDan;
          }
          this.props.clickDanFunc();
          this.setState({
            danMatch,
          });
        }}
      >
        <Text style={[styles.bladderTextStyle, { color: textColor }]}>
          胆
        </Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderBetButton()}
        {this.renderBlader()}
      </View>
    );
  }
}

ExceptSingleContentLayout.propTypes = {
  clickBetFunc: PropTypes.func,
  chooseArr: PropTypes.arrayOf(PropTypes.string),
  totalData: PropTypes.object,
  otherType: PropTypes.string,
  isShowDan: PropTypes.bool,
  matchData: PropTypes.object,
  clickDanFunc: PropTypes.func,
};
ExceptSingleContentLayout.defaultProps = {
  clickBetFunc: () => {},
  chooseArr: [],
  totalData: {},
  otherType: '比分',
  isShowDan: false,
  matchData: {},
  clickDanFunc: () => {},
};
