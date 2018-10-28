import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet, Button } from 'react-native';

// 导入组件，组件js文件名首字母大写，导入省略.js
import Item from '../../components/item/Item';

const styles = StyleSheet.create({
  sevenContent: {
    flex: 1, 
    flexDirection: 'column', 
    backgroundColor: '#d44840',
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
    backgroundColor: 'white',
  },
  ContentDate:{
    height: 44,
    lineHeight:44,
    fontSize:20,
    paddingLeft:20,
  },
  ContentTip:{
    width: '100%',
    height: 64,
    borderTopWidth:1,
    borderTopColor:'#c7c7cb',
    borderBottomColor:'#c7c7cb',
    paddingLeft:20,paddingTop:6,
  },
  ContentTipText:{
    height: 26,
    lineHeight:26,
    fontSize:20,
    color:'#999999'
  },
  sevenContentBtn:{
    flex: 1, 
    height: 181,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#c7c7cb',
  },
  sevenContentBtnLeft:{
    flex: 2, 
    height: 180,
  },
  ContentLeftTitle:{
    fontSize: 24,
    textAlign:'center',
    paddingTop:24,
    fontWeight:'bold'
  },
  ContentRightTop:{
    flex: 6,
    flexDirection: 'column', 
    height: 180,
  },
  ContentBlock:{
    flex: 6,
    flexDirection: 'row',
  },
  ContentBlockBtnUp:{
    width:65,
    height:65,
    borderRadius: 50, 
    backgroundColor: '#ffffff',
    borderWidth:2,
    borderColor:'#e1e1e1',
    borderStyle:'solid',
    marginRight:12,
    marginTop:15,
  },
  ContentBlockBtnUpText:{
    textAlign:'center',
    lineHeight:65,
    color:'#d44840',
    fontSize: 20,
  },
  ContentBlockBtnDown:{
    width:65,
    height:65,
    borderRadius:50,
    backgroundColor:'#ffffff' ,
    borderWidth:2,borderColor:'#e1e1e1',
    borderStyle:'solid',
    marginRight:12,
    marginTop:10,
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

  }

  
  render() {

    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>七星彩</Text>
        </View>        
          <View style={styles.ContentBackground}>
            <ScrollView>
              <Text style={styles.ContentDate}>第2018122期<Text style={{color:'#d44840'}}> 10-19 20:00截止</Text></Text>
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
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第二位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第三位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第四位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第五位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第六位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" />
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>
                <View style={styles.sevenContentBtnLeft}>
                  <Text style={styles.ContentLeftTitle}>第七位</Text>
                </View>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="0" ref='temp'/>
                    <Item no="1" />
                    <Item no="2" />
                    <Item no="3" />
                    <Item no="4" />
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="5" />
                    <Item no="6" />
                    <Item no="7" />
                    <Item no="8" />
                    <Item no="9" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        
          <View style={{flex: 2, width: '100%', backgroundColor: '#d44840',flexDirection: 'row',justifyContent: 'space-between', }}>
            <View style={{flex:1, width:'25%', flexDirection: 'column',justifyContent: 'center',marginLeft:20 }}>
              <Text style={{borderWidth:1,borderColor:'white',height: 45, width: 100,borderRadius:22,color:'white',textAlign:'center',lineHeight:45,fontSize:20}}>清空</Text>
            </View>
            <View style={{flex:1, width:'45%',flexDirection: 'column',justifyContent: 'center', }}>
              <Text style={{color:'#f8da49',fontSize:20}}>1注2元</Text>
            </View>
            <View style={{flex:1, width:'30%',flexDirection: 'column',justifyContent: 'center', }}>
              <Text style={{height: 45, width: 140, backgroundColor: 'white',borderRadius:22,color:'#d44840',textAlign:'center',lineHeight:45,fontSize:20}}>确定</Text>
            </View>
          </View>
      </View>
    );
  }
};



