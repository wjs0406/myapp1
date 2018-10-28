import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 10 : 0);

const styles = StyleSheet.create({
  container: {
    paddingLeft: CommonUtils.ceilWidth(30),
    paddingRight: CommonUtils.ceilWidth(30),
    paddingBottom: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  blockBackView: {
    borderWidth: 1,
    borderColor: 'rgba(1,13,45,0.2)',
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: CommonUtils.ceilWidth(4),
  },
  pointTextStyle: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'DIN Condensed',
    marginTop: fontTopTemp,
  }
});

export default class ConcedePointWOLLayout extends Component {
  constructor(props) {
    super(props);

    if (props.isDeepCopy === true) {
      const arr = [];
      for (let i = 0; i < props.chooseArr.length; i += 1) {
        arr.push(props.chooseArr[i]);
      }
      this.state = {
        chooseArr: arr,
      };
    } else {
      this.state = {
        chooseArr: props.chooseArr,
      };
    }
  }

  renderConcedePointContent(title) {
    if (this.props.otherType === '比分') {
      return (
        <View>
          <Text
            style={styles.pointTextStyle}
          >
            {title}
          </Text>
        </View>

      );
    }
    if (this.props.otherType === '胜分差') {
      return (
        <View>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            {title.split('')[0]}
          </Text>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            {title.split('')[1]}
          </Text>
        </View>
      );
    }
    if (this.props.otherType === '总进球') {
      return (
        <View>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            总
          </Text>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            进
          </Text>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            球
          </Text>
        </View>
      );
    }
    if (this.props.otherType === '预设总分') {
      return (
        <View>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            大
          </Text>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            小
          </Text>
          <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
            分
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
          半
        </Text>
        <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
          全
        </Text>
        <Text style={[styles.pointTextStyle, { marginTop: 0 }]}>
          场
        </Text>
      </View>
    );
  }

  // 让球
  renderConcedePoint(title, color) {
    return (
      <View
        style={{
          width: 28,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {this.renderConcedePointContent(title)}
      </View>
    );
  }

  // 三个小块
  renderThreeBlock(num) {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);
    const { isAvarge } = this.props;

    if (this.props.otherType === '预设总分' && this.props.isSingle === true) {
      if (this.props.matchData.dan_zf === 'False') {
        viewsArr.push(
          <View
            style={{
              borderWidth: 1,
              borderColor: 'rgba(1,13,45,0.2)',
              marginLeft: CommonUtils.ceilWidth(4),
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}
          >
            <Text
              style={{
                fontFamily: 'DIN Condensed',
                fontSize: 15,
                color: 'rgba(1,13,45, 0.6)',
                marginTop: fontTopTemp,
              }}
            >
              未开售
            </Text>
          </View>
        );
        return viewsArr;
      }
    }


    for (let i = 0; i < num.length; i += 1) {
      let flexNum = 1;
      if (!isAvarge) {
        if (i === num.length - 1) {
          flexNum = 5 - i;
        }
      }

      // num =  [['sw10', '8.5'], ['sw20', '10.5']]
      // 拆分比分
      const pointArr = num[i][0].split('');
      let title = '';
      if (this.props.otherType === '比分') {
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
      } else if (this.props.otherType === '胜分差') {
        if (pointArr[0] === 'w') {
          title = '主胜';
          const pointTemp = num[i][0].split('w');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '主胜(26+)';
          } else {
            title = `主胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        } else {
          title = '客胜';
          const pointTemp = num[i][0].split('L');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '客胜(26+)';
          } else {
            title = `客胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        }
      } else if (this.props.otherType === '预设总分') {
        if (num[i][0] === 'over') {
          title = '大分';
        } else {
          title = '小分';
        }
      } else if (this.props.otherType === '总进球') {
        if (pointArr[1] === '7') {
          title = '7+球';
        } else {
          title = `${pointArr[1]}球`;
        }
      } else if (this.props.otherType === '半全场') {
        let firstStr = '';
        let secondStr = '';
        const strMap = { 3: '胜', 0: '负', 1: '平' };
        firstStr = strMap[pointArr[2]];
        secondStr = strMap[pointArr[3]];
        title = firstStr + secondStr;
      }


      // 选中更改颜色
      const { chooseArr } = this.state;
      const titleStr = num[i][0];
      let titleColor = 'rgba(1,13,45, 0.6)';
      let backColor = 'white';
      let textColor = CommonUtils.themeColor;
      let borderColor = 'rgba(1,13,45, 0.2)';
      for (let j = 0; j < chooseArr.length; j += 1) {
        if (titleStr === chooseArr[j]) {
          backColor = CommonUtils.themeColor;
          borderColor = CommonUtils.themeColor;
          titleColor = 'white';
          textColor = 'white';
          break;
        }
      }
      let height = 44;
      if (this.props.otherType === '预设总分') {
        height = 70;
      }
      viewsArr.push(
        <TouchableOpacity
          style={[styles.blockBackView, { flex: flexNum, backgroundColor: backColor, borderColor, height }]}
          onPress={() => {
            let ifContain = false;
            for (let k = 0; k < chooseArr.length; k += 1) {
              if (titleStr === chooseArr[k]) {
                chooseArr.splice(k, 1);
                ifContain = true;
              }
            }
            if (ifContain === false) {
              chooseArr.push(titleStr);
            }
            this.setState({
              chooseArr,
            });
            this.props.clickOddsFunc(chooseArr);
          }}
        >
          <Text
            style={{
              fontFamily: 'DIN Condensed',
              fontSize: 18,
              color: textColor,
              marginTop: fontTopTemp,
            }}
          >
            {num[i][1]}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: titleColor,
              marginTop: fontTopTemp1,
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      );
    }
    return viewsArr;
  }

  renderOddsDetail(data) {
    const viewsArr = [];
    for (let i = 0; i < data.length; i += 1) {
      let topMargin = 4;
      if (i === 0) {
        topMargin = 0;
      }

      viewsArr.push(
        <View style={{ flex: 1, marginTop: topMargin, flexDirection: 'row' }}>
          {this.renderThreeBlock(data[i])}
        </View>
      );
    }
    return viewsArr;
  }

  renderOdds() {
    const viewsArr = [];
    const { data } = this.props;
    for (let i = 0; i < data.length; i += 1) {
      let topMargin = 10;
      if (i === 0) {
        topMargin = 0;
      }

      // 让球的字和背景颜色
      let title = '';
      let color = '';
      if (this.props.otherType === '比分') {
        if (i === 0) {
          title = '胜';
          color = 'rgb(2,48,197)';
        } else if (i === 1) {
          title = '平';
          color = 'rgb(255,218,0)';
        } else {
          title = '负';
          color = 'rgb(31,221,215)';
        }
      } else if (this.props.otherType === '胜分差') {
        if (i === 0) {
          title = '主胜';
          color = 'rgb(2,48,197)';
        } else {
          title = '客胜';
          color = 'rgb(31,221,215)';
        }
      } else {
        color = 'rgb(255,218,0)';
      }
      viewsArr.push(
        <View style={{ flex: 1, flexDirection: 'row', marginTop: topMargin }}>
          {this.renderConcedePoint(title, color)}
          <View style={{ flex: 1 }}>
            {this.renderOddsDetail(data[i])}
          </View>
        </View>
      );
    }
    return viewsArr;
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderOdds()}
      </View>
    );
  }
}

ConcedePointWOLLayout.propTypes = {
  isAvarge: PropTypes.bool,
  data: PropTypes.arrayOf(Object),
  otherType: PropTypes.string,
  chooseArr: PropTypes.arrayOf(PropTypes.string),
  clickOddsFunc: PropTypes.func,
  isDeepCopy: PropTypes.bool,
  isSoccer: PropTypes.bool,
  isSingle: PropTypes.bool,
  matchData: PropTypes.object,
};

ConcedePointWOLLayout.defaultProps = {
  isAvarge: true,
  data: [],
  otherType: '比分',
  chooseArr: [],
  clickOddsFunc: () => {},
  isDeepCopy: true,
  isSoccer: false,
  isSingle: false,
  matchData: {},
};
