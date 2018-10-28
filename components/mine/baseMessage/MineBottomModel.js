import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../utils/CommonUtils';
import MineBottomButtonLayout from '../../../components/mine/MineBottomButtonLayout';

export default class MineBottomModel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
          }}
          activeOpacity={1}
          onPress={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: CommonUtils.width,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              marginBottom: 0,
            }}
            activeOpacity={1}
            onPress={() => {
              this.props.photoOnPress();
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: 'bold', color: '#010D2D' }}
            >
              拍照
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: CommonUtils.width,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              marginBottom: 0,
            }}
            activeOpacity={1}
            onPress={() => {
              this.props.cameraOnPress();
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: 'bold', color: '#010D2D' }}
            >
              从相册选择
            </Text>
          </TouchableOpacity>
          <MineBottomButtonLayout
            rightName={'取消'}
            rightOnPress={() => {
              this.setModalVisible(false);
            }}
            showSingle
            touchStyle={{ backgroundColor: 'white' }}
            textStyle={{ color: CommonUtils.themeColor }}
          />
        </TouchableOpacity>
      </Modal>
    );
  }
}
MineBottomModel.propTypes = {
  photoOnPress: PropTypes.func,
  cameraOnPress: PropTypes.func,
};

MineBottomModel.defaultProps = {
  photoOnPress: () => {
    // 图片
  },
  cameraOnPress: () => {
    // 拍照
  },
};
