import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Toast} from 'teaset';
import ModalDropdown from 'react-native-modal-dropdown';
// 导入组件，组件js文件名首字母大写，导入省略.js
import ItemRed from '../../components/item/ItemRed';
import ItemBlue from '../../components/item/ItemBlue';
// 引用接口
import * as HappyApi from '../../api/lotto/HappyApi.js';

const styles = StyleSheet.create({
  sevenContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d44840',
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
    backgroundColor: 'white',
  },
  ContentDate: {
    height: 44,
    lineHeight: 44,
    fontSize: 20,
    paddingLeft: 20,
  },
  ContentTip: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
    borderBottomColor: '#c7c7cb',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ContentTipText: {
    height: 40,
    lineHeight: 40,
    fontSize: 20,
    color: '#999999',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sevenContentBtn: {
    flex: 1,
    height: 181,
    flexDirection: 'row',
  },
  sevenContentBtnLeft: {
    flex: 2,
    height: 180,
  },
  ContentLeftTitle: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 24,
    fontWeight: 'bold'
  },
  ContentRightTop: {
    flex: 1,
    flexDirection: 'column',
    height: 180,
  },
  ContentBlock: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  HappyContentTip: {
    height: 60,
    width: '100%',
    marginTop: 220,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#c7c7cb',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default class HappyLottery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      frontMinNo: 5,  //至少选择的数量
      backMiNNo: 2,
      autoChooseFront: 5, //机选的数量
      autoChooseBack: 2,
      betnum: 0, //几注
      money: 0, //金额
      num_term: '', //第几期
      end_time: '', //截止时间
      q_data: [],
      h_data: [],
      q_data_radom: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      h_data_radom: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      data_arrs: [],
      data_double: '',
    };

  }

  /**
   * 生命周期，render前加载页面
   */
  componentWillMount() {
    //获取期号和截止时间
    let lottery_id = '9';
    HappyApi.termTime(lottery_id).then((data) => {//接口请求成功执行，后台返回的值data
      this.setState({
        num_term: data.num_term,
        end_time: data.end_time,
      })
    }).catch((error) => { //接口请求失败执行
      Toast(error); //错误提示
    });
  }

  /**
   * 点击球触发的事件
   * @param flg判断选中状态
   * @param qiu当前点击的球
   */
  changeBetnum = (flg, qiu) => {
    let q_data = this.state.q_data;
    let h_data = this.state.h_data;
    if (flg === 1) { //选中一个球
      if (qiu.field_no === 'q') { //红球
        q_data.push(qiu);
      } else if ((qiu.field_no === 'h')) { //蓝球
        h_data.push(qiu);
      }
    } else if (flg === 0) { //取消选中一个球
      if (qiu.field_no === 'q') { //红球
        const index = q_data.findIndex(element => (element.num === qiu.num));
        if (index !== -1) {
          q_data.splice(index, 1);
        }
      } else if ((qiu.field_no === 'h')) { //蓝球
        const index = h_data.findIndex(element => (element.num === qiu.num));
        if (index !== -1) {
          h_data.splice(index, 1);
        }
      }
    }
    //重新渲染one_data
    this.setState({
      q_data: q_data,
      h_data: h_data,
    });


    if (this.state.q_data.length === 5 && this.state.h_data.length === 2) {
      this.setState({
        data_double:'单',
      })

    }else{
      this.setState({
        data_double:'复',
      })
    }

    //如果满足最少选择条件，向后台发送请求
    if (this.state.q_data.length >= this.state.frontMinNo && this.state.h_data.length >= this.state.backMiNNo) {
      let qdata = JSON.stringify(this.state.q_data);
      let hdata = JSON.stringify(this.state.h_data);

      HappyApi.happybetnum(qdata, hdata)
        .then((data) => {//接口请求成功执行，后台返回的值data
          this.setState({
            betnum: data.note, //后台返回的值，具体变量名再改
            money: data.note * 2,
          })
        }).catch((error) => { //接口请求失败执行
        Toast(error); //错误提示
      });
    }else{//否则sevbetnum和sevmoney: 变为0
      this.setState({
        betnum: 0,
        money: 0,
      })
    }



  }

  /**
   * 跳转到下一页
   * @returns {boolean}
   */
  jumpDetail = () => {
    const chosed_q_num = this.state.q_data.length;  //当前选中红球的个数
    if (chosed_q_num < this.state.frontMinNo) {
      Toast.info(`至少选择${this.state.frontMinNo}个前区号码!`);
      return false;
    }
    const chosed_h_num = this.state.h_data.length;  //当前选中蓝球的个数
    if (chosed_h_num < this.state.backMiNNo) {
      Toast.info(`至少选择${this.state.backMiNNo}个后区号码!`);
      return false;
    }

    //将one_data、sevbetnum、sevmoney放进all_data
    let data_arrs = this.state.data_arrs;
    let object = {
      q_data: this.state.q_data,
      h_data: this.state.h_data,
      betnum: this.state.betnum,
      money: this.state.money,
      data_double: this.state.data_double,
    };
    data_arrs.push(object);
    this.setState({
      data_arrs: data_arrs,
    })



    if(this.state.money>20000){
      Toast.info(`单注投注额不能超过￥20000`);
      return false;
    }



    const {navigation} = this.props;  //路由，做页面跳转
    navigation.navigate('HappyDetail', {//往跳转的页面传值
      betnum: this.state.betnum, //注数
      money: this.state.money, //金额
      q_data: this.state.q_data,//当前选中的所有红球
      h_data: this.state.h_data,//当前选中的所有蓝球
      num_term: this.state.num_term,//期号
      end_time: this.state.end_time,//截止时间
      data_arrs: this.state.data_arrs,//存放红球和蓝球的数组
      data_double: this.state.data_double,//单复数
      clearItem: this.clearItem,
      clearAll: this.clearItem_all,
    });
  }

  /**
   * 生成随机数
   * @param type : 判断红色机选或者蓝色机选
   * @param nums : 要生成的数量
   * @param limitNo :随机数的上限值
   * @returns {boolean}
   */
  radomNums = (type, nums, limitNo) => {
    let q_data = [];
    let h_data = [];
    if (!nums || !limitNo) {
      return false;
    }
    let result = [];
    for (let i = 0; i < parseInt(nums); i++) {
      result[i] = Math.floor(Math.random() * parseInt(limitNo) + 1);
      // 判断生成的随机数是否相同
      for (var j = 0; j < i; j++) {
        if (result[i] == result[j]) {//如果与之前存在的相比较 相等就重新生成一个数字
          i--;
        }
      }
    }
    // 小于10的数字前面加0
    for(let i = 0; i < result.length; i++){
      if (result[i] < 10) {
        if (type === 'q') {
          q_data.push({field_no: 'q', num: `0${result[i]}`});
        } else {
          h_data.push({field_no: 'h', num: `0${result[i]}`});
        }
      } else {
        if (type === 'q') {
          q_data.push({field_no: 'q', num: `${result[i]}`});
        } else {
          h_data.push({field_no: 'h', num: `${result[i]}`});
        }
      }
    }
    //用来判断单复数和像后台发请求
    let qdataarr = [];
    let hdataarr = [];
    if (type === 'q') {
      this.setState({
        q_data: q_data,
      });
      qdataarr = q_data;
      hdataarr = this.state.h_data;
    } else {
      this.setState({
        h_data: h_data,
      });
      qdataarr = this.state.q_data;
      hdataarr = h_data;
    }

    if (qdataarr.length === 5 && hdataarr.length === 2) {
      this.setState({
        data_double:'单',
      })
      alert
    }else{
      this.setState({
        data_double:'复',
      })
    }
    //如果满足最少选择条件，向后台发送请求
    if (qdataarr.length >= 5 && hdataarr.length >= 2) {
      // alert(`红区${JSON.stringify(qdataarr)}
      //       蓝区${JSON.stringify(hdataarr)}`);
      let qdata = JSON.stringify(qdataarr);
      let hdata = JSON.stringify(hdataarr);

      HappyApi.happybetnum(qdata, hdata)
        .then((data) => {//接口请求成功执行，后台返回的值data
          //alert(JSON.stringify(data));  //对象用这样弹的窗调试
          this.setState({
            betnum: data.note, //后台返回的值，具体变量名再改
            money: data.note * 2,
          })
        }).catch((error) => { //接口请求失败执行
        Toast(error); //错误提示
      });
    }else{//否则sevbetnum和sevmoney: 变为0
      this.setState({
        betnum: 0,
        money: 0,
      })
    }
  }

  /**
   * 点击下拉触发事件
   * @param type
   * @param value
   */
  changeRadomNums = (type, value) => {
    if (type === 'q') {
      this.state.autoChooseFront = value;
    } else if (type === 'h') {
      this.state.autoChooseBack = value;
    }
  }

  /**
   * 清除按钮
   */
  clearItem = () => {
    this.setState({
      q_data: [], //清空one_data数据
      h_data: [], //清空one_data数据
      money: 0,
      betnum: 0,
    })
  }

  /**
   * 第二页清除按钮
   */
  clearItem_all = () => {
    this.setState({
      data_arrs: [], //清空all_data数据
      betnum: 0,
      money: 0,
    })
  }

  render() {
    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>大乐透</Text>
        </View>
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text
              style={{color: '#d44840'}}> {this.state.end_time}截止</Text></Text>
            <View style={styles.ContentTip}>
              <Text style={styles.ContentTipText}><Text>请至少选择<Text>{this.state.frontMinNo}</Text>个前区号码</Text></Text>
              <View style={{flexDirection: 'row',}}>
                <View style={{
                  width: 80,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#c7c7cb',
                  borderRightWidth: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                  <Text style={{fontSize: 20, lineHeight: 50, display: 'none'}}>{this.state.autoChooseFront}</Text>
                  <ModalDropdown options={this.state.q_data_radom} defaultValue={`${this.state.autoChooseFront}   v`}
                                 onSelect={(index, value) => {
                                   this.changeRadomNums('q', value)
                                 }} textStyle={{
                    width: 80,
                    height: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#c7c7cb'
                  }} dropdownStyle={{width: 80, fontSize: 20,}}/>
                </View>
                <Text onPress={() => {
                  this.radomNums('q', this.state.autoChooseFront, 35)
                }} style={{
                  width: 80,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#c7c7cb',
                  fontSize: 18,
                  lineHeight: 50,
                  textAlign: 'center',
                  color: '#d44840'
                }}>机选</Text>
              </View>
            </View>
            <View style={styles.sevenContentBtn}>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <ItemRed no="01" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="02" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="03" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="04" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="05" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="06" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="07" func={this.changeBetnum} data={this.state.q_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <ItemRed no="08" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="09" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="10" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="11" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="12" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="13" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="14" func={this.changeBetnum} data={this.state.q_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <ItemRed no="15" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="16" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="17" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="18" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="19" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="20" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="21" func={this.changeBetnum} data={this.state.q_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <ItemRed no="22" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="23" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="24" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="25" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="26" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="27" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="28" func={this.changeBetnum} data={this.state.q_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <ItemRed no="29" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="30" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="31" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="32" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="33" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="34" func={this.changeBetnum} data={this.state.q_data}/>
                  <ItemRed no="35" func={this.changeBetnum} data={this.state.q_data}/>
                </View>
              </View>
            </View>


            <View style={styles.HappyContentTip}>
              <Text style={styles.ContentTipText}><Text>请至少选择<Text>{this.state.backMiNNo}</Text>个后区号码</Text></Text>
              <View style={{flexDirection: 'row',}}>
                <View style={{
                  width: 80,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#c7c7cb',
                  borderRightWidth: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                  <Text style={{fontSize: 20, lineHeight: 50, display: 'none'}}>{this.state.autoChooseBack}</Text>
                  <ModalDropdown options={this.state.h_data_radom} defaultValue={`${this.state.autoChooseBack}   v`}
                                 onSelect={(index, value) => {
                                   this.changeRadomNums('h', value)
                                 }} textStyle={{
                    width: 80,
                    height: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#c7c7cb'
                  }} dropdownStyle={{width: 80,}}/>
                </View>
                <Text onPress={() => this.radomNums('h', this.state.autoChooseBack, 12)} style={{
                  width: 80,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#c7c7cb',
                  fontSize: 18,
                  lineHeight: 50,
                  textAlign: 'center',
                  color: '#d44840'
                }}>机选</Text>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <ItemBlue no="01" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="02" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="03" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="04" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="05" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="06" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="07" func={this.changeBetnum} dataB={this.state.h_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <ItemBlue no="08" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="09" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="10" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="11" func={this.changeBetnum} dataB={this.state.h_data}/>
                  <ItemBlue no="12" func={this.changeBetnum} dataB={this.state.h_data}/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>


        <View style={{
          flex: 2,
          width: '100%',
          backgroundColor: '#d44840',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{flex: 1, width: '25%', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
            <Text onPress={this.clearItem} style={{
              borderWidth: 1,
              borderColor: 'white',
              height: 45,
              width: 100,
              borderRadius: 22,
              color: 'white',
              textAlign: 'center',
              lineHeight: 45,
              fontSize: 20
            }}>清空</Text>
          </View>
          <View style={{flex: 1, width: '45%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text style={{color: '#f8da49', fontSize: 20}}>{this.state.betnum}注{this.state.money}元</Text>
          </View>
          <View style={{flex: 1, width: '30%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text onPress={this.jumpDetail} style={{
              height: 45,
              width: 140,
              backgroundColor: 'white',
              borderRadius: 22,
              color: '#d44840',
              textAlign: 'center',
              lineHeight: 45,
              fontSize: 20
            }}>确定</Text>
          </View>
        </View>
      </View>
    )
      ;
  }
};



