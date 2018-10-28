import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
import TabBarItem from '../../components/base/TabBarItem';
import CommonList from '../../components/base/CommonList';
import BaseToolbarLayout from '../../components/base/BaseToolbarLayout';
import CommonUtils from '../../utils/CommonUtils';
import ImmeMatchPointLayout from '../../components/matchPoint/ImmeMatchPointLayout';
import RecommendListCellLayout from '../../components/recommend/RecommendListCellLayout';
import * as RecommendApi from '../../api/recommend/RecommendApi';
import CommonProgressLayout from '../../components/base/CommonProgressLayout';


const search = require('../../image/matchPoint/Home_ic_Search.png');

const styles = StyleSheet.create({

});

const recomSel = require('../../image/recommend/Tabbar_ic_FollowbillSel.png');
const recomNor = require('../../image/recommend/Tabbar_ic_RecommendNor.png');

export default class RecommendHomePage extends Component {

  static navigationOptions() {
    return {
      header: null,
      headerModel: 'float',
      tabBarLabel: '推荐',
      tabBarIcon: ({ focused }) => (
        <TabBarItem
          focused={focused}
          normalImage={recomNor}
          selectedImage={recomSel}
        />
      )
    };
  }

  renderProgress() {
    return (
      <CommonProgressLayout
        ref={ref => {
          this.commonProgress = ref;
        }}
      />
    );
  }

  componentDidMount() {
    // this.CommonList.commonLayout.showContentView();
  }

  componentWillMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.CommonList.refreshList();
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  // 推荐下单
  buyLotteryRequest(money, muti, id) {
    const obj = { match: this.uploadArr };
    const jsonStr = JSON.stringify(obj);
    RecommendApi.buyRecommendRequest(
      global.userId,
      id,
      money,
      muti,
      jsonStr
    )
      .then(() => {
        this.commonProgress.hidden();
        Toast.success('下单成功');
      })
      .catch(error => {
        this.commonProgress.hidden();
        global.showErrorMessage(error);
      });
  }

  // 导航栏
  renderHeader() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          推荐列表
        </Text>
      </View>
    );
  }

  // 添加上传数据
  updateUploadArr(type, match, odds, value, field_time) {
    this.uploadArr.push({
      field_no: match.ID,
      name: type,
      odds,
      value,
      home_name: match.Home,
      away_name: match.Away,
      field_time,
    });
  }

  // 遍历选择数据
  calculateBonues(dataArr) {
    this.uploadArr = [];
    for (let i = 0; i < dataArr.length; i += 1) {
      const match = dataArr[i];
      for (let j = 0; j < match.htChoose.length; j += 1) {
        const key = match.htChoose[j];
        if (match.rq != null && match.rq[key] != null) {
          this.updateUploadArr('rq', match, match.rq[key], key, match.MatchTime);
        } else if (match.sf != null && match.sf[key] != null) {
          this.updateUploadArr('sf', match, match.sf[key], key, match.MatchTime);
        } else if (match.bqc != null && match.bqc[key] != null) {
          this.updateUploadArr('bqc', match, match.bqc[key], key, match.MatchTime);
        } else if (match.jq != null && match.jq[key] != null) {
          this.updateUploadArr('jq', match, match.jq[key], key, match.MatchTime);
        } else if (match.bf != null && match.bf[key] != null) {
          this.updateUploadArr('bf', match, match.bf[key], key, match.MatchTime);
        } else if (key === 'rfwin') {
          this.updateUploadArr('rf', match, match.rf.win, 'win', match.MatchTime);
        } else if (key === 'rflose') {
          this.updateUploadArr('rf', match, match.rf.lose, 'lose', match.MatchTime);
        } else if (match.fc != null && match.fc[key] != null) {
          this.updateUploadArr('fc', match, match.fc[key], key, match.MatchTime);
        } else if (match.zf != null && match.zf[key] != null) {
          this.updateUploadArr('zf', match, match.zf[key], key, match.MatchTime);
        }
      }
    }
  }

  // '即时'cell
  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('RecommendDetailPage', {
            dataModel: item.item,
          });
        }}
      >
        <RecommendListCellLayout
          nameText={item.item.recommend_name}
          lotteryTypeName={item.item.lottery_name}
          endTime={`截止${item.item.end_time}`}
          price={item.item.price}
          hotLeval={`${item.item.popularity}`}
          detailText={`${item.item.memo}`}
          buyOneClickFunc={() => {
            Alert.alert(
              '提示',
              '确定要跟一单?',
              [
                {
                  text: '取消',
                  onPress: () => {

                  },
                  style: 'cancel'
                },
                {
                  text: '确定',
                  onPress: () => {
                    this.commonProgress.show();
                    for (let i = 0; i < item.item.play_name.length; i += 1) {
                      const match = item.item.play_name[i];
                      const choosArr = match.rq.isSelect.split(',');
                      match.htChoose = choosArr;
                    }
                    this.calculateBonues(item.item.play_name);
                    this.buyLotteryRequest(`${(parseFloat(item.item.price) * 1).toFixed(2)}`, 1, item.item.id);
                  }
                }
              ]
            );
          }}
        />
      </TouchableOpacity>
    );
  }


  render() {
    const { navigation } = this.props;
    return (
      <BaseToolbarLayout
        navigation={navigation}
        toolbarConfig={{
          renderContentFunc: this.renderHeader(),
          hasLeft: false,
          rightImage: search,
          hasRight: true,
          onRightPress: () => {
            navigation.navigate('RecommendSearchPage');
          }
        }}
      >
        <View style={{ flex: 1, paddingBottom: 48 }}>
          <CommonList
            ref={ref => {
              this.CommonList = ref;
            }}
            getListApi={(current, page, params) => RecommendApi.RecommendListRequest(current, page, global.userId, '')
              .then(response => new Promise(resolve => {
                resolve(response);
              })
              )
            }
            itemSparator={
              <View style={{ height: 5, backgroundColor: 'rgb(248,249,250)' }} />
            }
            renderItem={(item) => this.renderItem(item)}
          />
        </View>
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
