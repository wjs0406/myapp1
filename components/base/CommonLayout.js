import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

const imgNoData = require('../../image/common/img_no_data.png');
const imgNetworkError = require('../../image/common/img_network_error.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FAFAFA'
  },
  hintView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    color: 'rgba(68, 51, 85, 0.6)',
    fontWeight: 'bold',
    marginTop: 12
  },
  textDetailsStyle: {
    fontSize: 12,
    color: 'rgba(68, 51, 85, 0.6)',
    fontWeight: 'bold',
    marginTop: 6
  }
});

export default class CommonLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.defaultState
    };
  }

  showLoadingView() {
    this.setState({
      status: 'loading'
    });
  }

  showEmptyView() {
    this.setState({
      status: 'empty'
    });
  }

  showErrorView(err) {
    this.setState({
      status: 'error',
      errorMessage: global.getErrorMessage(err)
    });
  }

  showContentView() {
    this.setState({
      status: 'content'
    });
  }

  renderView(view) {
    if (this.state.status === 'content' || this.state.status === 'loading') {
      return view;
    }
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.clickToReload();
        }}
      >
        {view}
      </TouchableOpacity>
    );
  }

  render() {
    let result = null;
    if (this.state.status === 'loading') {
      result = this.props.loadingView();
    } else if (this.state.status === 'empty') {
      result = this.props.emptyView(null, this.props.clickToReload);
    } else if (this.state.status === 'error') {
      result = this.props.errorView(this.state.errorMessage);
    } else if (this.state.status === 'content') {
      result = this.props.contentView();
    }
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.props.background
          },
          this.props.style
        ]}
      >
        {this.renderView(result)}
      </View>
    );
  }
}

export function getEmptyView(height, clickToReload) {
  return (
    <TouchableOpacity
      style={[styles.container, height != null ? { height } : {}]}
      onPress={() => {
        if (clickToReload != null) {
          clickToReload();
        }
      }}
    >
      <View style={styles.hintView}>
        <ImageBackground
          source={imgNoData}
          style={{
            width: 175.0,
            height: 175.0
          }}
        />
        <Text style={styles.textStyle}>报告老板</Text>
        <Text style={styles.textDetailsStyle}>{'>> 页面暂时没有数据 <<'}</Text>
      </View>
    </TouchableOpacity>
  );
}

CommonLayout.propTypes = {
  loadingView: PropTypes.func,
  emptyView: PropTypes.func,
  contentView: PropTypes.func.isRequired,
  defaultState: PropTypes.string,
  errorView: PropTypes.func,
  background: PropTypes.string,
  clickToReload: PropTypes.func,
  style: PropTypes.object
};

CommonLayout.defaultProps = {
  loadingView: () => (
    <View>
      <ActivityIndicator size="large" color="rgb(45, 96, 136)" />
    </View>
  ),
  emptyView: getEmptyView,
  errorView: message => (
    <View style={styles.hintView}>
      <ImageBackground
        source={imgNetworkError}
        style={{
          width: 175.0,
          height: 175.0
        }}
      />
      <Text style={styles.textStyle}>
        报告老板
      </Text>
      <Text style={styles.textDetailsStyle}>
        {`>> ${message == null ? '网络貌似出现问题' : message} <<`}
      </Text>
    </View>
  ),
  defaultState: 'loading',
  background: '#FAFAFA',
  clickToReload: () => {
    // 刷新
  },
  style: {}
};
