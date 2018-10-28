import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommonUtils from '../../utils/CommonUtils';

const footBall = require('../../image/homePage/Home_jingzu.png');
const footBallSingle = require('../../image/homePage/Home_jingzuSingle.png');
const wl = require('../../image/homePage/Home_wl.png');
const basket = require('../../image/homePage/Home_jinglan.png');
const basketSingle = require('../../image/homePage/Home_jinglanSingle.png');
const annNine = require('../../image/homePage/Home_Anyone9.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsBackStyle: {
    width: CommonUtils.width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 74,
    backgroundColor: 'white',
    marginBottom: 15
  },
  buttonStyle: {
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgb(1,13,45)',
    textAlign: 'center'
  }

});

export default class HomePageChooseClickLayout extends Component {
  // 图片和文字
  renderImageAndText() {
    const viewsArr = [];
    const { clickImageFunc, dataArr } = this.props;
    for (let i = 0; i < dataArr.length; i += 1) {
      const data = dataArr[i];
      console.log(`${CommonUtils.apiUrl}${data.logo}`);
      viewsArr.push(
        <View style={styles.buttonsBackStyle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              clickImageFunc(data.name, data.id);
            }}
          >
            <Image style={{ width: 48, height: 48 }} source={{ uri: `${CommonUtils.apiUrl}/${data.logo}` }} />
            <Text style={styles.textStyle}>
              {data.name}
            </Text>
          </TouchableOpacity>
          {/* <View style={{ backgroundColor: 'white', height: 40, width: CommonUtils.width }} /> */}
        </View>
      );
    }
    return viewsArr;
  }

  // '在线沟通'
  renderOnlineCommu() {
    const { clickOnlineCommuFunc } = this.props;
    return (
      <TouchableOpacity
        style={{
          height: 32,
          flex: 1,
          marginTop: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          clickOnlineCommuFunc();
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: CommonUtils.themeColor
          }}
        >
          {'> 在线沟通 <'}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 15 }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white' }}>
          {this.renderImageAndText()}
        </View>
        {this.renderOnlineCommu()}
      </View>
    );
  }
}

HomePageChooseClickLayout.propTypes = {
  // imageArr: PropTypes.array,
  // TextArr: PropTypes.arrayOf(PropTypes.string),
  clickImageFunc: PropTypes.func,
  clickOnlineCommuFunc: PropTypes.func,
  dataArr: PropTypes.arrayOf(PropTypes.object),
};

HomePageChooseClickLayout.defaultProps = {
  // imageArr: [footBall, footBallSingle, wl, basket, basketSingle, annNine],
  // TextArr: ['竞彩足球', '竞足单关', '胜负彩', '竞彩篮球', '竞篮单关', '任选9'],
  dataArr: [],
  clickImageFunc: () => {},
  clickOnlineCommuFunc: () => {},
};
