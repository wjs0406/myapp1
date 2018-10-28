import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const mineBack = require('../../../image/matchPoint/Home_ic_next.png');

export default class MineChargeItem extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 70,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        activeOpacity={1}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <View style={{ flexDirection: 'row', flex: 1, marginLeft: 15, alignItems: 'center' }}>
          <Image
            source={this.props.imageUrl}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ fontSize: 15, color: '#010D2D', marginLeft: 15 }}>
            {this.props.title}
            <Text style={{ fontSize: 12, color: '#697289', lineHeight: 17 }}>{this.props.details}</Text>
          </Text>
        </View>
        <Image
          source={mineBack}
          style={{
            width: 22,
            height: 22,
            marginRight: 15,
          }}
        />
      </TouchableOpacity>
    );
  }
}
MineChargeItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  details: PropTypes.string,
  imageUrl: PropTypes.string,
};

MineChargeItem.defaultProps = {
  onPress: () => {
    // 点击
  },
  details: '',
  title: '',
  imageUrl: '',
};
