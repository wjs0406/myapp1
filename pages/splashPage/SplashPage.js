import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import CommonUtils from '../../utils/CommonUtils';

const appLogo = require('../../image/splashPage/launch_screen.png');

const styles = StyleSheet.create({
  logoStyle: {
    width: CommonUtils.width,
    height: CommonUtils.height
  }
});

export default class SplashPage extends React.Component {
  static navigationOptions() {
    return {
      header: null
    };
  }

  componentWillMount() {
    global.navigation = this.props.navigation;
  }

  componentWillUnmount() {
    // 请注意Un"m"ount的m是小写
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentDidMount() {
    this.loadLogin();
    if (SplashScreen != null) {
      SplashScreen.hide();
    }
  }

  jump(page) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: page })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  loadLogin() {
    global.storage
      .load({
        key: global.loginKey
      })
      .then(result => {
        this.timer = setTimeout(() => {
          if (result != null) {
            this.jump('HomeTab');
          }
        }, 1500);
      })
      .catch(() => {
        this.timer = setTimeout(() => {
          const setParamsAction = NavigationActions.setParams({
            key: 'LoginPage'
          });
          this.props.navigation.dispatch(setParamsAction);
          this.jump('LoginPage');
        }, 1500);
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: CommonUtils.themeColor
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <Image source={appLogo} style={styles.logoStyle} resizeMode="cover" />
      </View>
    );
  }
}
