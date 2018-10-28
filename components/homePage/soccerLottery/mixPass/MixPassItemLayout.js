import React, { Component } from 'react';
import{
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const fingerImage = require('../../../../image/homePage/finger.png');

const styles = StyleSheet.create({
  oddsBackStyle: {
    paddingBottom: 13,
    paddingLeft: CommonUtils.ceilWidth(15),
    paddingRight: CommonUtils.ceilWidth(15),
    flexDirection: 'row',
  },
  oddsSingleBackStyle: {
    height: 44,
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  playAllBaskStyle: {
    backgroundColor: CommonUtils.themeColor,
    width: CommonUtils.ceilWidth(67),
    marginLeft: CommonUtils.ceilWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playAllTextStyle: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
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

export default class MixPassItemLayout extends Component {
  constructor(props) {
    super(props);
    if (props.sfData != null) {
      this.state = {
        chooseArr: props.htChoose,
        danMatch: props.matchData,
      };
    } else {
      this.state = {
        chooseArr: props.chooseRqArr,
        danMatch: props.matchData,
      };
    }
  }

  componentWillReceiveProps(props) {
    if (props.sfData != null) {
      this.state = {
        chooseArr: props.htChoose,
        danMatch: props.matchData,
      };
    } else {
      this.state = {
        chooseArr: props.chooseRqArr,
        danMatch: props.matchData,
      };
    }
  }

  // 篮球小方块
  renderTwoOddBlock(type) {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);

    if (this.props.singleType === '单关胜负篮球') {
      if ((type === '0' && this.props.matchData.dan_sf === 'False') || (type === '让' && this.props.matchData.dan_rf === 'False')) {
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
    for (let i = 0; i < 2; i += 1) {
      let odds = '0';
      let title = '胜';
      let rqKey = 'win';
      // 胜负(不让球)
      if (type === '0') {
        if (i === 0) {
          odds = this.props.sfData.win;
          title = '胜';
          rqKey = 'win';
        } else if (i === 1) {
          odds = this.props.sfData.lose;
          title = '负';
          rqKey = 'lose';
        }
      } else if (i === 0) {
        odds = this.props.rqData.win;
        title = '胜';
        rqKey = 'rfwin';
      } else {
        odds = this.props.rqData.lose;
        title = '负';
        rqKey = 'rflose';
      }
      const { chooseArr } = this.state;
      // 改变字体颜色和border
      let backColor = 'white';
      let textColor = CommonUtils.themeColor;
      let titleTextColor = 'rgba(1,13,45, 0.6)';
      let borderColor = 'rgba(1,13,45,0.2)';
      for (let j = 0; j < chooseArr.length; j += 1) {
        const containKey = chooseArr[j];
        if (rqKey === containKey) {
          backColor = CommonUtils.themeColor;
          textColor = 'white';
          titleTextColor = 'white';
          borderColor = CommonUtils.themeColor;
          break;
        }
      }
      viewsArr.push(
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor,
            marginLeft: CommonUtils.ceilWidth(4),
            flex: 1,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backColor
          }}
          onPress={() => {
            if (this.props.isCanClicked === false) {
              return;
            }
            let ifContain = false;
            for (let k = 0; k < chooseArr.length; k += 1) {
              if (rqKey === chooseArr[k]) {
                chooseArr.splice(k, 1);
                ifContain = true;
                break;
              }
            }
            if (ifContain === false) {
              chooseArr.push(rqKey);
            }
            this.setState({
              chooseArr,
            });
            this.props.rqClickfunc(chooseArr);
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
            {odds}
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

  // 三个赔率方块
  renderThreeOddBlock(type) {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);

    if (this.props.singleType === '单关胜负') {
      if ((type === '0' && this.props.matchData.dan_sf === 'False') || (type === this.props.rqData.goal && this.props.matchData.dan_rq === 'False')) {
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

    for (let i = 0; i < 3; i += 1) {
      let odds = '0';
      let title = '胜';
      let rqKey = 'rq3';
      // 胜负(不让球)
      if (type === '0') {
        if (i === 0) {
          odds = this.props.sfData.sf3;
          title = '胜';
          rqKey = 'sf3';
        } else if (i === 1) {
          odds = this.props.sfData.sf1;
          title = '平';
          rqKey = 'sf1';
        } else {
          odds = this.props.sfData.sf0;
          title = '负';
          rqKey = 'sf0';
        }
      } else if (i === 0) {
        odds = this.props.rqData.rq3;
        title = '胜';
        rqKey = 'rq3';
      } else if (i === 1) {
        odds = this.props.rqData.rq1;
        title = '平';
        rqKey = 'rq1';
      } else {
        odds = this.props.rqData.rq0;
        title = '负';
        rqKey = 'rq0';
      }

      const { chooseArr } = this.state;
      // 改变字体颜色和border
      let backColor = 'white';
      let textColor = CommonUtils.themeColor;
      let titleTextColor = 'rgba(1,13,45, 0.6)';
      let borderColor = 'rgba(1,13,45,0.2)';
      for (let j = 0; j < chooseArr.length; j += 1) {
        const containKey = chooseArr[j];
        if (rqKey === containKey) {
          backColor = CommonUtils.themeColor;
          textColor = 'white';
          titleTextColor = 'white';
          borderColor = CommonUtils.themeColor;
          break;
        }
      }
      viewsArr.push(
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor,
            marginLeft: CommonUtils.ceilWidth(4),
            flex: 1,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backColor
          }}
          onPress={() => {
            if (this.props.isCanClicked === false) {
              return;
            }
            let ifContain = false;
            for (let k = 0; k < chooseArr.length; k += 1) {
              if (rqKey === chooseArr[k]) {
                chooseArr.splice(k, 1);
                ifContain = true;
                break;
              }
            }
            if (ifContain === false) {
              chooseArr.push(rqKey);
            }
            this.setState({
              chooseArr,
            });
            this.props.rqClickfunc(chooseArr);
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
            {odds}
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

  // 赔率
  renderOdds() {
    const viewsArr = [];
    const { isSoccer } = this.props;
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 10 : 0);
    let index = 1;
    if (this.props.sfData != null) {
      index = 2;
    }

    let oddNUm = [];
    if (index === 1) {
      oddNUm = [this.props.rqData.goal];
    } else if (isSoccer === true) {
      oddNUm = ['0', this.props.rqData.goal];
    } else {
      oddNUm = ['0', '让'];
    }

    for (let i = 0; i < index; i += 1) {
      let size = 18;
      let top = fontTopTemp;
      if (oddNUm[i] === '让') {
        size = 15;
        top = 0;
      }
      let backColor = 'rgb(255,218,0)';
      // if (i === 0) {
      //   backColor = 'rgb(255,218,0)';
      // } else
      if (parseInt(this.props.rqData.goal, 0) > 0) {
        backColor = 'rgb(2,48,197)';
      } else if (parseInt(this.props.rqData.goal, 0) < 0) {
        backColor = 'rgb(31,221,215)';
      }
      let topMargin = 4;
      if (i === 0) {
        topMargin = 0;
      }
      viewsArr.push(
        <View style={[styles.oddsSingleBackStyle, { marginTop: topMargin }]}>
          <View
            style={{
              width: CommonUtils.ceilWidth(28),
              backgroundColor: backColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: size,
                color: 'white',
                fontFamily: 'DIN Condensed',
                marginTop: top,
              }}
            >
              {oddNUm[i]}
            </Text>
          </View>
          {isSoccer === true ? this.renderThreeOddBlock(oddNUm[i]) : this.renderTwoOddBlock(oddNUm[i])}
        </View>
      );
    }

    return viewsArr;
  }

  // 全部玩法
  renderAllPlay() {
    const { clickAllPlayFunc, isShowAllPlay } = this.props;
    if (isShowAllPlay === false) {
      return null;
    }
    let title1 = '全部';
    let title2 = '玩法';
    if (this.props.htChoose.length > 0) {
      title1 = '已选';
      title2 = `${this.props.htChoose.length}项`;
    } else if (this.props.chooseRqArr.length > 0) {
      title1 = '已选';
      title2 = `${this.props.chooseRqArr.length}项`;
    }
    return (
      <TouchableOpacity
        style={styles.playAllBaskStyle}
        onPress={() => {
          clickAllPlayFunc();
        }}
      >
        <ImageBackground
          style={{
            // width: imageWidth,
            // height: imageWidth,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          source={fingerImage}
        >
          <Text style={styles.playAllTextStyle}>
            {title1}
          </Text>
          <Text style={[styles.playAllTextStyle, { marginTop: 5 }]}>
            {title2}
          </Text>
        </ImageBackground>
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

  renderContent() {
    return (
      <View style={styles.oddsBackStyle}>
        <View style={{ flex: 1 }}>
          {this.renderOdds()}
        </View>
        {this.renderBlader()}
        {this.renderAllPlay()}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'rgb(246, 247, 248)', height: 1 }} />
        {/* {this.renderTeamName()} */}
        {this.renderContent()}
      </View>
    );
  }
}

MixPassItemLayout.propTypes = {
  clickAllPlayFunc: PropTypes.func,
  rqData: PropTypes.object,
  sfData: PropTypes.object,
  rqClickfunc: PropTypes.func,
  chooseRqArr: PropTypes.arrayOf(PropTypes.string),
  isShowAllPlay: PropTypes.bool,
  htChoose: PropTypes.arrayOf(PropTypes.string),
  isShowDan: PropTypes.bool,
  matchData: PropTypes.object,
  isSoccer: PropTypes.bool,
  isCanClicked: PropTypes.bool,
  singleType: PropTypes.string,
  clickDanFunc: PropTypes.func,
};

MixPassItemLayout.defaultProps = {
  clickAllPlayFunc: () => {},
  rqData: {},
  sfData: null,
  rqClickfunc: () => {},
  chooseRqArr: [],
  isShowAllPlay: true,
  htChoose: [],
  isShowDan: false,
  matchData: {},
  isSoccer: true,
  isCanClicked: true,
  singleType: '',
  clickDanFunc: () => {},
};
