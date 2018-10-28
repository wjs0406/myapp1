import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';
const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 10 : 0);
const styles = StyleSheet.create({
  container: {
    paddingLeft: CommonUtils.ceilWidth(15),
    paddingRight: CommonUtils.ceilWidth(15),
    paddingBottom: 15,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
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
  blockBackView: {
    borderWidth: 1,
    borderColor: 'rgba(1,13,45,0.2)',
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: CommonUtils.ceilWidth(4),
  },
  rqTitleStyle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'DIN Condensed',
    marginTop: fontTopTemp,
  }
});

export default class ConfirmToPayCellItemLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseArr: props.matchData.htChoose,
      danMatch: props.matchData,
    };
    this.sfMap = {
      rq3: '胜',
      sf3: '胜',
      rq1: '平',
      sf1: '平',
      rq0: '负',
      sf0: '负',
      win: '胜',
      lose: '负',
    };
  }

  componentWillReceiveProps(props) {
    this.state = {
      chooseArr: props.matchData.htChoose,
      danMatch: props.matchData,
    };
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

  // 让球
  renderConcedePoint(title, color) {
    if (title === '其他') {
      return (
        <View
          style={{
            width: CommonUtils.ceilWidth(28),
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[styles.rqTitleStyle, { marginTop: 0, fontSize: 15 }]}
          >
            其
          </Text>
          <Text style={[styles.rqTitleStyle, { marginTop: 0, fontSize: 15 }]}>
            他
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          width: CommonUtils.ceilWidth(28),
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={styles.rqTitleStyle}
        >
          {title}
        </Text>
      </View>
    );
  }

  // 三个小块
  renderThreeBlock(data, index) { // index用来区分篮球胜负和让分
    const viewsArr = [];
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);
    const { isAvarge, isSoccer } = this.props;

    if (this.props.singleType === '单关胜负') {
      if (
        (index === 0 && this.props.matchData.dan_sf === 'False')
        || (index === 1 && this.props.matchData.dan_rq === 'False')
        || (index === 1 && this.props.matchData.dan_rf === 'False')) {
        viewsArr.push(
          <View
            style={{
              borderWidth: 1,
              borderColor: 'rgba(1,13,45,0.2)',
              marginLeft: CommonUtils.ceilWidth(4),
              flex: 1,
              height: 44,
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


    for (let i = 0; i < data.length; i += 1) {
      let flexNum = 1;
      let flexNumMinus = 3;
      if (isSoccer === false && index !== 2) {
        flexNumMinus = 2;
      }
      if (!isAvarge) {
        if (i === data.length - 1) {
          flexNum = flexNumMinus - i;
        }
      }
      

      const arrData = data[i];
      let title = '';
      const slicTitleArr = arrData[0].split('');
      if ((slicTitleArr[0] === 'r' && slicTitleArr[1] === 'q') || (slicTitleArr[0] === 's' && slicTitleArr[1] === 'f')) {
        title = this.sfMap[arrData[0]]; // 胜负和让球
      } else if (slicTitleArr[0] === 'w' && slicTitleArr[1] === 'i' || slicTitleArr[0] === 'l' && slicTitleArr[1] === 'o') { // 篮球让分/ 胜负
        title = this.sfMap[arrData[0]];
      } else if (slicTitleArr[0] === 'w' || slicTitleArr[0] === 'L') { // 篮球分差
        if (slicTitleArr[0] === 'w') {
          title = '主胜';
          const pointTemp = arrData[0].split('w');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '主胜(26+)';
          } else {
            title = `主胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        } else {
          title = '客胜';
          const pointTemp = arrData[0].split('L');
          const nextTemp = pointTemp[1].split('_');
          if (nextTemp[0] === '26') {
            title = '客胜(26+)';
          } else {
            title = `客胜(${nextTemp[0]}-${nextTemp[1]})`;
          }
        }
      } else if (slicTitleArr[0] === 'u' || slicTitleArr[0] === 'o') { // 篮球总分
        if (slicTitleArr[0] === 'u') {
          title = '小分';
        } else {
          title = '大分';
        }
      } else if (slicTitleArr[0] === 't') { // 进球
        if (slicTitleArr[1] === '7') {
          title = '7+球';
        } else {
          title = `${slicTitleArr[1]}球`;
        }
      } else if (slicTitleArr[0] === 'h') { // 半全场
        let firstStr = '';
        let secondStr = '';
        const strMap = { 3: '胜', 0: '负', 1: '平' };
        firstStr = strMap[slicTitleArr[2]];
        secondStr = strMap[slicTitleArr[3]];
        title = firstStr + secondStr;
      } else if (slicTitleArr.length === 3) { // 比分
        switch (slicTitleArr[1]) {
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
        title = `${slicTitleArr[2]}:${slicTitleArr[3]}`;
      }


      const { chooseArr } = this.state;
      // 改变字体颜色和border
      let backColor = 'white';
      let textColor = CommonUtils.themeColor;
      let titleTextColor = 'rgba(1,13,45, 0.6)';
      let borderColor = 'rgba(1,13,45,0.2)';
      for (let j = 0; j < chooseArr.length; j += 1) {
        const containKey = chooseArr[j];
        let tempKey = arrData[0];
        if (index === 1 && isSoccer === false) {
          tempKey = `rf${arrData[0]}`;
        }
        if (tempKey === containKey) {
          backColor = CommonUtils.themeColor;
          textColor = 'white';
          titleTextColor = 'white';
          borderColor = CommonUtils.themeColor;
          break;
        }
      }


      viewsArr.push(
        <TouchableOpacity
          style={[styles.blockBackView, { flex: flexNum, backgroundColor: backColor, borderColor }]}
          onPress={() => {
            // 点击胜负/让球和点击其他的逻辑不一样
            if (index === 0 || index === 1) {
              let ifContain = false;
              let tempKey = arrData[0];
              if (isSoccer === false && index === 1) {
                tempKey = `rf${arrData[0]}`;
              }
              for (let k = 0; k < chooseArr.length; k += 1) {
                if (tempKey === chooseArr[k]) {
                  chooseArr.splice(k, 1);
                  ifContain = true;
                }
              }
              if (ifContain === false) {
                if (isSoccer === false && index === 1) { // 篮球让分
                  chooseArr.push(`rf${arrData[0]}`);
                } else {
                  chooseArr.push(arrData[0]);
                }
              }
              this.setState({
                chooseArr,
              });
              this.props.rqClickfunc();
            } else {
              this.props.clickOtherFunc();
            }

            // if (isSoccer === true) {
            //   if ((slicTitleArr[0] === 'r' && slicTitleArr[1] === 'q') || (slicTitleArr[0] === 's' && slicTitleArr[1] === 'f')) {
            //     let ifContain = false;
            //     for (let k = 0; k < chooseArr.length; k += 1) {
            //       if (arrData[0] === chooseArr[k]) {
            //         chooseArr.splice(k, 1);
            //         ifContain = true;
            //       }
            //     }
            //     if (ifContain === false) {
            //       chooseArr.push(arrData[0]);
            //     }
            //     this.setState({
            //       chooseArr,
            //     });
            //     this.props.rqClickfunc();
            //   } else {
            //     this.props.clickOtherFunc();
            //   }
            // } else {

            // }

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
            {arrData[1]}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: titleTextColor,
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

  renderOddsDetail(data, index) {
    const viewsArr = [];
    if (data.length === 0) {
      viewsArr.push(
        <TouchableOpacity
          style={[styles.blockBackView, { flex: 1 }]}
          onPress={() => {
            this.props.clickOtherFunc();
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: 'rgba(1,13,45, 0.6)',
            }}
          >
            未选择其他玩法
          </Text>
        </TouchableOpacity>
      );
      return viewsArr;
    }
    for (let i = 0; i < data.length; i += 1) {
      let topMargin = 4;
      if (i === 0) {
        topMargin = 0;
      }

      viewsArr.push(
        <View style={{ flex: 1, marginTop: topMargin, flexDirection: 'row' }}>
          {this.renderThreeBlock(data[i], index)}
        </View>
      );
    }
    return viewsArr;
  }

  /*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
  sliceArray(array, num) {
    const result = [];
    for (let x = 0; x < Math.ceil(array.length / num); x += 1) {
      const start = x * num;
      const end = start + num;
      result.push(array.slice(start, end));
    }
    return result;
  }

  renderOdds() {
    const viewsArr = [];
    const { matchData, isSoccer } = this.props;

    // 赔率文字和颜色
    let rqOdd = matchData.rq == null ? '-1' : matchData.rq.goal;
    let rqOddColor = 'rgb(31,221,215)';
    if (parseInt(rqOdd, 0) > 0) {
      rqOddColor = 'rgb(2,48,197)';
    }
    if (isSoccer === false) {
      rqOdd = '让';
      if (parseInt(matchData.rf.goal, 0) > 0) {
        rqOddColor = 'rgb(2,48,197)';
      }
    }
    const oddTitle = ['0', rqOdd, '其他'];
    const oddCcolor = ['rgb(255,218,0)', rqOddColor, 'rgb(192,211,111)'];

    for (let i = 0; i < 3; i += 1) {
      // 胜负
      let data = [];
      if (i === 0) {
        if (matchData.sf != null) {
          const detailData = Object.entries(matchData.sf);
          data = [detailData];
        }
      } else if (i === 1) { // 让球/让分
        let detailData = [];
        if (isSoccer === true && matchData.rq != null) {
          detailData = Object.entries(matchData.rq);
        } else if (matchData.rf != null) {
          detailData = Object.entries(matchData.rf);
        }
        for (let j = 0; j < detailData.length; j += 1) {
          const arr = detailData[j];
          if (arr[0] === 'goal') {
            detailData.splice(j, 1);
          }
        }
        data = [detailData];
      } else { // 其他
        const bfArr = Object.entries(matchData.bf == null ? {} : matchData.bf);
        const bqcArr = Object.entries(matchData.bqc == null ? {} : matchData.bqc);
        const jqArr = Object.entries(matchData.jq == null ? {} : matchData.jq);
        const fcArr = Object.entries(matchData.fc == null ? {} : matchData.fc);
        let zfArr = [];
        if (matchData.zf != null) {
          zfArr = [['over', matchData.zf.over], ['under', matchData.zf.under]];
        }
        const tempArr = bfArr.concat(bqcArr);
        const temp1Arr = tempArr.concat(jqArr);
        const temp2Arr = temp1Arr.concat(fcArr);
        const totalArr = temp2Arr.concat(zfArr);
        const finalArr = [];
        for (let k = 0; k < matchData.htChoose.length; k += 1) {
          const chooseKey = matchData.htChoose[k];
          for (let p = 0; p < totalArr.length; p += 1) {
            const totalData = totalArr[p];
            if (totalData[0] === chooseKey) {
              finalArr.push(totalData);
            }
          }
        }
        data = this.sliceArray(finalArr, 3);
      }

      let topMargin = 4;
      if (i === 0) {
        topMargin = 0;
      }
      viewsArr.push(
        <View style={{ flex: 1, flexDirection: 'row', marginTop: topMargin }}>
          {this.renderConcedePoint(oddTitle[i], oddCcolor[i])}
          <View style={{ flex: 1 }}>
            {this.renderOddsDetail(data, i)}
          </View>
        </View>
      );
    }
    return viewsArr;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderOdds()}
        </View>
        
        {this.renderBlader()}
      </View>
    );
  }
}

ConfirmToPayCellItemLayout.propTypes = {
  isAvarge: PropTypes.bool,
  matchData: PropTypes.object,
  clickOtherFunc: PropTypes.func,
  isShowDan: PropTypes.bool,
  rqClickfunc: PropTypes.func,
  isSoccer: PropTypes.bool,
  singleType: PropTypes.string,
  clickDanFunc: PropTypes.func,
};

ConfirmToPayCellItemLayout.defaultProps = {
  isAvarge: false,
  matchData: null,
  clickOtherFunc: () => {},
  rqClickfunc: () => {},
  isShowDan: true,
  isSoccer: false,
  singleType: '',
  clickDanFunc: () => {},
};
