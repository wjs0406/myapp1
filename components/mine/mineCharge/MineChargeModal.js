import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MineCommonCheck from '../MineCommonCheck';
import CommonUtils from '../../../utils/CommonUtils';

const styles = StyleSheet.create({
  viewStyle: {
    marginLeft: 53,
    marginRight: 53,
    backgroundColor: 'white',
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
});

export default class MineBottomModel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selStatus = true;
    this.state = {
      modalVisible: false,
    };
  }

  componentWillMount() {
    // 使展示的view成为第一响应者
    this.gestureHandlers = {
      onStartShouldSetResponder: () => true
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => {
            this.setModalVisible(false);
          }}
        >
          <View
            style={styles.viewStyle}
            {...this.gestureHandlers}
          >
            <Text style={{ fontSize: 15, color: '#333333', marginTop: 21, marginLeft: 20, marginRight: 20 }}>确定向此彩票站预存资金吗?</Text>
            <MineCommonCheck
              ref={ref => {
                this.mineCommonCheck = ref;
              }}
              title={'不再提示'}
              onPress={() => {
                this.selStatus = !this.selStatus;
                this.mineCommonCheck.setValueStatus(this.selStatus);
              }}
              statusDefault
            />
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#F2F2F2' }}>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                <Text style={{ fontSize: 18, color: '#000000' }}>取消</Text>
              </TouchableOpacity>
              <View style={{ width: 1, height: 43, backgroundColor: '#F2F2F2' }} />
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setModalVisible(false);
                  this.props.onPress();
                  if (this.selStatus === true) {
                    global.storage.save({
                      key: 'chargePop',
                      data: false,
                    });
                  }
                }}
              >
                <Text style={{ fontSize: 18, color: CommonUtils.themeColor }}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}
MineBottomModel.propTypes = {
  onPress: PropTypes.func,
};

MineBottomModel.defaultProps = {
  onPress: () => {
    // 确认
  },

};
