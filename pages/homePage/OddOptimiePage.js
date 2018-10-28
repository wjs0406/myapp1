import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  Alert,
} from 'react-native';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonLayout from '../../components/base/CommonLayout';
import CommonUtils from '../../utils/CommonUtils';
import SoccerLotteryBottomLayout from '../../components/homePage/soccerLottery/SoccerLotteryBottomLayout';
import SoccerLotteryListHeaderLayout from '../../components/homePage/soccerLottery/SoccerLotteryListHeaderLayout';
import OddOptimizeUpLayout from '../../components/homePage/soccerLottery/oddsOptimize/OddOptimizeUpLayout';
import CommonTabView from '../../components/base/CommonTabView';
import OddOptimizeCellLayout from '../../components/homePage/soccerLottery/oddsOptimize/OddOptimizeCellLayout';


const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  listHeaderTextStyle: {
    marginLeft: CommonUtils.ceilWidth(20),
    fontSize: 15,
    color: 'rgb(105,114,137)'
  },
});

export default class OddOptimiePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: [
        { value: '联系方式',
          isDown: true,
          data: [
            { isOpen: false },
          ]
        },
        {
          value: '企业详情',
          isDown: true,
          data: [
            { isOpen: false },
          ]
        },
      ],
    };
  }

  componentDidMount() {
    this.avargeCommon.showContentView();
  }

  // 导航栏
  renderNaviHeader() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            this.clickDownOrUpButton();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.headerTextStyle}>
            确认方案
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // header文字
  renderHeaderText() {
    return (
      <Text style={styles.listHeaderTextStyle}>
        已选
        <Text style={[styles.listHeaderTextStyle, { color: 'rgb(231,56,55)' }]}>
          2
        </Text>
        场比赛 | 过关方式2串1
      </Text>
    );
  }

  // 计划购买 stepper
  renderStepperView() {
    return (
      <OddOptimizeUpLayout />
    );
  }

  // 除了单关cell
  renderListItem(item) {
    return (
      <OddOptimizeCellLayout
        isOpen={item.item.isOpen}
        clickOpenOrCloseFunc={() => {
          const { dataArr } = this.state;
          for (let i = 0; i < dataArr.length; i += 1) {
            const data = dataArr[i];
            if (data.value === item.section.value) {
              const dataModel = data.data[item.index];
              dataModel.isOpen = !dataModel.isOpen;
            }
          }
          this.setState({
            dataArr
          });
        }}
      />
    );
  }

  // sectionList
  renderSectionList() {
    const { dataArr, isRefreshing } = this.state;
    return (
      <SectionList
        style={{ flex: 1, width: CommonUtils.width }}
        renderItem={info => this.renderListItem(info)}
        sections={dataArr}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onEndReachedThreshold={0.1}
      />
    );
  }

  // tab
  renderTabs() {
    return (
      <CommonTabView
        textStyle={{
          fontSize: 15,
        }}
        underLineWidth={32}
        style={{
          paddingBottom: 0,
          backgroundColor: 'white'
        }}
        children={[
          <CommonLayout
            contentView={() => this.renderSectionList()}
            ref={(ref) => {
              this.avargeCommon = ref;
            }}
            tabLabel="平均优化"
          />,
          <CommonLayout
            contentView={() => this.renderSectionList()}
            ref={(ref) => {
              this.hotCommon = ref;
            }}
            tabLabel="博热优化"
          />,
          <CommonLayout
            contentView={() => this.renderSectionList()}
            ref={(ref) => {
              this.coldCommon = ref;
            }}
            tabLabel="搏冷优化"
          />,

        ]}
      />
    );
  }

  // infoHeader
  renderInfoHeader() {
    return (
      <View>
        <View style={{ height: 10, backgroundColor: 'rgb(246,247,248)' }} />
        <SoccerLotteryListHeaderLayout
          height={32}
          isShowArrow={false}
          isShowTopMargin={false}
          renderText={this.renderHeaderText()}
        />
        <View style={{ height: 1, backgroundColor: 'rgb(246,247,248)' }} />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          hasLeft: true,
          hasRight: true,
          rightTitle: '优化说明',
          renderContentFunc: this.renderNaviHeader(),
          // 点击筛选
          onRightPress: () => {

          }
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.renderInfoHeader()}
          {this.renderStepperView()}
          {this.renderTabs()}
        </View>

        <SoccerLotteryBottomLayout
          rightTitle="下单去购买"
          isShowLeft={false}
          confirmFunc={() => {
          }}
        />
      </BaseToolbarLayout>

    );
  }
}
