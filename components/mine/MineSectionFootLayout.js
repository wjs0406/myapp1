import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

export default class MineSectionFootLayout extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.isHasMore) {
            this.props.getMoreOnPress();
          }
        }}
        activeOpacity={0.8}
        style={{
          flex: 1,
          marginLeft: 30,
          marginRight: 30,
          height: 44,
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#33010D2D',
            borderRadius: 2,
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 12, color: CommonUtils.themeColor }}>
            {this.props.isHasMore ? '加载更多明细' : '已加载全部数据'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MineSectionFootLayout.propTypes = {
  getMoreOnPress: PropTypes.func,
  isHasMore: PropTypes.bool,
};

MineSectionFootLayout.defaultProps = {
  getMoreOnPress: () => {
    // 加载更多
  },
  isHasMore: true,
};
