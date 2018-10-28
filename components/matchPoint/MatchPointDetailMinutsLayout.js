import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import MatchPointDetailInfoLayout from './MatchPointDetailInfoLayout.js';

export default class MatchPointDetailMinutsLayout extends Component {
  render() {
    return (
      <View style={{ height: 44, flexDirection: 'row', backgroundColor: this.props.backColor }}>
        <MatchPointDetailInfoLayout
          style={{ flex: 1 }}
          typeNumber={this.props.numberType}
          data1={this.props.homeGoal}
          data2={this.props.homeRed}
          data3={this.props.homeYellow}
          colorArr={['rgb(31,221,215)', 'red', 'rgb(255,218,0)']}
        />
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(243.244.245)',
          width: 30,
        }}
        >
          <Text style={{ fontSize: 12, color: 'rgb(1.13.45)' }}>
            {this.props.middleText}
          </Text>

        </View>
        <MatchPointDetailInfoLayout
          style={{ flex: 1 }}
          typeNumber={this.props.numberType}
          data1={this.props.awayYellow}
          data2={this.props.awayRed}
          data3={this.props.awayGoal}
          colorArr={['rgb(255,218,0)', 'red', 'rgb(31,221,215)']}
        />
      </View>
    );
  }
}

MatchPointDetailMinutsLayout.propTypes = {
  backColor: PropTypes.string,
  middleText: PropTypes.string,
  numberType: PropTypes.number,
  homeGoal: PropTypes.arrayOf(PropTypes.object),
  homeYellow: PropTypes.arrayOf(PropTypes.object),
  homeRed: PropTypes.arrayOf(PropTypes.object),
  awayGoal: PropTypes.arrayOf(PropTypes.object),
  awayYellow: PropTypes.arrayOf(PropTypes.object),
  awayRed: PropTypes.arrayOf(PropTypes.object),
};
MatchPointDetailMinutsLayout.defaultProps = {
  backColor: 'white',
  middleText: '',
  numberType: 0,
  homeGoal: [],
  homeYellow: [],
  homeRed: [],
  awayGoal: [],
  awayYellow: [],
  awayRed: [],
};
