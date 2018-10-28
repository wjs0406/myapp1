import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SectionList,
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

export default class SoccerLotteryPage extends Component {
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
      混投2选1: 'mixing',
    };
    this.singleTabIndex = 0;

    this.state = {
      headerImage: openDown,
      isShowChoosetype: false,
      chooseTitle: this.props.navigation.state.params.chooseTitle,
      dataArr: [],
      singleRqArr: [],
      singleAllArr: [],
      isRefreshing: false,
      singleRqRefresh: false,
      singleAllRefresh: false,
      singleTabIndex: 0,
      clickBetPopisVisiable: false,
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
      searchLeagueArr: [],
    };
  }

  componentDidMount() {
    this.socceryLotteryRequest('arr', '');
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
    let playType = this.typeMap[this.state.chooseTitle];
    let flag = '';
    if (this.state.chooseTitle === '混投2选1') {
      playType = '';
      flag = 'mixing';
    }
    this.setState({
      dataArr: [],
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
    });
    this.numberOfChooseitem = 0;
    this.requestShowLoading();
    HomePageApi.searchSocceryLotteryRequest(
      navigation.state.params.id,
      odds,
      nameStr,
      playType,
      flag,
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

  // 获取足球彩票数据
  socceryLotteryRequest(type, flag) {
    const { navigation } = this.props;
    const { chooseTitle } = this.state;
    this.searchLeageNameStr = '';
    this.searchOdds = '1';
    this.ifChooseOdds = false;
    this.requestShowLoading();
    this.setState({
      dataArr: [],
      matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
    });
    this.numberOfChooseitem = 0;
    HomePageApi.soccerLotteryRerquest(navigation.state.params.id, type, flag)
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
          matchNumLimitText: `至少选择${this.matchLimit}场比赛`,
        });
      })
      .catch(() => {
        this.requestShowError();
      });
  }

  // 点击彩票类型下拉或上合
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
          chooseLeagues={chooseTitle}
          // 点击弹窗按钮
          clickButtonFunc={(title) => {
            this.clickDownOrUpButton();            
            this.setState({
              dataArr: [],
            });
            this.dataSource = [];
            switch (title) {
              case '胜平负':
                this.socceryLotteryRequest('sf', '');
                this.matchLimit = 2;
                break;
              case '混合过关':
                this.socceryLotteryRequest('arr', '');
                this.matchLimit = 2;
                break;
              case '让球胜平负':
                this.socceryLotteryRequest('rq', '');
                this.matchLimit = 2;
                break;
              case '比分':
                this.socceryLotteryRequest('bf', '');
                this.matchLimit = 1;
                break;
              case '总进球':
                this.socceryLotteryRequest('jq', '');
                this.matchLimit = 1;
                break;
              case '半全场':
                this.socceryLotteryRequest('bqc', '');
                this.matchLimit = 1;
                break;
              case '单关':
                this.socceryLotteryRequest('arr', '');
                this.matchLimit = 1;
                break;
              case '混投2选1':
                this.socceryLotteryRequest('', 'mixing');
                this.matchLimit = 2;
                break;
              default:
                break;
            }
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
              // this.setState({
              //   singleTabIndex: 0,
              // });
            } else {
              // this.commonLayout.showContentView();
              this.singleTabIndex = 0;
              // this.setState({
              //   singleTabIndex: 0,
              // });
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
    this.renderNumLimitText(true);
    this.setState({
      dataArr,
    });
  }

  // 计算选择场次,并更新底部文字
  renderNumLimitText(isRender) {
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
    this.isRenderCell = isRender;
    this.numberOfChooseitem = chooseNum;
    this.setState({
      matchNumLimitText: str,
    });
  }

  // 单关全部玩法
  renderSignleAllCell() {

  }

  // 除了单关cell
  renderListItem(item) {
    if (item.section.isDown === false) {
      return null;
    }
    let { chooseTitle, clickBetPopisVisiable } = this.state;
    // const { singleTabIndex } = this.state;
    const { navigation } = this.props;
    let oddData = {};
    if (this.singleTabIndex === 1 && chooseTitle === '单关') {
      chooseTitle = '单关全部';
    } else if (this.singleTabIndex === 0 && chooseTitle === '单关') {
      chooseTitle = '单关胜负';
    }
    console.log(chooseTitle);
    const matchBeginTime = item.item.MatchTime.split(' ');
    let showAllPlay = true;
    if (chooseTitle === '让球胜平负' || chooseTitle === '单关胜负') {
      showAllPlay = false;
    } else if (chooseTitle === '比分') {
      oddData = item.item.bf;
    } else if (chooseTitle === '半全场') {
      oddData = item.item.bqc;
    } else if (chooseTitle === '总进球') {
      oddData = item.item.jq;
    }
    return (
      <SoccerLotteryCellLayout
        headerTitle={`${item.item.league} | ${matchBeginTime[1]}截止`}
        type={chooseTitle}
        homeTeamName={item.item.Home}
        customerTeamName={item.item.Away}
        isRender={this.isRenderCell}
        itemConfig={{
          // 点击全部玩法
          clickAllPlayFunc: () => {
            navigation.navigate('SoccerLotteryAllPlaypage', {
              isSoccer: true,
              match: item.item,
              callBack: (matchData) => {
                const { dataArr } = this.state;
                for (let i = 0; i < dataArr.length; i += 1) {
                  const data = dataArr[i];
                  if (data.matchTime === item.section.matchTime) {
                    data.data[item.index] = matchData;
                  }
                }
                this.renderNumLimitText(true);
                this.setState({
                  dataArr,
                });
                
              }
            });
          },
          // 点击立即投注
          clickBetFunc: () => {
            if (chooseTitle === '单关全部') {
              navigation.navigate('SoccerLotteryAllPlaypage', {
                isSoccer: true,
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
                  this.renderNumLimitText(true);
                  this.setState({
                    dataArr,
                  });
                  
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
          rqClickfunc: () => {
            this.renderNumLimitText(false);
          },
          // 让球胜平负cell数据
          rqData: item.item.rq,
          isShowAllPlay: showAllPlay,
          chooseRqArr: item.item.htChoose,
          // 胜平负cell数据
          sfData: item.item.sf,
          sfChooseArr: item.item.htChoose,
          sfChooseFunc: () => {
            this.renderNumLimitText(false);
          },
          // 比分/半全场/进球数据
          chooseArr: item.item.htChoose,
          totalData: oddData,
          otherType: chooseTitle,
          // 混投2选1
          homeWinName: item.item.homeWinName,
          awayWinName: item.item.awayWinName,
          homeWinOdd: item.item.homeWin,
          awayWinOdd: item.item.awayWin,
          passChooseFunc: () => {
            this.renderNumLimitText(false);
          }
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
    const { chooseTitle } = this.state;
    if (chooseTitle === '单关') {
      console.log(chooseTitle);
      return (
        <CommonTabView
          onChangeTab={(i) => {
            // this.setState({
            //   singleTabIndex: i,
              
            // });
            this.singleTabIndex = i;
            if (i === 1) {
              if (this.singleAll != null) {
                this.singleAll.showContentView();
              }
              // setTimeout(() => {
              //   if (this.singleAll != null) {
              //     this.singleAll.showContentView();
              //   }
              // }, 2000);
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
            if (this.state.chooseTitle === '混投2选1') {
              this.socceryLotteryRequest('', 'mixing');
            } else {
              this.socceryLotteryRequest(this.typeMap[this.state.chooseTitle], '');
            }
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
      if (chooseTitle === '比分') {
        if (this.popData.item.bf != null) {
          popDataArr = Object.entries(this.popData.item.bf);
          // choose = this.popData.item.bfChoose;
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
        }
      } else if (chooseTitle === '总进球') {
        if (this.popData.item.jq != null) {
          popDataArr = Object.entries(this.popData.item.jq);
          // choose = this.popData.item.jqChoose;
          data[0].data[0] = [[this.sliceArray(popDataArr, 4)[0], this.sliceArray(popDataArr, 4)[1]]];
          isAvar = true;
        }
      } else if (chooseTitle === '半全场') {
        if (this.popData.item.bqc != null) {
          popDataArr = Object.entries(this.popData.item.bqc);
          // choose = this.popData.item.bqcChoose;
          data[0].data[0] = [[
            this.sliceArray(popDataArr, 3)[0],
            this.sliceArray(popDataArr, 3)[1],
            this.sliceArray(popDataArr, 3)[2]
          ]];
          isAvar = true;
        }
      }
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
          // 点击确定
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
              dataSource: matchsArr,
              lotteryType: cellType,
              isSoccer: true,
              id: this.props.navigation.state.params.id,
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
        {this.renderChoosetype()}
        {this.renderClickBetNowPop()}
      </BaseToolbarLayout>

    );
  }
}
