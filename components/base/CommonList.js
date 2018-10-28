import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';
import { Toast } from 'teaset';
import CommonLayout, { getEmptyView } from './CommonLayout';
import CommonUtils from '../../utils/CommonUtils';

export default class CommonList extends React.Component {
  defaultFirstPage = 1;

  pageSize = 10;

  currentPage = 1;

  otherParams = this.props.params;

  loadingData = false;

  state = {
    list: [],
    loadingMoreData: false,
    hasMoreData: true,
    isRefreshing: false,
    emptyViewHeight: 0,
    headerHeight: 0
  };

  componentDidMount() {
    if (this.props.isFristRefresh) {
      
     this.refreshList(this.otherParams);
    }
  }

  refreshList = params => {
    this.currentPage = this.defaultFirstPage;
    this.otherParams = params;
    // 有数据就是下拉刷新，无数据就是页面加载
    this.requestGetList(this.state.list != null && this.state.list.length > 0);
  };

  requestGetList = (isRefersh = false) => {
    if (this.loadingData) {
      return;
    }
    this.loadingData = true;
    if (this.currentPage === this.defaultFirstPage) {
      if (isRefersh) {
        this.setState({
          isRefreshing: true
        });
      } else {
        this.commonLayout.showLoadingView();
      }
    } else {
      this.setState({
        loadingMoreData: true
      });
    }
    let { list } = this.state;
    // console.log(this.currentPage, this.pageSize, this.otherParams);
    this.props
      .getListApi(`${this.currentPage}`, `${this.pageSize}`, this.otherParams)
      // .then(
      //   data =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve(data);
      //       }, 2000);
      //     })
      // )
      .then(data => {
        // 判断是否有下一页
        const hasMoreData =
          data != null && data.length >= this.pageSize;
        // 处理返回数据
        if (this.currentPage === this.defaultFirstPage) {
          // 1.第一页
          if (data != null && data.length > 0) {
            // 有数据
            list = data.slice();
          } else {
            // 无数据
            list = [];
          }
        } else if (data != null && data.length > 0) {
          // 有数据
          list = list.concat(data);
          
        }
        this.setState(
          {
            list,
            isRefreshing: false,
            loadingMoreData: false,
            hasMoreData
          },
          () => {
            if (list.length === 0) {
              if (this.props.header() != null) {
                this.commonLayout.showContentView();
              } else {
                this.commonLayout.showEmptyView();
              }
            } else {
              this.commonLayout.showContentView();
            }
            this.loadingData = false;
            this.currentPage += 1;
          }
        );
      })
      .catch(err => {
        // 获取失败时，需要将下拉刷新、加载更多取消；如果是第一页，需要显示网络错误View
        this.setState(
          {
            isRefreshing: false,
            loadingMoreData: false
          },
          () => {
            this.loadingData = false;
            if (this.currentPage === this.defaultFirstPage) {
              if (this.props.header() != null) {
                this.commonLayout.showContentView();
              } else {
                this.commonLayout.showErrorView(err);
              }
            } else {
              Toast.fail(global.getErrorMessage(err));
            }
          }
        );
      });
  };

  pullUpLoadFunc() {
    if (this.props.isPullUpLoad === false) {
      return;
    }

    const { list } = this.state;
    if (list.length >= this.pageSize) {
      this.requestGetList();
    }
  }

  renderFooter = () => {
    if (this.props.isPullUpLoad === false) {
      return null;
    }
    if (this.currentPage <= this.defaultFirstPage) {
      return null;
    }
    if (this.state.hasMoreData && this.state.loadingMoreData) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 8
          }}
        >
          <ActivityIndicator color="rgb(45, 96, 136)" />
          <Text style={{ marginLeft: 8, lineHeight: 20 }}>正在加载</Text>
        </View>
      );
    }
    return null;
  };

  renderContent = () => (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        style={{
          flex: 1
        }}
        ref={ref=>{ this.flatList = ref }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={this.state.list}
        renderItem={this.props.renderItem}
        refreshing={this.state.isRefreshing}
        keyExtractor={(item, index) => index + item + ''}
        onRefresh={() => {
          this.refreshList(this.otherParams);
        }}
        // decelerationRate={-5}
        alwaysBounceVertical={false}
        ListHeaderComponent={() =>
          this.props.header(height => {
            if (this.state.headerHeight < height) {
              this.setState({
                headerHeight: height
              });
            }
          })
        }
        ListFooterComponent={() => this.renderFooter()}
        ListEmptyComponent={() => {
          const { emptyViewHeight, headerHeight } = this.state;
          // console.log('height', emptyViewHeight, headerHeight);
          return getEmptyView(emptyViewHeight - headerHeight, () => {
            this.refreshList(this.otherParams);
          });
        }}
        // 用于设置ListEmptyComponent高度，详见：https://www.jianshu.com/p/3203f413a887
        onLayout={e => {
          const { height } = e.nativeEvent.layout;
          if (this.state.emptyViewHeight < height) {
            this.setState({ emptyViewHeight: height });
          }
        }}
        ItemSeparatorComponent={() => this.props.itemSparator}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          this.pullUpLoadFunc();
        }}
      />
    </View>
  );

  render() {
    return (
      <CommonLayout
        ref={ref => {
          this.commonLayout = ref;
        }}
        style={this.props.style}
        contentView={() => this.renderContent()}
        clickToReload={() => {
          if (!this.props.isSearchEmptyReload) {
            this.refreshList(this.otherParams);
          } else {
            this.props.emptyReloadOnPress();
          }
        }}
      />
    );
  }
}

CommonList.propTypes = {
  renderItem: PropTypes.func.isRequired,
  getListApi: PropTypes.func,
  header: PropTypes.func,
  isFristRefresh: PropTypes.bool,
  style: PropTypes.object,
  isSearchEmptyReload: PropTypes.bool,
  emptyReloadOnPress: PropTypes.func,
  itemSparator: PropTypes.func,
  params: PropTypes.object,
  isPullUpLoad: PropTypes.bool,
};

CommonList.defaultProps = {
  getListApi: function getListApi() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ list: [], totalCount: 0 });
      }, 3000);
    });
  },
  header: function getHeader() {
    return null;
  },
  isFristRefresh: true,
  style: {},
  isSearchEmptyReload: false, // 点击空白数据时, 不需要刷新数据
  emptyReloadOnPress: () => {
    // 空数据点击, 不刷新页面. 配合isSearchEmptyReload为true使用
  },
  itemSparator: function getItemSparator() {
    return null;
  },
  params: {},
  isPullUpLoad: true,
};
