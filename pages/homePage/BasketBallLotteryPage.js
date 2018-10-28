import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Alert
} from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import ChooseLotteryTypeLayout from '../../components/homePage/ChooseLotteryTypeLayout';
import CommonLayout from '../../components/base/CommonLayout';
import CommonUtils from '../../utils/CommonUtils';
import SoccerLotteryBottomLayout from '../../components/homePage/soccerLottery/SoccerLotteryBottomLayout';
import SoccerLotteryListHeaderLayout from '../../components/homePage/soccerLottery/SoccerLotteryListHeaderLayout';
import SoccerLotteryCellLayout from '../../components/homePage/soccerLottery/SoccerLotteryCellLayout';
import CommonTabView from '../../components/base/CommonTabView';
import ScoccerLotteryClickBetPopLayout from '../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout';
import MixPassSearchLayout from '../../components/homePage/soccerLottery/mixPass/MixPassSearchLayout';
import * as HomePageApi from '../../api/homePage/HomePageApi';

const searchImage = require('../../image/homePage/Home_ic_shaixuan.png');
const openDown = require('../../image/homePage/Home_ic_openDown.png');
const openUp = require('../../image/homePage/Home_ic_openUp.png');


const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class BasketBallLotteryPage extends Component {
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

    this.dataSource = [];
    this.singleRqDataSource = [];
    this.singleAllDataSource = [];

    this.matchLimit = props.navigation.state.params.matchLimit;

    this.isSearch = false;

    this.searchOdds = '';
    this.searchLeageNameStr = '';
    this.typeMap = {
      混合过关: 'arr',
      胜负: 'sf',
      让分胜负: 'rf',
      胜分差: 'fc',
      大小分: 'zf',
      单关: 'arr',
    };

    this.singleTabIndex = 0;

    this.state = {
      headerImage: openDown,
      isShowChoosetype: false,
      chooseTitle: this.props.navigation.state.params.chooseTitle,
      dataArr: [],
      isRefreshing: false,
      // singleTabIndex: 0,
      clickBetPopisVisiable: false,
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
      searchLeagueArr: [],
    };
  }

  componentDidMount() {
    this.basketBallLotteryRequest('arr');
  }

  requestDismissLoading(response) {
    const { chooseTitle } = this.state;
    if (chooseTitle !== '单关') {
      if (this.commonLayout != null) {
        if (response.length > 0) {
          this.commonLayout.showContentView();
        } else {
          this.commonLayout.showEmptyView();
        }
      }
    } else if (this.singleTabIndex === 0) {
      if (this.singleWLCommon != null) {
        if (response.length > 0) {
          this.singleWLCommon.showContentView();
        } else {
          this.singleWLCommon.showEmptyView();
        }
      }
    } else if (this.singleAll != null) {
      this.singleAll.showLoadingView();
      if (response.length > 0) {
        this.singleAll.showContentView();
      } else {
        this.singleAll.showEmptyView();
      }
    }
  }

  requestShowLoading() {
    const { chooseTitle } = this.state;
    if (chooseTitle !== '单关') {
      if (this.commonLayout != null) {
        this.commonLayout.showLoadingView();
      }
    } else if (this.singleTabIndex === 0) {
      if (this.singleWLCommon != null) {
        this.singleWLCommon.showLoadingView();
      }
    } else if (this.singleAll != null) {
      this.singleAll.showLoadingView();
    }
  }

  requestShowError() {
    const { chooseTitle } = this.state;
    if (chooseTitle !== '单关') {
      if (this.commonLayout != null) {
        this.commonLayout.showErrorView();
      }
    } else if (this.singleTabIndex === 0) {
      if (this.singleWLCommon != null) {
        this.singleWLCommon.showErrorView();
      }
    } else if (this.singleAll != null) {
      this.singleAll.showErrorView();
    }
  }

  // 赛事筛选
  soccerySearchRequest(odds, nameStr) {
    const { navigation } = this.props;
    this.requestShowLoading();
    this.setState({
      dataArr: [],
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
    });
    this.numberOfChooseitem = 0;
    HomePageApi.searchSocceryLotteryRequest(
      navigation.state.params.id,
      odds,
      nameStr,
      this.typeMap[this.state.chooseTitle],
    )
      .then(response => {
        this.requestDismissLoading(response);
        const tempData = [];
        for (let i = 0; i < response.length; i += 1) {
          const match = response[i];
          match.htChoose = [];
          match.isDan = false;
          let ifMatchContain = false;
          for (let j = 0; j < tempData.length; j += 1) {
            const data = tempData[j];
            if (data.matchTime === match.MatchTime.split(' ')[0]) {
              ifMatchContain = true;
              data.data.push(
                match
              );
            }
          }
          if (ifMatchContain === false) {
            const data = {
              matchTime: match.MatchTime.split(' ')[0],
              week: match.ID,
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
      .catch(error => {
        this.requestShowError();
      });
  }

  // 获取篮球彩票数据
  basketBallLotteryRequest(type) {
    const { navigation } = this.props;
    this.searchLeageNameStr = '';
    this.searchOdds = '1';
    this.ifChooseOdds = false;
    this.requestShowLoading();
    this.setState({
      dataArr: [],
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
    });
    this.numberOfChooseitem = 0;
    HomePageApi.soccerLotteryRerquest(navigation.state.params.id, type)
      .then(response => {
        this.requestDismissLoading(response);
        const tempData = [];
        const { searchLeagueArr } = this.state;
        for (let i = 0; i < response.length; i += 1) {
          const match = response[i];
          // 搜索的联赛名
          if (type === 'arr') {
            let isContain = false;
            for (let x = 0; x < searchLeagueArr.length; x += 1) {
              const league = searchLeagueArr[x];
              if (league === match.league) {
                isContain = true;
              }
            }
            if (isContain === false) {
              searchLeagueArr.push(match.league);
            }
          }
          match.htChoose = [];
          match.isDan = false;
          let ifMatchContain = false;
          for (let j = 0; j < tempData.length; j += 1) {
            const data = tempData[j];
            if (data.matchTime === match.MatchTime.split(' ')[0]) {
              ifMatchContain = true;
              data.data.push(
                match
              );
            }
          }
          if (ifMatchContain === false) {
            const data = {
              matchTime: match.MatchTime.split(' ')[0],
              week: match.ID,
              data: [match],
              isDown: true,
            };
            tempData.push(data);
          }
        }
        this.setState({
          dataArr: tempData,
          searchLeagueArr,
        });
      })
      .catch(() => {
        this.requestShowError();
      });
  }

  // 点击下拉或上合
  clickDownOrUpButton() {
    const { headerImage, isShowChoosetype } = this.state;
    let imageTemp = headerImage;
    if (headerImage === openDown) {
      imageTemp = openUp;
    } else {
      imageTemp = openDown;
    }
    this.setState({
      headerImage: imageTemp,
      isShowChoosetype: !isShowChoosetype,
    });
  }

  // 导航栏
  renderNaviHeader() {
    const { headerImage, chooseTitle } = this.state;
    if (this.props.navigation.state.params.ifCanClick === false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.headerTextStyle}>
            {chooseTitle}
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            this.clickDownOrUpButton();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.headerTextStyle}>
            {chooseTitle}
          </Text>
          <Image style={{ width: 22, height: 22 }} source={headerImage} />
        </TouchableOpacity>
      </View>
    );
  }

  // 下拉显示弹窗
  renderChoosetype() {
    const { isShowChoosetype, chooseTitle } = this.state;
    if (isShowChoosetype) {
      return (
        <ChooseLotteryTypeLayout
          isMutiSelected={false}
          clickBackgroundFunc={() => {
            this.clickDownOrUpButton();
          }}
          titlesArr={['胜负', '让分胜负', '胜分差', '大小分', '混合过关', '单关']}
          chooseLeagues={chooseTitle}
          // 点击弹窗按钮
          clickButtonFunc={(title) => {
            if (title === '单关') {
              this.matchLimit = 1;
            } else {
              this.matchLimit = 2;
            }
            this.clickDownOrUpButton();
            this.setState({
              dataArr: [],
            });
            this.basketBallLotteryRequest(this.typeMap[title]);

            if (title === '单关') {
              setTimeout(() => {
                if (this.singleWLCommon != null) {
                  this.singleWLCommon.showContentView();
                }
              }, 2000);
            } else if (this.commonLayout == null) {
              setTimeout(() => {
                if (this.commonLayout != null) {
                  this.commonLayout.showContentView();
                }
              }, 2000);
              this.singleTabIndex = 0;
            } else {
              // this.commonLayout.showContentView();
              this.singleTabIndex = 0;
            }
            this.setState({
              chooseTitle: title,
              matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
            });
          }}
        />
      );
    }
    return null;
  }

  // 更新数据源
  updateDataArr(type, item, arr) {
    const { dataArr } = this.state;
    for (let i = 0; i < dataArr.length; i += 1) {
      const data = dataArr[i];
      if (data.matchTime === item.section.matchTime) {
        const match = data.data[item.index];
        match.htChoose = arr;
      }
    }
    this.setState({
      dataArr,
    });
   this.renderNumLimitText();
  }

  // 计算选择场次,并更新底部文字
  renderNumLimitText() {
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
    this.numberOfChooseitem = chooseNum;
    this.setState({
      matchNumLimitText: str,
    });
  }

  // 除了单关cell
  renderListItem(item) {
    if (item.section.isDown === false) {
      return null;
    }
    let { chooseTitle, clickBetPopisVisiable } = this.state;
    const { navigation } = this.props;
    if (this.singleTabIndex === 1 && chooseTitle === '单关') {
      chooseTitle = '单关全部';
    } else if (this.singleTabIndex === 0 && chooseTitle === '单关') {
      chooseTitle = '单关胜负篮球';
    }
    let showAllPlay = true;
    const matchBeginTime = item.item.MatchTime.split(' ');
    let isShowLittleNumber = false;
    let littleNumber = '0';
    if (chooseTitle === '单关胜负篮球' || chooseTitle === '让分胜负' ) {
      isShowLittleNumber = true;
      littleNumber = item.item.rf.goal;
      showAllPlay = false;
    } else if (chooseTitle === '大小分') {
      isShowLittleNumber = true;
      littleNumber = item.item.zf.goal;
    } else if (chooseTitle === '混合过关') {
      isShowLittleNumber = true;
      littleNumber = item.item.rf.goal;
      showAllPlay = true;
    }
    return (
      <SoccerLotteryCellLayout
        headerTitle={`${item.item.league} | ${matchBeginTime[1]}截止`}
        type={chooseTitle}
        homeTeamName={item.item.Home}
        customerTeamName={item.item.Away}
        isShowLittleNumber={isShowLittleNumber}
        littleNumber={littleNumber}
        itemConfig={{
          // 是否是足球
          isSoccer: false,
          // 点击全部玩法
          clickAllPlayFunc: () => {
            navigation.navigate('SoccerLotteryAllPlaypage', {
              match: item.item,
              isSoccer: false,
              callBack: (matchData) => {
                const { dataArr } = this.state;
                for (let i = 0; i < dataArr.length; i += 1) {
                  const data = dataArr[i];
                  if (data.matchTime === item.section.matchTime) {
                    data.data[item.index] = matchData;
                  }
                }
                this.setState({
                  dataArr,
                });
                this.renderNumLimitText();
              }
            });
          },
          // 点击立即投注
          clickBetFunc: () => {
            if (chooseTitle === '单关全部') {
              navigation.navigate('SoccerLotteryAllPlaypage', {
                isSoccer: false,
                isSingle: true,
                match: item.item,
                callBack: (matchData) => {
                  const { dataArr } = this.state;
                  for (let i = 0; i < dataArr.length; i += 1) {
                    const data = dataArr[i];
                    if (data.matchTime === item.section.matchTime) {
                      data.data[item.index] = matchData;
                    }
                  }
                  this.setState({
                    dataArr,
                  });
                  this.renderNumLimitText();
                }
              });
            } else {
              this.popType = null;
              this.popData = item;
              this.setState({
                clickBetPopisVisiable: !clickBetPopisVisiable,
              });
            }
          },
          // 单关胜负数据
          matchData: item.item,
          singleType: chooseTitle,
          // 混合过关数据
          htChoose: item.item.htChoose,
          rqData: item.item.rf,
          sfData: item.item.sf,
          rqClickfunc: () => {
            this.renderNumLimitText();
          },
          isShowAllPlay: showAllPlay,
          // 胜负
          sfChooseArr: item.item.htChoose,
          sfChooseFunc: () => {
            this.renderNumLimitText();
          },
          // 让分胜负
          rfData: item.item.rf,
          basKetType: chooseTitle,
          // 大小分
          zfData: item.item.zf,
          // 胜分差
          chooseArr: item.item.htChoose,
          totalData: item.item.fc,
          otherType: chooseTitle,
        }}
        clickOpenOrCloseFunc={() => {
          const { dataArr } = this.state;
          for (let i = 0; i < dataArr.length; i += 1) {
            const data = dataArr[i];
            if (data.value === item.section.value) {
              const dataModel = data.data[item.index];
              dataModel.isOpen = !dataModel.isOpen;
            }
          }
          this.setState({
            dataArr
          });
        }}
        isOpen={item.item.isOpen}

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
            if (data.matchTime === info.section.matchTime) {
              data.isDown = !data.isDown;
            }
          }
          this.setState({
            dataArr
          });
        }}
        isDown={info.section.isDown}
        titleStr={`${info.section.matchTime}  ${info.section.week}`}
      />
    );
  }

  // sectionList
  renderSectionList() {
    const { dataArr } = this.state;
    return (
      <SectionList
        style={{ flex: 1, width: CommonUtils.width }}
        renderItem={info => this.renderListItem(info)}
        renderSectionHeader={info => this.renderListHeader(info)}
        sections={dataArr}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // 单关tab显示,其他是sectionList
  renderContent() {
    const { chooseTitle } = this.state;
    if (chooseTitle === '单关') {
      return (
        <CommonTabView
          onChangeTab={(i) => {
            this.singleTabIndex = i;
            if (i === 1) {
              if (this.singleAll != null) {
                this.singleAll.showContentView();
              }
            } else if (this.singleWLCommon != null) {
              this.singleWLCommon.showContentView();
            }
          }}
          style={{
            paddingBottom: 0,
            backgroundColor: 'white'
          }}
          textStyle={{
            fontSize: 15,
          }}
          children={[
            <CommonLayout
              contentView={() => this.renderSectionList()}
              ref={(ref) => {
                this.singleWLCommon = ref;
              }}
              tabLabel="胜平负/让球"
            />,
            <CommonLayout
              contentView={() => this.renderSectionList()}
              ref={(ref) => {
                this.singleAll = ref;
              }}
              tabLabel="全部比赛"
            />
          ]}
        />
      );
    }
    return (
      <CommonLayout
        ref={ref => {
          this.commonLayout = ref;
        }}
        contentView={() => this.renderSectionList()}
      />
    );
  }

  // 混合过关搜索
  renderMixPassSearch() {
    const { clickBetPopisVisiable, chooseTitle } = this.state;
    let isShowOdds = false;
    if (chooseTitle === '混合过关') {
      isShowOdds = true;
    }
    return (
      <MixPassSearchLayout
        titlesArr={this.state.searchLeagueArr}
        chooseLeagues={this.searchLeageNameStr}
        isChooseOdds={this.ifChooseOdds}
        chooseOdds={this.searchOdds}
        clickConfirmFunc={(titleStr, ifUSeOdds, odds) => {
          if (titleStr !== '' || ifUSeOdds === true) {
            this.searchLeageNameStr = titleStr;
            this.ifChooseOdds = ifUSeOdds;
            let tempOdds = odds;
            if (ifUSeOdds === false) {
              tempOdds = '';
              this.searchOdds = '1';
            }
            this.soccerySearchRequest(tempOdds, titleStr);
          } else {
            this.searchLeageNameStr = '';
            this.searchOdds = '1';
            this.ifChooseOdds = false;
            this.basketBallLotteryRequest(this.typeMap[this.state.chooseTitle]);
          }
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable
          });
        }}
        clickCancleFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable
          });
        }}
        isShowOddSearch={isShowOdds}
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

  // 立即投注弹窗
  renderClickBetNowPop() {
    const { clickBetPopisVisiable, chooseTitle } = this.state;
    let isAvar = false;
    let popDataArr = [];
    const data = [{ data: [] }];
    let home = '-';
    let away = '-';
    let choose = [];
    if (this.popData != null && this.popData.item != null) {
      home = this.popData.item.Home;
      away = this.popData.item.Away;
      choose = this.popData.item.htChoose;
      popDataArr = Object.entries(this.popData.item.fc);
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
    }
    let popContent = null;
    if (this.popType === 'search') {
      popContent = () => this.renderMixPassSearch();
    }


    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={clickBetPopisVisiable}
        headerTitle={chooseTitle}
        clickBlackBackFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable,
          });
        }}
        dataSource={data}
        isAvarge={isAvar}
        renderContentFunc={popContent}
        type={chooseTitle}
        homeName={home}
        awayName={away}
        chooseArr={choose}
        clickOddsFunc={(arr) => {
          this.updateDataArr('', this.popData, arr);
        }}
        clickCancleFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable,
          });
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    let cellType = this.state.chooseTitle;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          hasLeft: true,
          hasRight: true,
          rightImage: searchImage,
          renderContentFunc: this.renderNaviHeader(),
          // 点击筛选
          onRightPress: () => {
            this.popType = 'search';
            this.setState({
              clickBetPopisVisiable: true,
            });
          }
        }}
      >
        {this.renderContent()}
        <SoccerLotteryBottomLayout // 确认购买
          limitText={this.state.matchNumLimitText}
          confirmFunc={() => {
            if (this.state.chooseTitle === '单关') {
              cellType = '单关胜负';
            }
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
              isSoccer: false,
              id: this.props.navigation.state.params.id,
              dataSource: matchsArr,
              lotteryType: cellType,
              callBack: (matchPassArr) => {
                // 更新数据
                for (let i = 0; i < dataArr.length; i += 1) {
                  const section = dataArr[i];
                  for (let j = 0; j < section.data.length; j += 1) {
                    const match = section.data[j];
                    for (let k = 0; k < matchPassArr.length; k += 1) {
                      const matchPass = matchPassArr[k];
                      if (match.ID === matchPass.ID) {
                        section.data[j] = matchPass;
                        dataArr[i] = section;
                      }
                    }
                  }
                }
                this.setState({
                  dataArr
                });
                this.renderNumLimitText();
              }
            });
          }}
          // 点击清空
          clearAllFunc={() => {
            const { dataArr } = this.state;
            for (let i = 0; i < dataArr.length; i += 1) {
              const section = dataArr[i];
              for (let j = 0; j < section.data.length; j += 1) {
                const match = section.data[j];
                match.htChoose = [];
              }
            }
            this.renderNumLimitText();
          }}
        />
        {this.renderChoosetype()}
        {this.renderClickBetNowPop()}
      </BaseToolbarLayout>

    );
  }
}
