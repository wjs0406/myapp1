import React from 'react';
import {
  NativeModules,
  findNodeHandle,
} from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import TabBarItem from '../../components/base/TabBarItem';
import MessageItemLayout from '../../components/message/MessageItemLayout';
import CommonList from '../../components/base/CommonList';
import CommonUtils from '../../utils/CommonUtils';

const messageSel = require('../../image/message/messageSel.png');
const messageNor = require('../../image/message/messageNor.png');
const avatar = require('../../image/mine/user.png');

export default class MessagePage extends React.Component {
  static navigationOptions() {
    return {
      header: null,
      tabBarLabel: '消息',
      tabBarIcon: ({ focused }) => (
        <TabBarItem
          focused={focused}
          normalImage={messageNor}
          selectedImage={messageSel}
        />
      ),
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          title: '消息',
          hasLeft: false
        }}
      >
        <MessageItemLayout
          ref={ref => {
            this.message = ref;
          }}
          avatar={avatar}
          title={'客服'}
          details={'点击进入客服聊天页面'}
          // time={'2018/3/8'}
          onPress={() => {
            NativeModules.MessageManager.pushViewController(findNodeHandle(this.message));
          }}
        />
      </BaseToolbarLayout>
    );
  }
}
