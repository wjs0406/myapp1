import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';


export default class MessageItemLayout extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          height: 64,
          width: CommonUtils.width
        }}
        activeOpacity={0.8}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <ImageBackground
          style={{
            width: 40,
            height: 40,
            marginLeft: 15,
            borderRadius: 20,
            shadowColor: '#010D2D',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 1,
            overflow: 'hidden',
            zIndex: 999,
            
          }}
          resizeMode={'stretch'}
          cache="force-cache"
          source={this.props.avatar}
        />
        <View
          style={{ flex: 1, marginLeft: 15, marginRight: 15 }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              marginTop: 12,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#010D2D'
              }}
            >
              {this.props.title}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: 'rgba(1,13,45,0.4)',
              }}
              numberOfLines={1}
            >
              {this.props.time}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(1,13,45,0.6)',
              flex: 1,
              marginBottom: 12,
              lineHeight: 18,
              height: 18
            }}
          >
            {this.props.details}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MessageItemLayout.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  details: PropTypes.string,
  time: PropTypes.string,
  onPress: PropTypes.func,

};

MessageItemLayout.defaultProps = {
  avatar: '',
  time: '',
  title: '',
  details: '',
  onPress: () => {
    // 点击
  }
};
