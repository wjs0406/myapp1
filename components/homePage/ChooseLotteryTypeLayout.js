import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../utils/CommonUtils';
import MixPassSearchButtosLayout from './soccerLottery/mixPass/MixPassSearchButtosLayout';

const top = CommonUtils.getToolBarHeight() + CommonUtils.getStatusBarHeight();
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: CommonUtils.getToolBarHeight() + CommonUtils.getStatusBarHeight(),
    zIndex: 999,
    flex: 1,
    width: CommonUtils.width,
    height: CommonUtils.height - top
  },

  // 全部按钮背景
  totalButtonsBackStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: 'white',
  },

  // 按钮背景
  buttonBackStyle: {
    height: 40,
    marginBottom: 5,
    width: (CommonUtils.width - 30 - 16) / 3,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 按钮文字
  buttonTextStyle: {
    fontSize: 15,
    color: 'rgb(105,114,137)',
  },
});

export default class ChooseLotteryTypeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseTitle: props.defaultChooseTitle,
    };
  }

  renderButtons() {
    const viewsArr = [];
    const { titlesArr, clickButtonFunc } = this.props;
    const { chooseTitle } = this.state;
    for (let i = 0; i < titlesArr.length; i += 1) {
      let left = 8;
      if ((i % 3) === 0) {
        left = 0;
      }
      let textColor = 'rgb(105,114,137)';
      let backColor = 'transparent';
      let bw = 1;
      if (chooseTitle === titlesArr[i]) {
        textColor = 'white';
        backColor = CommonUtils.themeColor;
        bw = 0;
      }

      viewsArr.push(
        <TouchableOpacity
          style={[
            styles.buttonBackStyle,
            {
              marginLeft: left,
              borderWidth: bw,
              backgroundColor: backColor,
            }]}
          onPress={() => {
            clickButtonFunc(titlesArr[i]);
            this.setState({
              chooseTitle: titlesArr[i],
            });
          }}
        >
          <Text style={[styles.buttonTextStyle, { color: textColor }]}>
            {titlesArr[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return viewsArr;
  }

  render() {
    const { clickBackgroundFunc } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          clickBackgroundFunc();
        }}
      >
        <MixPassSearchButtosLayout
          {...this.props}
        />
      </TouchableOpacity>
    );
  }
}

ChooseLotteryTypeLayout.propTypes = {
  clickBackgroundFunc: PropTypes.func,
  titlesArr: PropTypes.arrayOf(PropTypes.string),
  defaultChooseTitle: PropTypes.string,
  clickButtonFunc: PropTypes.func,
  chooseLeagues: PropTypes.string,
};

ChooseLotteryTypeLayout.defaultProps = {
  clickBackgroundFunc: () => {},
  clickButtonFunc: () => {},
  defaultChooseTitle: '',
  chooseLeagues: '',
  titlesArr: ['胜平负', '让球胜平负', '比分', '总进球', '半全场', '混投2选1', '混合过关', '单关'],
};
