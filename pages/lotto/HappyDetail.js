import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import {Toast} from "teaset";
import ScoccerLotteryClickBetPopLayout from "../../components/homePage/soccerLottery/ScoccerLotteryClickBetPopLayout";
import CommonProgressLayout from "../../components/base/CommonProgressLayout";
import BeforePayConfirmPopLayout from '../../components/homePage/soccerLottery/oddsOptimize/BeforePayConfirmPopLayout';

const styles = StyleSheet.create({
  sevenContent: {
    flex: 1, 
    flexDirection: 'column', 
    backgroundColor: '#f4f4f4',
  },
  sevenContentHeader:{
    flex: 1, 
    width: '100%', 
    backgroundColor: '#d44840',
    alignItems: 'center',
  },
  sevenContentTitle:{
    color:'white',
    fontSize: 24,
  },
  ContentBackground:{
    flex: 20,
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  ContentDate:{
    height: 44,
    lineHeight:44,
    fontSize:20,
    paddingLeft:20,
    backgroundColor: '#ffffff',
  },
  HappyContentBtn:{
    width: '100%',
    height: 95,
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingLeft: 45,
    paddingRight: 45,
  },
  handAdd:{
    width: 220,
    height: 60,
    textAlign:'center',
    lineHeight:60,
    color:'#999999',
    borderWidth:1,
    borderColor:'#c7c7cb', 
    marginTop:15,
    fontSize: 18,
  },
  HappyContentNum:{
    width: '100%',
    height:100,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth:1,
    borderTopColor:'#c7c7cb', 
    borderBottomWidth:1,
    borderBottomColor:'#c7c7cb',
    backgroundColor: '#ffffff',
  }

});

export default class HappyDetail extends Component {

  constructor(props) {
      super(props);
      const {sevbetnum, sevmoney, betnum, money,num_term, q_data, h_data} = this.props.navigation.state.params;
      // alert(`上一页带来的大数据串${JSON.stringify(this.props.navigation.state.params)}`)
      //页面显示红球的选中数据串
      let q_view = '';
      let h_view = '';

      q_data.forEach((item,index) => {
        if(index === 0){
            q_view += item.num;
        } else{
            q_view += `,${item.num}`;
        }
      })
      h_data.forEach((item,index) => {
          if(index === 0){
              h_view += item.num;
          } else{
              h_view += `,${item.num}`;
          }
      })

      let q_viewSort = '';

      for(var i=0;i<q_view.length;i++){
          for(var j = i + 1;j<q_view.length;j++){
              if(q_view[i]>q_view[j]){
                  var tmp = q_view[i];
                  q_view[i] = q_view[j];
                  q_view[j] = tmp;
              }
          }
      }

      alert(JSON.stringify(q_view));

      this.state = {
          betnum: betnum,
          money: money,
          num_term: num_term,
          popVisiable: false,
          // clickBetPopisVisiable: false,
          // clickChuanPopVisiable: false,
          q_data:q_data,
          h_data:h_data,
          q_view:q_view,
          h_view:h_view,
      }
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
    // 弹窗内容
    renderPopContent() {
        const { popVisiable } = this.state;
        return (
            <BeforePayConfirmPopLayout
                balanceMoney={this.balance}
                needPayMoney={this.state.money}
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
    // 乐透下单
    buyLotteryRequest(money, muti) {
        const obj = this.uploadArr;
        const jsonStr = JSON.stringify(obj);
        const { popVisiable } = this.state;
        //this.commonProgress.show();
        // HomePageApi.buySoccerLotteryRequest(
        //     global.userId,
        //     this.props.navigation.state.params.id,
        //     money,
        //     muti,
        //     jsonStr,
        //     this.state.chuanText,
        //     this.numNote,
        //     this.numTerm,
        // )
        // .then(response => {
        //     this.setState({
        //         popVisiable: !popVisiable
        //     });
        //     this.commonProgress.hidden();
        //     Toast.success('下单成功');
        //     this.props.navigation.state.params.callBack(this.state.dataArr[0].data);
        //     this.props.navigation.goBack();
        // })
        // .catch(error => {
        //     this.commonProgress.hidden();
        //     this.setState({
        //         popVisiable: !popVisiable
        //     });
        //     global.showErrorMessage(error);
        // });
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
    jumpHappy = ()=>{
        const { navigation } = this.props;
        navigation.navigate('HappyLottery', {});
    }

    confirmFunc = ()=>{
        const { popVisiable } = this.state;
        this.setState({
            popVisiable: !popVisiable,
        });
    }

  render() {

    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>确认投注</Text>
        </View>        
        <View style={styles.ContentBackground}>
          <ScrollView>
            <Text style={styles.ContentDate}>第{this.state.num_term}期<Text style={{color:'#d44840'}}> 10-19 20:00截止</Text></Text>
            <View style={styles.HappyContentBtn}>
              <Text style={styles.handAdd} onPress={this.jumpHappy}>增加手工投注</Text>
              <Text style={styles.handAdd}>增加机选投注</Text>
            </View>
            <View style={styles.HappyContentNum}>
              <Text style={{fontSize: 20}}>直选单式</Text>
              
              <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop:10}}>
                <Text style={{fontSize: 18,color:'#d44840'}}>{this.state.q_view}</Text>
                <Text style={{fontSize: 18,color:'blue'}}>{this.state.h_view}</Text>
                <Text style={{fontSize: 20}}>{this.state.betnum}注{this.state.money}元</Text>
              </View>
                   
            </View>
      
          </ScrollView>
          
        </View>
        <View style={{height:36, width: '100%', lineHeight:36, backgroundColor: '#ffffff'}} >
          <Text style={{height:36, width: '100%', lineHeight:36, fontSize:18,color:'#666666',justifyContent: 'space-between',borderTopWidth:1,borderTopColor:'#c7c7cb',paddingLeft:20, }} >我已阅读并同意《彩民与彩站交易须知》</Text> 
        </View>
        <View style={{flex: 2, width: '100%', backgroundColor: '#d44840',flexDirection: 'row',justifyContent: 'space-between', }}>
          <View style={{flex:1, width:'25%', flexDirection: 'column',justifyContent: 'center',marginLeft:20 }}>
            <Text style={{borderWidth:1,borderColor:'white',height: 45, width: 100,borderRadius:22,color:'white',textAlign:'center',lineHeight:45,fontSize:20}}>清空</Text>
          </View>
          <View style={{flex:1, width:'45%',flexDirection: 'column',justifyContent: 'center', }}>
            <Text style={{color:'#f8da49',fontSize:20}}>{this.state.betnum}注{this.state.money}元</Text>
          </View>
          <View style={{flex:1, width:'30%',flexDirection: 'column',justifyContent: 'center', }}>
            <Text onPress={this.confirmFunc} style={{height: 45, width: 140, backgroundColor: 'white',borderRadius:22,color:'#d44840',textAlign:'center',lineHeight:45,fontSize:20}}>下单去购买</Text>
          </View>
        </View>
        {this.renderPopView()}
        {this.renderProgress()}
      </View>
    );
  }
};



