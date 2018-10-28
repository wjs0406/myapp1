import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  textStyle: {
    color: '#697289',
    fontSize: 15,
    width: 50,
    textAlign: 'center',
  },
});

export default class MineBankItem extends React.PureComponent {
  renderText = value => <Text style={styles.textStyle}>{value}</Text>;

  renderComponent = () => (
    <View style={styles.viewStyle}>
      {this.renderText(this.props.creditCard.name)}
      {this.renderText(this.props.creditCard.single)}
      {this.renderText(this.props.creditCard.day)}
      {this.renderText(this.props.creditCard.month)}
    </View>
  );

  getValue = () => (this.props.single ? null : this.renderComponent());

  render() {
    return (
      <TouchableOpacity
        style={[{
          flex: 1,
          backgroundColor: this.props.backgroundColor,
          flexDirection: 'row',
          alignItems: 'center',
        },
        this.props.style
        ]}
        activeOpacity={0.8}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: '#697289',
            marginLeft: 15,
            width: 65,
            textAlign: 'center',
          }}
        >
          {this.props.title}
        </Text>
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            marginLeft: 19,
            marginRight: 29,
            flex: 1,
          }}
        >
          <View style={styles.viewStyle}>
            {this.renderText(this.props.cashCard.name)}
            {this.renderText(this.props.cashCard.single)}
            {this.renderText(this.props.cashCard.day)}
            {this.renderText(this.props.cashCard.month)}
          </View>
          {this.getValue()}
        </View>
      </TouchableOpacity>
    );
  }
}
MineBankItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  cashCard: PropTypes.object,
  creditCard: PropTypes.object,
  backgroundColor: PropTypes.string,
  single: PropTypes.bool,
  style: PropTypes.object,
};

MineBankItem.defaultProps = {
  onPress: () => {
    // 点击
  },
  title: '',
  cashCard: { name: '', single: '', day: '', month: '' },
  creditCard: { name: '', single: '', day: '', month: '' },
  backgroundColor: 'white',
  single: false,
  style: {},
};
