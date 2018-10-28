import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';


export default class MineFooterLayout extends React.PureComponent {
  render() {
    return (
      <View
        style={[{ flex: 1, marginLeft: 30, marginRight: 30, marginBottom: 10 }, this.props.style]}
      >
        <Text
          style={[{
            fontSize: 14,
            color: CommonUtils.themeColor,
            lineHeight: 20
          },
          this.props.textStyle
          ]}
        >
          {this.props.details}
        </Text>
      </View>
    );
  }
}

MineFooterLayout.propTypes = {
  details: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

MineFooterLayout.defaultProps = {
  details: '',
  style: {},
  textStyle: {},
};
