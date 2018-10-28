import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

export default class MineBottomButtonLayout extends React.PureComponent {
  getView = () => (this.props.showSingle ? null : this.renderCommponent());

  renderCommponent = () => (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={0.8}
      onPress={() => {
        this.props.leftOnPress();
      }}
    >
      <Text
        style={{
          color: CommonUtils.themeColor,
          fontSize: 15,
          fontWeight: 'bold',
        }}
      >
        {this.props.leftName}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View
        style={[{
          backgroundColor: 'white',
          flexDirection: 'row',
          shadowColor: '#E40B5F',
          shadowOpacity: 0.2,
          shadowOffset: { width: 1, height: 1 },
          elevation: 1,
          height: 48,
          width: CommonUtils.width,
        },
        this.props.style
        ]}
      >
        {this.getView()}
        <TouchableOpacity
          style={[{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CommonUtils.themeColor,
          },
          this.props.touchStyle
          ]}
          activeOpacity={0.8}
          onPress={() => {
            this.props.rightOnPress();
          }}
        >
          <Text style={[{ color: 'white', fontSize: 15, fontWeight: 'bold' }, this.props.textStyle]}>
            {this.props.rightName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

MineBottomButtonLayout.propTypes = {
  leftName: PropTypes.string,
  rightName: PropTypes.string,
  leftOnPress: PropTypes.func,
  rightOnPress: PropTypes.func,
  showSingle: PropTypes.bool,
  style: PropTypes.object,
  touchStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

MineBottomButtonLayout.defaultProps = {
  leftName: '',
  rightName: '',
  leftOnPress: () => {
    // 左面按钮点击
  },
  rightOnPress: () => {
    // 右面按钮点击
  },
  showSingle: false,
  style: {},
  touchStyle: {},
  textStyle: {},
};
