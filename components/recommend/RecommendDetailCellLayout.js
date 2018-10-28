import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types'; 
import CommonUtils from '../../utils/CommonUtils';
import MixPassItemLayout from '../homePage/soccerLottery/mixPass/MixPassItemLayout';


const fontTop = (CommonUtils.Platform === 'IOS' ? 7 : 0);

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    backgroundColor: 'white',
    width: CommonUtils.width - 2 * CommonUtils.ceilWidth(15),
  },
  headerBackStyle: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white',
  },
  headerColorBlockStyle: {
    backgroundColor: CommonUtils.themeColor,
    width: 8,
    height: 4,
  },
  headerTextStyle: {
    marginLeft: CommonUtils.ceilWidth(17),
    fontSize: 14,
    color: 'rgb(105,114,137)'
  },
  // 底部背景
  bottomBackStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // 球队背景
  teamBackStyle: {
    paddingBottom: 15,
    alignItems: 'center',
  },
  // 球队名
  teamNameStyle: {
    color: 'rgb(1,13,45)',
    fontSize: 20,
  },
});

export default class RecommendDetailCellLayout extends Component {
  // header
  renderCellHeader() {
    const { headerTitle } = this.props;
    return (
      <View>
        <View style={styles.headerBackStyle}>
          <View style={styles.headerColorBlockStyle} />
          <Text style={styles.headerTextStyle}>
            {headerTitle}
          </Text>
        </View>
      </View>

    );
  }

  renderPointView() {
    return (
      <View style={styles.bottomBackStyle}>
        <View style={[styles.teamBackStyle, { marginLeft: CommonUtils.ceilWidth(17) + 8, width: CommonUtils.ceilWidth(80) }]}>
          <Text style={styles.teamNameStyle} numberOfLines={10}>
            {this.props.homeName}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 36,
              color: CommonUtils.themeColor,
              fontFamily: 'DIN Condensed',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {this.props.pointStr}
          </Text>
        </View>
        <View style={[styles.teamBackStyle, { marginRight: CommonUtils.ceilWidth(17) + 8, alignItems: 'flex-end', width: CommonUtils.ceilWidth(80) }]}>
          <Text style={[styles.teamNameStyle, { textAlign: 'right' }]}>
            {this.props.awayName}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { itemConfig } = this.props;
    return (
      <View style={styles.ccontainer}>
        <View style={{ height: 5, backgroundColor: 'rgb(246,247,248)' }} />
        {this.renderCellHeader()}
        {this.renderPointView()}
        <MixPassItemLayout
          {...itemConfig}
        />
      </View>
    );
  }
}

RecommendDetailCellLayout.propTypes = {
  headerTitle: PropTypes.string,
  itemConfig: PropTypes.object,
  homeName: PropTypes.string,
  awayName: PropTypes.string,
  pointStr: PropTypes.string,
};

RecommendDetailCellLayout.defaultProps = {
  headerTitle: '',
  itemConfig: {},
  homeName: '',
  awayName: '',
  pointStr: '',
};
