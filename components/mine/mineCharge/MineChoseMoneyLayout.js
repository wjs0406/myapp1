import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';

const data = ['100', '200', '500', '1000'];
const bgm = require('../../../image/mine/chargeBgm.png');

const styles = StyleSheet.create({
  selStyle: {
    backgroundColor: '#E73837',
    shadowColor: '#E73837',
    shadowOpacity: 0.05,
    shadowOffset: { width: 1, height: 0 },
    elevation: 1,
    height: 44,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E73837',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  norStyle: {
    backgroundColor: 'white',
    height: 44,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#33010D2D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  titleStyle: {
    fontSize: 18,
    fontFamily: 'DIN Condensed',
    paddingTop: CommonUtils.ios ? 5 : 0,
  },
  detailsStyle: {
    fontSize: 12,
    marginTop: -5
  },

});

export default class MineChoseMoneyLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  renderChild = () => {
    const arr = data.map((item, index) => {
      const temp = [];
      temp.push(
        <TouchableOpacity
          style={index === this.state.index ? styles.selStyle : styles.norStyle}
          onPress={() => {
            this.setState({
              index,
            });
            this.props.onPress(data[index]);
          }}
        >
          <ImageBackground
            source={bgm}
            style={{
              width: 42,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            opacity={index === this.state.index ? 1 : 0}
          >
            <Text style={[styles.titleStyle, { color: index === this.state.index ? 'white' : '#E73837' }]}>
              {item}
            </Text>
            <Text style={[styles.detailsStyle, { color: index === this.state.index ? '#FFFFFFFF' : 'rgba(1,13,45,0.6)' }]}>元</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
      return temp;
    });
    return arr;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginLeft: 10,
          marginRight: 10,
          paddingBottom: 10,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {this.renderChild()}
      </View>
    );
  }
}
MineChoseMoneyLayout.propTypes = {
  onPress: PropTypes.func,
};

MineChoseMoneyLayout.defaultProps = {
  onPress: () => {
    // 传值
  },
};
