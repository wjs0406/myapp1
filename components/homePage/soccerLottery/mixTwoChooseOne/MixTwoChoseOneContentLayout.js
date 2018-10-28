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

export default class MixTwoChoseOneContentLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseArr: props.htChoose,
      danMatch: props.matchData,
    };
  }

  componentWillReceiveProps(props) {
    this.state = {
      chooseArr: props.htChoose,
      danMatch: props.matchData,
    };
  }

  renderTwoBlock() {
    const viewsArr = [];
    const { chooseArr } = this.state;
    const fontTopTemp = (CommonUtils.Platform === 'IOS' ? 5 : 0);
    const fontTopTemp1 = (CommonUtils.Platform === 'IOS' ? -3 : 0);
    const nameArr = [this.props.homeWinName, this.props.awayWinName];
    const oddArr = [this.props.homeWinOdd, this.props.awayWinOdd];
    const titleSArr = ['homeWinName', 'awayWinName'];
    for (let i = 0; i < 2; i += 1) {
      let leftMargin = CommonUtils.ceilWidth(4);
      if (i === 0) {
        leftMargin = 0;
      }
      const title = titleSArr[i];
      // 改变字体颜色和border
      let backColor = 'white';
      let textColor = CommonUtils.themeColor;
      let titleTextColor = 'rgba(1,13,45, 0.6)';
      let borderColor = 'rgba(1,13,45,0.2)';
      for (let j = 0; j < chooseArr.length; j += 1) {
        const containKey = chooseArr[j];
        if (title === containKey) {
          backColor = CommonUtils.themeColor;
          textColor = 'white';
          titleTextColor = 'white';
          borderColor = CommonUtils.themeColor;
          break;
        }
      }
      viewsArr.push(
        <TouchableOpacity
          style={[styles.blockBackView,
            {
              marginLeft: leftMargin,
              borderColor,
              backgroundColor: backColor
            }
          ]}
          onPress={() => {
            let isContain = false;
            for (let j = 0; j < chooseArr.length; j += 1) {
              const titleTemp = chooseArr[j];
              if (title === titleTemp) {
                chooseArr.splice(j, 1);
                isContain = true;
                break;
              }
            }
            if (isContain === false) {
              chooseArr.push(title);
            }
            this.setState({
              chooseArr
            });
            this.props.passChooseFunc(chooseArr);
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
            {oddArr[i]}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: titleTextColor,
              marginTop: fontTopTemp1,
            }}
          >
            {nameArr[i]}
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
        {this.renderTwoBlock()}
        {this.renderBlader()}
      </View>
    );
  }
}

MixTwoChoseOneContentLayout.propTypes = {
  homeWinName: PropTypes.string,
  awayWinName: PropTypes.string,
  homeWinOdd: PropTypes.string,
  awayWinOdd: PropTypes.string,
  htChoose: PropTypes.arrayOf(PropTypes.string),
  passChooseFunc: PropTypes.func,
  isShowDan: PropTypes.bool,
  matchData: PropTypes.object,
  clickDanFunc: PropTypes.func,
};

MixTwoChoseOneContentLayout.defaultProps = {
  homeWinName: '',
  awayWinName: '',
  homeWinOdd: '',
  awayWinOdd: '',
  htChoose: [],
  passChooseFunc: () => {},
  isShowDan: false,
  matchData: {},
  clickDanFunc: () => {},
};
