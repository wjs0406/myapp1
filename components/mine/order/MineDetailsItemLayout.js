import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';


export default class MineDetailsItemLayout extends React.PureComponent {
  renderView = () => {
    return this.props.detailsArr.map((item, index) => {
      const temp = [];
      const temColor = item.title === '中奖金额' || item.title === '奖金'
        ? CommonUtils.themeColor
        : '#010D2D';
      if (item.type !== '1') {
        temp.push(
          <View style={{ marginLeft: 40, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'rgba(1, 13, 45, 0.6)', fontSize: 12, lineHeight: 18, width: 50 }}>
              {item.title}
            </Text>
            <Text style={{ color: temColor, fontSize: 12, marginLeft: 15, width: CommonUtils.width - 40 - 50 - 15 - 10 }}>{item.details}</Text>
          </View>
        );
      } else {
        temp.push(
          <View style={{ marginLeft: 40, flexDirection: 'row', marginBottom: 5 }}>
            <Text style={{ color: 'rgba(1, 13, 45, 0.6)', fontSize: 12, width: 50 }}>
              {item.title}
            </Text>
            <Text style={{ color: temColor, fontSize: 12, marginLeft: 15, width: 70 }}>{item.details}</Text>
            <Text style={{ color: temColor, fontSize: 12, marginLeft: 10, width: CommonUtils.width - 40 - 50 - 15 - 10 - 70 - 5 }}>{item.detailValue}</Text>
          </View>
        );
      }

      return temp;
    });
  };

  render() {
    return (
      <View
        style={{
          width: CommonUtils.width,
          backgroundColor: 'white',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {this.renderView()}
      </View>
    );
  }
}
MineDetailsItemLayout.propTypes = {
  detailsArr: PropTypes.arrayOf(PropTypes.object),
};

MineDetailsItemLayout.defaultProps = {
  detailsArr: [],
};
