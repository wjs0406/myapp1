import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const unCheck = require('../../../../image/homePage/Home_ic_CheckboxUn.png');
const checked = require('../../../../image/homePage/Home_ic_CheckboxSel.png');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    flex: 1,
  },
  inputBackStyle: {
    width: CommonUtils.ceilWidth(72),
    height: 30,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  tipTextStyle: {
    fontSize: 12,
    color: 'rgb(1,13,45)',
  }
});


export default class MixPassOddSearchLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: props.chooseOdds,
      ifUseOdds: props.isChooseOdds,
    };
  }

  renderTextInputView() {
    const { inputText } = this.state;
    let image = unCheck;
    if (this.state.ifUseOdds) {
      image = checked;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            const { ifUseOdds } = this.state;
            this.setState({
              ifUseOdds: !ifUseOdds,
            });
          }}
        >
          <Image style={{ width: 22, height: 22 }} source={image} />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, color: 'rgb(1,13,45)', fontWeight: 'bold', marginLeft: 10 }}>
          赔率小于
        </Text>
        <View style={styles.inputBackStyle}>
          <TextInput
            style={{ fontSize: 12, color: 'rgb(231,56,55)', paddingTop: 0, paddingBottom: 0 }}
            defaultValue={inputText}
            placeholder="1"
            placeholderTextColor={'rgb(231,56,55)'}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                inputText: text,
              });
            }}
            onEndEditing={() => {
              if (parseInt(this.state.inputText, 0) <= 0) {
                this.setState({
                  inputText: '1',
                });
              }
            }}
          />
        </View>
      </View>
    );
  }

  renderTipInfo() {
    return (
      <View style={{ marginLeft: 32, flexDirection: 'row', marginTop: 5 }}>
        <Text style={styles.tipTextStyle}>
          赔率筛选范围:
        </Text>
        <View>
          <Text style={styles.tipTextStyle}>
            足球 胜平负/让球胜平负
          </Text>
          <Text style={styles.tipTextStyle}>
            篮球 胜负/比分胜负
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextInputView()}
        {this.renderTipInfo()}
      </View>
    );
  }
}

MixPassOddSearchLayout.propTypes = {
  isChooseOdds: PropTypes.bool,
  chooseOdds: PropTypes.string,
};
MixPassOddSearchLayout.defaultProps = {
  isChooseOdds: false,
  chooseOdds: '1'
};
