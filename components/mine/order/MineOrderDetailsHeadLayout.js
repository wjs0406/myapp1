import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';

export default class MineOrderDetailsHeadLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          width: CommonUtils.width,
          height: 44,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#010D2D' }}>
          奖金范围
          <Text style={{ color: CommonUtils.themeColor }}>{this.props.ticketScope}</Text>
          <Text>元</Text>
        </Text>
        <Text style={{ fontSize: 10, color: '#010D2D' }}>(该奖金范围仅供参考)</Text>
      </View>
    );
  }
}
MineOrderDetailsHeadLayout.propTypes = {
  ticketScope: PropTypes.string,
};

MineOrderDetailsHeadLayout.defaultProps = {
  ticketScope: '',
};
