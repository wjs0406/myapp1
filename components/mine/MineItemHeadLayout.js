import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

export default class MineItemHeadLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            width: 8,
            height: 4,
            backgroundColor: CommonUtils.themeColor,
            marginLeft: 15,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: '#697289',
            marginLeft: 17,
          }}
        >
          {this.props.time}
        </Text>
      </View>
    );
  }
}

MineItemHeadLayout.propTypes = {
  time: PropTypes.string,
};

MineItemHeadLayout.defaultProps = {
  time: '',
};
