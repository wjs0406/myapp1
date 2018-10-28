import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';

const styles = StyleSheet.create({
  mainInputBackView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    borderRadius: 20,
    marginLeft: 20,
    flex: 1,
    marginRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainInputStyle: {
    fontSize: 12,
    color: 'rgb(1,13,45)',
    paddingBottom: 0,
    paddingTop: 0,
    flex: 1,
  },
  inputBackView: {
    height: 30,
    width: 102,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    borderRadius: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default class MineDrawMoneyLayout extends React.PureComponent {
  getTexInputComponent = (typeStyle) => (
    <View style={typeStyle === 0 ? styles.mainInputBackView : styles.inputBackView}>
      <TextInput
        style={[styles.mainInputStyle, { color: typeStyle === 0 ? 'rgb(1,13,45)' : CommonUtils.themeColor }]}
        placeholder={this.props.inputPlaceHolderStr}
        placeholderTextColor={'rgba(1,13,45,0.4)'}
        onChangeText={text => {
          this.props.texthangeFunc(text);
        }}
        onFocus={() => {
          this.props.onFouce();
        }}
        onBlur={() => {
          this.props.onBlur();
        }}
        //keyboardType={typeStyle === 0 ? 'default' : 'decimal-pad'}
        keyboardType="decimal-pad"
      />
    </View>
  );

  getTextComponent = () => (
    <Text
      style={{
        color: 'rgba(1,13,45,0.4)',
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 20,
        marginRight: 30,
      }}
    >
      {this.props.details}
    </Text>
  );

  getInputTextAndText = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {this.getTexInputComponent(1)}
      <Text style={{ fontSize: 12, color: 'rgba(1,13,45,0.6)', marginLeft: 10 }}>元</Text>
    </View>
  )

  getRightCompoent = () => {
    if (this.props.type === 0) {
      return this.getTextComponent();
    }
    if (this.props.type === 1) {
      return this.getTexInputComponent(0);
    }
    return this.getInputTextAndText();
  };

  render() {
    return (
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: 'white' },
          this.props.style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 8,
              height: 4,
              marginLeft: 15,
              backgroundColor: CommonUtils.themeColor,
            }}
          />
          <Text
            style={{
              width: 65,
              color: '#010D2D',
              fontSize: 15,
              marginLeft: 18,
            }}
          >
            {this.props.title}
          </Text>
          {this.getRightCompoent()}
        </View>
      </View>
    );
  }
}
MineDrawMoneyLayout.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  inputPlaceHolderStr: PropTypes.string,
  onFouce: PropTypes.func,
  onBlur: PropTypes.func,
  texthangeFunc: PropTypes.func,
  type: PropTypes.number,
  style: PropTypes.object,
};

MineDrawMoneyLayout.defaultProps = {
  title: '',
  details: '',
  inputPlaceHolderStr: '',
  onFouce: () => {
    // 获取焦点
  },
  onBlur: () => {
    // 失去焦点
  },
  texthangeFunc: () => {
    // 文字改变
  },
  type: 0, // 0: 文字, 1, 输入框, 2,输入框加文字
  style: {},
};
