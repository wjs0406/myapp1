import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import CommonUtils from '../../utils/CommonUtils';

const bgIcon = require('../../image/mine/realName.png');
const backIcon = require('../../image/homePage/Home_ic_back.png');

export default class MineRealNameLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          paddingTop: CommonUtils.getStatusBarHeight(),
          backgroundColor: CommonUtils.navigationColor
        }}
      >
        <ImageBackground
          source={bgIcon}
          style={{
            width: CommonUtils.width,
            height: 125,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            activeOpacity={0.8}
            style={{
              width: 32,
              height: 32,
              marginLeft: 8,
              marginTop: 10,
            }}
          >
            <ImageBackground
              source={backIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
