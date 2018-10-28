import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';


export default class MineOrderStatusItemLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          width: CommonUtils.width,
          flexDirection: 'row',
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 30 }}>
          <View
            style={{ height: 10, width: 2, backgroundColor: this.props.statusStyle.topColor }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              borderColor: CommonUtils.themeColor,
              borderWidth: 2,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: this.props.statusStyle.middleColor
            }}
          />
          <View
            style={{ flex: 1, width: 2, backgroundColor: this.props.statusStyle.bottomColor }}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', marginRight: 15, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', height: 40, flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{ width: 3, height: 12, backgroundColor: '#010D2D' }}
              />
              <Text style={{ fontSize: 15, color: '010D2D', marginLeft: 21 }}>
                {this.props.title}
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: '#697289', textAlign: 'right', flex: 1, marginRight: 15 }}>{this.props.time}</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#FAFAFb' }} />
          <View
            style={{ flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 21, marginRight: 15 }}
          >
            <Text style={{ fontSize: 14, color: '#697289' }}>{this.props.details}</Text>
          </View>
        </View>
      </View>
    );
  }
}
MineOrderStatusItemLayout.propTypes = {
  statusStyle: PropTypes.object,
  title: PropTypes.string,
  time: PropTypes.string,
  details: PropTypes.string,
};

MineOrderStatusItemLayout.defaultProps = {
  statusStyle: {
    topColor: CommonUtils.themeColor,
    middleColor: '#00000000',
    bottomColor: CommonUtils.themeColor
  },
  title: '',
  time: '',
  details: '',
};
