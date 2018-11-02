import React, {Component} from 'react';
import {AppRegistry, View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import {Toast} from "teaset";
import ScoccerLotteryClickBetPopLayout from "../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout";
import CommonProgressLayout from "../../components/base/CommonProgressLayout";
import BeforePayConfirmPopLayout from '../../components/homePage/soccerLottery/oddsOptimize/BeforePayConfirmPopLayout';
import * as HappyApi from "../../api/lotto/HappyApi";

const styles = StyleSheet.create({
  sevenContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
  },
  sevenContentHeader: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d44840',
    alignItems: 'center',
  },
  sevenContentTitle: {
    color: 'white',
    fontSize: 24,
  },
  ContentBackground: {
    flex: 20,
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  ContentDate: {
    height: 44,
    lineHeight: 44,
    fontSize: 20,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  HappyContentBtn: {
    width: '100%',
    height: 95,
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7cb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingLeft: 45,
    paddingRight: 45,
  },
  handAdd: {
    width: 220,
    height: 60,
    textAlign: 'center',
    lineHeight: 60,
    color: '#999999',
    borderWidth: 1,
    borderColor: '#c7c7cb',
    marginTop: 15,
    fontSize: 18,
  },
  HappyContentNum: {
    width: '100%',
    height: 100,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7cb',
    backgroundColor: '#ffffff',
  },
  HappyBg: {
    height: 36,
    width: '100%',
    lineHeight: 36,
    fontSize: 18,
    color: '#666666',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
    paddingLeft: 20,
  },
  HappyBgClear: {
    flex: 2,
    width: '100%',
    backgroundColor: '#d44840',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HappyBgClearRight: {
    borderWidth: 1,
    borderColor: 'white',
    height: 45,
    width: 100,
    borderRadius: 22,
    color: 'white',
    textAlign: 'center',
    lineHeight: 45,
    fontSize: 20
  },
  HappyBgClearBuy: {
    height: 45,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 22,
    color: '#d44840',
    textAlign: 'center',
    lineHeight: 45,
    fontSize: 20
  }

});

export default class HappyDetail extends Component {

  constructor(props) {
    super(props);
    const {betnum, money, num_term, q_data, h_data, end_time, clearItem, data_arrs, clearAll} = this.props.navigation.state.params;
    // alert(`上一页带来的大数据串${JSON.stringify(this.props.navigation.state.params)}`)
    this.clearItem = clearItem;
    this.clearAll = clearAll;

    this.state = {
      betnum: betnum,
      money: money,
      num_term: num_term,
      popVisiable: false,
      q_data: q_data,
      h_data: h_data,
      end_time: end_time,
      data_arrs: data_arrs,
    }
  }

  // 弹窗
  renderPopView() {
    const {popVisiable} = this.state;
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

  // 弹窗内容
  renderPopContent() {
    const {popVisiable} = this.state;
    return (
      <BeforePayConfirmPopLayout
        balanceMoney={this.balance}
        needPayMoney={this.total_money}
        clickCancleFunc={() => {
          this.setState({
            popVisiable: !popVisiable
          });
        }}
        clickConfimFunc={(muti) => {
          // muti倍数
          this.buyLotteryRequest(`${(this.totalMoney * muti).toFixed(2)}`, `${muti}`);
          //去支付
          let member_id = "67";
          let rlottery_type_id = "9";
          let num_note = this.total_betnum;
          let multiple = "1";
          let money = this.total_money;
          let num_term = this.state.num_term;
          let play_name = "大乐透";
          let is_bool_append = "1";
          let orderdata = [];
          for (let i = 0; i < this.state.data_arrs.length; i++) {
            let itemarrs = [];
            let itemdata = {
              "q_data": this.state.data_arrs[i].q_data,
              "h_data": this.state.data_arrs[i].h_data,
            }
            itemarrs.push(itemdata);
            orderdata.push(itemarrs);
          }
          orderdata = JSON.stringify(orderdata);//改成all_data
          HappyApi.happybuy(member_id, rlottery_type_id, num_note, multiple, money, num_term, play_name, is_bool_append, orderdata)
            .then((data) => {//接口请求成功执行，后台返回的值data
              //跳转到大乐透页面
              this.clearItem();
              this.clearAll();
              const {navigation} = this.props;
              navigation.navigate('HappyLottery', {});
            }).catch((error) => { //接口请求失败执行
            Toast(error); //错误提示
          });

        }}
      />
    );
  }

  // 乐透下单
  buyLotteryRequest(money, muti) {
    const obj = this.uploadArr;
    const jsonStr = JSON.stringify(obj);
    const {popVisiable} = this.state;
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

  /**
   * 跳转到乐透页
   * @returns {boolean}
   */
  jumpHappy = () => {
    this.clearItem();
    const {navigation} = this.props;
    navigation.navigate('HappyLottery', {});
  }

  confirmFunc = () => {
    const {popVisiable} = this.state;
    this.setState({
      popVisiable: !popVisiable,
    });
  }

  /**
   * 清除按钮
   */
  clearBall = () => {
    this.setState({
      data_arrs: [], //清空one_data数据
    })
    this.clearAll();
  }

  // 增加手工投注
  renderRows(data_arrs) {
    let arrDoms = [];
    for (let i = 0; i < data_arrs.length; i++) {
      this.money = data_arrs[i].money;
      this.betnum = data_arrs[i].betnum;
      this.data_double = data_arrs[i].data_double;
      let q_view = '';
      let h_view = '';
      data_arrs[i].q_data.forEach((item, index) => {
        if (index === 0) {
          q_view += item.num;
        } else {
          q_view += `,${item.num}`;
        }
      })
      data_arrs[i].h_data.forEach((item, index) => {
        if (index === 0) {
          h_view += item.num;
        } else {
          h_view += `,${item.num}`;
        }
      })

      this.q_view = q_view;
      this.h_view = h_view;

      arrDoms.unshift(<View style={styles.HappyContentNum}>
        <Text style={{fontSize: 20}}>直选{this.data_double}式</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
          <Text style={{fontSize: 18, color: '#d44840'}}>{this.q_view}</Text>
          <Text style={{fontSize: 18, color: 'blue'}}>{this.h_view}</Text>
          <Text style={{fontSize: 20}}>{this.betnum}注{this.money}元</Text>
        </View>
      </View>)
    }
    return arrDoms;
  }

  // 增加机选投注
  autoChooseFunc = () => {

    // 生成五个随机数
    let val = '';
    let autoResult = [];//准备一个空数组装结果
    for ( let i = 0; i < 5; i++) {//随机生成5个数
      val = Math.floor(Math.random() * 35 + 1);//[1-35]
      //冒泡排序的方法 进行对比
      for ( let j = 0; j < autoResult.length; j++) {
        if (autoResult[j].num == val) {//如果与之前存在的相比较 相等就重新生成一个数字
          // alert(JSON.stringify(autoResult[j].num)+'--------'+JSON.stringify(val));
          autoResult.splice(j, 1);
          i--;
        }
      }
      // 小于10的数字前面加0
      if (val < 10) {
        autoResult.push({field_no: 'q', num: `0${val}`});
      } else {
        autoResult.push({field_no: 'q', num: `${val}`});
      }
    }

    // 生成2个随机数
    let valTow = '';
    let autoResultTow = [];//准备一个空数组装结果
    for (let i = 0; i < 2; i++) {//随机生成2个数
      valTow = Math.floor(Math.random() * 12 + 1)//[1-35]
      //冒泡排序的方法 进行对比
      for (let j = 0; j < autoResultTow.length; j++) {
        if (autoResultTow[j].num == valTow) {//如果与之前存在的相比较 相等就重新生成一个数字
          autoResultTow.splice(j, 1);
          i--;
        }
      }
      // 小于10的数字前面加0
      if (valTow < 10) {
        autoResultTow.push({field_no: 'h', num: `0${valTow}`});
      } else {
        autoResultTow.push({field_no: 'h', num: `${valTow}`});
      }
    }
    let autoPage = this.state.data_arrs;
    let object = {
      q_data: autoResult,
      h_data: autoResultTow,
      betnum: 1,
      money: 2,
      data_double: '单',
    };
    autoPage.push(object);
    this.setState({
      data_arrs: autoPage,
    });
  }

  renderTotalMoney(alldata) {
    let betnum = 0;
    let money = 0;
    for (let i = 0; i < alldata.length; i++) {
      betnum += parseInt(alldata[i].betnum);
      money += parseInt(alldata[i].money);
    }
    this.total_betnum = betnum;
    this.total_money = money;
    return (<Text style={{color: '#f8da49', fontSize: 20}}>{this.total_betnum}注{this.total_money}元</Text>);
  }

  render() {
    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>确认投注</Text>
        </View>
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text
              style={{color: '#d44840'}}>{this.state.end_time}截止</Text></Text>
            <View style={styles.HappyContentBtn}>
              <Text style={styles.handAdd} onPress={this.jumpHappy}>增加手工投注</Text>
              <Text style={styles.handAdd} onPress={this.autoChooseFunc}>增加机选投注</Text>
            </View>
            {/*根据上一页带来的数据动态生成*/}
            {this.renderRows(this.state.data_arrs)}
          </ScrollView>

        </View>
        <View style={{height: 36, width: '100%', lineHeight: 36, backgroundColor: '#ffffff'}}>
          <Text style={styles.HappyBg}>我已阅读并同意《彩民与彩站交易须知》</Text>
        </View>
        <View style={styles.HappyBgClear}>
          <View style={{flex: 1, width: '25%', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
            <Text onPress={this.clearBall} style={styles.HappyBgClearRight}>清空</Text>
          </View>
          <View style={{flex: 1, width: '45%', flexDirection: 'column', justifyContent: 'center',}}>
            {this.renderTotalMoney(this.state.data_arrs)}
          </View>
          <View style={{flex: 1, width: '30%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text onPress={this.confirmFunc} style={styles.HappyBgClearBuy}>下单去购买</Text>
          </View>
        </View>
        {this.renderPopView()}
        {this.renderProgress()}
      </View>
    );
  }
};



