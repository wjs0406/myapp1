import React from 'react';
import { requireNativeComponent } from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';


export default class MessageChatPage extends React.Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '实体彩店店名',
          hasLeft: true
        }}
      >
        <OCChatView
          {...this.props}
          style={{
            backgroundColor: '#FAFAFB',
            flex: 1,
          }}
        />
      </BaseToolbarLayout>
    );
  }
}

const OCChatView = requireNativeComponent('RNChatView', MessageChatPage);
