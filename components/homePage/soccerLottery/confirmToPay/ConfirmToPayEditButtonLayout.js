import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    paddingLeft: CommonUtils.ceilWidth(30),
    paddingRight: CommonUtils.ceilWidth(30),
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonBackStyle: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(1,13,45,0.2)'
  },
  textStyle: {
    fontSize: 12,
    color: 'rgba(1,13,45,0.6)'
  }
});

export default class ConfirmToPayEditButtonLayout extends Component {
  render() {
    const { editFunc, twoMakeOneFunc } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={[{ flex: 1 }, styles.buttonBackStyle]}
          onPress={() => {
            editFunc();
          }}
        >
          <Text style={styles.textStyle}>
            添加/编辑赛事
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{ flex: 1, marginLeft: 4 }, styles.buttonBackStyle]}
          onPress={() => {
            twoMakeOneFunc();
          }}
          activeOpacity={1}
        >
          <Text style={styles.textStyle}>
            {this.props.twoOneTitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ConfirmToPayEditButtonLayout.propTypes = {
  editFunc: PropTypes.func,
  twoMakeOneFunc: PropTypes.func,
  twoOneTitle: PropTypes.string,
};

ConfirmToPayEditButtonLayout.defaultProps = {
  editFunc: () => {},
  twoMakeOneFunc: () => {},
  twoOneTitle: '',
};
