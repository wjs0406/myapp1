import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const mineBack = require('../../image/mine/mineHeadBack.png');

const styles = StyleSheet.create({
  nameStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailsStyle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 3,
  },
});

export default class MineHeadLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          backgroundColor: CommonUtils.navigationColor,
          paddingTop: CommonUtils.getStatusBarHeight(),
        }}
      >
        <View
          style={{
            height: 128,
            width: CommonUtils.width,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: CommonUtils.navigationColor,
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginLeft: 15,
              backgroundColor: 'red'
            }}
            source={{ uri: this.props.headerSource }}
            cache="force-cache"
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 16,
            }}
          >
            <Text style={styles.nameStyle}>
              {`用户名：${this.props.nameId}`}
            </Text>
            <Text style={styles.detailsStyle}>
              {`昵称：${this.props.nickName}`}
            </Text>
            <Text style={styles.detailsStyle}>
              {this.props.phone}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              marginRight: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.onPress();
            }}
          >
            <Image
              source={mineBack}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MineHeadLayout.propTypes = {
  nameId: PropTypes.string,
  nickName: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
  headerSource: PropTypes.string,
};

MineHeadLayout.defaultProps = {
  nameId: '',
  nickName: '',
  phone: '',
  onPress: () => {},
  headerSource: 'http://7xrfe5.com1.z0.glb.clouddn.com/0.jpg'
};
