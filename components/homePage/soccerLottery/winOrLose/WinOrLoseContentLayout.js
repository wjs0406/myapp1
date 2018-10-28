import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';
import Toast from 'teaset/components/Toast/Toast';

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

export default class WinOrLoseContentLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseArr: props.sfChooseArr,
      danMatch: props.matchData,
    };
  }

  componentWillReceiveProps(props) {
    this.state = {
      chooseArr: props.sfChooseArr,
      danMatch: props.matchData,
    };
  }

  renderTitle(index) {
    let title = '胜';
    let odd = this.props.sfData.sf3;
    let sfKey = 'sf3';
    if (this.props.isSoccer) {
      if (index === 1) {
        title = '平';
        odd = this.props.sfData.sf1;
        sfKey = 'sf1';
      } else if (index === 2) {
        title = '负';
        odd = this.props.sfData.sf0;
        sfKey = 'sf0';
      }
    } else if (index === 0) {
      title = '主胜';
      if (this.props.basKetType === '胜负') {
        odd = this.props.sfData.win;
        sfKey = 'win';
      } else if (this.props.basKetType === '大小分') {
        title = '大分';
        odd = this.props.zfData.over;
        sfKey = 'over';
      } else {
        odd = this.props.rfData.win;
        sfKey = 'rfwin';
      }
    } else {
      title = '客胜';
      if (this.props.basKetType === '胜负') {
        odd = this.props.sfData.lose;
        sfKey = 'lose';
      } else if (this.props.basKetType === '大小分') {
        title = '小分';
        odd = this.props.zfData.under;
        sfKey = 'under';
      } else {
        odd = this.props.rfData.lose;
        sfKey = 'rflose';
      }
    }


    return [title, odd, sfKey];
  }

  renderThreeBlock() {
    const viewsArr = [];
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);
    let totalIndex = 3;
    if (this.props.isSoccer === false) {
      totalIndex = 2;
    }
    for (let i = 0; i < totalIndex; i += 1) {
      let leftMargin = CommonUtils.ceilWidth(8);
      if (i === 0) {
        leftMargin = 0;
      }
      const title = this.renderTitle(i)[0];
      const odd = this.renderTitle(i)[1];
      const sfKey = this.renderTitle(i)[2];
      const { chooseArr } = this.state;
      // 变颜色
      let backColor = 'white';
      let oddTextColor = CommonUtils.themeColor;
      let titleColor = 'rgba(1,13,45, 0.6)';
      let borderColor = 'rgba(1,13,45, 0.2)';

      for (let j = 0; j < chooseArr.length; j += 1) {
        const containKey = chooseArr[j];
        if (sfKey === containKey) {
          backColor = CommonUtils.themeColor;
          oddTextColor = 'white';
          titleColor = 'white';
          borderColor = CommonUtils.themeColor;
        }
      }

      viewsArr.push(
        <TouchableOpacity
          style={[styles.blockBackView, { marginLeft: leftMargin, borderColor, backgroundColor: backColor }]}
          onPress={() => {
            if (this.props.isCanClickFunc != null) {
              if (this.props.isCanClickFunc() === false) {
                return;
              }
            }
            let ifContain = false;
            for (let k = 0; k < chooseArr.length; k += 1) {
              if (sfKey === chooseArr[k]) {
                chooseArr.splice(k, 1);
                ifContain = true;
              }
            }
            if (ifContain === false) {
              chooseArr.push(sfKey);
            }
            this.setState({
              chooseArr,
            });
            this.props.sfChooseFunc(chooseArr);
          }}
        >
          <Text
            style={{
              fontFamily: 'DIN Condensed',
              fontSize: 18,
              color: oddTextColor,
              marginTop: fontTopTemp,
            }}
          >
            {odd}
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
        {this.renderThreeBlock()}
        {this.renderBlader()}
      </View>
    );
  }
}

WinOrLoseContentLayout.propTypes = {
  sfData: PropTypes.object,
  sfChooseArr: PropTypes.arrayOf(PropTypes.string),
  sfChooseFunc: PropTypes.func,
  isShowDan: PropTypes.bool,
  matchData: PropTypes.object,
  isSoccer: PropTypes.bool,
  basKetType: PropTypes.string,
  rfData: PropTypes.object,
  zfData: PropTypes.object,
  clickDanFunc: PropTypes.func,

  isCanClickFunc: PropTypes.func,
};

WinOrLoseContentLayout.defaultProps = {
  sfData: {},
  sfChooseFunc: () => {},
  sfChooseArr: [],
  isShowDan: false,
  matchData: {},
  isSoccer: true,
  basKetType: '胜负',
  rfData: {},
  zfData: {},
  clickDanFunc: () => {},
  isCanClickFunc: null,
};
