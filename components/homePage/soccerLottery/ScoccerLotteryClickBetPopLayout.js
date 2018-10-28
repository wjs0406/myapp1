import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';
import SoccerLotteryListHeaderLayout from './SoccerLotteryListHeaderLayout';
import SoccerLotteryCellLayout from './SoccerLotteryCellLayout';
import MineBottomButtonLayout from '../../mine/MineBottomButtonLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contentBackStyle: {
    backgroundColor: 'white',
  }
});

export default class ScoccerLotteryClickBetPopLayout extends Component {
  constructor(props) {
    super(props);
    this.choosePas = [];
  }

  // 列表header
  renderListHeader() {
    const { headerTitle } = this.props;
    return (
      <SoccerLotteryListHeaderLayout
        titleStr={headerTitle}
        isShowTopMargin={false}
        isShowArrow={false}
      />
    );
  }

  // cell
  renderListItem(item) {
    const { isAvarge } = this.props;
    // Alert.alert(String(item.item.sd00));
    return (
      <SoccerLotteryCellLayout
        homeTeamName={this.props.homeName}
        customerTeamName={this.props.awayName}
        isShowMore={false}
        itemConfig={{
          isAvarge,
          data: item.item,
          chooseArr: this.props.chooseArr,
          clickOddsFunc: (arr) => {
           // this.props.clickOddsFunc(arr);
          //  Alert.alert('123');
            this.choosePas = arr;
          },
          otherType: this.props.type,
        }}
        isShowHeader={false}
        type="其他"
      />
    );
  }


  // sectionList
  renderSectionList() {
    const { dataSource } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.contentBackStyle,
        ]}
      >
        <SectionList
          style={{ width: CommonUtils.width }}
          renderItem={info => this.renderListItem(info)}
          renderSectionHeader={() => this.renderListHeader()}
          sections={dataSource}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <MineBottomButtonLayout
          leftName="取消"
          rightName="确定"
          leftOnPress={() => {
            // 点击取消
            // this.props.clickOddsFunc(this.props.chooseArr);
            this.props.clickCancleFunc();
          }}
          rightOnPress={() => {
            // 点击确定
            this.props.clickOddsFunc(this.choosePas);
            this.props.clickCancleFunc();
          }}
        />
      </TouchableOpacity>

    );
  }

  renderContent() {
    const { renderContentFunc } = this.props;
    if (renderContentFunc === null) {
      return this.renderSectionList();
    }
    return renderContentFunc();
  }

  render() {
    const { isVisible, clickBlackBackFunc, containerStyle } = this.props;
    return (
      <Modal
        visible={isVisible}
        transparent
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            clickBlackBackFunc();
          }}
          style={[styles.container, { ...containerStyle }]}
        >
          {this.renderContent()}
        </TouchableOpacity>
      </Modal>
    );
  }
}

ScoccerLotteryClickBetPopLayout.propTypes = {
  isVisible: PropTypes.bool,
  clickBlackBackFunc: PropTypes.func,
  dataSource: PropTypes.arrayOf(Object),
  headerTitle: PropTypes.string,
  isAvarge: PropTypes.bool,
  renderContentFunc: PropTypes.func,
  containerStyle: PropTypes.object,
  type: PropTypes.string,
  homeName: PropTypes.string,
  awayName: PropTypes.string,
  chooseArr: PropTypes.arrayOf(PropTypes.string),
  clickOddsFunc: PropTypes.func,
  clickConfirmFunc: PropTypes.func,
  clickCancleFunc: PropTypes.func,

};
ScoccerLotteryClickBetPopLayout.defaultProps = {
  isVisible: false,
  clickBlackBackFunc: () => {},
  dataSource: [],
  headerTitle: '比分',
  isAvarge: false,
  renderContentFunc: null,
  containerStyle: {},
  type: '比分',
  homeName: '-',
  awayName: '-',
  chooseArr: [],
  clickOddsFunc: () => {},
  clickConfirmFunc: () => {},
  clickCancleFunc: () => {},
};
