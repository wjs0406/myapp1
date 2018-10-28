import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native';
import PropType from 'prop-types';


export default class MatchPointDetailInfoLayout extends Component {
  renderPoint(data, color) {
    const viewsArr = [];
    for (let i = 0; i < data.length; i += 1) {
      const minutArr = data[i];
      console.log(`${parseInt(minutArr[3], 0)}, ${this.props.typeNumber}`);
      if (parseInt(minutArr[3], 0) - this.props.typeNumber < 10 && parseInt(minutArr[3], 0) - this.props.typeNumber >= 0) {
        viewsArr.push(
          <View
            style={{
              width: 7.5,
              height: 7.5,
              borderRadius: 4,
              backgroundColor: color,
              position: 'absolute',
              top: (parseInt(minutArr[3], 0) - this.props.typeNumber) * 4,
              borderWidth: 0.5,
              borderColor: 'white',
            }}
          />
        );
      }
    }
    
    return viewsArr;
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.renderPoint(this.props.data1, this.props.colorArr[0])}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.renderPoint(this.props.data2, this.props.colorArr[1])}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.renderPoint(this.props.data3, this.props.colorArr[2])}
        </View>
      </View>
    );
  }
}

MatchPointDetailInfoLayout.propTypes = {
  data1: PropType.arrayOf(PropType.object),
  data2: PropType.arrayOf(PropType.object),
  data3: PropType.arrayOf(PropType.object),
  typeNumber: PropType.number,
  colorArr: PropType.arrayOf(PropType.string),
};

MatchPointDetailInfoLayout.defaultProps = {
  data1: [],
  data2: [],
  data3: [],
  typeNumber: 0,
  colorArr: [],
};
