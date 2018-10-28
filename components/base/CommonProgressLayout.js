import React, { Component } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(4,4,15,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class CommonProgressLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  show() {
    this.setState({ isVisible: true });
  }

  hidden() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.isVisible}
        onRequestClose={() => {
          // 该属性必须
        }}
      >
        <View style={styles.container}>
          <View style={styles.progress}>
            <ActivityIndicator size="large" color="rgb(45, 96, 136)" />
          </View>
        </View>
      </Modal>
    );
  }
}
