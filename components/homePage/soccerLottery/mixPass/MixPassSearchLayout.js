import React, { Component } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonUtils from '../../../../utils/CommonUtils';
import SoccerLotteryListHeaderLayout from '../SoccerLotteryListHeaderLayout';
import MixPassSearchButtosLayout from './MixPassSearchButtosLayout';
import MineBottomButtonLayout from '../../../mine/MineBottomButtonLayout';
import MixPassOddSearchLayout from './MixPassOddSearchLayout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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

export default class MixPassSearchLayout extends Component {
  constructor(props) {
    super(props);
    this.titleStr = '';
    this.combineTitleStr = '';
    this.state = {
      chooseTitle: '',
    };
  }

  // 赛事筛选 / 标准过关
  renderGameSearch() {
    const { headerTitle } = this.props;
    return (
      <View>
        <SoccerLotteryListHeaderLayout
          titleStr={headerTitle}
          isShowTopMargin={false}
          isShowArrow={false}
          isShowClearText={this.props.isShowClear}
          clickUpOrDownFunc={() => {
            this.buttos.setState({
              chooseTitle: [],
            });
          }}
        />
        <View style={{ height: 10, backgroundColor: 'rgb(246,247,248)' }} />
        <MixPassSearchButtosLayout
          ref={(ref) => {
            this.buttos = ref;
          }}
          {...this.props}
          passChooseArrFunc={(titlesArr) => {
            this.combineTitleStr = '';
            if (this.props.isShowCombinePass) {
              this.combineButtons.setState({
                chooseTitle: [],
              });
            }
            if (titlesArr.length > 0 && titlesArr[0] === '') {
              titlesArr.splice(0, 1);
            }
            this.titleStr = '';
            for (let i = 0; i < titlesArr.length; i += 1) {
              const title = titlesArr[i];
              if (i === 0) {
                this.titleStr = title;
              } else {
                this.titleStr = `${this.titleStr},${title}`;
              }
            }
            console.log(titlesArr, this.titleStr);
          }}
        />
      </View>
    );
  }

  // 组合过关
  renderCombinePass() {
    if (this.props.isShowCombinePass === false) {
      return null;
    }
    return (
      <View>
        <SoccerLotteryListHeaderLayout
          titleStr={'组合过关'}
          isShowTopMargin={false}
          isShowArrow={false}
          isShowClearText={false}
          // clickUpOrDownFunc={() => {
          //   this.combineButtons.setState({
          //     chooseTitle: [],
          //   });
          // }}
        />
        <View style={{ height: 10, backgroundColor: 'rgb(246,247,248)' }} />
        <ScrollView
          style={{
            maxHeight: CommonUtils.height / 3
          }}
        >
          <MixPassSearchButtosLayout
            ref={(ref) => {
              this.combineButtons = ref;
            }}
            {...this.props.combinePassProps}
            clickButtonFunc={(title) => {
              this.combineTitleStr = title;
              this.titleStr = '';
              this.buttos.setState({
                chooseTitle: [],
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }

  // 赔率筛选
  renderOddsSearch() {
    const { isShowOddSearch } = this.props;
    if (!isShowOddSearch) {
      return null;
    }
    return (
      <View>
        <SoccerLotteryListHeaderLayout
          titleStr="赔率筛选"
          isShowTopMargin={false}
          isShowArrow={false}
          clickUpOrDownFunc={() => {
            this.buttos.setState({
              chooseTitle: [],
            });
          }}
        />
        <View style={{ height: 10, backgroundColor: 'rgb(246,247,248)' }} />
        <MixPassOddSearchLayout
          ref={ref => {
            this.searOddsRef = ref;
          }}
          {...this.props}
        />
      </View>
    );
  }

  render() {
    const { chooseTitle } = this.state;
    const { clickConfirmFunc, clickCancleFunc, isShowOddSearch } = this.props;
    let odds = '';
    let isOdds = false;

    return (

      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
      >
        <KeyboardAwareScrollView style={styles.container}>
          {this.renderGameSearch()}
          {this.renderCombinePass()}
          {this.renderOddsSearch()}
        </KeyboardAwareScrollView>
        <MineBottomButtonLayout
          leftName="取消"
          rightName="确定"
          leftOnPress={() => {
            clickCancleFunc();
          }}
          rightOnPress={() => {
            if (isShowOddSearch === true) {
              odds = this.searOddsRef.state.inputText;
              isOdds = this.searOddsRef.state.ifUseOdds;
            }
            clickConfirmFunc(
              this.titleStr,
              isOdds,
              odds,
              this.combineTitleStr,
            );
          }}
        />
      </TouchableOpacity>

    );
  }
}

MixPassSearchLayout.propTypes = {
  titlesArr: PropTypes.arrayOf(PropTypes.string),
  clickConfirmFunc: PropTypes.func,
  clickCancleFunc: PropTypes.func,
  isShowOddSearch: PropTypes.func, // 是否显示赔率筛选
  headerTitle: PropTypes.string,
  passChooseArrFunc: PropTypes.func,
  chooseLeagues: PropTypes.string,
  isChooseOdds: PropTypes.bool,
  chooseOdds: PropTypes.string,
  isShowClear: PropTypes.bool, // 是否显示清空按钮
  isShowCombinePass: PropTypes.bool, // 是否显示组合过关
  combinePassTitleArr: PropTypes.arrayOf(PropTypes.string), // 组合过关数组
  combinePassProps: PropTypes.object, // 组合过关属性
};

MixPassSearchLayout.defaultProps = {
  titlesArr: [],
  clickConfirmFunc: () => {},
  clickCancleFunc: () => {},
  isShowOddSearch: true,
  headerTitle: '赛事筛选',
  passChooseArrFunc: () => {},
  chooseLeagues: '',
  isChooseOdds: false,
  chooseOdds: '',
  isShowClear: true,
  isShowCombinePass: false,
  combinePassTitleArr: [],
  combinePassProps: {},
};
