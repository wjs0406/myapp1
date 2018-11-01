import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
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
    // borderTopWidth: 1,
    // borderTopColor: '#c7c7cb',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7cb',
    backgroundColor: '#ffffff',
  },
  Sevenagree: {
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
  SevenagreeBG: {
    flex: 2,
    width: '100%',
    backgroundColor: '#d44840',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SevenagreeBGright: {
    flex: 1, width: '25%', flexDirection: 'column', justifyContent: 'center', marginLeft: 20
  },
  SevenagreeClear: {
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
  SevenagreeBuy: {
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

export default class SevenDetail extends Component {

  constructor(props) {
    super(props);
    const {sevbetnum, sevmoney, num_term, one_data, end_time, all_data, clearFunc, clearAll} = this.props.navigation.state.params;
    // alert(`上一页带来的大数据串${JSON.stringify(this.props.navigation.state.params)}`)
    this.clearfunc = clearFunc;
    this.clearAll = clearAll;

    this.state = {
      sevbetnum: sevbetnum,
      sevmoney: sevmoney,
      num_term: num_term,
      end_time: end_time,
      popVisiable: false,
      one_data: one_data,
      all_data: all_data,
      q_view: '',
      renderDomArr: [],
    }
  }

  /**
   * 下单支付弹窗
   * @returns {*}
   */
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
        needPayMoney={this.total_sevmoney}
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
          let rlottery_type_id = "10";
          let num_note = this.total_sevbetnum;
          let money = this.total_sevmoney;
          let num_term = this.state.num_term;
          let play_name = "七星彩";
          let multiple = "1";
          let orderdata = [];
          for (let i = 0; i < this.state.all_data.length; i++) {
            orderdata.push(this.state.all_data[i].one_data);
          }
          orderdata = JSON.stringify(orderdata);//改成all_data

          HappyApi.sevenbuy(member_id, rlottery_type_id, num_note, money, num_term, play_name, multiple, orderdata)
            .then((data) => {//接口请求成功执行，后台返回的值data
              // alert(JSON.stringify(data));
              this.clearAll();
              this.clearfunc();

              const {navigation} = this.props;
              navigation.navigate('SevenLottery', {});

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
   * 跳转到七星彩页面
   * @returns {boolean}
   */
  jumpHappy = () => {
    this.clearfunc();
    const {navigation} = this.props;
    navigation.navigate('SevenLottery', {});
  }

  confirmFunc = () => {
    const {popVisiable} = this.state;
    this.setState({
      popVisiable: !popVisiable,
    });
  }

  /**
   * 增加机选投注
   */
  autoChooseSev = () => {
    // 生成五个随机数
    let val = '';
    let autoResult = [];//准备一个空数组装结果
    let tempArr = [];
    for (let i = 0; i < 7; i++) {//随机生成7个数
      val = Math.floor(Math.random() * 7 + 0)//[0-7]
      tempArr.push(`${val}`);
    }
    autoResult.push({field_no: 'q', num: tempArr[0], site: 'one'});
    autoResult.push({field_no: 'q', num: tempArr[1], site: 'two'});
    autoResult.push({field_no: 'q', num: tempArr[2], site: 'three'});
    autoResult.push({field_no: 'q', num: tempArr[3], site: 'four'});
    autoResult.push({field_no: 'q', num: tempArr[4], site: 'five'});
    autoResult.push({field_no: 'q', num: tempArr[5], site: 'six'});
    autoResult.push({field_no: 'q', num: tempArr[6], site: 'seven'});
    let autoPages = this.state.all_data;
    let one_object = {
      one_data: autoResult,
      sevbetnum: 1,
      sevmoney: 2,
      data_double: '单',
    };
    autoPages.push(one_object);
    this.setState({
      all_data: autoPages,
    });
  }

  /**
   * 增加手工投注
   * @param alldata
   * @returns {Array}
   */
  renderContent = (alldata) => {
    //遍历all_data的所有数组
    let arrItem = [];
    for (let i = 0; i < alldata.length; i++) {
      let q_view = '';
      /**
       * 选中的球号显示
       */
      let one_arr = alldata[i].one_data.filter(item => item.site === 'one');
      let two_arr = alldata[i].one_data.filter(item => item.site === 'two');
      let three_arr = alldata[i].one_data.filter(item => item.site === 'three');
      let four_arr = alldata[i].one_data.filter(item => item.site === 'four');
      let five_arr = alldata[i].one_data.filter(item => item.site === 'five');
      let six_arr = alldata[i].one_data.filter(item => item.site === 'six');
      let seven_arr = alldata[i].one_data.filter(item => item.site === 'seven');
      this.sevbetnum = alldata[i].sevbetnum;
      this.sevmoney = alldata[i].sevmoney;
      this.data_double = alldata[i].data_double;
      if (one_arr.length) {
        one_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (two_arr.length) {
        q_view += '|';
        two_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (three_arr.length) {
        q_view += '|';
        three_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (four_arr.length) {
        q_view += '|';
        four_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (five_arr.length) {
        q_view += '|';
        five_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (six_arr.length) {
        q_view += '|';
        six_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      if (seven_arr.length) {
        q_view += '|';
        seven_arr.forEach((item, index) => {
          if (index === 0) {
            q_view += item.num;
          } else {
            q_view += `,${item.num}`;
          }
        })
      }
      this.q_view = q_view;
      arrItem.unshift(
        <View style={styles.HappyContentNum}>
          <Text style={{fontSize: 20}}>直选{this.data_double}式</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            <Text style={{fontSize: 18, color: '#d44840'}}>{this.q_view}</Text>
            <Text style={{fontSize: 20}}>{this.sevbetnum}注{this.sevmoney}元</Text>
          </View>
        </View>
      )
    }
    return arrItem;
  }

  renderTotalMoney(alldata) {
    let sevbetnum = 0;
    let sevmoney = 0;
    for (let i = 0; i < alldata.length; i++) {
      sevbetnum += parseInt(alldata[i].sevbetnum);
      sevmoney += parseInt(alldata[i].sevmoney);
    }
    this.total_sevbetnum = sevbetnum;
    this.total_sevmoney = sevmoney;
    return (<Text style={{color: '#f8da49', fontSize: 20}}>{this.total_sevbetnum}注{this.total_sevmoney}元</Text>);
  }

  /**
   * 清除按钮
   */
  clearItem = () => {
    this.setState({
      all_data: [],
    })
    this.clearAll();
  }
// 页面渲染
  render() {
    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>确认投注</Text>
        </View>
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text
              style={{color: '#d44840'}}> {this.state.end_time}截止</Text></Text>
            <View style={styles.HappyContentBtn}>
              <Text style={styles.handAdd} onPress={this.jumpHappy}>增加手工投注</Text>
              <Text style={styles.handAdd} onPress={this.autoChooseSev}>增加机选投注</Text>
            </View>
            {/*根据上一页带来的数据动态生成*/}
            <View>
              {this.renderContent(this.state.all_data)}
            </View>
          </ScrollView>
        </View>
        <View style={{height: 36, width: '100%', lineHeight: 36, backgroundColor: '#ffffff'}}>
          <Text style={styles.Sevenagree}>我已阅读并同意《彩民与彩站交易须知》</Text>
        </View>
        <View style={styles.SevenagreeBG}>
          <View style={styles.SevenagreeBGright}>
            <Text onPress={this.clearItem} style={styles.SevenagreeClear}>清空</Text>
          </View>
          <View style={{flex: 1, width: '45%', flexDirection: 'column', justifyContent: 'center',}}>
            {this.renderTotalMoney(this.state.all_data)}
          </View>
          <View style={{flex: 1, width: '30%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text onPress={this.confirmFunc} style={styles.SevenagreeBuy}>下单去购买</Text>
          </View>
        </View>
        {this.renderPopView()}
        {this.renderProgress()}
      </View>
    );
  }
};



