import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  Alert,
} from 'react-native';
import { Toast } from 'teaset';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonLayout from '../../components/base/CommonLayout';
import CommonUtils from '../../utils/CommonUtils';
import SoccerLotteryBottomLayout from '../../components/homePage/soccerLottery/SoccerLotteryBottomLayout';
import SoccerLotteryListHeaderLayout from '../../components/homePage/soccerLottery/SoccerLotteryListHeaderLayout';
import SoccerLotteryCellLayout from '../../components/homePage/soccerLottery/SoccerLotteryCellLayout';
import * as HomePageApi from '../../api/homePage/HomePageApi';

const searchImage = require('../../image/homePage/Home_ic_wisdom.png');

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class ChooseNineAndWlPage extends Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    // 弹窗弹出类型(搜索和null)
    this.popType = null;
    this.numberOfChooseitem = 0;
    this.isRenderCell = true;

    this.dataSource = [];
    this.singleRqDataSource = [];
    this.singleAllDataSource = [];

    this.matchLimit = props.navigation.state.params.matchLimit;

    this.isSearch = false;

    this.searchOdds = '';
    this.searchLeageNameStr = '';
    this.typeMap = {
      混合过关: 'arr',
      胜平负: 'sf',
      让球胜平负: 'rq',
      比分: 'bf',
      总进球: 'jq',
      半全场: 'bqc',
      单关: 'arr',
    };
    this.singleTabIndex = 0;
    this.chooseIssNum = '';
    this.state = {
      chooseTitle: this.props.navigation.state.params.title,
      dataArr: [],
      clickBetPopisVisiable: false,
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
    };
  }

  componentDidMount() {
    this.socceryLotteryRequest();
  }

  // 获取足球彩票数据
  socceryLotteryRequest() {
    const { navigation } = this.props;
    this.commonLayout.showLoadingView();
    HomePageApi.chooseNineRequest(navigation.state.params.id)
      .then(response => {
        if (response.length > 0) {
          this.commonLayout.showContentView();
        } else {
          this.commonLayout.showEmptyView();
        }
        const tempData = [];
        for (let i = 0; i < response.length; i += 1) {
          const match = response[i];
          match.htChoose = [];
          match.sf = { sf3: '', sf1: '', sf0: '' };
          match.minOdds = '';
          let ifMatchContain = false;
          for (let j = 0; j < tempData.length; j += 1) {
            const data = tempData[j];
            if (data.IssueNum === match.IssueNum) {
              ifMatchContain = true;
              data.data.push(
                match
              );
            }
          }
          if (ifMatchContain === false) {
            const data = {
              IssueNum: match.IssueNum,
              data: [match],
              isDown: true,
            };
            tempData.push(data);
          }
        }
        this.setState({
          dataArr: tempData,
        });
      })
      .catch(() => {
        this.commonLayout.showErrorView();
      });
  }

  // 导航栏
  renderNaviHeader() {
    const { chooseTitle } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.headerTextStyle}>
          {chooseTitle}
        </Text>
      </View>
    );
  }

  // 更新数据源
  // updateDataArr(type, item, arr) {
  //   const { dataArr } = this.state;
  //   for (let i = 0; i < dataArr.length; i += 1) {
  //     const data = dataArr[i];
  //     if (data.matchTime === item.section.matchTime) {
  //       const match = data.data[item.index];
  //       match.htChoose = arr;
  //     }
  //   }
  //   this.setState({
  //     dataArr,
  //   });
  //   this.renderNumLimitText();
  // }

  // 计算选择场次,并更新底部文字
  renderNumLimitText(isRenderCell) {
    let chooseNum = 0;
    const { dataArr } = this.state;
    for (let i = 0; i < dataArr.length; i += 1) {
      const section = dataArr[i];
      for (let j = 0; j < section.data.length; j += 1) {
        const match = section.data[j];
        if (match.htChoose.length > 0) {
          chooseNum += 1;
        }
      }
    }
    let str = `至少选择${this.matchLimit}场比赛`;
    if (chooseNum >= this.matchLimit) {
      str = `已选择${chooseNum}场比赛`;
    } else if (chooseNum === 0) {
      str = `至少选择${this.matchLimit}场比赛`;
    } else {
      str = `已选择${chooseNum}场, 还差${this.matchLimit - chooseNum}场`;
    }
    this.isRenderCell = isRenderCell;
    this.numberOfChooseitem = chooseNum;
    this.setState({
      matchNumLimitText: str,
    });
    // if (this.numberOfChooseitem !== chooseNum) {
    //   this.numberOfChooseitem = chooseNum;
      
    //   this.setState({
    //     matchNumLimitText: str,
    //   });
    // }
  }

  // 除了单关cell
  renderListItem(item) {
    if (item.section.isDown === false) {
      return null;
    }
    return (
      <SoccerLotteryCellLayout
        headerTitle={`${item.item.time}`}
        type={'胜平负'}
        homeTeamName={item.item.Home}
        customerTeamName={item.item.Away}
        isRender={this.isRenderCell}
        itemConfig={{
          // 混合过关数据
          htChoose: item.item.htChoose,
          // 胜平负cell数据
          sfData: item.item.sf,
          sfChooseArr: item.item.htChoose,
          matchData: item.item,
          isCanClickFunc: () => {
            if (this.chooseIssNum !== '' && this.chooseIssNum !== item.section.IssueNum) {
              Toast.info('不能跨期选择比赛');
              return false;
            }
            return true;
          },
          sfChooseFunc: () => {
            // 判断不能跨期选择
            if (this.chooseIssNum === '') {
              this.chooseIssNum = item.section.IssueNum;
            }
            // const { dataArr } = this.state;
            // if (this.chooseIssNum !== item.section.IssueNum) {
            //   // 已选择的issNum
            //   // for (let i = 0; i < dataArr.length; i += 1) {
            //   //   const section = dataArr[i];
            //   //   if (section.IssueNum === this.chooseIssNum) {
            //   //     for (let j = 0; j < section.data.length; j += 1) {
            //   //       const data = section.data[j];
            //   //       data.htChoose = [];
            //   //     }
            //   //   }
            //   // }
            //   // this.renderNumLimitText(true);
            //   // Toast.info('不能跨期选择比赛');
            //   this.chooseIssNum = item.section.IssueNum;
            // } else {
            //   this.renderNumLimitText(false);
            // }
            this.renderNumLimitText(false);
            // 不做跨期选择判断
            //this.renderNumLimitText(false);
          },
        }}
      />
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
            if (data.IssueNum === info.section.IssueNum) {
              data.isDown = !data.isDown;
            }
          }
          this.setState({
            dataArr
          });
        }}
        isDown={info.section.isDown}
        titleStr={`第${info.section.IssueNum}期`}
      />
    );
  }

  // sectionList
  renderSectionList() {
    return (
      <SectionList
        style={{ flex: 1, width: CommonUtils.width }}
        renderItem={info => this.renderListItem(info)}
        renderSectionHeader={info => this.renderListHeader(info)}
        sections={this.state.dataArr}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }


  // 单关tab显示,其他是sectionList
  renderContent() {
    return (
      <CommonLayout
        ref={ref => {
          this.commonLayout = ref;
        }}
        contentView={() => this.renderSectionList()}
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

  render() {
    const { navigation } = this.props;
    const { dataArr } = this.state;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          hasLeft: true,
          hasRight: true,
          rightImage: searchImage,
          renderContentFunc: this.renderNaviHeader(),
          // 点击只能帅选
          onRightPress: () => {
            let minTotal = 0;
            for (let i = 0; i < dataArr.length; i += 1) {
              const data = dataArr[i];
              if (data.minOdds !== '') {
                minTotal += 1;
              }
            }
            let limitNUm = 9;
            if (this.props.navigation.state.params.title === '胜负彩') {
              limitNUm = 14;
            }
            if (minTotal < limitNUm) {
              Toast.info('赔率数据不足,无法筛选低赔组合');
            }
          }
        }}
      >
        {this.renderContent()}
        <SoccerLotteryBottomLayout // 确认购买
          limitText={this.state.matchNumLimitText}
          confirmFunc={() => {
            if (this.numberOfChooseitem < this.matchLimit) {
              return;
            }
            // 处理订单数据
            const { dataArr } = this.state;
            const matchsArr = [];
            for (let i = 0; i < dataArr.length; i += 1) {
              const section = dataArr[i];
              for (let j = 0; j < section.data.length; j += 1) {
                const match = section.data[j];
                if (match.htChoose.length > 0) {
                  matchsArr.push(match);
                }
              }
            }
            navigation.navigate('ConfirmToPayLotteryPage', {
              dataSource: matchsArr,
              lotteryType: this.state.chooseTitle,
              isSoccer: true,
              id: this.props.navigation.state.params.id,
              callBack: (matchPassArr) => {
                // 更新数据
                let isClear = true;
                for (let i = 0; i < dataArr.length; i += 1) {
                  const section = dataArr[i];
                  for (let j = 0; j < section.data.length; j += 1) {
                    const match = section.data[j];
                    for (let k = 0; k < matchPassArr.length; k += 1) {
                      const matchPass = matchPassArr[k];
                      if (matchPass.htChoose.length > 0) {
                        isClear = false;
                      }
                      if (match.ID_bet007 === matchPass.ID_bet007) {
                        section.data[j] = matchPass;
                        dataArr[i] = section;
                      }
                    }
                  }
                }
                if (isClear === true) {
                  this.chooseIssNum = '';
                }
                this.renderNumLimitText(true);
                this.setState({
                  dataArr
                });
                
              }
            });
          }}
          // 点击清空
          clearAllFunc={() => {
            const { dataArr } = this.state;
            this.chooseIssNum = '';
            for (let i = 0; i < dataArr.length; i += 1) {
              const section = dataArr[i];
              for (let j = 0; j < section.data.length; j += 1) {
                const match = section.data[j];
                match.htChoose = [];
              }
            }
            this.renderNumLimitText(true);
          }}
        />
      </BaseToolbarLayout>

    );
  }
}
