import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(1,13,45)',
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15,
  },
});

export default class OddOprimizeCellBottomLayout extends Component {
  renderFourContent(index) {
    const { contentArr } = this.props;
    const viewsArr = [];
    let content = [];
    let textColor = 'white';
    if (index === 0) {
      content = ['投注场次', '主队', '客队', '投注内容'];
      textColor = 'rgba(255,255,255,0.6)';
    } else {
      content = contentArr[index - 1];
    }

    for (let i = 0; i < 4; i += 1) {
      viewsArr.push(
        <Text style={{ textAlign: 'center', color: textColor, fontSize: 12, flex: 1 }}>
          {content[i]}
        </Text>
      );
    }
    return viewsArr;
  }

  renderContent() {
    const { contentArr } = this.props;
    const viewsArr = [];
    for (let i = 0; i < contentArr.length + 1; i += 1) {
      let topMargin = 10;
      if (i === 0) {
        topMargin = 0;
      }
      viewsArr.push(
        <View style={{ flex: 1, flexDirection: 'row', marginTop: topMargin }}>
          {this.renderFourContent(i)}
        </View>
      );
    }
    return viewsArr;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

OddOprimizeCellBottomLayout.propTypes = {
  contentArr: PropTypes.array,
};

OddOprimizeCellBottomLayout.defaultProps = {
  contentArr: [['周四301', '周四301', '周四301', '周四301']],
};
