import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

// 导入组件，组件js文件名首字母大写，导入省略.js
import Item from '../../components/item/Item';
import {Toast} from "teaset";
import * as HappyApi from "../../api/lotto/HappyApi";

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
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
    borderBottomColor: '#c7c7cb',
    paddingLeft: 20, paddingTop: 6,
  },
  ContentTipText: {
    height: 26,
    lineHeight: 26,
    fontSize: 20,
    color: '#999999'
  },
  sevenContentBtn: {
    flex: 1,
    height: 181,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
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
    flex: 6,
    flexDirection: 'column',
    height: 180,
  },
  ContentBlock: {
    flex: 6,
    flexDirection: 'row',
  },
  ContentBlockBtnUp: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderStyle: 'solid',
    marginRight: 12,
    marginTop: 15,
  },
  ContentBlockBtnUpText: {
    textAlign: 'center',
    lineHeight: 65,
    color: '#d44840',
    fontSize: 20,
  },
  ContentBlockBtnDown: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    borderWidth: 2, borderColor: '#e1e1e1',
    borderStyle: 'solid',
    marginRight: 12,
    marginTop: 10,
  },
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  sevenBg: {
    flex: 2,
    width: '100%',
    backgroundColor: '#d44840',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sevenBgClear: {
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
  sevenBgBuy: {
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

export default class SevenLottery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sevbetnum: 0, //几注
      sevmoney: 0, //金额
      num_term: '', //第几期
      end_time: '', //截止时间
      one_data: [], //当前点击的球
      all_data: [], //所有点击的球
      data_double: '',
    }

  }

  /**
   * 生命周期，render前加载页面
   */
  componentWillMount() {
    //获取期号和截止时间
    let lottery_id = '10';
    HappyApi.termTime(lottery_id).then((data) => {//接口请求成功执行，后台返回的值data
      // alert(JSON.stringify(data));
      this.setState({
        num_term: data.num_term, //后台返回的期号
        end_time: data.end_time, //后台返回的截止时间
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
  changeBetnum = (flg, qiu, clearFun) => {
    if (typeof this.clearBall !== "function") {
      this.clearBall = clearFun;
    }
    let one_data = this.state.one_data;
    if (flg === 1) { //选中一个球
      switch (qiu.site) {
        case 'one':
          one_data.push({"field_no": "1", "num": qiu.num, site: qiu.site});
          break;
        case 'two':
          one_data.push({"field_no": "2", "num": qiu.num, site: qiu.site});
          break;
        case 'three':
          one_data.push({"field_no": "3", "num": qiu.num, site: qiu.site});
          break;
        case 'four':
          one_data.push({"field_no": "4", "num": qiu.num, site: qiu.site});
          break;
        case 'five':
          one_data.push({"field_no": "5", "num": qiu.num, site: qiu.site});
          break;
        case 'six':
          one_data.push({"field_no": "6", "num": qiu.num, site: qiu.site});
          break;
        case 'seven':
          one_data.push({"field_no": "7", "num": qiu.num, site: qiu.site});
          break;
        default :
          break;
      }
    } else if (flg === 0) { //取消选中一个球
      const index = one_data.findIndex(element => (element.num === qiu.num && element.site === qiu.site));
      if (index !== -1) {
        one_data.splice(index, 1);
      }
    }
    this.setState({
      one_data: one_data,
    });

    let one_arr = this.state.one_data.filter(item => item.site === 'one');
    let two_arr = this.state.one_data.filter(item => item.site === 'two');
    let three_arr = this.state.one_data.filter(item => item.site === 'three');
    let four_arr = this.state.one_data.filter(item => item.site === 'four');
    let five_arr = this.state.one_data.filter(item => item.site === 'five');
    let six_arr = this.state.one_data.filter(item => item.site === 'six');
    let seven_arr = this.state.one_data.filter(item => item.site === 'seven');

    //判断单复式
    if (one_arr.length === 1 && two_arr.length === 1 && three_arr.length === 1 && four_arr.length === 1 && five_arr.length === 1 && six_arr.length === 1 && seven_arr.length === 1) {
      this.setState({
        data_double:'单',
      })
      alert
    }else{
      this.setState({
        data_double:'复',
      })
    }


    //判断满足7个都选中一个，才会请求接口
    if (one_arr.length !== 0 && two_arr.length !== 0 && three_arr.length !== 0 && four_arr.length !== 0 && five_arr.length !== 0 && six_arr.length !== 0 && seven_arr.length !== 0) {
      let onedata = JSON.stringify(this.state.one_data);
      HappyApi.sevenbetnum(onedata)
        .then((data) => {//接口请求成功执行，后台返回的值data
          this.setState({
            sevbetnum: data.note, //后台返回的值
            sevmoney: data.note * 2,//后台返回的值
          })
        }).catch((error) => { //接口请求失败执行
        Toast(error); //错误提示
      });
    } else {//否则sevbetnum和sevmoney: 变为0
      this.setState({
        sevbetnum: 0,
        sevmoney: 0,
      })
    }
  }

  /**
   * 跳转到确认投注页
   * @returns {boolean}
   */
  jumpDetail = () => {
    let one_arr = this.state.one_data.filter(item => item.site === 'one');
    let two_arr = this.state.one_data.filter(item => item.site === 'two');
    let three_arr = this.state.one_data.filter(item => item.site === 'three');
    let four_arr = this.state.one_data.filter(item => item.site === 'four');
    let five_arr = this.state.one_data.filter(item => item.site === 'five');
    let six_arr = this.state.one_data.filter(item => item.site === 'six');
    let seven_arr = this.state.one_data.filter(item => item.site === 'seven');
    if (!one_arr.length) {
      Toast.info(`第一位至少选中1个数字!`);
      return false;
    }
    if (!two_arr.length) {
      Toast.info(`第二位至少选中1个数字!`);
      return false;
    }
    if (!three_arr.length) {
      Toast.info(`第三位至少选中1个数字!`);
      return false;
    }
    if (!four_arr.length) {
      Toast.info(`第四位至少选中1个数字!`);
      return false;
    }
    if (!five_arr.length) {
      Toast.info(`第五位至少选中1个数字!`);
      return false;
    }
    if (!six_arr.length) {
      Toast.info(`第六位至少选中1个数字!`);
      return false;
    }
    if (!seven_arr.length) {
      Toast.info(`第七位至少选中1个数字!`);
      return false;
    }

    //将one_data、sevbetnum、sevmoney放进all_data
    let all_data = this.state.all_data;
    let one_object = {
      one_data: this.state.one_data,
      sevbetnum: this.state.sevbetnum,
      sevmoney: this.state.sevmoney,
      data_double: this.state.data_double,
    };

    all_data.push(one_object);
    this.setState({
      all_data: all_data,
    })

    const {navigation} = this.props;  //路由，做页面跳转
    navigation.navigate('SevenDetail', {//往跳转的页面传值
      sevbetnum: this.state.sevbetnum, //注数
      sevmoney: this.state.sevmoney, //金额
      num_term: this.state.num_term, //期号
      end_time: this.state.end_time, //截止时间
      one_data: this.state.one_data, //当前选中的所有红球
      all_data: this.state.all_data, //每一个one_data数组放进去
      clearFunc: this.clearItem, //当前页的清除按钮
      clearAll: this.clearItem_all, //确认投注页的清空按钮
    });
  }

  /**
   * 清除按钮
   */
  clearItem = () => {
    this.setState({
      one_data: [], //清空one_data数据
      sevbetnum: 0,
      sevmoney: 0,
    })
    this.clearBall();
  }

  /**
   * 第二页清除按钮
   */
  clearItem_all = () => {
    this.setState({
      all_data: [], //清空all_data数据
      sevbetnum: 0,
      sevmoney: 0,
    })
  }

// 页面渲染
  render() {
    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>七星彩</Text>
        </View>
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text
              style={{color: '#d44840'}}> {this.state.end_time}截止</Text></Text>
            <View style={styles.ContentTip}>
              <Text style={styles.ContentTipText}>每位至少选择1个号</Text>
              <Text style={styles.ContentTipText}>每周二、五、日开奖，最高奖项500万</Text>
            </View>
            {/*第一位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第一位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='one' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='one' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='one' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第二位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第二位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='two' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='two' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='two' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第三位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第三位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='three' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='three' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='three' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第四位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第四位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='four' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='four' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='four' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第五位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第五位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='five' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='five' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='five' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第六位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第六位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='six' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='six' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='six' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
            {/*第七位*/}
            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第七位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='seven' no="0" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="1" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="2" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="3" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="4" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='seven' no="5" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="6" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="7" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="8" func={this.changeBetnum} data={this.state.one_data}/>
                  <Item site='seven' no="9" func={this.changeBetnum} data={this.state.one_data}/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.sevenBg}>
          <View style={{flex: 1, width: '25%', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
            <Text onPress={this.clearItem} style={styles.sevenBgClear}>清空</Text>
          </View>
          <View style={{flex: 1, width: '45%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text style={{color: '#f8da49', fontSize: 20}}>{this.state.sevbetnum}注{this.state.sevmoney}元</Text>
          </View>
          <View style={{flex: 1, width: '30%', flexDirection: 'column', justifyContent: 'center',}}>
            <Text onPress={this.jumpDetail} style={styles.sevenBgBuy}>确定</Text>
          </View>
        </View>
      </View>
    );
  }
};



