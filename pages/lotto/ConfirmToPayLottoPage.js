import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonLayout from '../../components/base/CommonLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';
import SoccerLotteryBottomLayout from '../../components/homePage/soccerLottery/SoccerLotteryBottomLayout';
import SoccerLotteryListHeaderLayout from '../../components/homePage/soccerLottery/SoccerLotteryListHeaderLayout';
import SoccerLotteryCellLayout from '../../components/homePage/soccerLottery/SoccerLotteryCellLayout';
import MixPassSearchLayout from '../../components/homePage/soccerLottery/mixPass/MixPassSearchLayout';
import ConfirmToPayEditButtonLayout from '../../components/homePage/soccerLottery/confirmToPay/ConfirmToPayEditButtonLayout';
import ScoccerLotteryClickBetPopLayout from '../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout';
import BeforePayConfirmPopLayout from '../../components/homePage/soccerLottery/oddsOptimize/BeforePayConfirmPopLayout';
import * as HomePageApi from '../../api/homePage/HomePageApi';
import * as MineApi from '../../api/mine/MineApi';

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class ConfirmToPayLottoPage extends Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);

    this.numTerm = '';
    let chuanNum = props.navigation.state.params.dataSource.length;
    let chuanText = `${chuanNum}串1`;
    if (props.navigation.state.params.lotteryType === '胜负彩') {
      chuanText = '胜负彩';
      this.numTerm = props.navigation.state.params.dataSource[0].IssueNum;
    } else if (props.navigation.state.params.lotteryType === '任选9') {
      chuanText = '任选9';
      this.numTerm = props.navigation.state.params.dataSource[0].IssueNum;
    } else if (props.navigation.state.params.dataSource.length > 8) {
      chuanNum = 8;
      chuanText = `${chuanNum}串1`;
    } else if (props.navigation.state.params.lotteryType === '单关胜负') {
      chuanText = '单关';
    }
    this.standerChuanArr = [];
    for (let i = 2; i <= chuanNum; i += 1) {
      this.standerChuanArr.push(`${i}串1`);
    }
    this.combineChuanArr = [];
    switch (chuanNum) {
      case 3:
        this.combineChuanArr = ['3串3', '3串4'];
        break;
      case 4:
        this.combineChuanArr = ['3串3', '3串4', '4串4', '4串5', '4串6', '4串11'];
        break;
      case 5:
        this.combineChuanArr = ['3串3', '3串4', '4串4', '4串5', '4串6', '4串11', '5串5', '5串6', '5串10', '5串16', '5串20', '5串26'];
        break;
      case 6:
        this.combineChuanArr = ['3串3', '3串4', '4串4', '4串5', '4串6', '4串11', '5串5', '5串6', '5串10', '5串16', '5串20', '5串26', '6串6', '6串7', '6串15', '6串20', '6串22', '6串35', '6串42', '6串50', '6串57'];
        break;
      case 7:
        this.combineChuanArr = ['3串3', '3串4', '4串4', '4串5', '4串6', '4串11', '5串5', '5串6', '5串10', '5串16', '5串20', '5串26', '6串6', '6串7', '6串15', '6串20', '6串22', '6串35', '6串42', '6串50', '6串57', '7串7', '7串8', '7串21', '7串35', '7串120'];
        break;
      case 8:
        this.combineChuanArr = ['3串3', '3串4', '4串4', '4串5', '4串6', '4串11', '5串5', '5串6', '5串10', '5串16', '5串20', '5串26', '6串6', '6串7', '6串15', '6串20', '6串22', '6串35', '6串42', '6串50', '6串57', '7串7', '7串8', '7串21', '7串35', '7串120', '8串8', '8串9', '8串28', '8串56', '8串70', '8串247'];
        break;
      default:
        break;
    }
    this.chooseLeague = chuanText;
    this.uploadArr = [];
    this.totalMoney = 0;
    this.balance = '0.00';
    // 注数
    this.numNote = 0;
    // 胜负彩/任选9期数

    
    this.state = {
      dataArr: [
        {
          data: props.navigation.state.params.dataSource,
        },
      ],
      popVisiable: false,
      clickBetPopisVisiable: false,
      clickChuanPopVisiable: false,
      bottomTitle: '',
      bottomTip: '奖金范围: 暂无',
      chuanText,
      chooseLeague: '',
      combineChoose: '',
    };
  }

  componentWillMount() {
    this.getBalance();
  }

  componentDidMount() {
    this.commonLayout.showContentView();
    this.getBalance();
    this.calculateBonues(this.state.chuanText);
  }

  // 获取账户余额
  getBalance() {
    // this.commonProgress.show();
    global.storage
      .load({
        key: global.loginKey
      })
      .then(ret => {
        MineApi.personInfoRequest(ret.id)
          .then(response => {
            this.balance = response.balance;
          })
          .catch(error => {
            global.showErrorMessage(error);
          });
      })
      .catch(() => '');
  }

  renderProgress() {
    return (
      <CommonProgressLayout
        ref={ref => {
          this.commonProgress = ref;
        }}
      />
    );
  }

  // 足球/篮球下单
  buyLotteryRequest(money, muti) {
    const obj = this.uploadArr;
    const jsonStr = JSON.stringify(obj);
    const { popVisiable } = this.state;
    this.commonProgress.show();
    HomePageApi.buySoccerLotteryRequest(
      global.userId,
      this.props.navigation.state.params.id,
      money,
      muti,
      jsonStr,
      this.state.chuanText,
      this.numNote,
      this.numTerm,
    )
      .then(response => {
        this.setState({
          popVisiable: !popVisiable
        });
        this.commonProgress.hidden();
        Toast.success('下单成功');
        this.props.navigation.state.params.callBack(this.state.dataArr[0].data);
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.commonProgress.hidden();
        this.setState({
          popVisiable: !popVisiable
        });
        global.showErrorMessage(error);
      });
  }

  // 计算注数
  getBuyNum(chuanText) {
    const obj = this.uploadArr;
    const jsonStr = JSON.stringify(obj);
    this.commonProgress.show();
    HomePageApi.getBuyLotteryNumRequest(this.props.navigation.state.params.id, jsonStr, chuanText)
      .then(response => {
        this.commonProgress.hidden();
        if (response != null) {
          this.totalMoney = (response.total * 2).toFixed(2);
          let tipText = '奖金范围: 暂无';
          this.numNote = response.total;
          if (response.bonusMin != null && response.bonusMin !== '') {
            tipText = `奖金范围: ${response.bonusMin}元~${response.bonusMax}元`;
          }
          this.setState({
            bottomTitle: `${response.total}注1倍共${response.total * 2}元`,
            bottomTip: tipText,
          });
        }
      })
      .catch(error => {
        this.commonProgress.hidden();
      });
  }

  // 导航栏
  renderNaviHeader() {
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
            确认方案
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 除了单关cell
  renderListItem(item) {
    
    const { navigation } = this.props;
    const { lotteryType, isSoccer } = navigation.state.params;
    let headerText = '';
    if (lotteryType === '胜负彩' || lotteryType === '任选9') {
      headerText = item.item.time;
    } else {
      const matchBeginTime = item.item.MatchTime.split(' ');
      headerText = `${item.item.league} | ${matchBeginTime[1]}截止`;
    }
    const { clickBetPopisVisiable } = this.state;
    let singleType = '';
    let isSingle = false;
    if (lotteryType === '单关胜负') {
      singleType = '单关胜负';
      isSingle = true;
    }
    let oddData = {};
    if (lotteryType === '比分') {
      oddData = item.item.bf;
    } else if (lotteryType === '半全场') {
      oddData = item.item.bqc;
    } else if (lotteryType === '总进球') {
      oddData = item.item.jq;
    } else if (lotteryType === '胜分差') {
      oddData = item.item.fc;
    }
    let isDan = false;
    if (this.state.dataArr[0].data.length > 1 && lotteryType !== '胜负彩' && lotteryType !== '任选9' && lotteryType !== '单关胜负') {
      isDan = true;
    }
    let rqData = item.item.rq;
    let sfData = item.item.sf;
    if (isSoccer === false) {
      rqData = item.item.rf;
      sfData = item.item.sf;
    }
    let isShowLittleNumber = false;
    let littleNumber = '0';
    if ((lotteryType === '混合过关' && isSoccer === false) || lotteryType === '让分胜负') {
      isShowLittleNumber = true;
      littleNumber = item.item.rf.goal;
    } else if (lotteryType === '大小分') {
      isShowLittleNumber = true;
      littleNumber = item.item.zf.goal;
    }
    return (
      <SoccerLotteryCellLayout
        headerTitle={headerText}
        type={`确认方案${navigation.state.params.lotteryType}`}
        homeTeamName={item.item.Home}
        customerTeamName={item.item.Away}
        isShowLittleNumber={isShowLittleNumber}
        littleNumber={littleNumber}
        itemConfig={{
          // 单关胜负数据
          singleType,
          // 是否是足球
          isSoccer: this.props.navigation.state.params.isSoccer,
          // 胜平负
          sfData,
          sfChooseArr: item.item.htChoose,
          // 篮球让分胜负
          rfData: item.item.rf,
          basKetType: lotteryType,
          // 让球胜平负
          chooseRqArr: item.item.htChoose,
          rqData,
          isShowAllPlay: false,
          rqClickfunc: () => {
            this.calculateBonues();
          },
          sfChooseFunc: () => {
            this.calculateBonues();
          },
          // 比分/总进球/半全场
          chooseArr: item.item.htChoose,
          totalData: oddData,
          otherType: lotteryType,
          // 大小分
          zfData: item.item.zf,
          // 点击立即投注
          clickBetFunc: () => {
            this.popData = item;
            this.setState({
              clickBetPopisVisiable: !clickBetPopisVisiable,
            });
          },
          // 混投2选1
          homeWinName: item.item.homeWinName,
          awayWinName: item.item.awayWinName,
          homeWinOdd: item.item.homeWin,
          awayWinOdd: item.item.awayWin,
          htChoose: item.item.htChoose,
          passChooseFunc: () => {
            this.calculateBonues();
          },
          // 胆
          clickDanFunc: () => {
            this.calculateBonues();
          },
          // 混合过关
          matchData: item.item,
          isShowDan: isDan,
          clickOtherFunc: () => {
            navigation.navigate('SoccerLotteryAllPlaypage', {
              isSoccer: this.props.navigation.state.params.isSoccer,
              match: item.item,
              isSingle,
              callBack: (matchData) => {
                const { dataArr } = this.state;
                dataArr[0].data[item.index] = matchData;
                this.setState({
                  dataArr,
                });
                this.calculateBonues();
              }
            });
          }
        }}
        isShowOtherHeader
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
        sections={dataArr}
        showsHorizontalScrollIndicator={false}
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

  // 弹窗内容
  renderPopContent() {
    const { popVisiable } = this.state;
    return (
      <BeforePayConfirmPopLayout
        balanceMoney={this.balance}
        needPayMoney={this.totalMoney}
        clickCancleFunc={() => {
          this.setState({
            popVisiable: !popVisiable
          });
        }}
        clickConfimFunc={(muti) => {
          // muti倍数
          this.buyLotteryRequest(`${(this.totalMoney * muti).toFixed(2)}`, `${muti}`);
        }}
      />
    );
  }

  // 弹窗
  renderPopView() {
    const { popVisiable } = this.state;
    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={popVisiable}
        headerTitle="立即购买(CNY)"
        clickBlackBackFunc={() => {
          this.setState({
            popVisiable: !popVisiable,
          });
        }}
        renderContentFunc={() => this.renderPopContent()}
      />
    );
  }

  // 几串几弹窗内容
  chuanPopContent() {
    const { clickChuanPopVisiable } = this.state;
    let showCombine = true;
    if (this.combineChuanArr.length === 0) {
      showCombine = false;
    }
    return (
      <MixPassSearchLayout
        titlesArr={this.standerChuanArr}
        chooseLeagues={this.chooseLeague}
        combinePassProps={{
          titlesArr: this.combineChuanArr,
          isMutiSelected: false,
          chooseLeagues: this.combineChoose,
        }}
        isShowCombinePass={showCombine}
        clickConfirmFunc={(titleStr, ifUSeOdds, odds, combineTitleStr) => {
          if (titleStr != null) {
            this.chooseLeague = titleStr;
          }
          if (combineTitleStr != null) {
            this.combineChoose = combineTitleStr;
          }

          // 如果都为空,变成最基本状态
          if ((this.chooseLeague === '' || this.chooseLeague == null) && (this.combineChoose === '' || this.combineChoose == null) && this) {
            let chuanNum = this.props.navigation.state.params.dataSource.length;
            let chuanText = `${chuanNum}串1`;
            if (this.props.navigation.state.params.dataSource.length > 8) {
              chuanNum = 8;
              chuanText = `${chuanNum}串1`;
            } else if (this.props.navigation.state.params.lotteryType === '单关胜负') {
              chuanText = '单关';
            }
            this.chooseLeague = chuanText;
          }

          let { chuanText } = this.state;
          if (titleStr != null && titleStr !== '') {
            chuanText = titleStr;
          } else if (combineTitleStr != null && combineTitleStr !== '') {
            chuanText = combineTitleStr;
          } else {
            chuanText = this.chooseLeague;
          }
          this.getBuyNum(chuanText);
          this.setState({
            clickChuanPopVisiable: !clickChuanPopVisiable,
            chuanText
          });
        }}
        clickCancleFunc={() => {
          this.setState({
            clickChuanPopVisiable: !clickChuanPopVisiable
          });
        }}
        isShowOddSearch={false}
      />
    );
  }

  // 几串几弹窗
  renderChuanPop() {
    const { clickChuanPopVisiable } = this.state;
    return (
      <ScoccerLotteryClickBetPopLayout
        isVisible={clickChuanPopVisiable}
        clickBlackBackFunc={() => {
          this.setState({
            clickChuanPopVisiable: !clickChuanPopVisiable,
          });
        }}
        renderContentFunc={() => this.chuanPopContent()}
      />
    );
  }

  // 更新数据源
  updateDataArr(type, item, arr) {
    const { dataArr } = this.state;
    const match = dataArr[0].data[item.index];
    match.htChoose = arr;
    this.setState({
      dataArr,
    });
    this.calculateBonues();
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
    const { clickBetPopisVisiable } = this.state;
    const chooseTitle = this.props.navigation.state.params.lotteryType;
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
      } else if (chooseTitle === '胜分差') {
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
        type={chooseTitle}
        homeName={home}
        awayName={away}
        chooseArr={choose}
        clickOddsFunc={(arr) => {
          let type = 'bf';
          switch (chooseTitle) {
            case '总进球':
              type = 'jq';
              break;
            case '半全场':
              type = 'bqc';
              break;
            default:
              break;
          }
          this.updateDataArr(type, this.popData, arr);
        }}
        clickCancleFunc={() => {
          this.setState({
            clickBetPopisVisiable: !clickBetPopisVisiable,
          });
        }}
      />
    );
  }

  // 添加上传数据
  updateUploadArr(type, match, odds, value, field_time, gall, goal) {
    this.uploadArr.push({
      field_no: match.ID,
      name: type,
      odds,
      value,
      home_name: match.Home,
      away_name: match.Away,
      field_time,
      gall,
      goal,
    });
  }

  // 计算奖金
  calculateBonues() {
    const { dataArr } = this.state;
    const { lotteryType } = this.props.navigation.state.params;
    const selectMatchOdds = [];
    this.uploadArr = [];
    for (let i = 0; i < dataArr[0].data.length; i += 1) {
      const match = dataArr[0].data[i];
      const chooseOddsArr = [];
      for (let j = 0; j < match.htChoose.length; j += 1) {
        const key = match.htChoose[j];
        let gall = '';
        if (match.isDan === true) {
          gall = '1';
        }
        if (match.rq != null && match.rq[key] != null) {
          chooseOddsArr.push(match.rq[key]);
          this.updateUploadArr('rq', match, match.rq[key], key, match.MatchTime, gall, match.rq.goal);
        } else if (match.sf != null && match.sf[key] != null) {
          chooseOddsArr.push(match.sf[key]);
          if (this.props.navigation.state.params.lotteryType === '胜负彩' || this.props.navigation.state.params.lotteryType === '任选9') {
            this.updateUploadArr('sf', match, match.sf[key], key, match.time, gall, '');
          } else {
            this.updateUploadArr('sf', match, match.sf[key], key, match.MatchTime, gall, '');
          }
        } else if (match.bqc != null && match.bqc[key] != null) {
          chooseOddsArr.push(match.bqc[key]);
          this.updateUploadArr('bqc', match, match.bqc[key], key, match.MatchTime, gall, '');
        } else if (match.jq != null && match.jq[key] != null) {
          chooseOddsArr.push(match.jq[key]);
          this.updateUploadArr('jq', match, match.jq[key], key, match.MatchTime, gall, '');
        } else if (match.bf != null && match.bf[key] != null) {
          chooseOddsArr.push(match.bf[key]);
          this.updateUploadArr('bf', match, match.bf[key], key, match.MatchTime, gall, '');
        } else if (key === 'rfwin') {
          chooseOddsArr.push(match.rf.win);
          this.updateUploadArr('rf', match, match.rf.win, 'win', match.MatchTime, gall, match.rf.goal) ;
        } else if (key === 'rflose') {
          chooseOddsArr.push(match.rf.lose);
          this.updateUploadArr('rf', match, match.rf.lose, 'lose', match.MatchTime, gall, match.rf.goal);
        } else if (match.fc != null && match.fc[key] != null) {
          chooseOddsArr.push(match.fc[key]);
          this.updateUploadArr('fc', match, match.fc[key], key, match.MatchTime, gall, '');
        } else if (match.zf != null && match.zf[key] != null) {
          chooseOddsArr.push(match.zf[key]);
          this.updateUploadArr('zf', match, match.zf[key], key, match.MatchTime, gall, match.zf.goal);
        } else if (key === 'homeWinName') {
          chooseOddsArr.push(match.homeWin);
        } else if (key === 'awayWinName') {
          chooseOddsArr.push(match.awayWin);
        }
      }
      
      // 赔率排序
      for (let k = 0; k < chooseOddsArr.length - 1; k += 1) {
        for (let l = 0; l < chooseOddsArr.length - 1 - k; l += 1) {
          if (parseFloat(chooseOddsArr[l]) > parseFloat(chooseOddsArr[l + 1])) {
            const temp = chooseOddsArr[l];
            chooseOddsArr[l] = chooseOddsArr[l + 1];
            chooseOddsArr[l + 1] = temp;
          }
        }
      }
      if (chooseOddsArr.length > 0) {
        selectMatchOdds.push(chooseOddsArr);
      }
    }

    // 计算注数,最小赔率,最大赔率
    // let lotteryNum = 0;
    // let minOdd = 1;
    // let maxOdd = 1;
    // for (let p = 0; p < selectMatchOdds.length; p += 1) {
    //   if (lotteryType === '单关胜负') {
    //     lotteryNum += selectMatchOdds[p].length;
    //   } else {
    //     // lotteryNum *= selectMatchOdds[p].length;
    //     lotteryNum += 1;
    //   }
    //   const arr = selectMatchOdds[p];
    //   if (arr.length > 0) {
    //     minOdd *= arr[0];
    //     maxOdd *= arr[arr.length - 1];
    //   }
    // }


    // const minMoney = (lotteryNum * 2 * minOdd).toFixed(2);
    // const maxMoney = (lotteryNum * 2 * maxOdd).toFixed(2);
    // this.totalMoney = (lotteryNum * 2).toFixed(2);
    // let tipText = `奖金范围: ${minMoney}元~${maxMoney}元`;
    // if (lotteryType === '胜负彩' || lotteryType === '任选9') {
    //   tipText = '奖金范围: 暂无';
    // }
    // this.setState({
    //   bottomTitle: `${lotteryNum}注1倍共${lotteryNum * 2}元`,
    //   bottomTip: tipText,
    // });
    this.getBuyNum(this.state.chuanText);
  }

  render() {
    const { navigation } = this.props;
    const { popVisiable } = this.state;
    const { bottomTip } = this.state;
    let isShowTip = false;
    if (bottomTip !== '奖金范围: 暂无') {
      isShowTip = true;
    }
    return (
      <BaseToolbarLayout
        navigation={navigation}
        leftPress={() => {
          navigation.state.params.callBack(this.state.dataArr[0].data);
          navigation.goBack();
        }}
        toolbarConfig={{
          hasLeft: true,
          hasRight: false,
          renderContentFunc: this.renderNaviHeader(),
        }}
      >

        <ConfirmToPayEditButtonLayout
          // 点击编辑添加赛事
          editFunc={() => {
            navigation.state.params.callBack(this.state.dataArr[0].data);
            navigation.goBack();
          }}
          twoOneTitle={this.state.chuanText}
          // 点击几串几
          twoMakeOneFunc={() => {
            if (this.state.chuanText === '单关' || this.state.chuanText === '胜负彩' || this.state.chuanText === '任选9') {
              return;
            }
            const { clickChuanPopVisiable } = this.state;
            this.setState({
              clickChuanPopVisiable: !clickChuanPopVisiable,
            });
          }}
        />
        {this.renderContent()}
        <SoccerLotteryBottomLayout
          limitText={this.state.bottomTitle}
          rightTitle="下单去购买"
          isShowTip={isShowTip}
          tipText={this.state.bottomTip}
          confirmFunc={() => {
            if (this.totalMoney <= 0) {
              Toast.info('请选择比赛场次');
              return;
            }
            this.setState({
              popVisiable: !popVisiable,
            });
          }}
          clearAllFunc={() => {
            // const arr = [];
            // for (let i = 0; i < this.state.dataArr.length; i += 1) {
            //   arr.push(this.state.dataArr[i]);
            // }
            const { dataArr } = this.state;
            for (let i = 0; i < dataArr[0].data.length; i += 1) {
              const match = dataArr[0].data[i];
              match.htChoose = [];
              match.isDan = false;
            }

            this.setState({
              dataArr,
            });
            this.calculateBonues();
          }}
        />
        {this.renderPopView()}
        {this.renderClickBetNowPop()}
        {this.renderProgress()}
        {this.renderChuanPop()}
      </BaseToolbarLayout>
    );
  }
}
