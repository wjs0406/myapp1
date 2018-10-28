import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginInputLayout from '../../login/LoginInputLayout';
import MineChoseMoneyLayout from './MineChoseMoneyLayout';

export default class MineChargeHead extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputDefaultValue: '100',
    };
  }

  render() {
    return (
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={false}
        >
          <LoginInputLayout
            {...{
              titleDefaultValue: '充值金额',
              inputPlaceHolderStr: '输入充值金额',
              mainKeyboardType: 'number-pad',
              mainDefaultValue: this.state.inputDefaultValue,
              mainInputChangeFunc: (text) => {
                this.chooseMoney.setState({
                  index: -1,
                });
                this.props.passInputValue(text);
              }
            }}
            style={{ height: 60, backgroundColor: 'white' }}
            valueInputStyle={{ width: 70 }}
          />
        </KeyboardAwareScrollView>
        <MineChoseMoneyLayout
          ref={ref => {
            this.chooseMoney = ref;
          }}
          onPress={(num) => {
            this.props.onPress(num);
            this.setState({
              inputDefaultValue: num,
            });
          }}
        />
      </View>
    );
  }
}
MineChargeHead.propTypes = {
  onPress: PropTypes.func,
  passInputValue: PropTypes.func,
};

MineChargeHead.defaultProps = {
  onPress: () => {
    // 传值
  },
  passInputValue: () => {

  },
};
