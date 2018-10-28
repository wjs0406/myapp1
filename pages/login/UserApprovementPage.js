import React, { Component } from 'react';
import {
  WebView
} from 'react-native';
import { Toast } from 'teaset';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';

export default class UserApprovementPage extends Component {
  renderProgress() {
    return (
      <CommonProgressLayout
        ref={ref => {
          this.commonProgress = ref;
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          title: '用户协议',
        }}
      >
        <WebView
          source={{ uri: this.props.navigation.state.params.url }}
          onLoadStart={() => {
            this.commonProgress.show();
          }}
          onLoadEnd={() => {
            this.commonProgress.hidden();
          }}
        />
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
