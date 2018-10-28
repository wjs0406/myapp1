import React from 'react';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import CommonList from '../../../components/base/CommonList';
import MineBankItem from '../../../components/mine/mineCharge/MineBankItem';
import CommonUtils from '../../../utils/CommonUtils';

export default class MineBankPage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  componentDidMount() {
    this.commonList.commonLayout.showContentView();
  }

  renderItem = item => (
    <MineBankItem
      title={'建设银行'}
      cashCard={{ name: '储蓄卡', single: '5000', day: '3万', month: '10万' }}
      creditCard={{ name: '信用卡', single: '5000', day: '3万', month: '10万' }}
      backgroundColor={item.index % 2 === 0 ? 'rgba(1,13,45, 0.05)' : 'white'}
      onPress={() => {
        this.props.navigation.state.params.callBack();
        this.props.navigation.goBack();
      }}
    />
  );

  render() {
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '可用银行列表与限额',
          hasLeft: true,
        }}
      >
        <MineBankItem
          title={'银行'}
          cashCard={{ name: '卡种', single: '单笔', day: '单日', month: '单月' }}
          single
          style={{ height: 41, width: CommonUtils.width, flex: 0 }}
        />
        <CommonList
          ref={ref => {
            this.commonList = ref;
          }}
          renderItem={this.renderItem}
        />
      </BaseToolbarLayout>
    );
  }
}
