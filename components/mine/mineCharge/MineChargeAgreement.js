import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MineCommonCheck from '../MineCommonCheck';

export default class MineChargeAgreement extends React.PureComponent {
  render() {
    return (
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <MineCommonCheck
          ref={ref => {
            this.mineCheck = ref;
          }}
          style={{ marginLeft: 40, justifyContent: 'flex-start', alignItems: 'flex-start' }}
          title={'同意'}
          details={'《服务协议》'}
          onPress={(value) => {
            this.mineCheck.setValueStatus(!value);
            this.props.onPress(!value);
          }}
        />
        <Text
          style={{
            fontSize: 13,
            lineHeight: 17,
            color: '#697289',
            marginLeft: 70,
            marginTop: 5,
          }}
        >
          {this.props.details}
        </Text>
      </View>
    );
  }
}
MineChargeAgreement.propTypes = {
  onPress: PropTypes.func,
  details: PropTypes.string,
};

MineChargeAgreement.defaultProps = {
  onPress: () => {
    // 传值
  },
  details: '',
};
