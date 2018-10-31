import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet } from 'react-native';
import ChooseLotteryTypeLayout from "../homePage/ChooseLotteryTypeLayout";

export default class Item extends Component {
constructor(props) {
    super(props);
    this.state = {

        mystyle:{
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
    }
}

changeSelect=(states,no,site)=>{
  this.props.isSelect = !states;
  if(states){
    this.props.func(0,{field_no:'q',num:no,site:site},this.clearItem);
  }else {
    this.props.func(1,{field_no:'q',num:no,site:site},this.clearItem);
  }

}

// clearItem = () => {
//   this.setState({
//     isSelect:false,
//   })
// }

  render() {
    let mystyle = {
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
    };
    let data = this.props.data;
    for(let i=0 ; i<data.length ; i++){
      let itm = data[i];
      if(itm.num == this.props.no && itm.site == this.props.site){
        mystyle = {
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
        }
        break;
      }
    }
    return (
        <View>
            <Text style={mystyle} onPress={() => {this.changeSelect(this.props.isSelect,this.props.no,this.props.site)}}>{this.props.no}</Text>
        </View>
    );
  }
};




