import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet } from 'react-native';

export default class Item extends Component {
constructor(props) {
    super(props);
    this.state = {
        isSelect:false,
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
  this.state.isSelect = !states;
  if(states){
    this.setState({
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
    });
    //this.props.func(0,{field_no:'q',num:no});
    this.props.func(0,{field_no:'q',num:no,site:site});
  }else {
    this.setState({
      mystyle:{
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
    });
    //this.props.func(1,{field_no:'q',num:no});
    this.props.func(1,{field_no:'q',num:no,site:site});
    
  }

}


  render() {
    return (
        <View>
            <Text style={this.state.mystyle} onPress={() => {this.changeSelect(this.state.isSelect,this.props.no,this.props.site)}}>{this.props.no}</Text>
        </View>
    );
  }
};




