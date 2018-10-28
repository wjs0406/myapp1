import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView, StyleSheet } from 'react-native';


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



export default class Item extends Component {
constructor(props) {
    super(props);
        this.state = {
            isSelect:false,
            mystyle : {
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
              marginRight:12,
              marginTop:15,
            }
    }
}

changeSelect=(states)=>{
  
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
        marginRight:12,
        marginTop:15,
      },
    });
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
        marginRight:12,
        marginTop:15,
      },
    });
  }
}



  render() {

    return (
      <View>
        <Text style={this.state.mystyle} onPress={() => {this.changeSelect(this.state.isSelect)}}>{this.props.no}</Text>
      </View>
      
    );
  }
};




