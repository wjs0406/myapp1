import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Toast } from 'teaset';
import ModalDropdown from 'react-native-modal-dropdown';
// 导入组件，组件js文件名首字母大写，导入省略.js
import Item from '../../components/item/Item';
import ItemBlue from '../../components/item/ItemBlue';

// 引用接口示例
// import * as homePageApi from '../../api/homePage/HomePageApi.js';

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
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth:1,
    borderTopColor:'#c7c7cb',
    borderBottomColor:'#c7c7cb',
    paddingTop:15,
    paddingLeft:20,
    paddingRight:20,
  },
  ContentTipText:{
    height: 40,
    lineHeight:40,
    fontSize:20,
    color:'#999999',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sevenContentBtn:{
    flex: 1,
    height: 181,
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'column',
    height: 180,
  },
  ContentBlock:{
    flexDirection: 'row',
    paddingLeft: 12,
  },
  HappyContentTip:{
    height: 60,
    width: '100%',
    marginTop: 145,
    backgroundColor:'#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor:'#c7c7cb',
    paddingLeft:20,
    paddingRight:20,
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
        betnum : 0, //几注
        money : 0, //金额
        num_term: '2018123', //第几期
        // qiu : [],
        q_data : [],
        h_data : [],
        q_data_radom: [5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        h_data_radom:[2,3,4,5,6,7,8,9,10,11,12],
        redBallDefault : {
            width:65,
            height:65,
            borderRadius: 50,
            backgroundColor: '#ffffff',
            borderWidth:2,
            borderColor:'#e1e1e1',
            borderStyle:'solid',
            textAlign:'center',
            lineHeight:65,
            color:'#d44840',
            fontSize: 20,
            marginRight:10,
            marginTop:12,
        },
        redBallChoose:{
            width:65,
            height:65,
            borderRadius: 50,
            backgroundColor: '#d44840',
            borderWidth:2,
            borderColor:'#e1e1e1',
            borderStyle:'solid',
            textAlign:'center',
            lineHeight:65,
            color:'#ffffff',
            fontSize: 20,
            marginRight:10,
            marginTop:12,
        },
      };
      this.clearItem();//清空所有的球，放到生命周期钩子里
      //页面加载完调用接口
  }


    changeBallColor = (flg,qiu)=> {
        this.setState({
            betnum: tmpnum,
            money: tmpmoney,
        })
    }

    /**
     * 点击球触发的事件
     * @param flg
     * @param qiu
     */
  changeBetnum = (flg,qiu)=>{
    if(flg === 1) { //选中一个球
        if(qiu.field_no === 'q'){ //红球
            this.state.q_data.push(qiu);
        } else if((qiu.field_no === 'h')){ //篮球
            this.state.h_data.push(qiu);
        }
    } else if(flg === 0){ //取消选中一个球
        if(qiu.field_no === 'q'){ //红球
          const index = this.state.q_data.findIndex(element => (element.num === qiu.num));
          if(index !== -1){
              this.state.q_data.splice(index, 1);
          }
        } else if((qiu.field_no === 'h')){ //篮球
            const index = this.state.h_data.findIndex(element => (element.num === qiu.num));
            if(index !== -1){
                this.state.h_data.splice(index, 1);
            }
        }
    }

    //如果满足最少选择条件，向后台发送请求
    if(this.state.q_data.length >= this.state.frontMinNo && this.state.h_data.length >= this.state.backMiNNo){

      // 临时写死部分=========
    let tmpnum = this.state.betnum+1;
    let tmpmoney = tmpnum*2;

    this.setState({
        betnum:tmpnum,
        money: tmpmoney,
    })
      // end 临时写死部分=========

    //请求接口示例
      const params = { //往后台传的值
        "member_id":"123",
        "rlottery_type_id":"10",
        "money":this.state.money,
        "num_term":"20181024",
        "play_name":"七星彩",
        "multiple":"12", //倍数
        "orderInfo":[q_data,h_data]
      }
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
  jumpDetail = ()=>{
    const chosed_q_num = this.state.q_data.length;  //当前选中红球的个数
    if(chosed_q_num < this.state.frontMinNo){
        Toast.info(`至少选择${this.state.frontMinNo}个前区号码!`);
      return false;
    }
    const chosed_h_num = this.state.h_data.length;  //当前选中蓝球的个数
    if(chosed_h_num < this.state.backMiNNo){
        Toast.info(`至少选择${this.state.backMiNNo}个后区号码!`);
        return false;
    }

    const { navigation } = this.props;  //路由，做页面跳转
    navigation.navigate('HappyDetail', {
      betnum: this.state.betnum, //往跳转的页面传值，变量名：betnum  注数
      money: this.state.money, //金额元
      q_data: this.state.q_data,//当前选中的所有红球
      h_data: this.state.h_data,//当前选中的所有蓝球
      num_term: this.state.num_term,//期号
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
    if(!nums || !limitNo) {
      return false;
    }
    if(type === 'q'){
        this.state.q_data = [];
    }else{
        this.state.h_data = [];
    }
    for(let i=0;i < parseInt(nums);i++){
      let temp = Math.floor(Math.random()*parseInt(limitNo) + 1);
      if(temp < 10){
        if(type === 'q'){
            this.state.q_data.push({field_no:'q',num:`0${temp}`});
        }else{
            this.state.h_data.push({field_no:'h',num:`0${temp}`});
        }
      } else {
          if(type === 'q'){
              this.state.q_data.push({field_no:'q',num:`${temp}`});
          }else{
              this.state.h_data.push({field_no:'h',num:`${temp}`});
          }
      }
    }
    alert(`红区${JSON.stringify(this.state.q_data)}
            蓝区${JSON.stringify(this.state.h_data)}`);
  }

    /**
     * 点击下拉触发事件
     * @param type
     * @param value
     */
  changeRadomNums = (type,value) => {
    if(type === 'q'){
        this.state.autoChooseFront = value;
    } else if(type === 'h'){
        this.state.autoChooseBack = value;
    }
  }

  /**
   * 清除按钮
   */
  clearItem = () => {
    this.state.q_data = [];
    this.state.h_data = [];
  }

  render() {

    return (
      <View style={styles.sevenContent}>
        <View style={styles.sevenContentHeader}>
          <Text style={styles.sevenContentTitle}>大乐透</Text>
        </View>        
          <View style={styles.ContentBackground}>
            
              <Text style={styles.ContentDate}>第{this.state.num_term}期<Text style={{color:'#d44840'}}> 10-19 20:00截止</Text></Text>
              <View style={styles.ContentTip}>
                <Text style={styles.ContentTipText}><Text>请至少选择<Text>{this.state.frontMinNo}</Text>个前区号码</Text></Text>
                <View style={{flexDirection: 'row', }}>
                  <View style={{width:80,height:50,borderWidth:1,borderColor:'#c7c7cb',borderRightWidth:0,flexDirection: 'row', justifyContent: 'space-evenly',}}>
                    <Text style={{fontSize:20,lineHeight:50,display:'none'}}>{this.state.autoChooseFront}</Text>
                    <ModalDropdown options={this.state.q_data_radom} defaultValue={`${this.state.autoChooseFront}   v`} onSelect={(index,value) => {this.changeRadomNums('q',value)}} textStyle={{width:80,height:48,lineHeight:48,textAlign:'center',fontSize:20,color:'#c7c7cb'}} dropdownStyle={{width:80,fontSize:20,}}/>
                  </View>
                  <Text onPress={() => {this.radomNums('q',this.state.autoChooseFront,35)}} style={{width:80,height:50,borderWidth:1,borderColor:'#c7c7cb',fontSize:18,lineHeight:50,textAlign:'center',color:'#d44840'}}>机选</Text>
                </View>
              </View>
              <View style={styles.sevenContentBtn}>
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <Item no="01" func={this.changeBetnum}/>
                    <Item no="02" func={this.changeBetnum}/>
                    <Item no="03" func={this.changeBetnum}/>
                    <Item no="04" func={this.changeBetnum}/>
                    <Item no="05" func={this.changeBetnum}/>
                    <Item no="06" func={this.changeBetnum}/>
                    <Item no="07" func={this.changeBetnum}/>
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="08" func={this.changeBetnum}/>
                    <Item no="09" func={this.changeBetnum}/>
                    <Item no="10" func={this.changeBetnum}/>
                    <Item no="11" func={this.changeBetnum}/>
                    <Item no="12" func={this.changeBetnum}/>
                    <Item no="13" func={this.changeBetnum}/>
                    <Item no="14" func={this.changeBetnum}/>
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="15" func={this.changeBetnum}/>
                    <Item no="16" func={this.changeBetnum}/>
                    <Item no="17" func={this.changeBetnum}/>
                    <Item no="18" func={this.changeBetnum}/>
                    <Item no="19" func={this.changeBetnum}/>
                    <Item no="20" func={this.changeBetnum}/>
                    <Item no="21" func={this.changeBetnum}/>
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="22" func={this.changeBetnum}/>
                    <Item no="23" func={this.changeBetnum}/>
                    <Item no="24" func={this.changeBetnum}/>
                    <Item no="25" func={this.changeBetnum}/>
                    <Item no="26" func={this.changeBetnum}/>
                    <Item no="27" func={this.changeBetnum}/>
                    <Item no="28" func={this.changeBetnum}/>
                  </View>
                  <View style={styles.ContentBlock}>
                    <Item no="29" func={this.changeBetnum}/>
                    <Item no="30" func={this.changeBetnum}/>
                    <Item no="31" func={this.changeBetnum}/>
                    <Item no="32" func={this.changeBetnum}/>
                    <Item no="33" func={this.changeBetnum}/>
                    <Item no="34" func={this.changeBetnum}/>
                    <Item no="35" func={this.changeBetnum}/>
                  </View>
                </View>
              </View>

         
              <View style={styles.HappyContentTip}>
                <Text style={styles.ContentTipText}><Text>请至少选择<Text>{this.state.backMiNNo}</Text>个后区号码</Text></Text>
                <View style={{flexDirection: 'row', }}>
                  <View style={{width:80,height:50,borderWidth:1,borderColor:'#c7c7cb',borderRightWidth:0,flexDirection: 'row', justifyContent: 'space-evenly',}}>
                    <Text style={{fontSize:20,lineHeight:50,display:'none'}}>{this.state.autoChooseBack}</Text>
                      <ModalDropdown options={this.state.h_data_radom} defaultValue={`${this.state.autoChooseBack}   v`} onSelect={(index,value) => {this.changeRadomNums('h',value)}} textStyle={{width:80,height:48,lineHeight:48,textAlign:'center',fontSize:20,color:'#c7c7cb'}} dropdownStyle={{width:80,}}/>
                  </View>
                  <Text  onPress={() => this.radomNums('h',this.state.autoChooseBack,12)} style={{width:80,height:50,borderWidth:1,borderColor:'#c7c7cb',fontSize:18,lineHeight:50,textAlign:'center',color:'#d44840'}}>机选</Text>
                </View>
              </View>

              <View style={styles.sevenContentBtn}>          
                <View style={styles.ContentRightTop}>
                  <View style={styles.ContentBlock}>
                    <ItemBlue no="01" func={this.changeBetnum}/>
                    <ItemBlue no="02" func={this.changeBetnum}/>
                    <ItemBlue no="03" func={this.changeBetnum}/>
                    <ItemBlue no="04" func={this.changeBetnum}/>
                    <ItemBlue no="05" func={this.changeBetnum}/>
                    <ItemBlue no="06" func={this.changeBetnum}/>
                    <ItemBlue no="07" func={this.changeBetnum}/>
                  </View>
                  <View style={styles.ContentBlock}>
                    <ItemBlue no="08" func={this.changeBetnum}/>
                    <ItemBlue no="09" func={this.changeBetnum}/>
                    <ItemBlue no="10" func={this.changeBetnum}/>
                    <ItemBlue no="11" func={this.changeBetnum}/>
                    <ItemBlue no="12" func={this.changeBetnum}/>
                  </View>
                
                </View>
              </View> 
            </View>
           
                
        <View style={{flex: 2, width: '100%', backgroundColor: '#d44840',flexDirection: 'row',justifyContent: 'space-between', }}>
          <View style={{flex:1, width:'25%', flexDirection: 'column',justifyContent: 'center',marginLeft:20 }}>
            <Text onPress={this.clearItem} style={{borderWidth:1,borderColor:'white',height: 45, width: 100,borderRadius:22,color:'white',textAlign:'center',lineHeight:45,fontSize:20}}>清空</Text>
          </View>
          <View style={{flex:1, width:'45%',flexDirection: 'column',justifyContent: 'center', }}>
            <Text style={{color:'#f8da49',fontSize:20}}>{this.state.betnum}注{this.state.money}元</Text>
          </View>
          <View style={{flex:1, width:'30%',flexDirection: 'column',justifyContent: 'center', }}>
            <Text onPress={this.jumpDetail} style={{height: 45, width: 140, backgroundColor: 'white',borderRadius:22,color:'#d44840',textAlign:'center',lineHeight:45,fontSize:20}}>确定</Text>
          </View>
        </View>
      </View>
    );
  }
};



