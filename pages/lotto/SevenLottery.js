import React, {Component} from 'react';
import {AppRegistry, View, Text, ScrollView, StyleSheet, Button} from 'react-native';

// 导入组件，组件js文件名首字母大写，导入省略.js
import Item from '../../components/item/Item';
import {Toast} from "teaset";

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
});


export default class SevenLottery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sevbetnum: 0, //几注
      sevmoney: 0, //金额
      num_term: '2018123', //第几期
      one_data: [],
    }
  }


  /**
   * 点击球触发的事件
   * @param flg
   * @param qiu
   */
  changeBetnum = (flg, qiu) => {
    if (flg === 1) { //选中一个球
      // if(qiu.site === 'one'){//第一位
      //   this.state.one_data.push({"field_no":"1","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'two'){
      //   this.state.one_data.push({"field_no":"2","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'three'){
      //   this.state.one_data.push({"field_no":"3","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'four'){
      //   this.state.one_data.push({"field_no":"4","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'five'){
      //   this.state.one_data.push({"field_no":"5","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'six'){
      //   this.state.one_data.push({"field_no":"6","num":qiu.num,site:qiu.site});
      // }else if(qiu.site === 'seven'){
      //   this.state.one_data.push({"field_no":"7","num":qiu.num,site:qiu.site});
      // }

      switch (qiu.site) {
        case 'one':
          this.state.one_data.push({"field_no":"1","num":qiu.num,site:qiu.site});
          break;
        case 'two':
          this.state.one_data.push({"field_no":"2","num":qiu.num,site:qiu.site});
          break;
        case 'three':
          this.state.one_data.push({"field_no":"3","num":qiu.num,site:qiu.site});
          break;
        case 'four':
          this.state.one_data.push({"field_no":"4","num":qiu.num,site:qiu.site});
          break;
        case 'five':
          this.state.one_data.push({"field_no":"5","num":qiu.num,site:qiu.site});
          break;
        case 'six':
          this.state.one_data.push({"field_no":"6","num":qiu.num,site:qiu.site});
          break;
        case 'seven':
          this.state.one_data.push({"field_no":"7","num":qiu.num,site:qiu.site});
          break;
          default :
          break;
      }

    } else if (flg === 0) { //取消选中一个球
      const index = this.state.one_data.findIndex(element => (element.num === qiu.num && element.site === qiu.site));
      if (index !== -1) {
        this.state.one_data.splice(index, 1);
      }
    }

    let one_arr = this.state.one_data.filter(item => item.site === 'one');
    let two_arr = this.state.one_data.filter(item => item.site === 'two');
    let three_arr = this.state.one_data.filter(item => item.site === 'three');
    let four_arr = this.state.one_data.filter(item => item.site === 'four');
    let five_arr = this.state.one_data.filter(item => item.site === 'five');
    let six_arr = this.state.one_data.filter(item => item.site === 'six');
    let seven_arr = this.state.one_data.filter(item => item.site === 'seven');


    //判断满足7个都选中一个，才会请求接口
    if(one_arr.length !== 0 && two_arr.length !== 0 && three_arr.length !== 0 && four_arr.length !==0 && five_arr.length !== 0 && six_arr.length !== 0 && seven_arr.length !== 0){
      // 临时写死部分=========
      let tmpnum = this.state.sevbetnum + 1;
      let tmpmoney = tmpnum * 2;

      this.setState({
        sevbetnum: tmpnum,
        sevmoney: tmpmoney,
      })
      // end 临时写死部分=========


      //请求接口示例
      /*homePageApi.getBuyLotteryNumRequest(params).then((data) => {//接口请求成功执行，后台返回的值data
          alert(JSON.stringify(data));  //对象用这样弹的窗调试
          this.setState({
              betnum: data.tmpnum, //后台返回的值，具体变量名再改
              money: data.tmpmoney,
          })
      }).catch((error) => { //接口请求失败执行
          Toast(error); //错误提示
      });*/
    }

  }

  /**
   * 跳转到下一页
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
    if(!one_arr.length){
      Toast.info(`第一位至少选中1个数字!`);
      return false;
    }
    if(!two_arr.length){
      Toast.info(`第二位至少选中1个数字!`);
      return false;
    }
    if(!three_arr.length){
      Toast.info(`第三位至少选中1个数字!`);
      return false;
    }
    if(!four_arr.length){
      Toast.info(`第四位至少选中1个数字!`);
      return false;
    }
    if(!five_arr.length){
      Toast.info(`第五位至少选中1个数字!`);
      return false;
    }
    if(!six_arr.length){
      Toast.info(`第六位至少选中1个数字!`);
      return false;
    }
    if(!seven_arr.length){
      Toast.info(`第七位至少选中1个数字!`);
      return false;
    }

    const {navigation} = this.props;  //路由，做页面跳转
    navigation.navigate('SevenDetail', {
      sevbetnum: this.state.sevbetnum, //往跳转的页面传值，变量名：betnum  注数
      sevmoney: this.state.sevmoney, //金额元
      one_data: this.state.one_data,//当前选中的所有红球
      num_term: this.state.num_term,//期号
    });
  }


  render() {

    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>七星彩</Text>
        </View>
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text style={{color: '#d44840'}}> 10-19
              20:00截止</Text></Text>
            <View style={styles.ContentTip}>
              <Text style={styles.ContentTipText}>每位至少选择1个号</Text>
              <Text style={styles.ContentTipText}>每周二、五、日开奖，最高奖项500万</Text>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第一位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='one' no="0" func={this.changeBetnum}/>
                  <Item site='one' no="1" func={this.changeBetnum}/>
                  <Item site='one' no="2" func={this.changeBetnum}/>
                  <Item site='one' no="3" func={this.changeBetnum}/>
                  <Item site='one' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='one' no="5" func={this.changeBetnum}/>
                  <Item site='one' no="6" func={this.changeBetnum}/>
                  <Item site='one' no="7" func={this.changeBetnum}/>
                  <Item site='one' no="8" func={this.changeBetnum}/>
                  <Item site='one' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第二位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='two' no="0" func={this.changeBetnum}/>
                  <Item site='two' no="1" func={this.changeBetnum}/>
                  <Item site='two' no="2" func={this.changeBetnum}/>
                  <Item site='two' no="3" func={this.changeBetnum}/>
                  <Item site='two' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='two' no="5" func={this.changeBetnum}/>
                  <Item site='two' no="6" func={this.changeBetnum}/>
                  <Item site='two' no="7" func={this.changeBetnum}/>
                  <Item site='two' no="8" func={this.changeBetnum}/>
                  <Item site='two' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第三位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='three' no="0" func={this.changeBetnum}/>
                  <Item site='three' no="1" func={this.changeBetnum}/>
                  <Item site='three' no="2" func={this.changeBetnum}/>
                  <Item site='three' no="3" func={this.changeBetnum}/>
                  <Item site='three' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='three' no="5" func={this.changeBetnum}/>
                  <Item site='three' no="6" func={this.changeBetnum}/>
                  <Item site='three' no="7" func={this.changeBetnum}/>
                  <Item site='three' no="8" func={this.changeBetnum}/>
                  <Item site='three' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第四位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='four' no="0" func={this.changeBetnum}/>
                  <Item site='four' no="1" func={this.changeBetnum}/>
                  <Item site='four' no="2" func={this.changeBetnum}/>
                  <Item site='four' no="3" func={this.changeBetnum}/>
                  <Item site='four' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='four' no="5" func={this.changeBetnum}/>
                  <Item site='four' no="6" func={this.changeBetnum}/>
                  <Item site='four' no="7" func={this.changeBetnum}/>
                  <Item site='four' no="8" func={this.changeBetnum}/>
                  <Item site='four' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第五位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='five' no="0" func={this.changeBetnum}/>
                  <Item site='five' no="1" func={this.changeBetnum}/>
                  <Item site='five' no="2" func={this.changeBetnum}/>
                  <Item site='five' no="3" func={this.changeBetnum}/>
                  <Item site='five' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='five' no="5" func={this.changeBetnum}/>
                  <Item site='five' no="6" func={this.changeBetnum}/>
                  <Item site='five' no="7" func={this.changeBetnum}/>
                  <Item site='five' no="8" func={this.changeBetnum}/>
                  <Item site='five' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第六位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='six' no="0" func={this.changeBetnum}/>
                  <Item site='six' no="1" func={this.changeBetnum}/>
                  <Item site='six' no="2" func={this.changeBetnum}/>
                  <Item site='six' no="3" func={this.changeBetnum}/>
                  <Item site='six' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='six' no="5" func={this.changeBetnum}/>
                  <Item site='six' no="6" func={this.changeBetnum}/>
                  <Item site='six' no="7" func={this.changeBetnum}/>
                  <Item site='six' no="8" func={this.changeBetnum}/>
                  <Item site='six' no="9" func={this.changeBetnum}/>
                </View>
              </View>
            </View>

            <View style={styles.sevenContentBtn}>
              <View style={styles.sevenContentBtnLeft}>
                <Text style={styles.ContentLeftTitle}>第七位</Text>
              </View>
              <View style={styles.ContentRightTop}>
                <View style={styles.ContentBlock}>
                  <Item site='seven' no="0" func={this.changeBetnum}/>
                  <Item site='seven' no="1" func={this.changeBetnum}/>
                  <Item site='seven' no="2" func={this.changeBetnum}/>
                  <Item site='seven' no="3" func={this.changeBetnum}/>
                  <Item site='seven' no="4" func={this.changeBetnum}/>
                </View>
                <View style={styles.ContentBlock}>
                  <Item site='seven' no="5" func={this.changeBetnum}/>
                  <Item site='seven' no="6" func={this.changeBetnum}/>
                  <Item site='seven' no="7" func={this.changeBetnum}/>
                  <Item site='seven' no="8" func={this.changeBetnum}/>
                  <Item site='seven' no="9" func={this.changeBetnum}/>
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
          <View style={{
            flex: 1,
            width: '25%',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 20
          }}>
            <Text style={{
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
            <Text style={{color: '#f8da49', fontSize: 20}}>{this.state.sevbetnum}注{this.state.sevmoney}元</Text>
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
    );
  }
};



