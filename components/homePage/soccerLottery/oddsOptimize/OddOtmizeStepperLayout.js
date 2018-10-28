import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(105,114,137)',
    borderWidth: 1,
    height: 30,
    borderRadius: 15,
    width: 100,
    flexDirection: 'row',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  textCtyle: {
    color: CommonUtils.themeColor,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    paddingBottom: 0,
    paddingTop: 0,
  }
});

const minus = require('../../../../image/homePage/minus.png');
const plus = require('../../../../image/homePage/plus.png');

export default class OddOtmizeStepperLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '1',
    };
  }

  render() {
    const { textValue } = this.state;
    const { minValue, passValueFunc } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            let intValue = parseInt(textValue, 0);
            if (intValue >= minValue + 1) {
              intValue -= 1;
              if (intValue < 1) {
                passValueFunc(1);
                return;
              }
              this.setState({
                textValue: String(intValue),
              });
            }
            passValueFunc(intValue);
          }}
        >
          <Image style={styles.imageStyle} source={minus} />
        </TouchableOpacity>
        <TextInput
          style={styles.textCtyle}
          editable
          value={textValue}
          keyboardType="number-pad"
          onChangeText={(text) => {
            this.setState({
              textValue: text
            });
          }}
          onEndEditing={() => {
            if (parseInt(this.state.textValue, 0) > 10000) {
              passValueFunc(parseInt(10000, 0));
              this.setState({
                textValue: '10000',
              });
            } else if (parseInt(this.state.textValue, 0) < 1 || this.state.textValue == null) {
              passValueFunc(parseInt(1, 0));
              this.setState({
                textValue: '1',
              });
            } else if (this.state.textValue === '') {
              passValueFunc(parseInt(1, 0));
              this.setState({
                textValue: '1',
              });
            } else {
              passValueFunc(parseInt(this.state.textValue, 0));
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            let intValue = parseInt(textValue, 0);
            intValue += 1;
            if (intValue > 10000) {
              passValueFunc(10000);
              return;
            }
            this.setState({
              textValue: String(intValue),
            });
            passValueFunc(parseInt(intValue, 0));
          }}
        >
          <Image style={styles.imageStyle} source={plus} />
        </TouchableOpacity>
      </View>
    );
  }
}

OddOtmizeStepperLayout.propTypes = {
  minValue: PropTypes.number,
  passValueFunc: PropTypes.func,
};

OddOtmizeStepperLayout.defaultProps = {
  minValue: 1,
  passValueFunc: () => {},
};
