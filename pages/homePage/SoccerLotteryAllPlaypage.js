import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import CommonLayout from '../../components/base/CommonLayout';
import CommonUtils from '../../utils/CommonUtils';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import SoccerLotteryListHeaderLayout from '../../components/homePage/soccerLottery/SoccerLotteryListHeaderLayout';
import SoccerLotteryCellLayout from '../../components/homePage/soccerLottery/SoccerLotteryCellLayout';
import MineBottomButtonLayout from '../../components/mine/MineBottomButtonLayout';

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class SoccerLotteryAllPlaypage extends Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  componentDidMount() {
    this.commonLayout.showLoadingView();

    setTimeout(() => {
      if (this.commonLayout != null) {
        this.commonLayout.showContentView();
      }
    }, 1000);
  }

  constructor(props) {
    super(props);
    const { match, isSoccer } = props.navigation.state.params;
    const matchStr = JSON.stringify(match);
    this.deepClone = JSON.parse(matchStr);
    if (isSoccer === true) {
      this.state = {
        dataArr: [
          { value: '胜平负/让球',
            isDown: true,
            data: [
              this.deepClone
            ],
          },
          {
            value: '比分',
            isDown: true,
            data: [
              this.deepClone
            ],
          },
          {
            value: '总进球',
            isDown: true,
            data: [
              this.deepClone
            ]
          },
          {
            value: '半全场',
            isDown: true,
            data: [
              this.deepClone
            ]
          },
        ],
      };
    } else {
      this.state = {
        dataArr: [
          { value: '主队让分',
            isDown: true,
            data: [
              this.deepClone
            ],
          },
          {
            value: '胜分差',
            isDown: true,
            data: [
              this.deepClone
            ],
          },
          {
            value: '预设总分',
            isDown: true,
            data: [
              this.deepClone
            ]
          }
        ],
      };
    }
  }

  // 导航栏
  renderNaviHeader() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.headerTextStyle}>
           全部玩法
          </Text>
        </View>
      </View>
    );
  }

  // 列表header
  renderListHeader(info) {
    return (
      <SoccerLotteryListHeaderLayout
        clickUpOrDownFunc={() => {
          const { dataArr } = this.state;
          for (let i = 0; i < dataArr.length; i += 1) {
            const data = dataArr[i];
            if (data.value === info.section.value) {
              data.isDown = !data.isDown;
            }
          }
          this.setState({
            dataArr
          });
        }}
        isDown={info.section.isDown}
        titleStr={info.section.value}
      />
    );
  }

  /*
  * 将一个数组分成几个同等长度的数组
  * array[分割的原数组]
  * size[每个子数组的长度]
  */
  sliceArray(array, num) {
    const result = [];
    for (let x = 0; x < Math.ceil(array.length / num); x += 1) {
      const start = x * num;
      const end = start + num;
      result.push(array.slice(start, end));
    }
    return result;
  }

  // cell
  renderListItem(item) {
    if (item.section.isDown === false) {
      return null;
    }
    const { isSingle, match, isSoccer } = this.props.navigation.state.params;
    let type = '';
    if ((item.section.value === '胜平负/让球' && isSingle !== true) || (item.section.value === '主队让分' && isSingle !== true)) {
      type = '混合过关';
    } else if (item.section.value === '胜平负/让球' && isSingle === true) {
      type = '单关胜负';
    } else if (item.section.value === '主队让分' && isSingle === true) {
      type = '单关胜负篮球';
    } else {
      type = '其他';
    }

    console.log(isSingle, isSoccer);

    const matchBeginTime = item.item.MatchTime.split(' ');

    let isAvar = false;
    let popDataArr = [];
    const data = [{ data: [] }];

    let rqData = null;
    if (this.props.navigation.state.params.isSoccer === false) {
      rqData = item.item.rf;
    } else {
      rqData = item.item.rq;
    }

    if (item != null) {
      if (item.section.value === '比分') {
        popDataArr = Object.entries(item.item.bf);
        const winArr = [];
        const flatArr = [];
        const looseArr = [];
        for (let i = 0; i < popDataArr.length; i += 1) {
          const kvArr = popDataArr[i];
          const keyWord = kvArr[0].split('')[1];
          if (keyWord === 'w') {
            winArr.push(kvArr);
          } else if (keyWord === 'd') {
            flatArr.push(kvArr);
          } else {
            looseArr.push(kvArr);
          }
        }
        data[0].data[0] = [this.sliceArray(winArr, 5), this.sliceArray(flatArr, 5), this.sliceArray(looseArr, 5)];
      } else if (item.section.value === '总进球') {
        popDataArr = Object.entries(item.item.jq);
        data[0].data[0] = [[this.sliceArray(popDataArr, 4)[0], this.sliceArray(popDataArr, 4)[1]]];
        isAvar = true;
      } else if (item.section.value === '半全场') {
        popDataArr = Object.entries(item.item.bqc);
        data[0].data[0] = [[
          this.sliceArray(popDataArr, 3)[0],
          this.sliceArray(popDataArr, 3)[1],
          this.sliceArray(popDataArr, 3)[2]
        ]];
        isAvar = true;
      } else if (item.section.value === '胜分差') {
        popDataArr = Object.entries(item.item.fc);
        const winArr = [];
        const looseArr = [];
        for (let i = 0; i < popDataArr.length; i += 1) {
          const kvArr = popDataArr[i];
          const keyWord = kvArr[0].split('')[0];
          if (keyWord === 'w') {
            winArr.push(kvArr);
          } else {
            looseArr.push(kvArr);
          }
          data[0].data[0] = [this.sliceArray(winArr, 3), this.sliceArray(looseArr, 3)];
        }
        isAvar = true;
      } else if (item.section.value === '预设总分') {
        popDataArr = Object.entries(item.item.fc);
        data[0].data[0] = [[
          [['over', item.item.zf.over], ['under', item.item.zf.under]]
        ]];
        isAvar = true;
      }
    }
    console.log(type);
    return (
      <SoccerLotteryCellLayout
        headerTitle={`${item.item.league} | ${matchBeginTime[1]}截止`}
        type={type}
        homeTeamName={item.item.Home}
        customerTeamName={item.item.Away}
        itemConfig={{
          // 是否是足球
          isSoccer: this.props.navigation.state.params.isSoccer,
          isShowAllPlay: false,
          // 混合过关数据
          htChoose: item.item.htChoose,
          rqData,
          sfData: item.item.sf,
          // 单关胜负数据
          matchData: match,
          singleType: type,
          // totalData: match,

          isAvarge: isAvar,
          data: data[0].data[0],
          chooseArr: item.item.htChoose,
          otherType: item.section.value,
          isDeepCopy: false,
          isSingle,
        }}
        isShowMore={false}
      />
    );
  }

  // sectionList
  renderSectionList() {
    const { dataArr } = this.state;
    return (
      <View>
        <SectionList
          style={{ flex: 1, width: CommonUtils.width }}
          renderItem={info => this.renderListItem(info)}
          renderSectionHeader={info => this.renderListHeader(info)}
          sections={dataArr}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <MineBottomButtonLayout
          leftName="取消"
          rightName="确定"
          leftOnPress={() => {
            // 点击取消
            this.props.navigation.goBack();
          }}
          rightOnPress={() => {
            // 点击确定
            this.props.navigation.state.params.callBack(this.deepClone);
            this.props.navigation.goBack();
          }}
        />
      </View>

    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          hasLeft: true,
          renderContentFunc: this.renderNaviHeader()
        }}
      >
        <CommonLayout
          ref={ref => {
            this.commonLayout = ref;
          }}
          contentView={() => this.renderSectionList()}
        />
      </BaseToolbarLayout>
    );
  }
}
