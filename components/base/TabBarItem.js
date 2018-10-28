import React from 'react';
import { Image, View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const topMargin = Platform.OS === 'ios' ? 0 : 2;
const viewTopMargin = Platform.OS === 'ios' ? -2 : 0;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 8,
    position: 'absolute',
    bottom: topMargin,
    backgroundColor: 'transparent',
    width: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
function TabBarItem(props) {
  if (props.bigIcon) {
    if (CommonUtils.ios) {
      return (
        <Image
          source={props.focused ? props.selectedImage : props.normalImage}
          style={{ width: 65, height: 65 }}
        />
      );
    }
    return (
      <Image
        source={props.focused ? props.selectedImage : props.normalImage}
        style={{ width: 65, height: 65 }}
      />
    );
  }
  if (props.bageNumber === 9999999) {
    return (
      <Image
        source={props.focused ? props.selectedImage : props.normalImage}
        style={{ width: 25.5, height: 24 }}
      />
    );
  }
  return (
    <View>
      <Image
        source={this.props.focused ? props.selectedImage : props.normalImage}
        style={{ width: 25.5, height: 24 }}
      />
      <View style={{ position: 'absolute', top: viewTopMargin, right: -5 }}>
        <Text style={styles.textStyle}>{props.bageNumber}</Text>
      </View>
    </View>
  );
}

TabBarItem.propTypes = {
  focused: PropTypes.bool,
  normalImage: PropTypes.number,
  selectedImage: PropTypes.number,
  bageNumber: PropTypes.number,
  bigIcon: PropTypes.bool
};

TabBarItem.defaultProps = {
  focused: false,
  normalImage: '',
  selectedImage: '',
  bageNumber: 9999999,
  bigIcon: false
};

export default TabBarItem;
