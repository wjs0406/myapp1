import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet, Button } from 'react-native';




export default class SevenDetail extends Component {

  constructor(props) {
      super(props);

  }

  render() {

    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>订单详情</Text>
        </View>        
        <View style={styles.ContentBackground}>
          <ScrollView>
            <View style={styles.sevenOrderBar}>
              <Text style={{color:'#d44840',height: 44,lineHeight:44,fontSize:20,}}>方案详情</Text>
              <Text style={{color:'#333333',height: 44,lineHeight:44,fontSize:20,}}>订单状态</Text>
            </View>
            <View style={styles.HappyContentBtn}>
              <Text style={{width:'100%',height: 40,lineHeight:40,fontSize:20,borderBottomWidth: 1,borderBottomColor: '#333333',marginRight: 10,}}>大乐透普通第2018126期</Text>
            </View>
            <View style={styles.orderDetailsContent}>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>订单号</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>20663743</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>支付时间</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>2018-10-25 09:44:02</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>投注金额</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>4元</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>订单状态</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>待出票</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>中奖金额</Text>
                <Text style={{height:36, color:'#333333',fontSize:20, }}>0元</Text>
              </View>
            </View>
            <Text style={{height:35,lineHeight:35,fontSize:20,paddingLeft:15,}}>选号详情</Text>

            <View style={styles.orderDetailsNum}>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90,fontSize:20, }}>订单号</Text>
                <View style={{paddingBottom:10,}}>
                  <Text style={{height:22, color:'#999999',fontSize:20, }}>03,08,11,21,24+02,07</Text>
                  <Text style={{height:22, color:'#999999',fontSize:20, }}>03,08,11,21,24+02,07</Text>
                  <Text style={{height:22, color:'#999999',fontSize:20, }}>03,08,11,21,24+02,07</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>倍数</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>1</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>注数</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>2</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <Text style={{width:90, height:36, fontSize:20, }}>是否追加</Text>
                <Text style={{height:36, color:'#999999',fontSize:20, }}>否</Text>
              </View>
              
            </View>


          </ScrollView>
        </View>
      </View>
    );
  }
};



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
  sevenOrderBar:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  HappyContentBtn:{
    width: '100%',
    height: 41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginTop:8,
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
  orderDetailsContent:{
    width: '100%',
    height:200,
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: '#ffffff',
  },
  orderDetailsNum:{
    width: '100%',
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: '#ffffff',
  }

});

