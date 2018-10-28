import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';

const sexSel = require('../../image/mine/sexSel.png');
const sexNor = require('../../image/mine/sexNor.png');

const styles = StyleSheet.create({
  touchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: '#697289',
    fontSize: 15,
    marginLeft: 11,
  },
});

export default class MineCommonCheck extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selStatus: props.statusDefault,
    };
  }

  setValueStatus = (value) => {
    this.setState({
      selStatus: value,
    });
  }

  render() {
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.props.style]}>
        <TouchableOpacity
          style={styles.touchStyle}
          onPress={() => {
            this.props.onPress(this.state.selStatus);
          }}
        >
          <Image
            source={this.state.selStatus ? sexSel : sexNor}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.textStyle}>
            {this.props.title}
            <Text style={{ color: CommonUtils.themeColor }}>{this.props.details}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

MineCommonCheck.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  onPress: PropTypes.func,
  statusDefault: PropTypes.bool,
  style: PropTypes.object,
};

MineCommonCheck.defaultProps = {
  title: '',
  details: '',
  onPress: () => {
    // 点击
  },
  statusDefault: false,
  style: {},
};
